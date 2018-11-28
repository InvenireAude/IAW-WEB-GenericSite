import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { IasCodeComponent } from './ias-code/ias-code.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    IasCodeComponent
  ],
  exports: [
    LayoutComponent,
    IasCodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot()
  ]
})
export class UiModule { }
