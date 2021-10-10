import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {itemMenu, MenuItem} from "../entities/menu-item";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageEnum} from "../entities/LocalStorageEnum";
import {Settings} from "../entities/settings";
import {NameSpaceItem} from "../entities/namespace-item";

@Injectable({
  providedIn: 'root'
})
export class MicroserviceService {

  settings: Settings;

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) {
    this.fillConnectionData();
  }

  getMenuList(): Observable<MenuItem> {

    this.fillConnectionData();

    if (this.settings != undefined) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.settings.authToken}`)

      return this.httpClient.get<MenuItem>(this.settings.clusterRemoteAddress + `/api/v1/namespaces/${this.settings.nameSpace}/pods`, {headers: headers})
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }

    return MicroserviceService.getDefault("Nenhum Aplicação Encontrada Verifique as Configurações");
  }

  getNameSpaces(): Observable<NameSpaceItem> {

    if (this.settings == undefined) {
      this.fillConnectionData();
    }

    if (this.settings != undefined) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.settings.authToken}`)

      return this.httpClient.get<NameSpaceItem>(this.settings.clusterRemoteAddress + `/api/v1/namespaces`, {headers: headers})
        .pipe(
          retry(2),
          catchError(this.handleError)
        );
    }

    return MicroserviceService.getDefault("Sem Namespace");
  }

  public static getDefault(msg: string) {
    const itemMenu: itemMenu = {
      metadata: {
        name: msg
      }
    }
    const menu: MenuItem = {
      items: [itemMenu]
    }
    return of(menu);
  }

  getLogs(ms: string): Observable<string> {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.settings.authToken}`)

    return this.httpClient.get<string>(this.settings.clusterRemoteAddress + `/api/v1/namespaces/${this.settings.nameSpace}/pods/${ms}/log?tailLines=100`, {
      headers: headers,
      responseType: "text" as 'json'
    })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  };

  private fillConnectionData() {
    const settingsStorage: Settings = this.localStorageService.find(LocalStorageEnum.SETTINGS);
    if (settingsStorage) {
      this.settings = settingsStorage;
    }
  }

}
