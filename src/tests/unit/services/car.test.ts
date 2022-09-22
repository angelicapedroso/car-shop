import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import * as mock from '../../mocks/carMock';
import { ZodError } from 'zod';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(mock.carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create car', () => {
    it('success', async () => {
      const newCar = await carService.create(mock.carMock);
      expect(newCar).to.be.deep.equal(mock.carMockWithId);
    })

    it('Failure', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })

});
