import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MicroserviceService} from "../services/microservice.service";
import {itemMenu} from "../entities/menu-item";
import {LocalStorageService} from "../services/local-storage.service";
import {LocalStorageEnum} from "../entities/local-storage-enum";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() idMicroServiceOut = new EventEmitter();
  @Output() menuStateOut = new EventEmitter();
  menuList: itemMenu[] = [];
  menuFavoriteList: string[] = [];
  filterTerm: string = ''
  @Output() shouldGetMenuListOut = new EventEmitter();

  constructor(private service: MicroserviceService,
              private localStorageService: LocalStorageService) {

    const favoriteList = localStorageService.find(LocalStorageEnum.FAV)

    if (favoriteList) {
      this.menuFavoriteList = favoriteList;
    }
  }

  @Input()
  public set shouldGetMenuListIn(shouldGetMenuListIn: boolean) {
    if (shouldGetMenuListIn) {
      this.getMenuList();
    }
  }

  ngOnInit(): void {
    this.getMenuList();
  }

  showDetail(ms: string) {
    this.idMicroServiceOut.emit(ms);
    this.menuStateOut.emit();
  }

  getMenuList() {
    this.service.getMenuList()
      .subscribe((menuListReceived => {
        this.menuList = menuListReceived.items;
        this.shouldGetMenuListOut.emit(false);
      }));
  }

  addFavoriteList(ms: string) {
    this.menuFavoriteList.push(ms);
    this.localStorageService.add(LocalStorageEnum.FAV, this.menuFavoriteList);
  }

  removeFavoriteList(ms: string) {
    const id = this.menuFavoriteList.indexOf(ms);
    this.menuFavoriteList.splice(id, 1);
    this.localStorageService.add(LocalStorageEnum.FAV, this.menuFavoriteList);
  }

  isFavorite(ms: string): boolean {
    return this.menuFavoriteList && this.menuFavoriteList.indexOf(ms) != -1;
  }
}
