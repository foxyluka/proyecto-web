import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardsComponent } from './components/cards/cards.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';







@NgModule({
  declarations: [
    NavbarComponent,
    CardsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    AppRoutingModule,
  ],
  exports:[
    NavbarComponent,
    CardsComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
