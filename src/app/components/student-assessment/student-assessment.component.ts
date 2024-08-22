import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AssessmentService } from 'src/app/services/assessment.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-assessment',
  templateUrl: './student-assessment.component.html',
  styleUrls: ['./student-assessment.component.css']
})
export class StudentAssessmentComponent implements OnInit {

  assessmentsTab:any=[];
  decoded: any;
  id:any;
  

  constructor(
    private studentService:StudentService,
    private userService:UserService
  
  ) {}

  ngOnInit(): void {
    let token=sessionStorage.getItem('jwt');
    if (token) {
      this.decoded=jwtDecode(token);
      this.id=this.decoded.id
      
    }
    this.studentService.getStudentById(this.id).subscribe((response) => {
      this.assessmentsTab=response.student
      console.log("response",response.student)
    })
    
  }

  loadAssessments() {
    
  }
}
