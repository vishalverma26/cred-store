export interface AuthRequestPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface signUpResponsePayload {
  idToken: string;
  email: string;
  refreshToken: boolean;
  expiresIn: string;
  localId: string
}

export interface signInResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export class User {
  
  constructor(private email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}

  get token() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }
}
