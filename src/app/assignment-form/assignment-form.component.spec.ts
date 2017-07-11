import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentFormComponent } from './assignment-form.component';

describe('AssignmentFormComponent', () => {
  let component: AssignmentFormComponent;
  let fixture: ComponentFixture<AssignmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
