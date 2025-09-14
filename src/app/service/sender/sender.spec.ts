import { TestBed } from '@angular/core/testing';

import { Sender } from './sender';

describe('Sender', () => {
  let service: Sender;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sender);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
