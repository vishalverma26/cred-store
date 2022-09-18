import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Todo } from 'src/app/todo/todo.model';
import { Credential } from '../credentials.model';
import { CredentialService } from '../credentials.service';

@Component({
  selector: 'app-credential-detail',
  templateUrl: './credential-detail.component.html',
  styleUrls: ['./credential-detail.component.scss']
})
export class CredentialDetailComponent implements OnInit {

  credId!: number;
  credential!: Credential;

  constructor(private credentialSvc: CredentialService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.credId = +params['id'];
      this.credential = this.credentialSvc.getCredential(this.credId);
    });
  }

  deleteCredential() {
    this.credentialSvc.deleteCredential(this.credId).subscribe();
  }

  addtoTodoList() {
    let taskList = [ ...<Todo[]>this.credential.taskList ];
    if(taskList.length) {
      for(let task of taskList) {
        this.credentialSvc.addtoTodoList(task.taskName, task.endDate);
      }
    }
  }
}
