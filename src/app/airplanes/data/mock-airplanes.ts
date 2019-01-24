import {AirplanesModel} from '../../shared/models/entity/airplane/airplanes.model';
import {AIRLINES} from './mock-airlines';

export const PLANES = [
  new AirplanesModel('model-1', AIRLINES[0]),
  new AirplanesModel('model-2', AIRLINES[0]),
  new AirplanesModel('model-3', AIRLINES[0]),
  new AirplanesModel('model-4', AIRLINES[0])
];
