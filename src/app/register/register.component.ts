import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.error
      .subscribe(err => this.error = err);
  }

}
