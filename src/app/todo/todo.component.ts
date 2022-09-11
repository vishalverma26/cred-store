import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  todoList!: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.subscriptions.add(this.todoService.addEditTask.subscribe((taskList: Todo[]) => {
      this.todoList = taskList;
    }));

    this.todoList = this.todoService.getTodoList();
  }

  updateTaskInitialized(index: number) {
    this.todoService.updateTaskInitialized(index);
  }

}
