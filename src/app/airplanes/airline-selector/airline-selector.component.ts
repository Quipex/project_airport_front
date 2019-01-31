import {Component, OnInit} from '@angular/core';
import {AirlinesService} from '../../services/airlines.service';
import {AirlinesModel} from '../../shared/models/entity/airline/airlines.model';
import {Listable} from '../../shared/dynamic-form/search-list/item.model';

@Component({
  selector: 'app-airline-selector',
  templateUrl: './airline-selector.component.html',
  styleUrls: ['./airline-selector.component.scss'],
})
export class AirlineSelectorComponent implements OnInit {

  items: AirlinesModel[];
  selectedItem: AirlinesModel;

  constructor(
    private service: AirlinesService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe((data: AirlinesModel[]) => {
      this.items = [];
      for (const item of data) {
        const airline = new AirlinesModel();
        airline.id = item.id;
        airline.objectId = item.objectId;
        airline.parentId = item.parentId;
        airline.objectName = item.objectName;
        airline.objectDescription = item.objectDescription;
        airline.name = item.name;
        airline.descr = item.descr;
        airline.email = item.email;
        airline.phoneNumber = item.phoneNumber;
        this.items.push(airline);
      }
    });
  }

  changeSelection(item: Listable) {
    this.selectedItem = item;
  }
}
