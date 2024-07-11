import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LocalstoreService } from 'src/app/services/localstore.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  requests: boolean = true;
  users!: any
welcomeMessage!:object;

  loginCredits!: object;
  getcrumb!: string
  usermatches: any[] = [];
  usermatch: any[] = [];
  notifications: any[] = [];//setting an array of notifications to an empty array

  //gets the tab which was clicked on the side nav

  getCrumb(e: any): string {
    this.getcrumb = e;
    return this.getcrumb;
  };


  dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email'])
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');
  subcolwelcomeMessage = collection(this.docref, 'welcome');
  constructor(
    private localstore: LocalstoreService,
    private matchservice: MatchService,
    private fire: Firestore,
    private route: Router

  ) {
    
    (async () => {
      const profileQuery = await getDocs(query(this.subcoll));
      const welcomeQuery = await getDocs(query(this.subcolwelcomeMessage));

      const querySnapshot = profileQuery.docs.map(doc => {
        
        return doc.data()

      })
      const welcomeSnapshot = welcomeQuery.docs.map(doc => {
        
        return doc.data()

      })
      if (welcomeSnapshot.length === 0) {
        addDoc(this.subcolwelcomeMessage,{val:true})
        this.welcomeMessage = {
          profile:false,
          noProfile:true
        }
        matchservice.getWelcomeCount(this.welcomeMessage)
      }
    })()

    


    matchservice.emmitLogins.subscribe(data => {
      this.loginCredits = data;


    })

    this.getthematches();

    //This block of code gets the users document Id and store it to local storage
    getDocs(this.dbrefUsers)
      .then(result => {
        return result.docs.filter(match => {
          if (match.data()['email'] === this.localstore.get('User').data['email']) {
            this.localstore.set('UserId', {
              id: match.id
            })
          }

        })

      })

    // trying to get profile from firebase
    //here  i get it so i can detect if it is the users first time accessing the app.

    // asyncFunction()





  }

  //Initialisation of firestore variables 
  dbrefUsers = collection(this.fire, 'Users');
  docRef = doc(this.dbrefUsers, this.localstore.get('User').data['email']);
  userSubcol = collection(this.docRef, "profile")
  requestCollection = collection(this.fire, 'Match_Request');
  dbref = collection(this.fire, 'ConfirmedUsers');


  ngOnInit(): void {



    // this.allRequesters = this.getRequester();
    window.addEventListener('online', () => window.location.reload()
    );
    (async () => {
      const finalResult = await this.getFirestoreObjects(this.dbrefUsers);

   

      this.matchservice.getMatches(finalResult.map(data => { return { data: data.data(), id: data.id } }));

    })()


    //function to get all match requests from firestore
    try {

      (async () => {
        const request = await this.getFirestoreMatchRequest(this.requestCollection);
        this.matchservice.getMR(request.map(data => {
          console.log('we good ', data.data());

          return { data: data.data() }
        }))
      })()

    } catch (error) {
      console.log(error);
    }

    // function to retrieve login information.
    if (this.localstore.get('User').status == true) {
      const result = this.getInfoFromLocalStorage();
      this.matchservice.getLogins(result);

    }


  }

  // function to fetch all users from firestore
  async getFirestoreObjects(collection: any) {
    const result = await getDocs(this.dbrefUsers);

    return result.docs.filter((match: any) => {
      return match.data().email != this.localstore.get('User').data['email'];
    })
  }

  //Function to get login credentials
  getInfoFromLocalStorage(): object {
    return this.localstore.get('User').data;
  }

  //function to fetch all matchrequests
  async getFirestoreMatchRequest(collection: any) {
    const MRResult = await getDocs(collection);
    return MRResult.docs.filter((match: any) => {
      return match.data().recipientId === this.localstore.get('UserId').data['id'];
    })
  }

  //this function is created mainly to collect all your connections and emmit to the matches component
  getthematches() {
    const email = this.localstore.get('User').data['email' as keyof object];

    getDocs(collection(doc(this.dbref, email), 'MyConnections'))
      .then(async result => {

        this.usermatches = result.docs.map(data => {

          return data.data();

        })

        this.usermatches.map(async (elemt) => {

          const queryEmail = await getDocs(query(this.dbrefUsers, where('email', '==', elemt['id'])))

          queryEmail.docs.forEach(data => {
            this.usermatch = [...this.usermatch, data.data()];
          })

          this.matchservice.getConnections(this.usermatch)
          //move to the matches component and subscribe to get all your matches

        })

      }).catch(error => {
        console.log(error);

      })

  }
  gettherequests(e: any) {
    this.requests = e;
    this.route.navigate(['/uoai/matchrequests']);
  }
}
