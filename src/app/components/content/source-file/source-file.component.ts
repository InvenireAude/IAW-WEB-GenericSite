import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../../../services/content/content.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-source-file',
  templateUrl: './source-file.component.html',
  styleUrls: ['./source-file.component.css']
})
export class SourceFileComponent implements OnInit {

  public  sub: any;
  public  id: string;
  public  type: string;
  public  content: SafeHtml;
  public  fullUrl;

  constructor(private contentService: ContentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const tmpId: string = params['id'];
      const idx = tmpId.lastIndexOf('.');
      this.type = tmpId.substr(idx + 1);
      this.id = tmpId.substr(0, idx);
      console.log('Source: ' + this.id, idx, this.type, tmpId);

      this.fullUrl = this.id.replace(new RegExp('[\.]', 'g'), '/') + '.' + this.type;

      this.contentService.getSourceFile(this.id, this.type).subscribe(data => {
        this.content = data; // this.sanitizer.bypassSecurityTrustHtml(data);
      });
    });
  }


}
