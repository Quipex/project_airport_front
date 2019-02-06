import {TestBed} from '@angular/core/testing';

import {BookedSeatsService} from './booked-seats.service';

describe('BookedSeatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookedSeatsService = TestBed.get(BookedSeatsService);
    expect(service).toBeTruthy();
  });
});
