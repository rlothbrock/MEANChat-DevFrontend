import { TestBed } from '@angular/core/testing';

import { UserModel } from './user.model';

describe('Cur.Log.Usr.Dat.MngrService', () => {
  let service: Cur.Log.Usr.Dat.MngrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cur.Log.Usr.Dat.MngrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
