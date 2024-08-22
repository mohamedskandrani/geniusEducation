import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course: any = {};
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log("id",this.id)
    this.courseService.getCourseById(this.id).subscribe((response) => {
      console.log("response from BE", response.course);
      this.course = response.course;
    });
  }

  editCourse(): void {
    this.courseService.editCourse(this.course).subscribe((response) => {
      console.log("response from BE", response);
      this.router.navigate(['admin']);
    });
  }
}

