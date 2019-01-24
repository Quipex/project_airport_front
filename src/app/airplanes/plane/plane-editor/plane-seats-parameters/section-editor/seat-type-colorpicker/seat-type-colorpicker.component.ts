import {Component, Input, OnInit} from '@angular/core';
import {SeatTypeModel} from '../../../../../../shared/models/entity/airplane/seat-type.model';
import {SeatColorService} from '../../../../../data/seat-colors.service';

@Component({
  selector: 'app-seat-type-colorpicker',
  templateUrl: './seat-type-colorpicker.component.html',
  styleUrls: ['./seat-type-colorpicker.component.scss']
})
export class SeatTypeColorpickerComponent implements OnInit {

  @Input() public seatType: SeatTypeModel;
  public colorCode: string;

  constructor(
    private colorService: SeatColorService
  ) { }

  ngOnInit() {
    this.colorCode = this.colorService.getColorBySeatType(this.seatType);
  }

}
