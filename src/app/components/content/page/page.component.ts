import { Component, OnInit, OnChanges } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../../../services/content/content.service';
import { Lexer } from '../book/lexer';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnChanges {
  lexer: Lexer = new Lexer();
  public  sub: any;
  public  id: string;
  public  content: SafeHtml;

  constructor(private contentService: ContentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('Page: ' + this.id);
      this.contentService.getPage(this.id).subscribe(data => {
        const afterLexer = this.lexer.dirtyHackIAScript(data);
        this.content = this.sanitizer.bypassSecurityTrustHtml(data);
      });
    });
  }

  ngOnChanges() {
    console.log('changes?');
  }
}
