import {Injectable} from '@angular/core';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {SeatsService} from '../../services/seats.service';

@Injectable({
  providedIn: 'root'
})
export class BookedSeatsService {

  constructor(
    private seatsService: SeatsService
  ) {
  }

  public getBookedSeatsObjectIds(flightId: number): number[] {

    console.log('getBookedSeatsObjectIds', flightId);
    const obs = this.seatsService.getByFlightId(flightId);
    const seatsObjectId: number[] = [];

    obs.subscribe((data: SeatModel[]) => {
      for (const dataItem of data) {
        seatsObjectId.push(dataItem.objectId);
      }
    });

    return seatsObjectId;
  }
}
