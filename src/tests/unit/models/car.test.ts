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
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(mock.carMock);
      expect(newCar).to.be.deep.equal(mock.carMockWithId);
    })
  })

});
