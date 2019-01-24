import {Component, Input, OnInit} from '@angular/core';
import {SeatTypeModel} from '../../../shared/models/entity/airplane/seat-type.model';

@Component({
  selector: 'app-plane-seats-parameters',
  templateUrl: './plane-seats-parameters.component.html',
  styleUrls: ['./plane-seats-parameters.component.scss']
})
export class PlaneSeatsParametersComponent implements OnInit {

  @Input() public seatTypes: SeatTypeModel[];

  constructor(
  ) { }

  ngOnInit() {
  }

}
