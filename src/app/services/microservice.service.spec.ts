import {fakeAsync, TestBed} from '@angular/core/testing';

import {MicroserviceService} from './microservice.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {MockProvider} from "ng-mocks";

describe('MicroserviceService', () => {
  let service: MicroserviceService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        MockProvider(LocalStorageService),
        MockProvider(HttpClient),
        MicroserviceService
      ]
    });
    service = TestBed.inject(MicroserviceService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu list with success', fakeAsync(() => {

    const itemMenu = service.getMenuList().subscribe();

    expect(itemMenu).not.toBeNull()
  }));
});
