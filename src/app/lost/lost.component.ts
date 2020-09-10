import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSort } from '@angular/material/sort';

const ELEMENT_DATA: any[] = [
  {numberPlate: 1, ownerName: 'Hydrogen', ownerContact: 1.0079, lostAddress: 'H'},
  {numberPlate: 2, ownerName: 'Helium', ownerContact: 4.0026, lostAddress: 'He'},
  {numberPlate: 3, ownerName: 'Lithium', ownerContact: 6.941, lostAddress: 'Li'},
  {numberPlate: 4, ownerName: 'Beryllium', ownerContact: 9.0122, lostAddress: 'Be'},
  {numberPlate: 5, ownerName: 'Boron', ownerContact: 10.811, lostAddress: 'B'},
  {numberPlate: 6, ownerName: 'Carbon', ownerContact: 12.0107, lostAddress: 'C'},
  {numberPlate: 7, ownerName: 'Nitrogen', ownerContact: 14.0067, lostAddress: 'N'},
  {numberPlate: 8, ownerName: 'Oxygen', ownerContact: 15.9994, lostAddress: 'O'},
  {numberPlate: 9, ownerName: 'Fluorine', ownerContact: 18.9984, lostAddress: 'F'},
  {numberPlate: 10, ownerName: 'Neon', ownerContact: 20.1797, lostAddress: 'Ne'},
];

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements AfterViewInit {

  displayedColumns: string[] = ['numberPlate', 'name', 'contact', 'address'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private db: AngularFirestore) { }

  ngAfterViewInit() {
    this.db.collection<any>('/lost-number-plates', ref => ref.where('found' , '==', false)).valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data); 
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
