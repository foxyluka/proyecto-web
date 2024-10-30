import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rutaProtejidaGuard } from './ruta-protejida.guard';

describe('rutaProtejidaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rutaProtejidaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
