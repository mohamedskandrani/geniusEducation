import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  course: any = {};
  searchTab = [];
  tab:any = [];

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((response) => {
      console.log("courses",response.courses)
      this.tab = response.courses
    })
  }
  search(): void {
    console.log("course",this.course)
    this.courseService.research(this.course).subscribe((response) => {
      console.log("response from BE", response.courses)
      this.searchTab = response.courses
    })

  }

}
