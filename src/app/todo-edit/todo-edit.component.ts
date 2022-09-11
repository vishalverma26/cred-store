import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { editModel, Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  @ViewChild(NgForm) todoForm!: NgForm;
  today: Date = new Date();
  editConfig: editModel = {
    editMode: false
  }
  subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.editConfig.editMode = false;

    this.subscription.add(this.todoService.updateModeActivated.subscribe((index: number) => {
      this.clearForm();
      this.editConfig.editMode = true;
      this.editConfig.editIndex = index;
      this.editConfig.editTask = this.todoService.getTodoItem(index);

      this.todoForm.setValue({
        taskname: this.editConfig.editTask.taskName,
        enddate: this.editConfig.editTask.endDate
      });
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm(form: NgForm) {
    const taskName = form?.value?.taskname;
    const endDate = form?.value?.enddate;
    if(this.editConfig?.editMode && this.editConfig?.editIndex) {
      this.todoService.editTask({ taskName, endDate }, this.editConfig.editIndex);
    } else {
      this.todoService.addTask(taskName, endDate);
    }
    this.clearForm();
  }

  clearForm() {
    this.todoForm.reset();
    this.editConfig = {
      editMode: false
    };
  }

  deleteTask() {
    this.todoService.deleteTask(<number>this.editConfig.editIndex);
    this.clearForm();
  }

}
