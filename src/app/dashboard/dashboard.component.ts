import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isEdit: boolean =  false;
  error: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.error
      .subscribe(err => this.error = err);
  }

  signOut() {
    this.authService.SignOut();
  }

  updateProfile(name: string, pic: string) {
    this.authService.updateProfile(name, pic);
    this.isEdit = false;
  }

}
