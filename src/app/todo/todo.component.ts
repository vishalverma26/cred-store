import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  todoList!: any;
  error!: any | null;
  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.todoList = this.todoService.getTodoList();
    
    this.subscriptions.add(this.todoService.addEditTask.subscribe((taskList: Todo[]) => {
      this.todoList = taskList;
    }));

    // this.activatedRoute.data.pipe(map((data: Data) => {
    //   return data['todoList'];
    // })).subscribe(response => {
    //   if(response?.error) {
    //     this.error = response.error;
    //   } else {
    //     this.todoList = response;
    //   }
    // });
  }

  updateTaskInitialized(index: number) {
    this.todoService.updateTaskInitialized(index);
  }
}
