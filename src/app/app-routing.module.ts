import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CredentialDetailComponent } from './credentials/credential-detail/credential-detail.component';
import { CredentialEditComponent } from './credentials/credential-edit/credential-edit.component';
import { CredentialsDeactivateGuard } from './credentials/credentials-deactivate-guard.service';
import { CredentialsResolverService } from './credentials/credentials-resolver.service';
import { CredentialsComponent } from './credentials/credentials.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TodoResolverService } from './todo/todo-resolver.service';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(module =>  module.AuthModule)
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
    resolve: {
      credentialList: CredentialsResolverService
    },
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
