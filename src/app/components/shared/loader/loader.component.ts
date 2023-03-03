import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderImg: string = '/assets/icons/loader.svg';
  isLoaderVisible: boolean = false;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this._subscription = this.loaderService.showLoaderObservable.subscribe((value) => {
      this.isLoaderVisible = value;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  
}
