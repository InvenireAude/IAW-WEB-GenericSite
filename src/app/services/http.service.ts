import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/publishReplay';

import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Request,
  Headers,
  XHRBackend
} from '@angular/http';

import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService extends Http {

  constructor(
      backend: XHRBackend,
      defaultOptions: RequestOptions,
      private loaderService: LoaderService
  ) {
      super(backend, defaultOptions);
  }

  cache: any = {};

  call(apiContext: string,
       parameter: string,
       type: string,
       allowCache: boolean) {


    const headers = new Headers({ 'Content-Type': 'application/' + type });
    const options = new RequestOptions({ headers: headers });

    const fullUrl = apiContext + '/' + parameter.replace(new RegExp('[\.]', 'g'), '/') + '.' + type;

   if (!this.cache[fullUrl] || !allowCache) {
     this.showLoader();
     this.cache[fullUrl] = super.get(fullUrl, options)
      .map(
          (res: Response) => (type === 'json') ? res.json() : res.text()
        )
      .catch(this.onCatch)
      .do((res: Response) => {
            this.onSuccess(res);
          }, (error: any) => {
            this.onError(error);
          })
           .finally(() => {
             this.onEnd();
          })
      .publishReplay(1)
      .refCount();
    }

   return this.cache[fullUrl];
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {

       throw error;
  }

  private onSuccess(res: Response): void {
      console.log('Request successful');
  }

  private onError(res: Response): void {
      if (res.status !== undefined) {
        console.log('Error, status code: ' + res.status);
      }
     // this.loaderService.error();
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
      this.loaderService.show();
  }

  private hideLoader(): void {
      this.loaderService.hide();
  }
}

