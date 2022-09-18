import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { CredentialDetailComponent } from './credentials/credential-detail/credential-detail.component';
import { CredentialEditComponent } from './credentials/credential-edit/credential-edit.component';
import { CredentialItemComponent } from './credentials/credentials-list/credential-item/credential-item.component';
import { CredentialsListComponent } from './credentials/credentials-list/credentials-list.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { HeaderComponent } from './header/header.component';
import { ErrorAlertComponent } from './shared/components/error-alert/error-alert.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { MinDateDirective } from './shared/directives/min-date.directive';
import { SharedInterceptor } from './shared/services/shared-interceptor.service';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CredentialsComponent,
    TodoComponent,
    NotFoundComponent,
    TodoEditComponent,
    DropdownDirective,
    CredentialsListComponent,
    CredentialItemComponent,
    CredentialDetailComponent,
    CredentialEditComponent,
    ErrorAlertComponent,
    MinDateDirective,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
