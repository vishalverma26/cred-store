import { Component, Input, OnInit } from '@angular/core';
import { Credential } from '../../credentials.model';

@Component({
  selector: 'app-credential-item',
  templateUrl: './credential-item.component.html',
  styleUrls: ['./credential-item.component.scss']
})
export class CredentialItemComponent implements OnInit {
  @Input('id') id!: number;
  @Input() credential!: Credential;

  constructor() { }

  ngOnInit(): void {
  }

}
