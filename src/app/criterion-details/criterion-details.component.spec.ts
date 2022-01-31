import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionDetailsComponent } from './criterion-details.component';

describe('CriterionDetailsComponent', () => {
  let component: CriterionDetailsComponent;
  let fixture: ComponentFixture<CriterionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriterionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
