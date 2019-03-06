import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, TokenStorageService } from './../../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: string;
  public password: string;

  public error: string;

  constructor(private apiService: ApiService,
    private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.apiService.login(this.login, this.password).subscribe(res => {
      if (res.access_token) {
        this.tokenStorageService.setAuthToken(res.access_token);
        this.router.navigate(['accueil']);
      } else if (res.status === 401) {
        this.error = res.message;
      }
    });
  }


}
