import { Component, OnInit } from '@angular/core';
import {UsersModel} from '../models/users.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {

  user: UsersModel;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.configObservable.subscribe(value => {
      this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    });
  }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
  }



  onLogout() {
    this.user = null;
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
