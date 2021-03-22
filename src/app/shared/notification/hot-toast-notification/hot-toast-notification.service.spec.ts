import { TestBed } from '@angular/core/testing';

import { HotToastNotificationService } from './hot-toast-notification.service';

describe('HotToastNotificationService', () => {
  let service: HotToastNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotToastNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
