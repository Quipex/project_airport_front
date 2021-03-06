import {Injectable} from '@angular/core';
import {BaseService} from './baseService.service';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {SeatModel} from '../shared/models/entity/airplane/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatsService extends BaseService {

  addItem(baseEntity: BaseEntityModel) {
    return this.http.post(this.API_URL + `/seats`, baseEntity, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(this.API_URL + `/seats/${id}`, this.httpOptions);
  }

  editItem(id: number, baseEntity: BaseEntityModel) {
    return this.http.put(this.API_URL + `/seats/`, baseEntity, this.httpOptions);
  }

  getCountOfItems() {
    return this.http.get(this.API_URL + `/seats/count`, this.httpOptions);
  }

  getTenItems(page: number) {
    return this.http.get(this.API_URL + `/seats/page=${page}`, this.httpOptions);
  }

  search(page: number, wrapper: FilterAndSortWrapperModel) {
    return this.http.post(this.API_URL + `/seats/search/page=${page}`, wrapper, this.httpOptions);
  }

  getByPlaneId(id: number) {
    return this.http.get(this.API_URL + `/seats/airplaneId=${id}`, this.httpOptions);
  }

  saveSeats(seats: SeatModel[], planeId: number) {
    // console.log(seats);
    return this.http.post(this.API_URL + `/seats/airplaneId=${planeId}`, seats, this.httpOptions);
  }

  getByFlightId(flightId: number) {
    return this.http.get(this.API_URL + `/seats/flightId=${flightId}`, this.httpOptions);
  }
}
