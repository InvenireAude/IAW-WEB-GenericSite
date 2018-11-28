import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTocComponent } from './book-toc.component';

describe('BookTocComponent', () => {
  let component: BookTocComponent;
  let fixture: ComponentFixture<BookTocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
