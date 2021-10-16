import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {LocalStorageEnum} from "../../entities/local-storage-enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Settings} from "../../entities/settings";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../snackbar/snackbar.component";
import {MessageSnackBar} from "../../entities/message-snack-bar";
import {ErrorTypeEnum} from "../../entities/error-type-enum";
import SnackBarUtils from "../../utils/snack-bar-utils";

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

    if (settings == undefined) {
      this.firstSettings = true;
    }

    this.settingsForm = this.formBuilder.group({
      clusterRemoteAddress: [settings ? settings.clusterRemoteAddress : null, [Validators.required]],
      nameSpace: [settings ? settings.nameSpace : 'default', Validators.required],
      authToken: [settings ? settings.authToken : null, Validators.required]
    });
  }

  saveSettings() {
    if (!this.settingsForm.valid) {
      return;
    }
    this.localStorageService.add(LocalStorageEnum.SETTINGS, this.settingsForm.value);
    const message: MessageSnackBar = {message: "Configurações Salvas!!!"};
    this.openSnackBar(message, ErrorTypeEnum.INFO);
    this.dialogRef.close(this.firstSettings);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  openSnackBar(message: MessageSnackBar, type: ErrorTypeEnum) {
    const snackBarConfig = SnackBarUtils.getSnackBarConfig(message, type);
    this.snackBar.openFromComponent(SnackbarComponent, snackBarConfig);
  }
}
