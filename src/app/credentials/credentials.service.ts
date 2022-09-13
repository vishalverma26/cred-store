import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
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

  credentialsList: Credential[] = [];

  constructor(private todoService: TodoService, private http: HttpClient, private router: Router) {}

  addCredential(name: string, imageUrl: string, description: string, taskList: Todo[]) {
    const newCredential = new Credential(name, imageUrl, description, taskList);
    this.http.post<{[name: string]: string}>(API.credStore, newCredential).subscribe(() => {
      this.credentialsList.push(newCredential);
      this.updateCredentialList.next(this.credentialsList.slice());
      this.router.navigate(['credentials'])
    })
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



}
