import {Component, ViewChild} from '@angular/core';
import {MicroserviceService} from "./services/microservice.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SettingsDialogComponent} from "./dialogs/settings-dialog/settings-dialog.component";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Klogs';
  logData: string[] = [];
  isLoading: boolean = false;
  shouldGetMenuList: boolean = false;
  selectedApplication: string =  '';

  dialogRef: MatDialogRef<SettingsDialogComponent>;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private service: MicroserviceService,
              private dialog: MatDialog) {}

  getLogsFromIdMicroService(idMicroService: string) {
    this.selectedApplication = idMicroService;
    this.isLoading = true;
    this.service.getLogs(idMicroService)
      .subscribe((log => {
        this.isLoading = false;
        this.logData = this.processLogData(log);
      }));
  }

  private processLogData = (log: string) : string[] => {
    const listOfLog: string[] = [];
    listOfLog.push("<!------------------------------INICIO------------------------------------>");
    listOfLog.push(...log.split("\n"));
    listOfLog.push("<!------------------------------FIM------------------------------------>");
    return listOfLog;
  };

  toolbarMenuHandle() {
    this.openDialog();
  }

  closeSideNav() {
    if(this.sidenav.opened) {
      this.sidenav.close().then()
    }
  }

  openDialog() {
   this.dialogRef = this.dialog.open(SettingsDialogComponent, {disableClose:true});

    this.dialogRef.afterClosed().subscribe(closed => {
      if(closed === true) {
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
    if(!this.sidenav.opened) {
      this.sidenav.open().then();
    }
  }

  setShouldGetMenuList(shouldGetMenuList: boolean) {
    this.shouldGetMenuList = shouldGetMenuList;
  }
}
