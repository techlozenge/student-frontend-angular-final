import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassFormComponent } from './student-class-form.component';

describe('StudentClassFormComponent', () => {
  let component: StudentClassFormComponent;
  let fixture: ComponentFixture<StudentClassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentClassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
