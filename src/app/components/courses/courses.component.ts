import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesTab=[];
  decoded: any;

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
    
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('jwt');
    
    if (token) {
      try {
        this.decoded = jwtDecode(token);
        console.log("Decoded token:", this.decoded);

        if (this.decoded && this.decoded.role) {
          if (this.decoded.role === 'teacher' || this.decoded.role === 'admin') {
            this.loadAllCourses();
          } else if (this.decoded.role === 'student') {
            this.loadStudentCourses(this.decoded.id);
          } else {
            console.error('Unknown role or role not defined in the token.');
            this.loadAllCourses(); // Chargez tous les cours même si le rôle est inconnu
          }
        } else {
          console.error('Token does not contain a valid role.');
          this.loadAllCourses(); // Chargez tous les cours si le rôle est invalide
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        this.loadAllCourses(); // Chargez tous les cours en cas d'erreur de décodage
      }
    } else {
      this.loadAllCourses(); // Si aucun token, chargez tous les cours
    }
  }

  loadStudentCourses(studentId: string): void {
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe(
        (response) => {
          console.log("student from BE:", response);
          this.coursesTab = response.student.course; // Assurez-vous que coursesTab est défini
        },
      );
    }
  }

  private loadAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (response) => {
        console.log("Response from BE:", response);
        this.coursesTab = response.courses; // Assurez-vous que coursesTab est défini
        console.log("coursesTab",this.coursesTab)
      },
    );
  }
}
