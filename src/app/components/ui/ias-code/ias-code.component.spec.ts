import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IasCodeComponent } from './ias-code.component';

describe('IasCodeComponent', () => {
  let component: IasCodeComponent;
  let fixture: ComponentFixture<IasCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IasCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IasCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
