import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionPointComponent } from './acquisition-point.component';

describe('AcquisitionPointComponent', () => {
  let component: AcquisitionPointComponent;
  let fixture: ComponentFixture<AcquisitionPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
