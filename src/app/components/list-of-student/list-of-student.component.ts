import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-list-of-student',
  templateUrl: './list-of-student.component.html',
  styleUrls: ['./list-of-student.component.css']
})
export class ListOfStudentComponent implements OnInit {
  idCourse:any;
  studentsTab:any =[]
  idStudent:any;

  constructor(
    private courseService:CourseService,
    private activatedRoute: ActivatedRoute,
    private assessementService:AssessmentService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.idCourse=this.activatedRoute.snapshot.params['id'];
    this.courseService.getCourseById(this.idCourse).subscribe((response)=>{
      console.log("coursebyis",response.course)

      this.studentsTab=response.course.students

      console.log("this.studentsTab",this.studentsTab)

    }) 
  }
  goToStudentassessement(studentId:any){
   this.router.navigate([`/assessment/${this.idCourse}/${studentId}`]); 
  }
  
}
