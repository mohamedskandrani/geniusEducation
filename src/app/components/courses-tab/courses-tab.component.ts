import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css']
})
export class CoursesTabComponent implements OnInit {
  coursesTab:any=[]
  decoded:any;
  idConnected:any;

  constructor(
    private rooter:Router,
    private courseService:CourseService
  ) { }

  ngOnInit(): void {
 const item = sessionStorage.getItem('jwt');

if (item) {
  try {
    // Decode the JWT token
    this.decoded = jwtDecode(item);
    this.idConnected=this.decoded.id

    // Log the retrieved item and the decoded data
    console.log('Item retrieved:', item);
    console.log('Decoded JWT:', this.decoded);
  } catch (error) {
    console.error('Error decoding JWT:', error);
  }
} else {
  console.log('Item not found');
}

this.courseService.getAllCourses().subscribe(
  (response) => {
    console.log("Response from BE:", response);

    // Vérifiez que la propriété `courses` existe et est un tableau
    if (Array.isArray(response.courses)) {
      if (this.decoded.role === 'admin') {
        this.coursesTab = response.courses;
      } else if (this.decoded.role === 'teacher') {
        // Filtrer les cours pour le professeur connecté
        this.coursesTab = response.courses.filter(course => 
          Array.isArray(course.teachers) &&
          course.teachers.length > 0 &&
          course.teachers[0]._id === this.idConnected
        );
      }
      console.log("Courses Tab:", this.coursesTab);
    } else {
      console.error('Invalid courses data format:', response.courses);
    }
  },
  (error) => {
    console.error('Error fetching courses:', error);
  }
);
  }
  goToCourseInfo(courseId:any){
    this.rooter.navigate([`course-info/${courseId}`])
  }
  editCourse(courseId:any){
    this.rooter.navigate([`Edit-course/${courseId}`])
  }
  deleteCourse(courseId:any){
    this.courseService.deleteCourse(courseId).subscribe((response)=>{
      console.log("response from BE",response.isDeleted)
      this.courseService.getAllCourses().subscribe((data)=>{
        console.log("here response drom BE",data.courses)
        this.coursesTab=data.courses
      })
      
    })
  }

}
