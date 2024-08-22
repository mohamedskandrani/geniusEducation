import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  teacher: any = {};
  teacherForm!: FormGroup;
  id: any;
  teachersTab: any = [
    { id: 1, firstName: "Ivan", lastName: "Jacobson", Speciality: "French Teacher", experience: "3", img: "assets/images/person_1.jpg" },
    { id: 2, firstName: "Sarra", lastName: "Maria", Speciality: "English Teacher", experience: "5", img: "assets/images/person_2.jpg" },
    { id: 3, firstName: "Sam", lastName: "micon", Speciality: "CSS Teacher", experience: "6", img: "assets/images/person_3.jpg" }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private teacherService: TeacherService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.teacherService.getTeacherById(this.id).subscribe((response) => {
      console.log("this responnse from BE", response.teacher)
      this.teacher = response.teacher
    })
  }
  editTeacher(): void {
    this.teacherService.editTeacher(this.teacher).subscribe((response) => {
      console.log("response from BE", response.isEdited)
      this.router.navigate(['admin'])
    })
  }
}



