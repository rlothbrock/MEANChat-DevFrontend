import { TestBed } from '@angular/core/testing';

import { MessageManagerServiceService } from './message-manager-service.service';

describe('MessageManagerServiceService', () => {
  let service: MessageManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
