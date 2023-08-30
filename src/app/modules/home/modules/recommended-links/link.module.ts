import { NgModule } from '@angular/core';

import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { ViewComponent } from './components/view/view.component';
import { LikeRoutes } from './link.routing';
import { RecommendedLinksComponent } from './components/list-links/recommended-links.component';



@NgModule({
  declarations: [
    ViewComponent,
    RecommendedLinksComponent


  ],
  imports: [ DataViewModule,
    LikeRoutes
  ],
  exports: [],

  providers: [],
})
export class LinkModule { }
