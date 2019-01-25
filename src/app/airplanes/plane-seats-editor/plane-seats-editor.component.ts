import {Component, OnInit} from '@angular/core';
import {SEATS} from '../data/mock-seats';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {of} from 'rxjs/internal/observable/of';
import {AirplanesModel} from '../../shared/models/entity/airplane/airplanes.model';
import {PLANES} from '../data/mock-airplanes';
import {SeatTypeModel} from '../../shared/models/entity/airplane/seat-type.model';
import {SEAT_TYPES} from '../data/mock-seat-types';
import {SectionModel} from '../seats/plane-seats-grid/seat-type-section/section-model';
import {ViewMode} from '../seats/plane-seats-grid/plane-seats-grid-modes.model';

@Component({
  selector: 'app-plane-seats-editor',
  templateUrl: './plane-seats-editor.component.html',
  styleUrls: ['./plane-seats-editor.component.scss']
})
export class PlaneSeatsEditorComponent implements OnInit {
  public seats: Set<SeatModel>;
  public plane: AirplanesModel;
  public seatTypes: SeatTypeModel[];
  public selectedSeats = new Set<SeatModel>();
  public sections: SectionModel[];
  viewMode = ViewMode.EDIT;

  constructor() {
  }

  ngOnInit() {
    of(SEATS).subscribe(seats => {
      this.seats = seats;
    });

    of(PLANES).subscribe(plane => {
      this.plane = plane[0];
    });

    of(SEAT_TYPES).subscribe(seatTypes => {
      this.seatTypes = seatTypes;
    });
  }

  toggleViewMode(select: boolean) {
    if (select) {
      this.viewMode = ViewMode.SELECT;
    } else {
      this.viewMode = ViewMode.EDIT;
    }
  }
}
