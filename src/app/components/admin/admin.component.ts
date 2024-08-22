import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  decoded:any;

  constructor() { }

  ngOnInit(): void {
    let token=sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      console.log("decoded",this.decoded)
      
    }
  }

}
