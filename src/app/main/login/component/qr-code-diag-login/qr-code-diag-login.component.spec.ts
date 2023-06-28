import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeDiagLoginComponent } from './qr-code-diag-login.component';

describe('QrCodeDiagLoginComponent', () => {
  let component: QrCodeDiagLoginComponent;
  let fixture: ComponentFixture<QrCodeDiagLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeDiagLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeDiagLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
