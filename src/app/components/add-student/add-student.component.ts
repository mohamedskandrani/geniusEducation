import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  coursesTab: any[] = [];
  courseId: string | null = null;
  students: any[] = []; // Liste complète des étudiants
  filteredStudents: any[] = []; // Liste filtrée des étudiants
  selectedStudent: any = null;
  msg: string = '';

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private StudentService: StudentService
  ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(response => {
      this.coursesTab = response.courses;
    });

    this.StudentService.getAllStudents().subscribe(data => {
      this.students = data.students;
    });

    this.studentForm = new FormGroup({
      emailSearch: new FormControl(''),
      selectedCourse: new FormControl('')
    });

    this.studentForm.get('emailSearch')?.valueChanges.subscribe(email => {
      this.searchStudent(email);
    });
  }
  

  addStudent(): void {
    console.log("this selectedStudent",this.selectedStudent)
    console.log("this.courseId",this.courseId)
    this.selectedStudent.course=this.courseId
    this.userService.addStudentToCourse(this.selectedStudent).subscribe((response)=>{
      console.log("response from BE",response)
      this.msg=response.msg
      console.log("response from BE",this.msg)

      
    })
   

   
  }

  selectCourseId(event: any): void {
    this.courseId = event.target.value;
  }

  searchStudent(email: string): void {
    this.filteredStudents = this.students.filter(student =>
      student.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  selectStudent(student: any): void {
    this.selectedStudent = student;
    this.filteredStudents = [];
  }
}
