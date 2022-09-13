import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { Credential } from "./credentials.model";
import { CredentialService } from "./credentials.service";

@Injectable({
  providedIn: 'root'
})
export class CredentialsResolverService implements Resolve<Credential[]> {
  constructor(private dataStorateSvc: DataStorageService, private credSvc: CredentialService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Credential[]> | Credential[] {
    const credList = this.credSvc.getCredentialList();
    if(credList.length) {
      return credList;
    } else {
      return this.dataStorateSvc.fetchCredentialList();
    }
  }
}
