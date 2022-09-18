import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from "rxjs";
import { API } from "../shared/api-url";
import { AuthRequestPayload, signInResponsePayload, signUpResponsePayload, User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public userSubject = this._userSubject.asObservable();
  private tokenExpirationTime: any;

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string, returnSecureToken: boolean = true) {
    const payload: AuthRequestPayload = { email, password, returnSecureToken };
      return this.http.post<signUpResponsePayload>(API.signUp, payload).pipe(catchError(this.handleError), tap(response => {
        this.handleAuthentication(response);
      }
    ));
  }

  signIn(email: string, password: string, returnSecureToken: boolean = true) {
    const payload: AuthRequestPayload = { email, password, returnSecureToken };
    return this.http.post<signInResponsePayload>(API.signIn, payload).pipe(tap(response => {
      this.handleAuthentication(response);
    }));
  }

  signout() {
    return new Observable(subscriber => {
      subscriber.next(EMPTY)
      localStorage.removeItem('user');
      this._userSubject.next(null);
      subscriber.complete();
    })
  }

  autoSignIn() {
    const userData = JSON.parse(<string>localStorage.getItem('user'));
    if (!userData) return null;

    const loggedInUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);

    if (loggedInUser.token) {
      this._userSubject.next(loggedInUser);
      const expirationDuration = (new Date(userData._tokenExpirationDate).getTime() - new Date().getTime())
      this.autoSignout(expirationDuration);
    }
  }

  autoSignout(expiresIn: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.signout();
    }, expiresIn);
  }

  private handleError(error) {
    let genericErrorMessage = 'An Unknown Error Occurred!';
    if(!error?.error) {
      return throwError(genericErrorMessage);
    }

    switch(error?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        genericErrorMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        genericErrorMessage = 'No Such Email Exists!'
        break;
      case 'INVALID_PASSWORD':
        genericErrorMessage = 'Wrong password entered!';
        break;
    }

    return throwError(error);
  }

  private handleAuthentication(response) {
    const email = response.email;
    const id = response.localId;
    const token = response.idToken;
    const tokenExpirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
    const user = new User(email, id, token, tokenExpirationDate);

    this._userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    this.autoSignout(+response.expiresIn * 1000);
  }
}
