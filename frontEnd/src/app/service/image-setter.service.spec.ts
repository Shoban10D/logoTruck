import { TestBed } from '@angular/core/testing';

import { ImageSetterService } from './image-setter.service';

describe('ImageSetterService', () => {
  let service: ImageSetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
