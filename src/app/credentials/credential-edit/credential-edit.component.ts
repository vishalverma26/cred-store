import { Component, OnInit, SimpleChange } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/todo/todo.model';
import { Credential } from '../credentials.model';
import { CredentialService } from '../credentials.service';

@Component({
  selector: 'app-credential-edit',
  templateUrl: './credential-edit.component.html',
  styleUrls: ['./credential-edit.component.scss']
})
export class CredentialEditComponent implements OnInit {

  credentialForm!: FormGroup;
  private editIndex!: number | string;
  private editMode!: boolean;
  private isFormSubmitted!: boolean;

  constructor(private credentialSvc: CredentialService, private activatedRoute: ActivatedRoute) { }


  get taskList() {
    return (<FormArray>this.credentialForm.get('taskList')).controls;
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.editIndex = params['id'],
        this.editMode = this.editIndex != null;

      this.initForm();
    });

    this.credentialSvc.isFormSaved.subscribe(response => {
      this.isFormSubmitted = response;
    })
  }

  private initForm() {
    let credentialName = null;
    let imageUrl = null;
    let description = null;
    let taskList = new FormArray<FormGroup>([]);

    // if edit mode then we need to update the values
    if (this.editMode) {
      const editCredential = this.credentialSvc.getCredential(<number>this.editIndex);
      credentialName = editCredential.credentialName;
      imageUrl = editCredential.imageUrl;
      description = editCredential.description;

      if (editCredential.taskList?.length) {
        for (let task of editCredential.taskList) {
          taskList.push(
            new FormGroup({
              taskName: new FormControl(task.taskName, [Validators.required]),
              endDate: new FormControl(task.endDate, [Validators.required, this.minDate.bind(this)])
            })
          )
        }
      }
    }


    this.credentialForm = new FormGroup({
      credentialName: new FormControl(credentialName, [Validators.required]),
      imageUrl: new FormControl(imageUrl, [Validators.required]),
      description: new FormControl(description),
      taskList: taskList
    });
  }

  onAddTask() {
    const task = new FormGroup({
      taskName: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required, this.minDate.bind(this)])
    });

    (<FormArray>this.credentialForm.get('taskList')).push(task);

  }

  submitCredentialForm() {
    const { credentialName, imageUrl, description, taskList }: Credential = { ...this.credentialForm.value };
    if(!this.editMode) {
      this.credentialSvc.addCredential(credentialName, imageUrl, description, <Todo[]>taskList).subscribe();
    } else {
      this.credentialSvc.editCredential(<number>this.editIndex, this.credentialForm.value).subscribe(() => {
        this.editIndex = '';
        this.editMode = false;
      });
    }
  }

  deleteCredential(i: number) {
    (<FormArray>this.credentialForm.get('taskList')).removeAt(i);
  }

  private minDate(control: AbstractControl): { [s: string]: boolean } | null {
    const calendarDate = new Date(control.value)
    if (calendarDate < new Date()) {
      return { minDate: true }
    }
    return null;
  }


  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {

    if(this.isFormSubmitted) return true;

    if (this.credentialForm.dirty) {
      return confirm('Are you sure you want to move without saving ?');
    }

    return true;
  }

}
