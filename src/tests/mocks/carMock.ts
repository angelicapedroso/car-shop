import { ICar } from '../../interfaces/ICar';

export const carMock: ICar = {
  model: 'Range Rover Evoque',
  year: 2022,
  color: 'white',
  buyValue: 300000,
  seatsQty: 5,
  doorsQty: 4,
};

export const carMockWithId: ICar & { _id: string } = {
  _id: '60f1f9f9b9b1b8b1b8b1b8b1',
  model: 'Range Rover Evoque',
  year: 2022,
  color: 'white',
  buyValue: 300000,
  seatsQty: 5,
  doorsQty: 4,
};
