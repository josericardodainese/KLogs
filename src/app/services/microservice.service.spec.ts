import {fakeAsync, TestBed} from '@angular/core/testing';

import {MicroserviceService} from './microservice.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageServiceMock} from '../../tests/mocks/LocalStorageServiceMock';
import {HttpClientMock} from "../../tests/mocks/HttpClientMock";

describe('MicroserviceService', () => {
  let service: MicroserviceService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: LocalStorageService, useClass: LocalStorageServiceMock },
        { provide: HttpClient, useClass: HttpClientMock},
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
