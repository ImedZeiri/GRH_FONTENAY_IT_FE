import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidePanelService, SidePanelState } from '../../../../app/core';
import { NavigationLink } from './navigation-link.model';
@Component({
  selector: 'app-navigation-side-panel',
  templateUrl: './navigation-side-panel.component.html',
  styleUrls: ['./navigation-side-panel.component.scss']
})
export class NavigationSidePanelComponent implements OnInit, OnDestroy {
  @Input()
  public links: NavigationLink[];

  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  public SidePanelState = SidePanelState;
  opacity: any;

  constructor(private _sidePanelService: SidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService.panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
  }


  public swith() {
    if (this.currentPanelState === SidePanelState.CLOSE || this.currentPanelState === SidePanelState.COLLAPSE) {
      this.opacity = 1;
      return true;
    } else {
      this.opacity = 0;
      return false;
    }
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}


