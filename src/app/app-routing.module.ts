import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialEditComponent } from './credential-edit/credential-edit.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'credentials',
    pathMatch: 'full'
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
    children: [
      {
        path: 'new',
        component: CredentialEditComponent
      }   
    ]
  },
  {
    path: 'to-do',
    component: TodoComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
