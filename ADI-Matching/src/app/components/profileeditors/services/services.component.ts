import { Component, Inject, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Service } from 'src/app/interfaces/service';
import { LocalstoreService } from 'src/app/services/localstore.service';
MatFormFieldModule
MatInputModule
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  service:Service = {
    serviceName: ''
  }
  headerDescription:string = '';
   constructor(
    private dialogref : MatDialogRef<ServicesComponent>,
    @Inject(MAT_DIALOG_DATA) data:any,
    private fire: Firestore,
    private localstore:LocalstoreService
   ){
    this.headerDescription = data
   }

   dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email']);
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');
  profileDocref = doc(this.subcoll,'service');
  profileSubCol = collection(this.profileDocref,'services');

   cancel(e:any,service:Service){
    this.dialogref.close(service);
   }
   add(e:any, service:Service){
    addDoc(this.profileSubCol,service);
   }
}
