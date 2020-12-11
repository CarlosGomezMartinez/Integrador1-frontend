import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionPointAddComponent } from './acquisition-point-add.component';

describe('AcquisitionPointAddComponent', () => {
  let component: AcquisitionPointAddComponent;
  let fixture: ComponentFixture<AcquisitionPointAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionPointAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionPointAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
