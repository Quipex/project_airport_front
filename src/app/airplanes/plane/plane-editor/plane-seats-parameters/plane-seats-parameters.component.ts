import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SectionModel} from '../../../data/section-model';
import {SeatModel} from '../../../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../../../shared/models/entity/airplane/airplanes.model';
import {SeatTypeModel} from '../../../../shared/models/entity/airplane/seat-type.model';
import {SeatColorService} from '../../../data/seat-colors.service';
import {SectionStore} from '../../../data/section-store.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-plane-seats-parameters',
  templateUrl: './plane-seats-parameters.component.html',
  styleUrls: ['./plane-seats-parameters.component.scss']
})
export class PlaneSeatsParametersComponent implements OnInit, OnDestroy {

  @Input() seats: Set<SeatModel>;
  @Input() seatTypes: SeatTypeModel[];
  @Output() seatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() plane: AirplanesModel;
  private sections: SectionModel[];
  private airplaneId: number;
  private routeSub: Subscription;
  private sectionSub: Subscription;

  constructor(
    private colorService: SeatColorService,
    private sectionStore: SectionStore,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Observable<Params>) => {
      this.airplaneId = params['airplaneId'];
      this.sectionSub = this.sectionStore.getSections(this.airplaneId).subscribe(value => {
        // console.log('seat-parameters(sections):');
        // console.log(this.sections);
        this.sections = value;
      });
    });
  }

  getSectionOfSeatType(seatType: SeatTypeModel) {
    if (this.sections !== undefined) {
      for (const section of this.sections) {
        if (section.seatType.objectId === seatType.objectId) {
          return section;
        }
      }
      const newSection = new SectionModel(seatType, 0, 0, this.colorService.getColorBySeatType(seatType));
      this.sectionStore.updateSection(this.airplaneId, newSection);
      return newSection;
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.sectionSub.unsubscribe();
  }
}
