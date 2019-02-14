import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ListeComponent } from './components/liste/liste.component';
import { NouveauJoueurComponent } from './components/nouveau-joueur/nouveau-joueur.component';
const routes: Routes = [
  {
    path: 'accueil',
    canActivate: [AuthGuard],
    component: ListeComponent
  },
  {
    path: 'creer-un-joueur',
    component: NouveauJoueurComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
