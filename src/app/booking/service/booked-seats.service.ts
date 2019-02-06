import {Injectable} from '@angular/core';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {Observable, of} from 'rxjs';
import {SeatsService} from '../../services/seats.service';

@Injectable({
  providedIn: 'root'
})
export class BookedSeatsService {

  private bookedSeatsObjectId: Observable<number[]>;

  constructor(
    private seatsService: SeatsService
  ) {
  }

  public getBookedSeatsObjectIds(flightId: number): Observable<number[]> {
    const obs = this.seatsService.getByFlightId(flightId);

    obs.subscribe((data: SeatModel[]) => {
      const seatsObjectId: number[] = [];
      for (const dataItem of data) {
        seatsObjectId.push(dataItem.objectId);
      }
      this.bookedSeatsObjectId = of(seatsObjectId);
    });

    return this.bookedSeatsObjectId;
  }
}
