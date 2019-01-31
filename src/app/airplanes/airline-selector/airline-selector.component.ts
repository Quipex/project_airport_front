import {Component, OnInit} from '@angular/core';
import {AirlinesService} from '../../services/airlines.service';
import {AirlinesModel} from '../../shared/models/entity/airline/airlines.model';
import {ListItemModel} from '../../shared/dynamic-form/search-list/item.model';

@Component({
  selector: 'app-airline-selector',
  templateUrl: './airline-selector.component.html',
  styleUrls: ['./airline-selector.component.scss'],
})
export class AirlineSelectorComponent implements OnInit {

  items: ListItemModel[];
  selectedItem: ListItemModel;

  constructor(
    private service: AirlinesService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe((data: AirlinesModel[]) => {
      this.items = [];
      for (const dataItem of data) {
        this.items.push(new ListItemModel(dataItem.name, dataItem.objectId));
      }
    });
  }

  changeSelection(item: ListItemModel) {
    this.selectedItem = item;
  }
}
