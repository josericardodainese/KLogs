import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from "../services/local-storage.service";
import {Settings} from "../entities/settings";
import {LocalStorageEnum} from "../entities/LocalStorageEnum";
import {MicroserviceService} from "../services/microservice.service";
import {itemMenu, NameSpaceItem} from "../entities/namespace-item";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private service: MicroserviceService) { }

  selectedNamespace: string = 'default';
  nameSpaceList: itemMenu[];
  settings: Settings;


  @Output() menuState = new EventEmitter();
  @Output() toolbarMenuStateOut = new EventEmitter();
  @Output() nameSpaceStateOut = new EventEmitter();

  ngOnInit(): void {
    this.settings = this.localStorageService.find(LocalStorageEnum.SETTINGS);
    if(this.settings == null){
      this.openSettingsDialog();
    } else {
      this.selectedNamespace = this.settings.nameSpace;
    }

    this.service.getNameSpaces()
      .subscribe((nameSpaceListReceived => {
        this.nameSpaceList = nameSpaceListReceived.items;
      }));
  }

  toggleMenu() {
    this.menuState.emit()
  }

  openSettingsDialog(){
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
