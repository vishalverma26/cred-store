import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

}
