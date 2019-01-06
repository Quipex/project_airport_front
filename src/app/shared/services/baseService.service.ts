import {Injectable} from '@angular/core';
import {BaseEntityModel} from '../models/baseEntity.model';
import {FilterAndSortWrapperModel} from "../models/filterAndSortWrapper.model";

@Injectable()
export abstract class BaseService {

  abstract getCountOfItems();

  abstract getTenItems(page: number);

  abstract addItem(baseEntity: BaseEntityModel);

  abstract editItem(id: number, baseEntity: BaseEntityModel);

  abstract deleteItem(id: number);

  abstract search(page: number, wrapper: FilterAndSortWrapperModel);
}
