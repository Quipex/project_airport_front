import {Component, Input, OnInit} from '@angular/core';
import {AirplanesModel} from '../../../shared/models/entity/airplane/airplanes.model';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';

@Component({
  selector: 'app-plane-editor',
  templateUrl: './plane-editor.component.html',
  styleUrls: ['./plane-editor.component.scss']
})
export class PlaneEditorComponent implements OnInit {

  @Input() public plane: AirplanesModel;
  @Input() public seatTypes: SeatTypeModel[];

  constructor() { }

  ngOnInit() {
  }

}
