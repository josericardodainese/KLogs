import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsDialogComponent} from './settings-dialog.component';
import {MockModule, MockProvider, MockRender, MockService, ngMocks} from "ng-mocks";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../services/local-storage.service";
import {DefaultRenderComponent, MockedComponentFixture} from "ng-mocks/cjs/lib/mock-render/types";

describe('SettingsDialogComponent', () => {
  ngMocks.faster();
  let component: DefaultRenderComponent<SettingsDialogComponent>;
  let fixture: MockedComponentFixture<SettingsDialogComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDialogComponent],
      imports: [
        MockModule(BrowserModule),
        MockModule(ReactiveFormsModule),
        MockModule(FormsModule),
        MockModule(MatFormFieldModule)
      ],
      providers:[
        MockProvider(FormBuilder),
        MockProvider(MatSnackBar),
        MockProvider(MatDialogRef),
        MockProvider(LocalStorageService, {
          find: jest.fn()
        })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('first settings false', () => {

    const data = {"clusterRemoteAddress":"host","nameSpace":"namespace","authToken":"token"};

    const localStorageServiceMock = fixture.point.injector.get(LocalStorageService);
    const localStorageServiceFindSpy = jest.spyOn(localStorageServiceMock, "find");
    localStorageServiceFindSpy.mockReturnValue(data);

    // expect(component.firstSettings).toEqual(false);
    expect(localStorageServiceFindSpy).toBeCalled();
  });
});
