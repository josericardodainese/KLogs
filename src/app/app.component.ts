import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MicroserviceService} from "./services/microservice.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SettingsDialogComponent} from "./dialogs/settings-dialog/settings-dialog.component";
import {MatSidenav} from "@angular/material/sidenav";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "./dialogs/snackbar/snackbar.component";
import {MessagesConstants} from "./entities/messages-constants";
import {ErrorTypeEnum} from "./entities/error-type-enum";
import {MessageSnackBar} from "./entities/message-snack-bar";
import SnackBarUtils from "./utils/snack-bar-utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Klogs';
  logData: string[] = [];
  isLoading: boolean = false;
  shouldGetMenuList: boolean = false;
  selectedApplication: string = '';

  dialogRef: MatDialogRef<SettingsDialogComponent>;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private service: MicroserviceService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  getLogsFromIdMicroService(idMicroService: string) {
    this.selectedApplication = idMicroService;
    this.isLoading = true;
    this.service.getLogs(idMicroService)
      .subscribe((log => {
        this.isLoading = false;
        this.logData = this.processLogData(log);
      }), () => {
        if (this.isLoading) {
          this.isLoading = false;

          const message: MessageSnackBar = {message: `${MessagesConstants.ERROR_REQUEST_LOGS} ${idMicroService}`};
          this.openSnackBar(message, ErrorTypeEnum.ERR);


        }
      });
  }

  toolbarMenuHandle() {
    this.openDialog();
  }

  closeSideNav() {
    if (this.sidenav.opened) {
      this.sidenav.close().then()
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(SettingsDialogComponent, {disableClose: true});

    this.dialogRef.afterClosed().subscribe(closed => {
      if (closed === true) {
        this.shouldGetMenuList = true;
        this.toggleSideNav();
      }
    })
  }

  reloadMenuByNameSpace() {
    this.shouldGetMenuList = true;
    this.toggleSideNav();
  }

  toggleSideNav() {
    if (!this.sidenav.opened) {
      this.sidenav.open().then();
    }
  }

  setShouldGetMenuList(shouldGetMenuList: boolean) {
    this.shouldGetMenuList = shouldGetMenuList;
  }

  openSnackBar(message: MessageSnackBar, type: ErrorTypeEnum) {
    const snackBarConfig = SnackBarUtils.getSnackBarConfig(message, type);
    this.snackBar.openFromComponent(SnackbarComponent, snackBarConfig);
  }

  private processLogData = (log: string): string[] => {
    const listOfLog: string[] = [];
    listOfLog.push("<!------------------------------INICIO------------------------------------>");
    listOfLog.push(...log.split("\n"));
    listOfLog.push("<!------------------------------FIM------------------------------------>");
    return listOfLog;
  };
}
