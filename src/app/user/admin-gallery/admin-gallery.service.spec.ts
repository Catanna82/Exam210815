import { TestBed } from '@angular/core/testing';

import { AdminGalleryService } from './admin-gallery.service';

describe('AdminGalleryService', () => {
  let service: AdminGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
