import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentsTab:any=[]
    

  constructor(
    private studentService:StudentService
  ) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((response)=>{
      console.log("students",response.students)
      this.studentsTab=response.students
    })
  }

}
