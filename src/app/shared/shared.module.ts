import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [HeaderComponent, BackButtonComponent, ],
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    BackButtonComponent,
    NgxPaginationModule,
  ],
})
export class SharedModule {}
