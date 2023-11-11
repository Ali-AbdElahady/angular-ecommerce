import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Subject, Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserInfo } from '../model/userInfo.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    console.log('https://angular-ecommerce-json-server.onrender.com/login');

    return this.http
      .post<User>('https://angular-ecommerce-json-server.onrender.com/login', {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(
            res.name,
            res.id,
            res.email,
            res.role,
            res.token,
            200
          );
        })
      );
  }

  register(userInfo: User) {
    return this.http
      .post<User>('https://angular-ecommerce-json-server.onrender.com/register', userInfo)
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(
            res.name,
            res.id,
            res.email,
            res.role,
            res.token,
            200
          );
        })
      );
  }

  private handleAuthentication(
    name: any,
    userId: string,
    email: string,
    role: string,
    token: string,
    expireIn: number
  ) {
    const ExpirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const userInforamation = new UserInfo(
      name,
      userId,
      role,
      email,
      token,
      ExpirationDate
    );
    this.userData.next(userInforamation);
    localStorage.setItem('userData', JSON.stringify(userInforamation));
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData || userData == {}) {
      return;
    }
    const loadedUser = new UserInfo(
      userData.name,
      userData.id,
      userData.role,
      userData.email,
      userData._token,
      userData._tokenExpirationDate
    );
    if (loadedUser.token) {
      this.userData.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.userData.next(null);
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occurred!';
    // if (!errorRes.error.error || !errorRes.error) {
    //   return throwError(errorMessage);
    // }
    switch (errorRes.error) {
      case 'Incorrect username or password':
        errorMessage = 'Incorrect username or password.';
        break;
      case 'User already exists':
        errorMessage = 'User already exists.';
        break;

    }

    return throwError(errorMessage);
  }
}
