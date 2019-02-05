import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AuthResponseModel} from "../models/authResponse.model";
import {AuthorityModel} from "../models/entity/users/authority.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarComponent implements OnInit {
  authModel: AuthResponseModel;
  role = AuthorityModel;
  currentRole = '';

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
    if (this.authModel !== null) {
      var token = this.authModel.token;
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.currentRole = decodedToken.user_role;
    }
  }


  onLogout() {
    this.authModel = null;
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

}
