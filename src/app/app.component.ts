import { Component } from '@angular/core';
import {  AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public data: Observable<any[]>;

  private ourCollection;

  constructor(private db: AngularFirestore, private dialog: MatDialog){
    this.ourCollection = this.db.collection('/lost-number-plates');
    this.data = this.ourCollection.valueChanges();
  }

  addLostNumberPlate(){
    this.ourCollection.add({
      numberPlate: "AXS-1212",
      lostAddress: "Near Stadium",
      found: false,
      foundByContact: "03354854555",
      ownerNumber: "03343554637",
      ownerName: "Usama",
      foundBy: "Zain"
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  openAddDialog(){
    console.log("sss")
    this.dialog.open(AddDialogComponent,{
      disableClose: true,
      width: '600px',
    });
  }

}
