import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ContentService } from './services/content/content.service';
import { HttpService } from './services/http.service';
import { LoaderService } from './services/loader.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UiModule } from './components/ui/ui.module';

import { ContentModule } from './components/content/content.module';
import { ContentRoutingModule } from './components/content/content.routing.module';

export function backendFactory(backend: XHRBackend, defaultOptions: RequestOptions, loaderService: LoaderService) {
  return new HttpService(backend, defaultOptions, loaderService);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    UiModule,
    ContentModule,
    ContentRoutingModule,
    AppRoutingModule
  ],
  providers: [
    ContentService,
    LoaderService,
     {
          provide: HttpService,
          useFactory: backendFactory,
          deps: [XHRBackend, RequestOptions, LoaderService ]
       }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
