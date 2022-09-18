import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgModel } from "@angular/forms";
import { map, Subject, tap } from "rxjs";
import { CredentialService } from "src/app/credentials/credentials.service";
import { Todo } from "src/app/todo/todo.model";
import { TodoService } from "src/app/todo/todo.service";
import { API } from "../api-url";
import { Credential } from './../../credentials/credentials.model';

NgModel

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private spinnerStatus: Subject<boolean> = new Subject();
  public updateSpinnerStatus = this.spinnerStatus.asObservable();

  constructor(private http: HttpClient, private todoService: TodoService, private credSvc: CredentialService) {}

  startSpinner() {
    this.spinnerStatus.next(true);
  }

  stopSpinner() {
    this.spinnerStatus.next(false);
  }

  fetchTodoList() {
    return this.http.get<Todo[]>(API.todoList).pipe(tap(todoList => {
      this.todoService.setTodoList(todoList);
    }));
  }

  fetchCredentialList() {
    return this.http.get<{ [name: string]: Credential }>(API.credStore).pipe(map(response => {
      let credList: Credential[] = [];

      for(let listItem in response) {
        credList.push({ ...response[listItem] });
      }

      credList =  credList?.map((listItem: Credential) => {
        return { ...listItem, taskList: listItem?.taskList?.length ? listItem.taskList : [] }
      });

      this.credSvc.setCredentialList(credList);
      return credList;
    }));
  }
}
