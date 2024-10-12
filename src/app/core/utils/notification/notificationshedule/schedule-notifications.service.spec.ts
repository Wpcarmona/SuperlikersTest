import { TestBed } from '@angular/core/testing';

import { ScheduleNotificationsService } from './schedule-notifications.service';

describe('ScheduleNotificationsService', () => {
  let service: ScheduleNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
