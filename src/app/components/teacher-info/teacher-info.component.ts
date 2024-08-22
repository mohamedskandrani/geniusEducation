import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
  teacher:any;
  id:any;
 

  constructor(
    private activatedRoute:ActivatedRoute,
    private teacherService:TeacherService
  ) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id']
    this.teacherService.getTeacherById(this.id).subscribe((response)=>{
      this.teacher=response.teacher
    })
    
      
     }
      
    }

  


