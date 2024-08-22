import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssessementComponent } from './student-assessement.component';

describe('StudentAssessementComponent', () => {
  let component: StudentAssessementComponent;
  let fixture: ComponentFixture<StudentAssessementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAssessementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAssessementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
