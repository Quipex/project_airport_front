import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SectionModel} from '../../../seats/plane-seats-grid/seat-type-section/section-model';
import {SeatModel} from '../../../../shared/models/entity/airplane/seat.model';
import {AirplanesModel} from '../../../../shared/models/entity/airplane/airplanes.model';

@Component({
  selector: 'app-plane-seats-parameters',
  templateUrl: './plane-seats-parameters.component.html',
  styleUrls: ['./plane-seats-parameters.component.scss']
})
export class PlaneSeatsParametersComponent implements OnInit {

  @Input() public sections: SectionModel[];
  @Input() seats: Set<SeatModel>;
  @Output() seatsChange = new EventEmitter<Set<SeatModel>>();
  @Input() plane: AirplanesModel;
  // @Output() public sectionsChange = new EventEmitter<SectionModel[]>();

  constructor() {
  }

  ngOnInit() {
  }

}
