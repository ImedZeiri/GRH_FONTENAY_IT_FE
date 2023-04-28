import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundLauncherComponent } from './not-found-launcher.component';

describe('NotFoundLauncherComponent', () => {
  let component: NotFoundLauncherComponent;
  let fixture: ComponentFixture<NotFoundLauncherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundLauncherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
