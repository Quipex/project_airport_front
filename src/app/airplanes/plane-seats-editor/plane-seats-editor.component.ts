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
  public plane: AirplanesModel = new AirplanesModel(null, null);
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
      console.log('got seats from backend. initial data:');
      console.log(data);
      for (const dataItem of data) {
        const initialAirline = dataItem.airplane.airline;
        let airline;
        if (initialAirline !== null) {
          airline = new AirlinesModel(
            initialAirline.name,
            initialAirline.descr,
            initialAirline.email,
            initialAirline.phoneNumber,
            initialAirline.id,
            initialAirline.objectId,
            initialAirline.parentId,
            initialAirline.objectName,
            initialAirline.objectDescription
          );
        }
        const initialAirplane = dataItem.airplane;
        const airplane = new AirplanesModel(
          initialAirplane.model,
          airline,
          initialAirplane.id,
          initialAirplane.objectId,
          initialAirplane.parentId,
          initialAirplane.objectName,
          initialAirplane.objectDescription
        );
        const initialSeatType = dataItem.seatType;
        const seatType = new SeatTypeModel(
          initialSeatType.name,
          initialSeatType.modifier,
          initialSeatType.description,
          initialSeatType.objectId,
          initialSeatType.parentId,
          initialSeatType.objectName,
          initialSeatType.objectDescription,
          initialSeatType.id
        );
        const initialSeat = dataItem;
        const seat = new SeatModel(
          initialSeat.col,
          initialSeat.row,
          airplane,
          seatType,
          initialSeat.modifier,
          initialSeat.id,
          initialSeat.objectId,
          initialSeat.parentId,
          initialSeat.objectName,
          initialSeat.objectDescription
        );
        this.seats.add(seat);
      }
      console.log('data after parsing:');
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

  saveSeats() {
    const seatsAsTuple = [];
    const seatValueIter = this.seats.values();
    let seatValueRes = seatValueIter.next();
    while (!seatValueRes.done) {
      seatsAsTuple.push(seatValueRes.value);
      seatValueRes = seatValueIter.next();
    }
    this.seatsService.saveSeats(seatsAsTuple, this.plane.objectId).subscribe(next => {
      alert('saved');
      console.log('saved seats, got updated back:');
      console.log(next);
    }, error1 => {
      alert('tried to save, but got an error:' + error1);
      console.log('tried to save, but got an error:');
      console.log(error1);
    });
  }
}
