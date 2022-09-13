import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<Todo[]> {
  constructor(private dataStorageService: DataStorageService, private todoService: TodoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Todo[] | Observable<Todo[]> | Promise<Todo[]> {
    const todoList = this.todoService.getTodoList();
    if(todoList.length) {
      return todoList;
    } else {
      return this.dataStorageService.fetchTodoList();
    }
  }
}
