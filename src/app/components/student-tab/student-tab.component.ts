import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {
  studentsTab: any = []
  courseId: any
  course: any
  decoded:any

  constructor(
    private router: Router,
    private studentService: StudentService,
    private CourseService: CourseService
  ) { }

  ngOnInit(): void {
    let token=sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      
    }
    this.studentService.getAllStudents().subscribe((response) => {
      console.log("this is student response from BE", response.students)
      this.studentsTab = response.students
    })
  }
  goToStudentInfo(studentId: any) {
    this.router.navigate([`student-info/${studentId}`])
  }
  goToEvaluation(studentId: any) {
    this.router.navigate([`assessment/${studentId}`])
  }
  delete(studentId: any) {
    this.studentService.deleteStudent(studentId).subscribe((response) => {
      console.log("response", response.isDeleted)
      this.studentService.getAllStudents().subscribe((response) => {
        this.studentsTab = response.students
      })
    })
  }

}
