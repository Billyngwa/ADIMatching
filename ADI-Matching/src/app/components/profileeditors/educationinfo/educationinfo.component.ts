import { Component } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Academics } from 'src/app/interfaces/academics';
import { LocalstoreService } from 'src/app/services/localstore.service';
MatInputModule
@Component({
  selector: 'app-educationinfo',
  templateUrl: './educationinfo.component.html',
  styleUrls: ['./educationinfo.component.scss']
})
export class EducationinfoComponent {
  education: Academics = {
    school: '',
    program: '',
    startDate: '',
    endDate: '',
    degree: ''
  }

  loader: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<EducationinfoComponent>,
    private fire: Firestore,
    private localstore: LocalstoreService
  ) { }

  dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email']);
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');
  profileDocref = doc(this.subcoll,'edu');
  profileSubCol = collection(this.profileDocref,'education');
   email = this.localstore.get('User').data['email' as keyof object];


  async add(e: any, education: Academics) {

    this.loader = true;
    console.log(education);
     addDoc(this.profileSubCol,education)
     const queryEmail = await getDoc(doc(this.dbRef,this.email))
    console.log(queryEmail.data());
    this.loader = false;
  }
  cancel(e: any,education:Academics) {
    this.dialogRef.close(education);
  }
}
