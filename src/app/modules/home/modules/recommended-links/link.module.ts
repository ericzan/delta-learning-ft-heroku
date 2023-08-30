import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';

import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { ViewComponent } from './components/view/view.component';
import { LikeRoutes } from './link.routing';
import { RecommendedLinksComponent } from './components/list-links/recommended-links.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { SharedModule } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ViewComponent,
    RecommendedLinksComponent,
    AlertComponent,
    SpinnerComponent


  ],
  imports: [ DataViewModule,
    LikeRoutes,
    CommonModule,
    SharedModule,
    CheckboxModule,
    InputNumberModule,
    CardModule,
    PanelModule,
    TableModule,
    SelectButtonModule,
    DragDropModule ,
    DialogModule
  ],
  exports: [],

  providers: [],
})
export class LinkModule { }
