import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseService} from '../services/baseService.service';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';
import {AirlinesService} from '../services/airlines.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseEntityModel} from '../models/baseEntity.model';
import {ColumnSetting} from '../models/columnSetting.model';
import {ModalDirective} from 'angular-bootstrap-md';
import {InputBaseModel} from '../models/inputBase.model';
import {ResponseErrorModel} from '../models/responseError.model';
import {FormControlService} from "../services/formControl.service";
@Component({
  selector: 'app-project-center',
  templateUrl: './abstract-catalog.component.html',
  styleUrls: ['./abstract-catalog.component.scss']
})
export class AbstractCatalogComponent implements OnInit {

  @Input() settings: ColumnSetting[];
  @Input() questions: InputBaseModel<any>[];
  @ViewChild('newModal') newModal: ModalDirective;
  @ViewChild('removeConfirmModal') removeConfirmModal: ModalDirective;
  entities: BaseEntityModel[];
  title = 'Project Center';
  form: FormGroup;
  currentItem: BaseEntityModel;
  showNew: Boolean = false;
  editMode: Boolean = false;
  submitType = 'Save';
  selectedRow: number;
  paging = false;
  countOfPages = 0;
  numberOfPage = 0;
  deleteId: number;
  responseError: ResponseErrorModel;

  constructor(
    private  service: BaseService,
    private usersService: UsersService,
    private airlinesService: AirlinesService,
    private toastr: ToastrService,
    private fcs: FormControlService
  ) {}

  ngOnInit() {
    this.service.getCountOfItems()
      .subscribe((data: number) => {
        if (data > 10) {
          this.paging = true;
          this.countOfPages = Math.ceil(data / 10);
        }
        this.getTenItems(1, true);
      });
    this.form = this.fcs.toFormGroup(this.questions);
  }



  private getTenItems(numberOfPage: number, direction: boolean) {
    this.service.getTenItems(numberOfPage)
      .subscribe((data: BaseEntityModel[]) => {
        this.entities = data;
      });
    if (direction) {
      if (this.numberOfPage !== this.countOfPages) {
        this.numberOfPage++;
      }
    } else {
      if (this.numberOfPage !== 1) {
        this.numberOfPage--;
      }
    }
  }

  onEdit(index: number) {
    this.currentItem = this.entities[index];
    this.form.patchValue(this.currentItem);
    this.submitType = 'Update';
    this.editMode = true;
    this.showNew = true;
    this.newModal.show();
  }

  onNew() {
    this.currentItem = new BaseEntityModel();
    this.submitType = 'Save';
    this.showNew = !this.showNew;
    this.editMode = false;
  }

  showRemoveConfirmModal(i: number) {
    this.deleteId = i;
    this.removeConfirmModal.show();
  }


  onDelete(index: number) {
    this.currentItem = this.entities[index];
    this.selectedRow = index;
    this.entities.splice(index, 1);

    this.service.deleteItem(this.currentItem.objectId)
      .subscribe(() => {
        const message = 'The item has been deleted.';
        this.showInfo(message);
      });

  }

  onSave(returnedItem: BaseEntityModel) {
    if (this.submitType === 'Save') {
      this.newModal.hide();
      this.showNew = false;
      this.service.addItem(returnedItem)
        .subscribe((item: BaseEntityModel) => {
            if (this.numberOfPage === this.countOfPages) {
              this.entities.push(item);
            }
            const message = 'New item has been added.';
            this.showInfo(message);
          },
          err => {
            this.responseError = err;
            this.showError(this.responseError.error.message);
          });

    } else {
      this.newModal.hide();
      this.service.editItem(returnedItem.id, returnedItem)
        .subscribe((editedItem: BaseEntityModel) => {
          this.entities[this.selectedRow] = editedItem;
          this.entities = JSON.parse(JSON.stringify(this.entities));
          const message = 'The item has been edited.';
          this.showInfo(message);
        });
    }
    this.showNew = false;
  }

  onCancel(event: boolean) {
    if (event) {
      this.showNew = false;
      this.newModal.hide();
    }
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
