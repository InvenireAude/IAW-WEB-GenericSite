import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/content/content.service';

import { TotalFilterPipe } from '../../../filters/total-filter.pipe';

@Component({
  selector: 'app-articleindex',
  templateUrl: './article-index.component.html',
  styleUrls: ['./article-index.component.css']
})


export class ArticleIndexComponent implements OnInit {

  private articles: any;
  public  filteredItems: any[];
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  public filter = {
    searchString: null
  };

  public totalFilterPipe: TotalFilterPipe = new TotalFilterPipe();

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getArticleIndex().subscribe(data => {
      this.articles = data.articles;
      this.filteredItems = this.totalFilterPipe.transform(this.articles, this.filter.searchString);
      this.length = this.articles.length;
      this.page = 1;
    });
  }
  public applyFilters() {
    if (this.articles) {
      this.filteredItems = this.totalFilterPipe.transform(this.articles, this.filter.searchString);
      this.length = this.filteredItems.length;
      this.page = 1;
    }
  }
}
