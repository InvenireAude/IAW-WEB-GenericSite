import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment, UrlTree } from '@angular/router';

@Directive({
  selector: '[appRouteTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  public onClick(event) {
    console.log('Event:' + event.target.tagName);
    if (event.target.tagName === 'A') {
      const href: string = event.target.getAttribute('href');

      if (href.indexOf('http') === 0) {
        window.open(href, '_self');
        return;
      }

      const tree: UrlTree = this.router.parseUrl(href);
      const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      const s: UrlSegment[] = g.segments;
      console.log(tree.root, JSON.stringify(s));
      this.router.navigate([s[0].path, s[0].parameters]);
      // this.router.navigate([event.target.getAttribute('href')]);

      event.preventDefault();
    } else {
      return;
    }
  }

  /*   @HostListener('click', ['$event.target']) onClick($event) {
      console.log('clicked: ' + $event.getAttribute('data-link'));
      const goRoute = $event.getAttribute('data-link');
      this.router.navigate([goRoute]);

      }
   */
}
