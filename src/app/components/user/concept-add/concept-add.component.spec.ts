import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptAddComponent } from './concept-add.component';

describe('ConceptAddComponent', () => {
  let component: ConceptAddComponent;
  let fixture: ComponentFixture<ConceptAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
