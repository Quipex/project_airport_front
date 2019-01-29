import {Component, OnInit} from '@angular/core';
import {SEATS} from '../data/mock-seats';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {of} from 'rxjs/internal/observable/of';
import {AirplanesModel} from '../../shared/models/entity/airplane/airplanes.model';
import {SeatTypeModel} from '../../shared/models/entity/airplane/seat-type.model';
import {SEAT_TYPES} from '../data/mock-seat-types';
import {SectionModel} from '../seats/plane-seats-grid/seat-type-section/section-model';
import {ViewMode} from '../seats/plane-seats-grid/plane-seats-grid-modes.model';
import {AirplanesService} from '../../services/airplanes.service';
import {AirlinesService} from '../../services/airlines.service';
import {ActivatedRoute} from '@angular/router';
import {AirlinesModel} from '../../shared/models/entity/airline/airlines.model';

@Component({
  selector: 'app-plane-seats-editor',
  templateUrl: './plane-seats-editor.component.html',
  styleUrls: ['./plane-seats-editor.component.scss'],
  providers: [AirplanesService, AirlinesService]
})
export class PlaneSeatsEditorComponent implements OnInit {
  public seats: Set<SeatModel>;
  public plane: AirplanesModel = new AirplanesModel();
  public seatTypes: SeatTypeModel[];
  public selectedSeats = new Set<SeatModel>();
  public sections: SectionModel[];
  viewMode = ViewMode.EDIT;
  isDebug = false;

  constructor(
    private airplanesService: AirplanesService,
    private airlinesService: AirlinesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    of(SEATS).subscribe(seats => {
      this.seats = seats;
    });

    of(SEAT_TYPES).subscribe(seatTypes => {
      this.seatTypes = seatTypes;
    });

    this.getAirplane();
  }

  getAirplane() {
    this.route.params.subscribe(params => {
      const airplaneId = params['airplaneId'];
      this.airplanesService.getItemById(airplaneId)
        .subscribe((response: any) => {
          this.plane.model = response.model;
          this.airlinesService.getItemById(response.airlineId)
            .subscribe((response: AirlinesModel) => {
              this.plane.airline = response;
            });
        });
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
