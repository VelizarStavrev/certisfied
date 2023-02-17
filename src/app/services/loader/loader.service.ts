import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoaderObservable: Subject<boolean> = new Subject();
  isLoaderVisible: boolean = false;

  showLoader(isLoaderVisible: boolean): boolean {
    this.isLoaderVisible = isLoaderVisible;
    this.showLoaderObservable.next(this.isLoaderVisible);
    return this.isLoaderVisible;
  }
}
