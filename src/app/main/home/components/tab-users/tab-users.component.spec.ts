import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUsersComponent } from './tab-users.component';

describe('TabUsersComponent', () => {
  let component: TabUsersComponent;
  let fixture: ComponentFixture<TabUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
