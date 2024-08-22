import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  id: any;
  course:any={};
  coursesTab=[];

  constructor(private activatedRoute: ActivatedRoute,
    private courseService:CourseService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log("id",this.id)
    this.courseService.getCourseById(this.id).subscribe((response)=>{
      console.log("response from BE",response)
      this.course=response.course
    })
  }
}
