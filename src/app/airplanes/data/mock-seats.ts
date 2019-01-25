import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {PLANES} from './mock-airplanes';
import {SEAT_TYPES} from './mock-seat-types';

export const SEATS = new Set([
  new SeatModel(0, 0, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(1, 0, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(2, 0, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(3, 0, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(0, 1, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(1, 1, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(2, 1, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(3, 1, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(0, 2, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(1, 2, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(2, 2, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(3, 2, PLANES[0], SEAT_TYPES[0]),
  new SeatModel(0, 0, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(1, 0, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(2, 0, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(0, 1, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(1, 1, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(2, 1, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(0, 2, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(1, 2, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(2, 2, PLANES[0], SEAT_TYPES[1]),
  new SeatModel(0, 0, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(1, 0, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(2, 0, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(0, 1, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(1, 1, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(2, 1, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(0, 2, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(1, 2, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(2, 2, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(0, 3, PLANES[0], SEAT_TYPES[2]),
  new SeatModel(1, 3, PLANES[0], SEAT_TYPES[2]),
]);
