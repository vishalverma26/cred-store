import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

@NgModule({
  imports: [CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ])],
  declarations: [
    AuthComponent
  ],
  exports: [RouterModule]
})
export class AuthModule { }
