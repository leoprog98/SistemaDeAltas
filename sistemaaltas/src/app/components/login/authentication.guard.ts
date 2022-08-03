import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
@Injectable()
export class AuthenticationGuard {
    constructor(private router: Router, private authService: LoginService) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
          // your  logic goes here
          // return true;
          // console.log('Status Guard: ' + this.authService.autenticado);
          if (this.authService.autenticado) {
            return true;
        } else {
            this.authService.callBackUrl = next.url.toString();
            // console.log('callbackUrl = ' + this.authService.callbackUrl);
            this.router.navigateByUrl('/login');
            return false;
        }
      }
}
