import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SidePanelService, SidePanelState} from '../../../../app/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  menuIcon : any;
  color: string;
  constructor(private _sidePanelService: SidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }
  ngOnInit(): void {
    this.menuIcon='apps'
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
    this.color = Math.floor(0x1000000 * Math.random()).toString(16);
    this.color = '#' + ('000000' + this.color).slice(-6);
  }
  public handleSingleClick(): void {
    console.log('single click');
    if (this.currentPanelState === SidePanelState.CLOSE || this.currentPanelState === SidePanelState.COLLAPSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
      console.log(this.currentPanelState);
      this.menuIcon='apps';
    } else {
      this._sidePanelService.changeState(SidePanelState.COLLAPSE);
      console.log(this.currentPanelState);
      this.menuIcon='menu';
    }
  }
  public handleDoubleClick(): void {
    console.log('double click');
    if (this.currentPanelState === SidePanelState.CLOSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN)
    } else {
      this._sidePanelService.changeState(SidePanelState.CLOSE);
    }
  }

  getUsername(){
      return JSON.stringify(localStorage.getItem('username'));
  }
  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
