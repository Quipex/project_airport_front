import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AirplanesModel} from '../../../shared/models/entity/airplane/airplanes.model';
import {SectionModel} from '../../seats/plane-seats-grid/seat-type-section/section-model';
import {SeatModel} from '../../../shared/models/entity/airplane/seat.model';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';

@Component({
  selector: 'app-plane-editor',
  templateUrl: './plane-editor.component.html',
  styleUrls: ['./plane-editor.component.scss']
})
export class PlaneEditorComponent implements OnInit {

  @Input() public plane: AirplanesModel;
  @Input() public sections: SectionModel[];
  @Input() public seatTypes: SeatTypeModel[];
  // @Output() public sectionsChange = new EventEmitter<SectionModel[]>();
  @Input() seats: SeatModel[];
  @Output() seatsChange = new EventEmitter<SeatModel[]>();

  constructor() { }

  ngOnInit() {
  }

}
