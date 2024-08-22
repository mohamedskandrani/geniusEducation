import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  decoded: any;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    let token=sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      
    }

  }
  isLoggedIn(){
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      
    }
    return !!token
  }
  logOut(){
    sessionStorage.removeItem('jwt')
    this.router.navigate(['']);
  }

}
