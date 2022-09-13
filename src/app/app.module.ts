import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CredentialsListComponent } from './credentials/credentials-list/credentials-list.component';
import { CredentialItemComponent } from './credentials/credentials-list/credential-item/credential-item.component';
import { CredentialDetailComponent } from './credentials/credential-detail/credential-detail.component';
import { CredentialEditComponent } from './credentials/credential-edit/credential-edit.component';
import { ErrorAlertComponent } from './shared/components/error-alert/error-alert.component';
import { MinDateDirective } from './shared/directives/min-date.directive';
import { SharedInterceptor } from './shared/services/shared-interceptor.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

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
      useClass: SharedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
