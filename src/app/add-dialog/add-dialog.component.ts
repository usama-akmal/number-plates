import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  public formCheck: number = 1;

  public formOne: FormGroup;
  public formTwo: FormGroup;
  
  private ourCollection: AngularFirestoreCollection;
 
  constructor(private formBuilder: FormBuilder,private db: AngularFirestore, private dialogRef: MatDialogRef<AddDialogComponent>, private ngxUiService: NgxUiLoaderService) { 
    this.ourCollection = this.db.collection('/lost-number-plates');   
  }

  ngOnInit(): void {
    this.formOne = this.formBuilder.group({
      numberPlate: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerContact: ['', Validators.required],
      areaDetails: ['', Validators.required]
    }); 

    this.formTwo = this.formBuilder.group({
      numberPlateF: ['', Validators.required],
      foundBy: ['', Validators.required],
      foundByContact: ['', Validators.required],
      areaDetailsF: ['', Validators.required]
    }); 
  }

  onSubmit(v){
    if(v == 'L'){
      if(this.formOne.valid){
        let data = {
          numberPlate: this.formOne.value.numberPlate,
          lostAddress: this.formOne.value.areaDetails,
          found: false,
          foundByContact: "",
          ownerNumber: this.formOne.value.ownerContact,
          ownerName: this.formOne.value.ownerName,
          foundBy: ""
        };
        this.addLostNumberPlate(data);
      }
    } else {
      if(this.formTwo.valid){
        let data = {
          numberPlate: this.formTwo.value.numberPlateF,
          lostAddress: this.formTwo.value.areaDetailsF,
          found: true,
          foundByContact: this.formTwo.value.foundByContact,
          ownerNumber: "",
          ownerName: "",
          foundBy: this.formTwo.value.foundBy
        };
        this.addLostNumberPlate(data);
        
      }
    }
  }

  closeDialog(){
    this.ngxUiService.stop();
    this.dialogRef.close();
  }

  addLostNumberPlate(data){
    this.ngxUiService.start();
    let x = () => this.closeDialog();
    this.ourCollection.add(data).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      x();
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
      this.ngxUiService.stop();
    });
  }
}
