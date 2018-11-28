import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../services/content/content.service';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public  menu: any;
  public  homeHtml: SafeHtml = null;

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer, private title: Title) { }

  ngOnInit() {
    this.contentService.getMenu().subscribe(data => {
      this.menu = data;
      this.homeHtml = this.sanitizer.bypassSecurityTrustHtml(data.homeHtml);
      if (this.menu.title !== undefined) {
        this.title.setTitle(this.menu.title);
        console.log(this.menu.title);
      }
    });
  }

}
