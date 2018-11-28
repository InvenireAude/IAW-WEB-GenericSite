import { Component, OnInit, OnChanges } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../../../services/content/content.service';
import { Lexer } from './lexer';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  lexer: Lexer = new Lexer();

  public  sub: any;
  public  id: string;
  public  sid: string;

  public  prevSid: string;
  public  nextSid: string;

  public  selectedChapter: any;
  public  selectedSection: any;

  public  meta: any = {
    chapters: []
  };
  public  content: SafeHtml;


  constructor(private contentService: ContentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('Book: ' + this.id);
      this.content = null;
      this.contentService.getBookMetaData(this.id).subscribe(data => {
        this.meta = data;
        this.meta.id = this.id;

        if (params['sid'] !== undefined) {
          this.sid = params['sid'];
        } else {
          this.sid = this.meta.chapters[0].sections[0].id;
        }
        this.contentService.getBookPage(this.id, this.sid).subscribe(contentData => {
          const afterLexer = this.lexer.dirtyHackIAScript(contentData);
          this.content = this.sanitizer.bypassSecurityTrustHtml(afterLexer);
        });

        this.prevSid = null;
        this.nextSid = null;

        this.meta.chapters.forEach(c => {
          let lastSid = null;
          let setNextSid = false;
          c.sections.forEach(s => {
            if (s.id === this.sid) {
              s.selected = true;
              c.open = true;
              this.prevSid = lastSid;
              setNextSid = true;
              this.selectedChapter = c;
              this.selectedSection = s;
            } else {
              lastSid = s.id;
              if (setNextSid) {
                setNextSid = false;
                this.nextSid = s.id;
              }

            }
          });
        });

      });
    });
  }

}
