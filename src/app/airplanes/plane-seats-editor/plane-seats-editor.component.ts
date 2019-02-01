import {Component, OnInit} from '@angular/core';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../shared/models/entity/airplane/airplanes.model';
import {SeatTypeModel} from '../../shared/models/entity/airplane/seat-type.model';
import {SectionModel} from '../seats/plane-seats-grid/seat-type-section/section-model';
import {ViewMode} from '../seats/plane-seats-grid/plane-seats-grid-modes.model';
import {AirplanesService} from '../../services/airplanes.service';
import {AirlinesService} from '../../services/airlines.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AirlinesModel} from '../../shared/models/entity/airline/airlines.model';
import {SeatTypeService} from '../../services/seatType.service';
import {SeatsService} from '../../services/seats.service';
import {Observable} from 'rxjs';

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
    private seatTypesService: SeatTypeService,
    private seatsService: SeatsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.route.params.subscribe((params: Observable<Params>) => {
      const airplaneId = params['airplaneId'];
      this.initPlaneAndSeats(airplaneId);
    });
    this.initSeatTypes();
  }

  private initSeatTypes() {
    this.seatTypesService.getAllItems().subscribe((data: SeatTypeModel[]) => {
      this.seatTypes = data;
      console.log(this.seatTypes);
    });
  }

  private initPlaneAndSeats(airplaneId: number) {
    this.airplanesService.getItemById(airplaneId)
      .subscribe((response: any) => {
        this.plane.objectId = response.objectId;
        this.plane.model = response.model;
        console.log(this.plane);
        this.airlinesService.getItemById(response.airlineId)
          .subscribe((resp: AirlinesModel) => {
            this.plane.airline = resp;
            console.log(this.plane.airline);
          });

        this.initSeats(this.plane.objectId);
      });
  }

  private initSeats(planeId: number) {
    this.seatsService.getByPlaneId(planeId).subscribe((data: SeatModel[]) => {
      this.seats = new Set<SeatModel>();
      for (const dataItem of data) {
        this.seats.add(dataItem);
      }
      console.log(this.seats);
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
