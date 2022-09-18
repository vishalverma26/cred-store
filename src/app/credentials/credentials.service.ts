import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, tap } from "rxjs";
import { API } from "../shared/api-url";
import { Todo } from "../todo/todo.model";
import { TodoService } from "../todo/todo.service";
import { Credential } from "./credentials.model";

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  private updateCredentialList: Subject<Credential[]> = new Subject();
  public credentialsUpdated: Observable<Credential[]> = this.updateCredentialList.asObservable();
  private _isFormSaved: Subject<boolean> = new Subject();
  public isFormSaved = this._isFormSaved.asObservable();

  credentialsList: Credential[] = [];

  constructor(private todoService: TodoService, private http: HttpClient, private router: Router) {}

  addCredential(name: string, imageUrl: string, description: string, taskList: Todo[]) {
    const newCredential = new Credential(name, imageUrl, description, taskList);
    return this.http.post<{[name: string]: string}>(API.credStore, newCredential).pipe(tap(() => {
      this.credentialsList.push(newCredential);
      this.updateCredentialList.next(this.credentialsList.slice());
      this._isFormSaved.next(true);
      this.router.navigate(['credentials']);
    }));
  }

  editCredential(index: number, credential: Credential) {
    this.credentialsList[index] = { ...credential };
    return this.http.put(API.credStore, this.credentialsList).pipe(tap(() => {
      this.updateCredentialList.next(this.credentialsList);
      this._isFormSaved.next(true);
      this.router.navigate(['credentials']);
    }))
  }

  deleteCredential(index: number) {
    this.credentialsList.splice(index, 1);
    return this.http.put(API.credStore, this.credentialsList).pipe(tap(() => {
      this.updateCredentialList.next(this.credentialsList);
      this.router.navigate(['credentials']);
    }));
  }

  setCredentialList(credList: Credential[]) {
    this.credentialsList = [...credList];
    this.updateCredentialList.next(this.credentialsList);
  }

  getCredentialList(): Credential[] {
    return this.credentialsList.slice();
  }

  getCredential(index: number): Credential {
    return { ...this.credentialsList[index] };
  }

  addtoTodoList(taskName: string, endDate: string) {
    this.todoService.addTask(taskName, endDate);
  }

}
