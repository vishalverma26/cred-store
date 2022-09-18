import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, Subject, throwError } from "rxjs";
import { API } from "../shared/api-url";
import { Todo } from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  addEditTask: Subject<Todo[]> = new Subject();
  updateModeActivated: Subject<number> = new Subject();

  constructor(private http: HttpClient) {}

  private todoList: Todo[] = [];

  getTodoList() {
    return this.todoList?.slice();
  }

  setTodoList(todoList: Todo[]) {
    this.todoList = [ ...todoList ];
    this.addEditTask.next(this.todoList);
  }

  addTask(taskName: string, endDate: string) {
    this.http.put(API.todoList, this.todoList).subscribe(() => {
      this.todoList.push({ taskName, endDate });
      this.addEditTask.next(this.todoList.slice());
    });
  }

  updateTaskInitialized(index: number) {
    this.updateModeActivated.next(index);
  }

  getTodoItem(index: number) {
    return { ...this.todoList[index] };
  }

  deleteTask(index: number) {
    if(!index) return null;

    let api = API.delete + index + '.json';
    return this.http.delete(api).pipe(map(response => {
      this.todoList.splice(index, 1);
      this.addEditTask.next([...this.todoList]);
    }));
  }

  editTask(task: Todo, index: number) {
    this.http.put(API.todoList, this.todoList).subscribe(() => {
      this.todoList[index] = task;
      this.addEditTask.next([...this.todoList]);
    });
  }
}
