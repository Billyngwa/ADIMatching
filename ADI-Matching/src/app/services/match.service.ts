import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { LocalstoreService } from './localstore.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  emmitMatches = new BehaviorSubject<object>({});
  emmitLogins = new BehaviorSubject<object>({});
  emmitMR = new BehaviorSubject<any>([]);
  emmitConnections = new BehaviorSubject<object>({})
  emmitWelcomeCount = new BehaviorSubject<object>({})

  takeLogins = this.emmitLogins.asObservable(); 
  took = this.emmitMatches.asObservable();
  MR = this.emmitMR.asObservable();
  boom =this.emmitConnections.asObservable();
  welcomeCount = this.emmitWelcomeCount.asObservable();

public getWelcomeCount(count:object){
  this.emmitWelcomeCount.next(count);
}

    // this function emmits all users from the Users collection 
  public getMatches(match: object) {
    this.emmitMatches.next(match);
  }

  // This function emmits all login credentials from the local storage 
  // Landing page component subscribes to this observable
  public getLogins(login:object){
    this.emmitLogins.next(login);
  }

  //This function emmits all match requests coming from the match_request collection.
  // Home component subscribes to this observable
  public getMR(mr:object){
    this.emmitMR.next(mr);
  }

  //This function emits al connections 
  // Matches component subscribes to the observable
  public getConnections(connection:object){
    this.emmitConnections.next(connection);
  }
}
