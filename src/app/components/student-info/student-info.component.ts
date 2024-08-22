import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  id: any;
  student: any;
  studentsTab: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private studentService:StudentService
  ) {}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    for (let i = 0; i < this.studentsTab.length; i++) {
      if (this.id == this.studentsTab[i].id) { // Utiliser l'opérateur de comparaison == ou ===
        this.student = this.studentsTab[i]; // Assigner l'objet entier
        return;
      }
    }
    this.studentService.getStudentById(this.id).subscribe((response)=>{
      this.student=response.student
  })
  }}
