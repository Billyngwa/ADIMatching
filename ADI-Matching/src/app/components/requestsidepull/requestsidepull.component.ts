import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { LocalstoreService } from 'src/app/services/localstore.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-requestsidepull',
  templateUrl: './requestsidepull.component.html',
  styleUrls: ['./requestsidepull.component.scss']
})
export class RequestsidepullComponent implements OnInit {
  requests: Array<object> = [];
  users!: any;

  constructor(
    private matchservice: MatchService,
    private fire:Firestore,
    private localstore:LocalstoreService,
  ) {
    // Getting all requests from firebase
    matchservice.emmitMR.subscribe(data => {
      this.requests = data;

    })
    //Getting all users to compare them with requests objects
    matchservice.emmitMatches.subscribe(data => {
      this.users = data;

    })
  }

  ngOnInit(): void {
    this.getRequester();
  }

  public getRequester(): any {
    let allusers: any[] = [];
    for (let arequest of this.requests) {
      for (let auser of this.users) {
        if (arequest['data' as keyof object]['senderId' as keyof object] == auser['id' as keyof object]) {
          allusers.push(auser);
        }
      }
    }
    return allusers;
  }
 
  dbRef = collection(this.fire, "ConfirmedUsers");
  docref = doc(this.dbRef, this.localstore.get("User").data['email'])
  subcol = collection(this.docref, 'MyConnections');
  subcoll = collection(this.docref, 'Profile');

   myConnections:object ={};//An array containing all connections (connections are people you have accepted to match with)
  
  async connect(e:any,requester:object,connectResolve:HTMLButtonElement,deleteResolve:HTMLButtonElement){
    
    this.myConnections = requester['data' as keyof object]['email'];
    
    addDoc(this.subcol,{id:this.myConnections})
    .then( async (result)=>{

      connectResolve?.setAttribute('class','disable');
      deleteResolve?.setAttribute('class','disable');

      const destroyRequest = await getDocs(query(collection(this.fire,'Match_Request'),where('senderId','==',requester['id' as keyof object])))
      let destroysnapshot = destroyRequest.docs.map(doc => {
        return {data:doc.data(),id:doc.id}
      })
      
      if(destroysnapshot[0]['id' as keyof object] != ''){
        await deleteDoc(doc(collection(this.fire,"Match_Request"),destroysnapshot[0].id))
      }

    }).catch(error=>{
      console.log(error);
      
    })
  

    const profileQuery = await getDocs(query(this.subcoll));
    const querySnapshot = profileQuery.docs.map(doc => {
      return doc.data()

    })

    if(querySnapshot.length === 0){
      addDoc(this.subcoll,{profile:this.localstore.get('User').data});
    }
    else{
      console.log(`from request side pull component:: profile exist `);
      
    }
   
    return
  }

 async disconnect(e:any,requester:object,connectResolve:HTMLButtonElement,deleteResolve:HTMLButtonElement){
    connectResolve?.setAttribute('class','disable');
    deleteResolve?.setAttribute('class','disable');

    const destroyRequest = await getDocs(query(collection(this.fire,'Match_Request'),where('senderId','==',requester['id' as keyof object])))
    let destroysnapshot = destroyRequest.docs.map(doc => {
      return {data:doc.data(),id:doc.id}
    })
    
    if(destroysnapshot[0]['id' as keyof object] != ''){
      await deleteDoc(doc(collection(this.fire,"Match_Request"),destroysnapshot[0].id))
    }
  }
  getAllConnections(){
    return this.myConnections;
  }
}
