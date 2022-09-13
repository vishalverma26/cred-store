import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialEditComponent } from './credentials/credential-edit/credential-edit.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoComponent } from './todo/todo.component';
import { TodoResolverService } from './todo/todo-resolver.service';
import { CredentialDetailComponent } from './credentials/credential-detail/credential-detail.component';
import { CredentialsResolverService } from './credentials/credentials-resolver.service';
import { CredentialsDeactivateGuard } from './credentials/credentials-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'credentials',
    pathMatch: 'full'
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
    resolve: {
      credentialList: CredentialsResolverService
    },
    children: [
      {
        path: 'new',
        component: CredentialEditComponent,
        canDeactivate: [CredentialsDeactivateGuard]
      },
      {
        path: ':id',
        component: CredentialDetailComponent
      },
      {
        path: ':id/edit',
        component: CredentialEditComponent,
        canDeactivate: [CredentialsDeactivateGuard]
      }
    ]
  },
  {
    path: 'to-do',
    component: TodoComponent,
    resolve: {
      todoList: TodoResolverService
    }
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
