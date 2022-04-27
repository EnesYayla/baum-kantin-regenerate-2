import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../models/signInData';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly mockedUser = new SignInData('11112222333', '1234');
  isAuthenticated = false;

  constructor(private router: Router) {}

  authenticate(signInData: SignInData): boolean {
    if (this.checkCredentials(signInData)) {
      this.isAuthenticated = true;
      this.router.navigate(['home']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredentials(signInData: SignInData): boolean {
    return this.checkTc(signInData.getTc()) &&
    this. checkPassword(signInData.getPassword());
  }

  private checkTc(tc: string): boolean {
    return tc === this.mockedUser.getTc();
  }

  private checkPassword(password: string): boolean {
    return password === this.mockedUser.getPassword();
  }

  logOut(){
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }
}
