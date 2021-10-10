import {Component, Input, OnInit} from '@angular/core';

// Código do Electron
import {ipcRenderer} from "electron";


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() logDataIn: string[] = []
  @Input() isLoadingIn: boolean = true;

  constructor() { }
  ngOnInit(): void {}

  downloadLogFile(logDataIn: string[]) {
    // ipcRenderer.send('renderer/salvar_log_file', logDataIn);
  }
}
