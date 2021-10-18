import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MockComponent, MockModule, MockProvider} from "ng-mocks";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {DetailComponent} from "./detail/detail.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarComponent} from "./dialogs/snackbar/snackbar.component";
import {SettingsDialogComponent} from "./dialogs/settings-dialog/settings-dialog.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockModule(RouterTestingModule),
        MockModule(MatSidenavModule),
        MockModule(MatListModule),
        MockModule(MatToolbarModule),
        MockModule(MatSelectModule),
        MockModule(MatDialogModule),
        MockModule(HttpClientModule),
      ],
      declarations: [
        MockComponent(ToolbarComponent),
        MockComponent(SidenavComponent),
        MockComponent(DetailComponent),
        MockComponent(SnackbarComponent),
        MockComponent(SettingsDialogComponent),
        AppComponent
      ],
      providers: [
        MockProvider(MatSnackBar)
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Klogs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Klogs');
  });
});
