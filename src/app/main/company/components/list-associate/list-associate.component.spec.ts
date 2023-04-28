import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssociateComponent } from './list-associate.component';

describe('ListAssociateComponent', () => {
  let component: ListAssociateComponent;
  let fixture: ComponentFixture<ListAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
