import {Component, Input, OnInit} from '@angular/core';
import {SectionModel} from '../../../seats/plane-seats-grid/seat-type-section/section-model';

@Component({
  selector: 'app-plane-seats-parameters',
  templateUrl: './plane-seats-parameters.component.html',
  styleUrls: ['./plane-seats-parameters.component.scss']
})
export class PlaneSeatsParametersComponent implements OnInit {

  @Input() public sections: SectionModel[];
  // @Output() public sectionsChange = new EventEmitter<SectionModel[]>();

  constructor() {
  }

  ngOnInit() {
  }

}
