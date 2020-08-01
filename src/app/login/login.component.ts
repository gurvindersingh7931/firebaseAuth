import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.error
      .subscribe(err => this.error = err);
  }

  login(username, password){
    this.authService.SignIn(username, password);
  }
  

}
