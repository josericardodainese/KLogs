import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {LocalStorageEnum} from "../../entities/LocalStorageEnum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Settings} from "../../entities/settings";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../snackbar/snackbar.component";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  settingsForm: FormGroup;
  firstSettings: boolean = false;

  constructor(private localStorageService: LocalStorageService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit(): void {
    const settings: Settings = this.localStorageService.find(LocalStorageEnum.SETTINGS);

    if(settings == undefined) {
      this.firstSettings = true;
    }

    this.settingsForm = this.formBuilder.group({
      clusterRemoteAddress: [settings ? settings.clusterRemoteAddress : null , [Validators.required]],
      nameSpace: [settings ? settings.nameSpace : null, Validators.required],
      authToken: [settings ? settings.authToken : null, Validators.required]
    });
  }

  saveSettings() {
    if (!this.settingsForm.valid) {
      return;
    }
    this.localStorageService.add(LocalStorageEnum.SETTINGS, this.settingsForm.value);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message: "Configurações Salvas!!!"},
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000
    });
    this.dialogRef.close(this.firstSettings);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
