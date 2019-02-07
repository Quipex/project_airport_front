import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ticket-sender',
  templateUrl: './ticket-sender.component.html',
  styleUrls: ['./ticket-sender.component.scss']
})
export class TicketSenderComponent implements OnInit {

  //component not needed
  constructor(
    private toastr: ToastrService
  ) {
  }



  ngOnInit() {
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

}
