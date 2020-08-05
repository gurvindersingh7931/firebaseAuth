import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/services/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";

// var storage = firebase.storage();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isEdit: boolean =  false;
  error: any;
  imageData: any='';
  downloadURL: Observable<string>;
  isUpdating: boolean = false;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit() {
    this.authService.error
      .subscribe(err => this.error = err);
  }

  signOut() {
    this.authService.SignOut();
  }

  onFileSelected(event) {
    /// this.imageData = event;
     this.imageData = event.target.files[0];
   }

  updateProfile(name: string) {
    this.isUpdating = true;
    this.uploadProfilePic().then((url => {
      console.log()
      this.authService.updateProfile(name, url);
      this.isUpdating = false;      
      this.isEdit = false;
    }))
    .catch(err => this.error = err)
  }

  uploadProfilePic(): Promise<any> {
      // this.preLoader  = true;
      return new Promise((resolve, reject)=>{
        var n = Date.now();
        const filePath = `RandomImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`RandomImages/${n}`,  this.imageData);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                if (url !='') {
                  console.log('image uploaded successfully',url)
                    resolve(url);
                }
                else {
                  reject('Image not uploaded');
                }
              });
            })
          )
          .subscribe(url => {
            if (url) {
              console.log('upload url',url);
            }
          });
      })
  }

}
