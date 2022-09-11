import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  addEditTask: Subject<Todo[]> = new Subject();
  updateModeActivated: Subject<number> = new Subject();

  todoList: Todo[] = [
    {
      taskName: 'Angular',
      endDate: '2022-09-20'
    },
    {
      taskName: 'RXJS',
      endDate: '2022-09-12'
    }
  ];

  getTodoList() {
    return this.todoList.slice();
  }

  addTask(taskName: string, endDate: string) {
    this.todoList.push({ taskName, endDate });
    this.addEditTask.next(this.todoList.slice());
  }

  updateTaskInitialized(index: number) {
    this.updateModeActivated.next(index);
  }

  getTodoItem(index: number) {
    return { ...this.todoList[index] };
  }

  deleteTask(index: number) {
    this.todoList.splice(index, 1);
    this.addEditTask.next([...this.todoList]);
  }

  editTask(task: Todo, index: number) {
    this.todoList[index] = task;
    this.addEditTask.next([...this.todoList]);
  }
}
