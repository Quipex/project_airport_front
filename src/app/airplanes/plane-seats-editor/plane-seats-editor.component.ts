import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SeatModel} from '../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../shared/models/entity/airplane/airplanes.model';
import {SeatTypeModel} from '../../shared/models/entity/airplane/seat-type.model';
import {SectionModel} from '../data/section-model';
import {ViewMode} from '../seats/plane-seats-grid/plane-seats-grid-modes.model';
import {AirplanesService} from '../../services/airplanes.service';
import {AirlinesService} from '../../services/airlines.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AirlinesModel} from '../../shared/models/entity/airline/airlines.model';
import {SeatTypeService} from '../../services/seatType.service';
import {SeatsService} from '../../services/seats.service';
import {Observable, throwError} from 'rxjs';
import {SectionStore} from '../data/section-store.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-plane-seats-editor',
  templateUrl: './plane-seats-editor.component.html',
  styleUrls: ['./plane-seats-editor.component.scss'],
  providers: [AirplanesService, AirlinesService]
})
export class PlaneSeatsEditorComponent implements OnInit, OnDestroy {

  constructor(
    private airplanesService: AirplanesService,
    private airlinesService: AirlinesService,
    private seatTypesService: SeatTypeService,
    private seatsService: SeatsService,
    private sectionsStore: SectionStore,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  @Input() forceDebug = false;
  public seats: Set<SeatModel>;
  public plane: AirplanesModel = new AirplanesModel(null, null, 0);
  public seatTypes: SeatTypeModel[];
  public selectedSeats = new Set<SeatModel>();
  public sections: SectionModel[];
  viewMode = ViewMode.EDIT;
  isDebug = false;
  private planeId: number;

  private static getSetFromSeatObjects(data: SeatModel[]) {
    const seatSet = new Set<SeatModel>();
    // console.log('got seats from backend. initial data:');
    // console.log(data);

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
        initialAirplane.versionNum,
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
      seatSet.add(seat);
    }
    return seatSet;
  }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy(): void {
    this.sectionsStore.clear(this.planeId);
  }

  private initData() {
    this.route.params.subscribe((params: Observable<Params>) => {
      this.planeId = params['airplaneId'];
      this.initPlaneAndSeats(this.planeId);
      // this.sections = this.sectionsStore.getSections(this.planeId);
      this.sectionsStore.getSections(this.planeId).subscribe(value => {
        // console.log('++++sections changed:');
        // console.log(value);
        this.sections = value;
      });
    });
    this.initSeatTypes();
  }

  private initSeatTypes() {
    this.seatTypesService.getAllItems().subscribe((data: SeatTypeModel[]) => {
      this.seatTypes = [];
      for (const item of data) {
        const seatType = new SeatTypeModel(
          item.name,
          item.modifier,
          item.description,
          item.objectId,
          item.parentId,
          item.objectName,
          item.objectDescription,
          item.id
        );
        this.seatTypes.push(seatType);
      }
      // console.log(this.seatTypes);
    });
  }

  private initPlaneAndSeats(airplaneId: number) {
    this.airplanesService.getItemById(airplaneId)
      .subscribe((response: any) => {
        this.plane.objectId = response.objectId;
        this.plane.model = response.model;
        this.plane.versionNum = response.versionNum;
        // console.log(this.plane);
        this.airlinesService.getItemById(response.airlineId)
          .subscribe((resp: AirlinesModel) => {
            this.plane.airline = resp;
            // console.log(this.plane.airline);
          });

        this.initSeats(this.plane.objectId);
      });
  }

  private initSeats(planeId: number) {
    this.seatsService.getByPlaneId(planeId).subscribe((data: SeatModel[]) => {
      this.seats = PlaneSeatsEditorComponent.getSetFromSeatObjects(data);
      // console.log('data after parsing:');
      // console.log(this.seats);
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
      if (seatValueRes.value.modifier === 1
        || seatValueRes.value.modifier <= 0) {
        seatValueRes.value.modifier = null;
      }
      seatsAsTuple.push(seatValueRes.value);
      seatValueRes = seatValueIter.next();
    }
    this.seatsService.saveSeats(seatsAsTuple, this.plane.objectId)
      .subscribe((next: SeatModel[]) => {
        this.seats = PlaneSeatsEditorComponent.getSetFromSeatObjects(next);
        this.successfullyEditedPlane();
      }, (error1: HttpErrorResponse) => {
        throwError(error1);
      });
  }

  private successfullyEditedPlane() {
    this.toastr.success('The plane has been saved', 'Success');
  }
}
