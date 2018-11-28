import { Injectable } from '@angular/core';

import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public static CTX_PAGES    = '/content/pages';
  public static CTX_ARTICLES = '/content/articles';
  public static CTX_POSTS    = '/content/posts';
  public static CTX_BOOKS    = '/content/books';
  public static CTX_SOURCE   = '/content/source';
  public static CTX_MENU     = '/content';
  private useCache = true;


  constructor(private httpService: HttpService) {}

  getPage(id: string) {

    const parameter = id;

    return this.httpService.call( ContentService.CTX_PAGES,
                                  parameter,
                                  'html',
                                  this.useCache);
  }

  getArticleIndex() {

    return this.httpService.call( ContentService.CTX_ARTICLES,
                                  'index',
                                  'json',
                                  this.useCache);
  }

  getArticle(id: string) {

    const parameter = id;

    return this.httpService.call( ContentService.CTX_ARTICLES,
                                  parameter,
                                  'html',
                                  this.useCache);
  }

  getPostIndex() {

    return this.httpService.call( ContentService.CTX_POSTS,
                                  'index',
                                  'json',
                                  this.useCache);
  }

  getPost(id: string) {

    const parameter = id;

    return this.httpService.call( ContentService.CTX_POSTS,
                                  parameter,
                                  'html',
                                  this.useCache);
  }

  getBookIndex() {

    return this.httpService.call( ContentService.CTX_BOOKS,
                                  'index',
                                  'json',
                                  this.useCache);
  }

  getBookMetaData(id: string) {

    const parameter = id + '.' + 'book';

    return this.httpService.call( ContentService.CTX_BOOKS,
                                  parameter,
                                  'json',
                                  this.useCache);
  }

  getBookPage(id: string, sid: string) {

    const parameter = id + '/' + sid;

    return this.httpService.call( ContentService.CTX_BOOKS,
                                  parameter,
                                  'html',
                                  this.useCache);
  }

  getSourceFile(id: string, type: string) {

    const parameter = id;

    return this.httpService.call( ContentService.CTX_SOURCE,
                                  parameter,
                                  type,
                                  this.useCache);
  }

  getMenu() {

    return this.httpService.call( ContentService.CTX_MENU,
                                  'mainmenu',
                                  'json',
                                  this.useCache);
  }


}

