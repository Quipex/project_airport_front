import {Component, OnInit} from '@angular/core';
import {AirlinesService} from '../../services/airlines.service';
import {AirlinesModel} from '../../shared/models/entity/airline/airlines.model';

@Component({
  selector: 'app-airline-selector',
  templateUrl: './airline-selector.component.html',
  styleUrls: ['./airline-selector.component.scss'],
})
export class AirlineSelectorComponent implements OnInit {

  public airlines: AirlinesModel[];

  constructor(
    private service: AirlinesService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe((data: AirlinesModel[]) => {
      this.airlines = data;
    });
  }

  selectAirlineId(id: number) {

  }
}
