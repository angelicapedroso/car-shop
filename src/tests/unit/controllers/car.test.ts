import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/Car';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import * as mock from '../../mocks/carMock';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(mock.carMockWithId);
    sinon.stub(carService, 'read').resolves(mock.allCarsMock);
    sinon.stub(carService, 'readOne').resolves(mock.carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create', () => {
    it('success', async () => {
      req.body = mock.carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.carMockWithId)).to.be.true;
    })
  })

  describe('Read', () => {
    it('success', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.allCarsMock)).to.be.true;
    })
  })

  describe('ReadOne', () => {
    it('success', async () => {
      req.params = { id: mock.carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mock.carMockWithId)).to.be.true;
    })
  })

});
