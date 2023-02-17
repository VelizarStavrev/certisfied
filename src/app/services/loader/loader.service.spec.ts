import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#showLoader should set the isLoaderVisible value', () => {
    expect(service.isLoaderVisible).toBeFalse();
    
    service.showLoader(true);
    
    expect(service.isLoaderVisible).toBeTrue();
  });
  
  it('#showLoaderObservable should be triggered on value change', () => {
    let expectedObservableValue = false;

    service.showLoaderObservable.subscribe((value) => {
      expect(value).toEqual(expectedObservableValue);
    });

    expectedObservableValue = true;
    service.showLoader(true);

    expectedObservableValue = false;
    service.showLoader(false);
  });
});
