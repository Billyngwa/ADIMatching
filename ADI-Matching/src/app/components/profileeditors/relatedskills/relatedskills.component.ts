import { Component } from '@angular/core';
import { Firestore, addDoc, collection, doc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/interfaces/skill';
import { LocalstoreService } from 'src/app/services/localstore.service';

@Component({
  selector: 'app-relatedskills',
  templateUrl: './relatedskills.component.html',
  styleUrls: ['./relatedskills.component.scss']
})
export class RelatedskillsComponent {
  skill:Skill = {
    skillName:''
  }
  constructor(
    private dialogRef : MatDialogRef<RelatedskillsComponent>,
    private fire : Firestore,
    private localstore : LocalstoreService
  ){}

  dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email']);
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');
  profileDocref = doc(this.subcoll,'skill');
  profileSubCol = collection(this.profileDocref,'skills');

  add(e:any,skill:Skill){
    console.log(skill);
    // addDoc(this.profileSubCol,skill)

  }
  cancel(e:any,skill:Skill){
    this.dialogRef.close(skill);
  }
}
