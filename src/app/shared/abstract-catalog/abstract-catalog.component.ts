import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseService} from '../../services/baseService.service';
import {ToastrService} from 'ngx-toastr';
import {FormGroup} from '@angular/forms';
import {BaseEntityModel} from '../models/baseEntity.model';
import {ColumnSetting} from '../models/columnSetting.model';
import {ModalDirective} from 'angular-bootstrap-md';
import {InputBaseModel} from '../models/inputBase.model';
import {ResponseErrorModel} from '../models/responseError.model';
import {FormControlService} from '../../services/formControl.service';
import {FilterAndSortWrapperModel} from '../models/filterAndSortWrapper.model';
import {SortEntityModel} from '../models/sortEntity.model';
import {ResponseFilteringWrapperModel} from '../models/responseFilteringWrapper.model';
import {AirplanesService} from '../../services/airplanes.service';

@Component({
  selector: 'app-project-center',
  templateUrl: './abstract-catalog.component.html',
  styleUrls: ['./abstract-catalog.component.scss']
})
export class AbstractCatalogComponent implements OnInit {

  @Input() settings: ColumnSetting[];
  @Input() questions: InputBaseModel<any>[];
  @Input() header: string;
  @ViewChild('newModal') newModal: ModalDirective;
  @ViewChild('modalContent', {read: ElementRef}) private modalContent: ElementRef;
  @ViewChild('removeConfirmModal') removeConfirmModal: ModalDirective;
  entities: BaseEntityModel[];
  title = 'Project Center';
  form: FormGroup;
  currentItem: BaseEntityModel;
  editMode: Boolean = false;
  submitType = 'Save';
  paging = false;
  countOfPages = 0;
  numberOfPage = 1;
  deleteId: number;
  responseError: ResponseErrorModel;
  searchString = '';
  filteringMode = false;
  sortList: SortEntityModel[] = [];
  columnAttr: number;
  sortDirection = true;
  overflow = 'auto';
  height: number;
  clickable = false;

  loading = false;
  totalEntities = 0;
  limit = 10;

  constructor(
    private service: BaseService,
    private toastr: ToastrService,
    private fcs: FormControlService
  ) {
  }

  ngOnInit() {
    this.getCountOfItems();
    this.form = this.fcs.toFormGroup(this.questions);
    if (this.service instanceof AirplanesService) {
      this.clickable = true;
    }
  }

  onEdit(index: number) {
    if (this.questions.length > 5) {
      let countOfEditInputs = 0;
      for (const question of this.questions) {
        if (question.edit) {
          countOfEditInputs++;
        }
      }
      if (countOfEditInputs > 5) {
        this.height = 50;
        this.overflow = 'scroll';
      } else {
        this.height = null;
        this.overflow = 'auto';
      }
    }
    this.currentItem = this.entities[index];
    this.form = this.fcs.toFormGroup(this.questions);
    this.form.patchValue(this.currentItem);

    if (this.form.controls['airline']) {
      let curObj: any = this.currentItem;
      this.form.controls['airline'].setValue(curObj.airline);
    }
    if (this.form.controls['country']) {
      let curObj: any = this.currentItem;
      this.form.controls['country'].setValue(curObj.country);
    }
    // if (this.form.controls['select']) {
    //   let temp: any = [];
    //   for (let question in this.questions) {
    //     console.log('yes');
    //     if (question.type == 'select') {
    //       console.log('yes');
    //       for (let x in this.question.value) {
    //         temp.push(x);
    //       }
    //       question.value = temp;
    //       console.log(temp);
    //       // this.form.controls['country'].setValue(curObj.country);
    //     }
    //   }
    // }

    this.submitType = 'Update';
    this.editMode = true;
    this.newModal.show();
  }

  onNew() {
    this.form.reset();
    if (this.questions.length > 5) {
      this.height = 79;
      this.overflow = 'scroll';
    }
    this.newModal.show();
    this.currentItem = new BaseEntityModel();
    this.submitType = 'Save';
    this.editMode = false;
  }

  onDelete(index: number) {
    this.currentItem = this.entities[index];
    this.entities.splice(index, 1);

    this.service.deleteItem(this.currentItem.objectId)
      .subscribe(() => {
        const message = 'The item has been deleted.';
        this.showInfo(message);
      }, err => {
        this.responseError = err;
        this.showError(this.responseError.error.message);
      });
    if (this.entities.length === 0 && this.numberOfPage > 1) {
      this.numberOfPage -= 1;
    }
    this.getCountOfItems();
  }

  onSave(returnedItem: BaseEntityModel) {
    if (this.submitType === 'Save') {

      this.service.addItem(returnedItem)
        .subscribe(item => {
            this.entities.push(item);
            this.newModal.hide();
            const message = 'New item has been added.';
            this.showInfo(message);
          },
          err => {
            this.responseError = err;
            this.showError(this.responseError.error.message);
          });
    } else {

      this.service.editItem(returnedItem.objectId, returnedItem)
        .subscribe(() => {
          this.newModal.hide();
          const message = 'The item has been edited.';
          this.showInfo(message);
        }, err => {
          this.responseError = err;
          this.showError(this.responseError.error.message);
        });
    }
    this.getCountOfItems();
  }

  onCancel(event: boolean) {
    if (event) {
      this.newModal.hide();
    }
  }

  showRemoveConfirmModal(i: number) {
    this.deleteId = i;
    this.removeConfirmModal.show();
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  sortBy(columnAttr: number) {
    const columnAttrList = [];
    const sortAttr = 'ATTR';
    let deleted = false;
    for (let i = 0; i < this.sortList.length; i++) {
      if (this.sortList[i].type === sortAttr + columnAttr) {
        if (this.sortList[i].order) {
          this.sortList[i].order = false;
        } else if (!this.sortList[i].order) {
          this.sortList.splice(i, 1);
          deleted = true;
        }
      }
      if (!deleted) {
        columnAttrList.push(this.sortList[i].type);
      }
    }
    if (!deleted) {
      if (!columnAttrList.includes(sortAttr + columnAttr)) {
        this.sortList.push(new SortEntityModel(columnAttr, true));
      }
    }

    let wrapper;
    if (this.sortList.length === 0) {
      wrapper = new FilterAndSortWrapperModel(this.searchString);
    } else {
      wrapper = new FilterAndSortWrapperModel(this.searchString, this.sortList);
    }

    this.service.search(this.numberOfPage, wrapper)
      .subscribe((data: ResponseFilteringWrapperModel) => {
        this.entities = data.entities;
      });
  }

  onSearch() {
    if (this.searchString === '') {
      this.numberOfPage = 1;
      this.getCountOfItems();
    } else {
      const wrapper = new FilterAndSortWrapperModel(this.searchString, this.sortList);
      this.service.search(1, wrapper)
        .subscribe((data: ResponseFilteringWrapperModel) => {
          if (data.countOfPages < 2) {
            this.paging = false;
          } else {
            this.filteringMode = true;
            this.paging = true;
            this.numberOfPage = 1;
            this.countOfPages = data.countOfPages;
          }
          this.entities = data.entities;
        });
    }
  }

  private getCountOfItems() {
    setTimeout(() => {
      this.service.getCountOfItems()
        .subscribe((data: number) => {
          this.countOfPages = Math.ceil(data / 10);
          console.log('Data:' + data + ', Pages count:' + this.countOfPages);
          if (data > 10) {
            this.paging = true;
          } else {
            this.paging = false;
          }
        });
      this.getTenItems(this.numberOfPage);
    }, 150);
  }

  private getTenItems(numberOfPage: number) {
    this.numberOfPage = numberOfPage;
    console.log('Current page:' + this.numberOfPage);

    this.service.getTenItems(numberOfPage)
      .subscribe((data: BaseEntityModel[]) => {
        this.entities = data;
        console.log(data);
      });
  }

  private getTenItemsByFilter(numberOfPage: number) {
    const wrapper = new FilterAndSortWrapperModel(this.searchString, this.sortList);
    this.numberOfPage = numberOfPage;

    this.service.search(numberOfPage, wrapper)
      .subscribe((data: ResponseFilteringWrapperModel) => {
        this.entities = data.entities;
      });
  }

  onPrevPage() {
    if (this.numberOfPage !== 1) {
      this.numberOfPage--;
    }

    if (this.filteringMode) {
      this.getTenItemsByFilter(this.numberOfPage);
    } else {
      this.getTenItems(this.numberOfPage);
    }
  }


  onNextPage() {
    if (this.numberOfPage !== this.countOfPages) {
      this.numberOfPage++;
    }

    if (this.filteringMode) {
      this.getTenItemsByFilter(this.numberOfPage);
    } else {
      this.getTenItems(this.numberOfPage);
    }
  }

  onEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.onSearch();
    }
  }
}
