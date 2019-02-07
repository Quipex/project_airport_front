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
    for (const dataItem of data) {
      const tempSeat = new SeatModel();
      tempSeat.clone(dataItem);
      seatSet.add(tempSeat);
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
      this.sectionsStore.getSections(this.planeId).subscribe(value => {
        this.sections = value;
      });
    });
    this.initSeatTypes();
  }

  private initSeatTypes() {
    this.seatTypesService.getAllItems().subscribe((data: SeatTypeModel[]) => {
      this.seatTypes = [];
      for (const item of data) {
        const seatType = new SeatTypeModel();
        seatType.clone(item);
        this.seatTypes.push(seatType);
      }
    });
  }

  private initPlaneAndSeats(airplaneId: number) {
    this.airplanesService.getItemById(airplaneId)
      .subscribe((response: any) => {
        this.plane.objectId = response.objectId;
        this.plane.model = response.model;
        this.plane.versionNum = response.versionNum;
        this.airlinesService.getItemById(response.airlineId)
          .subscribe((resp: AirlinesModel) => {
            this.plane.airline = resp;
          });

        this.initSeats(this.plane.objectId);
      });
  }

  private initSeats(planeId: number) {
    this.seatsService.getByPlaneId(planeId).subscribe((data: SeatModel[]) => {
      this.seats = PlaneSeatsEditorComponent.getSetFromSeatObjects(data);
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
