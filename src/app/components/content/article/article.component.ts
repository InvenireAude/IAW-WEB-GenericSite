import { Component, OnInit, OnChanges } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../../../services/content/content.service';

import { ActivatedRoute } from '@angular/router';
import { Lexer } from '../book/lexer';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  lexer: Lexer = new Lexer();

  private sub: any;
  private id: string;
  public  content: SafeHtml;

  constructor(private contentService: ContentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('Article: ' + this.id);
      this.contentService.getArticle(this.id).subscribe(data => {
        const afterLexer = this.lexer.dirtyHackIAScript(data);
        this.content = this.sanitizer.bypassSecurityTrustHtml(afterLexer);
      });
    });
  }


}
