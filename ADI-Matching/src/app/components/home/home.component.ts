import { Component, Input, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, query } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { LocalstoreService } from 'src/app/services/localstore.service';
import { MatchService } from 'src/app/services/match.service';
import { CardComponent } from './card/card.component';
import { FilterComponent } from '../filter/filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  matches: Array<any> = [] //this is a class property
  // The constructor is the first function to be run before the class
  logins: any = {};
  welcomeCount: any = {
    profile:false
  };
  constructor(
    public matchservice: MatchService,
    private localstore: LocalstoreService,
    private fire: Firestore,
    public dialog: MatDialog,
    private router: Router

  ) {
    //subscribing to the welcomecount

    matchservice.emmitWelcomeCount.subscribe((data: object) => {
      this.welcomeCount = data
      console.log('welcome count: ', this.welcomeCount);

    })

    matchservice.emmitMatches.subscribe((data: any) => {
      this.matches = data;
      // so this approach is wise because it will create matches even before 
      //the class is runned. when the class finally runs, it will use the matches which was already created

    })
    matchservice.emmitLogins.subscribe((login => {
      this.logins = login;
    }))
  }
  UserId = this.localstore.get('UserId').data

  dbref = collection(this.fire, 'Match_Request');

  dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email'])
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');
  subcolwelcomeMessage = collection(this.docref, 'welcome');

  ngOnInit(): void {
    (async () => {
      //seraching for the welcome message from firestore
      const welcomeQuery = await getDocs(query(this.subcolwelcomeMessage));
      const welcomeSnapshot = welcomeQuery.docs.map(doc => {
        console.log('Hello there', doc.data(), 'hello end');

        return doc.data()

      })
      if (welcomeSnapshot.length != 0) {
        console.log('welcome dey');
        // addDoc(this.subcolwelcomeMessage,{val:true})
        this.welcomeCount = {
          profile: true,
          noProfile: false
        }
        return this.welcomeCount
        // this.matchservice.getWelcomeCount(this.welcomeMessage)
      }
    })()


  }

  openDialog() {
    const dialogRef = this.dialog.open(CardComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openFilter() {
    const dialogRef = this.dialog.open(FilterComponent);
    dialogRef.afterClosed().subscribe((result2: any) => {
      console.log(`Dialog result2: ${result2} `);
    });

  }

  async makeMatch(e: any, object: object, disableButton: HTMLButtonElement) {
    console.log(`this is object`, object);//In order to make a match request, we need to use the id
    // of the person we wish to match with and the id of the matcher as well. we store these two 
    // ids in an object as such {recipientId:'idValue', senderId:'idValue'}
    //{recipientId:'idValue', senderId:'idValue'} is the object we store as documents in the Match_Request collection
    //recipientId is the Id of the user who recieves a match request 
    //senderId is the id of the user who makes a match request.
    // When saved in that format ({recipientId:'idValue', senderId:'idValue'}), we can then say a match request has been made. But  this does not suffice to recieve a request notification.
    // To alert any user of a request made we use the notification bell to fetch information from the 
    //database related to his Id  in the object we created when making a request. This process will involve filtering data.

    // first let us create the requestObject and save it to firestore.

    let requestObject = {
      recipientId: object['id' as keyof object], //document Id of the user who recieves the match request provided by Firebase
      senderId: this.UserId.id, //Id of user making a match request. This Id is the email of the user.
    }
    await addDoc(this.dbref, requestObject);

    disableButton.setAttribute('class','disable');

  }

  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    title: 'Hummingbirds are amazing creatures'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    title: 'Example with title.'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    title: 'Hummingbirds are amazing creatures'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    title: 'Example two with title.'
  }];
  //code for user to setup account
  setupAccount(e: any) {
    this.router.navigate(['/uoai/profile']);

  }
}
