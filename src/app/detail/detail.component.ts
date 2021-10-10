import {Component, Input, OnInit} from '@angular/core';
import {MicroserviceService} from "../services/microservice.service";

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
    console.log(logDataIn)
  }
}
