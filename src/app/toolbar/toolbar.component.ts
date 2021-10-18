import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalStorageService} from "../services/local-storage.service";
import {Settings} from "../entities/settings";
import {LocalStorageEnum} from "../entities/local-storage-enum";
import {MicroserviceService} from "../services/microservice.service";
import {itemNameSpaceMenu} from "../entities/namespace-item";
import {MessagesConstants} from "../entities/messages-constants";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  selectedNamespace: string = 'Selecione Um NameSpace';
  nameSpaceList: itemNameSpaceMenu[];
  settings: Settings;
  @Input() selectedApplicationIn: string = '';
  @Input() isLoadingIn: boolean;
  @Output() menuState = new EventEmitter();
  @Output() toolbarMenuStateOut = new EventEmitter();
  @Output() nameSpaceStateOut = new EventEmitter();

  constructor(private localStorageService: LocalStorageService,
              private service: MicroserviceService) {
  }

  ngOnInit(): void {
    this.settings = this.localStorageService.find(LocalStorageEnum.SETTINGS);
    if (this.settings == null) {
      this.openSettingsDialog();
    } else {
      this.selectedNamespace = this.settings.nameSpace;
    }

    this.service.getNameSpaces()
      .subscribe((nameSpaceListReceived => {
        this.nameSpaceList = nameSpaceListReceived.items;
      }), () => {
        this.selectedNamespace = MessagesConstants.ERROR_REQUEST_NAMESPACE_LIST
        if (this.isLoadingIn) {
          this.isLoadingIn = false;
        }
      });
  }

  toggleMenu() {
    this.menuState.emit()
  }

  openSettingsDialog() {
    this.toolbarMenuStateOut.emit()
  }

  chageNameSpace(nameSpace: string) {
    this.selectedNamespace = nameSpace;
    this.localStorageService.remove(LocalStorageEnum.SETTINGS);
    this.settings.nameSpace = nameSpace;
    this.localStorageService.add(LocalStorageEnum.SETTINGS, this.settings);
    this.nameSpaceStateOut.emit();
  }
}
