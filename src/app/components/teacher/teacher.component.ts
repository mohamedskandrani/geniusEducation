import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  
  @Input() teacherInput: any; // Assuming you receive this input from parent component

  constructor() { }

  ngOnInit(): void {
  }

}

