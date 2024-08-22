import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!:FormGroup
  course: any = {};
  teacherData:any;
  teacherDecoded:any;
  idTeacher:any;
  filePreview: any;
  slectedFile: any;

  constructor(
    private courseService:CourseService,
    private router:Router,
    private userService:UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.teacherData = sessionStorage.getItem('jwt');
    if (this.teacherData) {
      try {
        this.teacherDecoded = jwtDecode(this.teacherData);
        console.log("Teacher decoded", this.teacherDecoded);
      } catch (error) {
        console.error("Error decoding JWT", error);
      }
    } else {
      console.error("No teacher data found in session storage.");
    }
    this.idTeacher=this.teacherDecoded.id
    console.log("idTeacher",this.idTeacher)
  
  }
  addCourse(){
    this.course.teachers=this.idTeacher
    console.log("this course",this.course)
    this.courseService.addCourse(this.course, this.slectedFile).subscribe((response)=>{
      console.log("response from BE",response)
      this.router.navigate(['admin'])
    })
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file.type === 'application/pdf') {
        this.slectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
        };
        reader.readAsDataURL(file);
      } else {
        console.error("Selected file is not a PDF.");
        this.filePreview = null;
      }
    }
  }

}
