import { Component } from '@angular/core';

import {initializeApp, database} from 'firebase';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database" //VASC0 - included neither in course
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; //VASCO:  needed to add this to make map work -- https://stackoverflow.com/questions/40328663/map-is-not-a-function-rxjs-though-import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular Firebase Application: Vasco';
  courses$: FirebaseListObservable<any>[];
  lesson$ : FirebaseObjectObservable<any>;
  thirdCourse: <any>;
  
  constructor(private angularFireDatabase: AngularFireDatabase) {
    
    this.courses$ = angularFireDatabase.list('/courses');
    
    this.courses$.subscribe(console.log)
    
    this.lesson$ = angularFireDatabase.object("/lessons/-L8uq-SZipKloXuFYfIj");
    
    this.lesson$.subscribe(console.log)
    
    this.courses$.map(courses => courses[0])
      .subscribe(
        course => this.thirdCourse = course;
        )
    
    // const courses$ : FirebaseListObservable<any>[] = angularFireDatabase.list('/courses'); //VASCO: needed brackets after <any> otherwise it would not update
    // courses$.subscribe(
    //   val => console.log(val);
    // )
    
    // only one observable allowed -- wonder why?
    
    // const course$ = angularFireDatabase.object('/courses/-L8m9bYHQs-g7td3NQhV');
    
    // course$.subscribe(
    //   val => console.log(val);
    // )
  }
  
  listPush() {
    console.log("List Push");
    this.courses$.push({description: "New Course Test"})
      .then(
        () => console.log("Push course done");
        console.error
        )
  }
  
  listUpdate() {
    
    this.courses$.update(this.thirdCourse, {description: "UPDATED PROGRAMATICALLY"})
    
  }
  
  listRemove() {
    this.courses$.remove(this.thirdCourse)
  }
  
  objUpdate() {
    this.lesson$.update({description: "UPDATE NEW LESSON!!!"})
      .then(val => console.log("val", val))
  }
  
  objSet() {
    this.lesson$.set({description: "SET NEW LESSON!!!"})
      .then(val => console.log("val", val))    
  }

  objRemove() {
    this.lesson$.remove()
      .then(val => console.log("val", val))    
  }
  
}

 // // Initialize Firebase
    // var config = {
    //   apiKey: "AIzaSyCOXzo05g0EF8ynmb6ZTcKeI4vVy9lRG10",
    //   authDomain: "ng-fb-app-vasco.firebaseapp.com",
    //   databaseURL: "https://ng-fb-app-vasco.firebaseio.com",
    //   projectId: "ng-fb-app-vasco",
    //   storageBucket: "ng-fb-app-vasco.appspot.com",
    //   messagingSenderId: "987006913479"
    // };
    
    // initializeApp(config);
    
    // // var root = database().ref('lessons');
    // var root = database().ref('testArray');
    
    // root.on('value', function(snap) {
      
    //   console.log(snap.key, snap.val());
      
    // });