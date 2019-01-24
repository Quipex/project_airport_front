import {Component, Input, OnInit} from '@angular/core';
import {AirplanesModel} from '../../../shared/models/entity/airplane/airplanes.model';

@Component({
  selector: 'app-plane-info',
  templateUrl: './plane-info.component.html',
  styleUrls: ['./plane-info.component.scss']
})
export class PlaneInfoComponent implements OnInit {
  @Input() public plane: AirplanesModel;

  constructor() { }

  ngOnInit() {
  }

}
