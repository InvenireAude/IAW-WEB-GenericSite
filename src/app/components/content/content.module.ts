import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content.routing.module';
import { RouteTransformerDirective } from './route-transformer';
import { UiModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';

import { ContentSortPipe } from '../../filters/content-sort-pipe';

import { PageComponent } from './page/page.component';
import { ArticleComponent } from './article/article.component';
import { ArticleIndexComponent } from './article-index/article-index.component';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostComponent } from './post/post.component';
import { BookComponent } from './book/book.component';
import { BookIndexComponent } from './book-index/book-index.component';
import { BookTocComponent } from './book-toc/book-toc.component';
import { SourceFileComponent } from './source-file/source-file.component';
import { GeneralFilterPipe } from 'src/app/filters/general-filter.pipe';
import { TotalFilterPipe } from 'src/app/filters/total-filter.pipe';

@NgModule({
  declarations: [
    RouteTransformerDirective,
    ContentSortPipe,
    GeneralFilterPipe,
    TotalFilterPipe,
    PageComponent,
    ArticleComponent,
    ArticleIndexComponent,
    PostIndexComponent,
    PostComponent,
    BookComponent,
    BookIndexComponent,
    BookTocComponent,
    SourceFileComponent
  ],
  exports: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    UiModule,
    FormsModule,
    NgbModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContentModule { }
