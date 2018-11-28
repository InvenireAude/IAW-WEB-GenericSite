import { Component, OnInit, OnChanges } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../../../services/content/content.service';
import { Lexer } from '../book/lexer';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
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
      console.log('Post: ' + this.id);
      this.contentService.getPost(this.id).subscribe(data => {
        const afterLexer = this.lexer.dirtyHackIAScript(data);
        this.content = this.sanitizer.bypassSecurityTrustHtml(afterLexer);
      });
    });
  }

}
