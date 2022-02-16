import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignmentDetailsComponent } from './user-assignment-details.component';

describe('UserAssignmentDetailsComponent', () => {
  let component: UserAssignmentDetailsComponent;
  let fixture: ComponentFixture<UserAssignmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssignmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
