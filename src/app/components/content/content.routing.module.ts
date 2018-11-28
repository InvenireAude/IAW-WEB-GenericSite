import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article/article.component';
import { ArticleIndexComponent } from './article-index/article-index.component';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostComponent } from './post/post.component';
import { BookComponent } from './book/book.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { SourceFileComponent } from './source-file/source-file.component';

import { PageComponent } from './page/page.component';

const secondaryRoutes: Routes = [
  { path: 'article',       component: ArticleComponent },
  { path: 'articleIndex',  component: ArticleIndexComponent },
  { path: 'post',          component: PostComponent },
  { path: 'postIndex',     component: PostIndexComponent },
  { path: 'book',          component: BookComponent },
  { path: 'bookIndex',     component: BookIndexComponent },

  { path: 'page',          component: PageComponent },
  { path: 'source',        component: SourceFileComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(secondaryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContentRoutingModule { }

