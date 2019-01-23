import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let roles = route.data["roles"] as Array<string>;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    if (roles.indexOf(decodedToken.user_role) === -1) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
