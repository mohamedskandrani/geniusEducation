import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-tab',
  templateUrl: './teachers-tab.component.html',
  styleUrls: ['./teachers-tab.component.css']
})
export class TeachersTabComponent implements OnInit {
  teachersTab: any = [];

  constructor(
    private router: Router,
    private teacherService: TeacherService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe((response) => {
      console.log("this is response from BE", response)
      this.teachersTab = response.teachers
    })


  }
  goToTeacherInfo(teacherId: any) {
    this.router.navigate([`teacher-info/${teacherId}`])
  }

  editTeacher(teacherId: any) {
    this.router.navigate([`Edit-teacher/${teacherId}`])
  }
  deleteTeacher(teacherId: any): void {
    this.teacherService.deleteTeacher(teacherId).subscribe((response) => {
      console.log("this is response from BE", response.isDeleted)
      this.teacherService.getAllTeachers().subscribe((data) => {
        console.log("this is response from BE", data)
        this.teachersTab = data.teachers
      })
    })
  }

  validateTeacher(teacherId: any): void {
    this.userService.validateTeacher(teacherId).subscribe((response) => {
      console.log("response from BE",response)
      if (response.isEdited) {
        console.log("Teacher validated successfully");
        // Recharger la liste des enseignants après validation
        this.teacherService.getAllTeachers().subscribe((data) => {
          console.log("Updated teachers list after validation:", data);
          this.teachersTab = data.teachers;
        });
      } else {
        console.error("Failed to validate teacher");
      }
    });
  }

}

