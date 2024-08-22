import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  studentsTab=[];
  decoded:any;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    let token=sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      console.log("decoded",this.decoded)
      }
  }
  
   
  }


