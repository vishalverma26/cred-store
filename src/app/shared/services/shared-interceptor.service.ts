import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { DataStorageService } from "./data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SharedInterceptor implements HttpInterceptor {

  constructor(private dataStorageSvc: DataStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.dataStorageSvc.startSpinner();

    return next.handle(req).pipe(finalize(() => {
      this.dataStorageSvc.stopSpinner();
    }));
  }
}
