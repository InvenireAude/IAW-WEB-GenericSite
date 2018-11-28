import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/content/content.service';

import { TotalFilterPipe } from '../../../filters/total-filter.pipe';

@Component({
  selector: 'app-bookindex',
  templateUrl: './book-index.component.html',
  styleUrls: ['./book-index.component.css']
})


export class BookIndexComponent implements OnInit {

  public books: any;
  public filteredItems: any[];
  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public filter = {
    searchString: null
  };

  public totalFilterPipe: TotalFilterPipe = new TotalFilterPipe();

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getBookIndex().subscribe(data => {
      this.books = data.books;
      this.filteredItems = this.totalFilterPipe.transform(this.books, this.filter.searchString);
      this.length = this.books.length;
      this.page = 1;
    });
  }
  public applyFilters() {
    if (this.books) {
      this.filteredItems = this.totalFilterPipe.transform(this.books, this.filter.searchString);
      this.length = this.filteredItems.length;
      this.page = 1;
    }
  }
}
