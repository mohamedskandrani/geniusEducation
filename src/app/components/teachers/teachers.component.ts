// teachers.component.ts

import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachersTab: any = [];

  constructor(
    private teacherService:TeacherService
  ) { }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe((response)=>{
      console.log("this is respons efrom BE",response)
      this.teachersTab=response.teachers
    })

  }

}
