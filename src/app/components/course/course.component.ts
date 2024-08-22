import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() courseInput: any;
  currentPath: string = '';
  safePdfUrl: SafeResourceUrl | undefined;
  decoded: any;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    let token=sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      
    }
    this.currentPath = this.router.url;
    if (this.courseInput.file) {
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.courseInput.file);
    }
  }

  goToListOfStudents(courseId: any) {
    this.router.navigate([`listOfStudent/${courseId}`]);
  }

  isCourseInfoPage(): boolean {
    return this.currentPath.startsWith('/course-info/');
  }
  isLoggedIn(){
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      
    }
    return !!token
  }
}
