import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AuthResponseModel} from "../models/authResponse.model";
import {AuthorityModel} from "../models/entity/users/authority.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
  authModel: AuthResponseModel;
  role = AuthorityModel;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.configObservable.subscribe(value => {
      this.authModel = JSON.parse(window.localStorage.getItem('currentUser'));
    });
  }

  ngOnInit() {
    this.authModel = JSON.parse(window.localStorage.getItem('currentUser'));
  }


  onLogout() {
    this.authModel = null;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
