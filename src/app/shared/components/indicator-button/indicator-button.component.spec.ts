import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorButtonComponent } from './indicator-button.component';

describe('IndicatorButtonComponent', () => {
  let component: IndicatorButtonComponent;
  let fixture: ComponentFixture<IndicatorButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
