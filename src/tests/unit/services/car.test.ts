import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import * as mock from '../../mocks/carMock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(mock.carMockWithId);
    sinon.stub(carModel, 'read').resolves(mock.allCarsMock);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(mock.carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(mock.carMockWithId)
  });

  after(() => {
    sinon.restore();
  })

  describe('Create', () => {
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

  describe('Read', () => {
    it('success', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal(mock.allCarsMock);
    })
  })

  describe('ReadOne', () => {
		it('Success', async () => {
			const car = await carService.readOne(mock.carMockWithId._id);

			expect(car).to.be.deep.equal(mock.carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.readOne(mock.carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

});
