import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';

@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
  ],
  exports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
  ]
})
export class SharedModule { }
