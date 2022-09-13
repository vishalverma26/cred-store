import { Component } from '@angular/core';
import { DataStorageService } from './shared/services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cred-store';
  showSpinner!: boolean;

  constructor(private dataStorageSvc: DataStorageService) {
    this.dataStorageSvc.updateSpinnerStatus.subscribe((spinnerStatus:boolean) => {
      this.showSpinner = spinnerStatus;
    });
  }
}
