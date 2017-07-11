import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorClassComponent } from './major-class.component';

describe('MajorClassComponent', () => {
  let component: MajorClassComponent;
  let fixture: ComponentFixture<MajorClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
