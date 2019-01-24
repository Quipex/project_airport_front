import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser === null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      var token = currentUser.token;
      if (token === null) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}
