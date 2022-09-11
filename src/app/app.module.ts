import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CredentialsListComponent } from './credentials-list/credentials-list.component';
import { CredentialItemComponent } from './credential-item/credential-item.component';
import { CredentialDetailComponent } from './credential-detail/credential-detail.component';
import { CredentialEditComponent } from './credential-edit/credential-edit.component';
import { FormsModule } from '@angular/forms';

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
    CredentialEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
