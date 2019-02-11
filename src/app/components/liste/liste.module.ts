import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ListeComponent } from './liste.component';
import { DetailsModule } from './details/details.module';
import { NouveauJoueurModule } from '../nouveau-joueur/nouveau-joueur.module';
import { ApiModule } from './../../modules';

import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,

    NgxSmartModalModule.forChild(),

    DetailsModule,
    ApiModule,
    NouveauJoueurModule
  ],
  declarations: [ListeComponent],
  exports: [ListeComponent]
})
export class ListeModule { }
