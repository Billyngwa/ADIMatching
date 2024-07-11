import { Component } from '@angular/core';
import { Firestore, addDoc, collection, doc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Website } from 'src/app/interfaces/website';
import { LocalstoreService } from 'src/app/services/localstore.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent {
  website: Website = {
    webUrl:'',
    siteDescription:''
  }
  constructor(
    private dialogRef : MatDialogRef<WebsiteComponent>,
    private fire:Firestore,
    private localstore : LocalstoreService
  ){}

  dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email']);
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');
  profileDocref = doc(this.subcoll,'website');
  profileSubCol = collection(this.profileDocref,'websiteInfo');

  add(e:any, website:Website){
    console.log(website);
    addDoc(this.profileSubCol,website);
  }
  cancel(e:any){
    this.dialogRef.close();
  }
}
