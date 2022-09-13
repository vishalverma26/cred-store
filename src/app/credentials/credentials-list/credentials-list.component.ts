import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Credential } from '../credentials.model';
import { CredentialService } from '../credentials.service';

@Component({
  selector: 'app-credentials-list',
  templateUrl: './credentials-list.component.html',
  styleUrls: ['./credentials-list.component.scss']
})
export class CredentialsListComponent implements OnInit {
  credentialList!: Credential[];

  constructor(private credentialService: CredentialService) { }

  ngOnInit(): void {
    this.credentialList = this.credentialService.getCredentialList();

    this.credentialService.credentialsUpdated.subscribe(list=> {
      this.credentialList = this.credentialService.getCredentialList();
    });
  }

}
