import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderClasses: Subject<string[]> = new Subject();
  currentLoaderClasses: string[] = ['loader-container', 'hidden'];

  constructor() { }

  showLoader(visibility: boolean): object {
    if (visibility) {
      this.currentLoaderClasses = ['loader-container'];
    } else {
      this.currentLoaderClasses = ['loader-container', 'hidden'];
    }

    this.loaderClasses.next(this.currentLoaderClasses);
    return this.currentLoaderClasses;
  }
}
