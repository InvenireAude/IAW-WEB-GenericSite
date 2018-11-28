import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoaderState } from './loader';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor(private router: Router) { }

  show() {
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  hide() {
    this.loaderSubject.next(<LoaderState>{show: false});
  }

  error() {
    this.loaderSubject.next(<LoaderState>{show: false});
    this.router.navigate(['/pageNotFound']);
  }
}
