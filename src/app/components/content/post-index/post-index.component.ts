import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/content/content.service';

import { TotalFilterPipe } from '../../../filters/total-filter.pipe';

@Component({
  selector: 'app-postindex',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})


export class PostIndexComponent implements OnInit {

  public posts: any;
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
    this.contentService.getPostIndex().subscribe(data => {
      this.posts = data.posts;
      this.filteredItems = this.totalFilterPipe.transform(this.posts, this.filter.searchString);
      this.length = this.posts.length;
      this.page = 1;
    });
  }
  public applyFilters() {
    if (this.posts) {
      this.filteredItems = this.totalFilterPipe.transform(this.posts, this.filter.searchString);
      this.length = this.filteredItems.length;
      this.page = 1;
    }
  }
}
