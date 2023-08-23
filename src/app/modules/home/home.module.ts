import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutes } from './home.routing';
import { MainComponent } from './components/main/main.component';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutes
  ]
})
export class HomeModule { }
