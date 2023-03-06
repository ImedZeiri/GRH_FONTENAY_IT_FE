import { Component, OnInit } from '@angular/core';
import {SidePanelState} from "../../../../app/core";
import {Subject} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public currentPanelState: SidePanelState;
  public leftStart: string;
  constructor() { }

  ngOnInit(): void {
  }

}
