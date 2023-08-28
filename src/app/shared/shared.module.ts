import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengImportsModule } from './imports/primeng-imports/primeng-imports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { LevelStepPipe } from './pipe/level-step.pipe';
import { TranslateI18Module } from '../translate-i18n.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LoadingComponent,
    LevelStepPipe
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
  ],
  exports: [
    PrimengImportsModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    LevelStepPipe,
    TranslateModule
  ]
})
export class SharedModule { }
