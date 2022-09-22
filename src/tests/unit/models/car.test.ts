import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/Car';
import * as mock from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(mock.carMockWithId);
    sinon.stub(Model, 'find').resolves(mock.allCarsMock);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(mock.carMock);
      expect(newCar).to.be.deep.equal(mock.carMockWithId);
    })
  })

  describe('list cars', () => {
    it('successfully listed', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(mock.allCarsMock);
    })
  })

});
