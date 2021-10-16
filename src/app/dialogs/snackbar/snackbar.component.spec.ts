import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackbarComponent} from './snackbar.component';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule} from "@angular/material/snack-bar";

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
      ],
      declarations: [SnackbarComponent],
      providers: [{provide: MAT_SNACK_BAR_DATA, useValue: {message: "KLogs"}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.data.message).toBe("KLogs")
  });
});
