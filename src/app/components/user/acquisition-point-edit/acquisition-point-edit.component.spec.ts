import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionPointEditComponent } from './acquisition-point-edit.component';

describe('AcquisitionPointEditComponent', () => {
  let component: AcquisitionPointEditComponent;
  let fixture: ComponentFixture<AcquisitionPointEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionPointEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionPointEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
