import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeFormComponent } from './grade-form.component';

describe('GradeFormComponent', () => {
  let component: GradeFormComponent;
  let fixture: ComponentFixture<GradeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
