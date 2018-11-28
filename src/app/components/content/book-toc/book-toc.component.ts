import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-toc',
  templateUrl: './book-toc.component.html',
  styleUrls: ['./book-toc.component.css']
})

export class BookTocComponent implements OnInit {

  @Input() meta: any;

  constructor() { }

  ngOnInit() {
  }

  open(c) {
    c.open = true;
  }

  close(c) {
    c.open = false;
  }
}
