import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {
  assessmentForm!: FormGroup;
  idCourse: any;
  studentId: any;

  constructor(
    private studentService: StudentService,
    private assessmentService: AssessmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idCourse = this.activatedRoute.snapshot.paramMap.get('idCourse')!;
    this.studentId = this.activatedRoute.snapshot.paramMap.get('studentId')!;
    console.log("idCourse", this.idCourse);
    console.log("studentId", this.studentId);

    this.assessmentForm = this.fb.group({
      score: [''],
      feedback: ['']
    });

    this.studentService.getStudentById(this.studentId).subscribe((response) => {
      console.log("response from BE", response.student);
      this.assessmentForm.patchValue({
        score: response.student.assessment?.[0]?.score || '',
        feedback: response.student.assessment?.[0]?.feedback || ''
      });
    });
  }

  editAssessment() {
    if (this.assessmentForm.invalid) {
      return;
    }

    const assessmentData:any = this.assessmentForm.value;
    this.assessmentService.addAssessment(this.studentId,this.idCourse, assessmentData).subscribe((response) => {
      console.log("response from BE", response);
      this.router.navigate(['admin']);
    });
  }
}
