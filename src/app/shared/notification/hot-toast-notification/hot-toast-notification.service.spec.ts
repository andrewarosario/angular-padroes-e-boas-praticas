import { TestBed } from '@angular/core/testing';
import { HotToastService } from '@ngneat/hot-toast';

import { HotToastNotificationService } from './hot-toast-notification.service';

describe('HotToastNotificationService', () => {
  let service: HotToastNotificationService;
  let hotToastService: HotToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HotToastService
      ]
    });
    service = TestBed.inject(HotToastNotificationService);
    hotToastService = TestBed.inject(HotToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call success with correct value', () => {
    const successSpy = spyOn(hotToastService, 'success');
    service.success('Great!');
    expect(successSpy).toHaveBeenCalledWith('Great!');
  });

  it('should call error with correct value', () => {
    const errorSpy = spyOn(hotToastService, 'error');
    service.error('Fail!');
    expect(errorSpy).toHaveBeenCalledWith('Fail!');
  });
});
