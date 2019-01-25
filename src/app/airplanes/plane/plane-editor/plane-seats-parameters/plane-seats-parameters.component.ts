import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SectionModel} from '../../../seats/plane-seats-grid/seat-type-section/section-model';
import {SeatModel} from '../../../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../../../shared/models/entity/airplane/airplanes.model';
import {SeatTypeModel} from '../../../../shared/models/entity/airplane/seat-type.model';
import {SeatColorService} from '../../../data/seat-colors.service';

@Component({
  selector: 'app-plane-seats-parameters',
  templateUrl: './plane-seats-parameters.component.html',
  styleUrls: ['./plane-seats-parameters.component.scss']
})
export class PlaneSeatsParametersComponent implements OnInit {

  @Input() public sections: SectionModel[];
  @Input() seats: Set<SeatModel>;
  @Input() seatTypes: SeatTypeModel[];
  @Output() seatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() plane: AirplanesModel;

  constructor(
    private colorService: SeatColorService
  ) {
  }

  ngOnInit() {
  }

  getSectionOfSeatType(seatType: SeatTypeModel) {
    if (this.sections !== undefined) {
      for (const section of this.sections) {
        if (section.seatType === seatType) {
          return section;
        }
      }
      const newSection = new SectionModel(seatType, 0, 0, this.colorService.getColorBySeatType(seatType));
      this.sections.push(newSection);
      return newSection;
    }
  }
}
