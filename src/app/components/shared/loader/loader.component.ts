import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderImg: string = '../../../../assets/icons/loader.svg';
  loaderClass: string[] = ['loader-container', 'hidden'];

  _subscription = this.loaderService.loaderClasses.subscribe((value) => {
    this.loaderClass = value;
  });

  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
  
}
