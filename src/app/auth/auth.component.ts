import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent {
  @ViewChild(NgForm) authForm!: NgForm;
  isLogin: boolean = true;

  constructor(private authService: AuthService, private router: Router, private dataSvc: DataStorageService) {}

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  submitAuthForm() {
    const email = this.authForm.value?.email;
    const password = this.authForm.value?.password;
    let resObs = new Observable();
    if(!this.isLogin) {
      resObs = this.authService.signUp(email, password);
    } else {
      resObs = this.authService.signIn(email, password);
    }

    resObs.subscribe(response => {
      this.router.navigate(['/credentials']);
    }, error => {
      console.log(error);
    });
  }
}
