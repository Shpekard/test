import { TestBed } from '@angular/core/testing';

import { FormBackgroundService } from './form-background.service';

describe('FormBackgroundService', () => {
  let service: FormBackgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBackgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
