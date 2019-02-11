import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Joueur } from './../../models';
import { ApiService } from './../../services';

import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit, AfterViewInit {
  public joueurs: Joueur[] = [];
  public selected: Joueur;
  public openDetail = false;
  public filterPoste: string;
  public filterFirstName: string;

  public editedJoueur: Joueur;
  public openEdit = false;

  public page = 1;
  public limit = 10;

  constructor(public ngxSmartModalService: NgxSmartModalService, private apiService: ApiService) { }

  ngOnInit() {
    this.loadJoueurs();
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('detailsModal').onAnyCloseEventFinished.subscribe(() => {
      this.selected = null;
      this.openDetail = false;
    });

    this.ngxSmartModalService.getModal('editPlayer').onAnyCloseEventFinished.subscribe(() => {
      this.openEdit = false;
      this.editedJoueur = null;
    });
  }

  loadJoueurs() {
    this.apiService.getData(this.filterPoste, this.filterFirstName, this.page, this.limit).subscribe(response => {
      this.joueurs = response;
    });
  }

  public select(j: Joueur) {
    this.ngxSmartModalService.open('detailsModal');
    this.openDetail = this.openDetail && this.selected !== j ? this.openDetail : !this.openDetail;
    this.selected = j;
  }

  public setPresentState(event) {
    const id = this.joueurs.findIndex(j => j.id === this.selected.id);
    this.joueurs[id].absent = event;
  }

  public openEditForm(j?: Joueur) {
    if (j) {
      this.editedJoueur = j;
    }
    this.openEdit = true;
    this.ngxSmartModalService.open('editPlayer');
  }

}
