import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFileComponent } from './source-file.component';

describe('SourceFileComponent', () => {
  let component: SourceFileComponent;
  let fixture: ComponentFixture<SourceFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
