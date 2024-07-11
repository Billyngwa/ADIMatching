import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { MatFabButton } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalstoreService } from 'src/app/services/localstore.service';
import { MatchService } from 'src/app/services/match.service';
import { EducationinfoComponent } from '../profileeditors/educationinfo/educationinfo.component';
import { ContactinfoComponent } from '../profileeditors/contactinfo/contactinfo.component';
import { RelatedskillsComponent } from '../profileeditors/relatedskills/relatedskills.component';
import { ServicesComponent } from '../profileeditors/services/services.component';
import { WebsiteComponent } from '../profileeditors/website/website.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userinfoFromfirestore: any = [];
  logins: any

  matdialogVal: any = {
    education: {
      school: '',
      program: '',
      startDate: '',
      endDate: '',
      degree: ''
    },
    skill: {
      skillName: ''
    },
    services: {
      serviceName: ''
    },
    website: {
      webUrl: '',
      siteDescription: ''
    }
  };

profile:Array<object> = []; 
  constructor(
    private fire: Firestore,
    private localstore: LocalstoreService,
    private matchservice: MatchService,
    private route: Router,
    private dialog: MatDialog
  ) {

    matchservice.emmitLogins.subscribe((login => {
      this.logins = login;

    }))


    
      // const queryEmail = await getDocs(query(this.dbRef, where('email', '==', this.email['id'])))

      // queryEmail.docs.forEach(doci =>{
      //   console.log(doci.data());
        
      // })

  }

  ngOnInit(): void {
    (async ()=>{
      const queryEmail = await getDoc(doc(this.dbref,this.email));

      if(queryEmail.exists()){
        console.log(queryEmail.data());
        
      }
      else{
        console.log('No such Document');
        
      }

    })()

  }
  //Initialisation of firestore variables 
  dbrefUsers = collection(this.fire, 'Users');
  docRef = doc(this.dbrefUsers, this.localstore.get('User').data['email']);
  userSubcol = collection(this.docRef, "profile")
  requestCollection = collection(this.fire, 'Match_Request');
  dbref = collection(this.fire, 'ConfirmedUsers');
  email = this.localstore.get('User').data['email' as keyof object];

  infoFromLocalStorage = this.localstore.get('User').data;

  async getProfile(){
    
      const queryEmail = await getDoc(doc(this.dbref,this.email))

      
  }

  showContactInfo(e: any) {
    console.log('you clicked this button');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '80vh'
    const dialogRef = this.dialog.open(ContactinfoComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((result:any) =>{
    //   this.matdialogVal = result;
    // })
  }
  showEducationInfo(e: any) {
    console.log('you clicked this button');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '80vh'
    const dialogRef = this.dialog.open(EducationinfoComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((result: object) => {
      this.matdialogVal['education' as keyof object] = result;
      console.log('from matdialog', this.matdialogVal);

    })
  }
  showRelatedSkills(e: any) {
    console.log('you clicked this button');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '80vh'
    const dialogRef = this.dialog.open(RelatedskillsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((result: object) => {
      this.matdialogVal = result;
      console.log('from matdialog', this.matdialogVal);

    })
  }
  showServices(e: any) {
    console.log('you clicked this button');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '80vh'
    dialogConfig.data = {
      title: 'Add Services'
    }

    const dialogRef = this.dialog.open(ServicesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      this.matdialogVal['services' as keyof object] = result;
    })
  }
  showWebsite(e: any) {
    console.log('you clicked this button');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '80vh'
    const dialogRef = this.dialog.open(WebsiteComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((result:any) =>{
    //   this.matdialogVal = result;
    // })
  }
  showHighlights(e: any) {
    console.log('you clicked this button');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '80vh'
    // this.dialog.open(,dialogConfig)
  }
}
