import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teacherURL:string='http://localhost:3000/api/teacher'


  constructor( private http:HttpClient) { }
  addTeacher(teacher: any) {
    return this.http.post<{ isAdded: Boolean }>(this.teacherURL, teacher);

  }
  editTeacher(teacherObj: any) {
    return this.http.put<{ isEdited: string }>(this.teacherURL, teacherObj);

  }
  deleteTeacher(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.teacherURL}/${id}`);

  }
  //response one object
  getTeacherById(id: any) {
    return this.http.get<{ teacher: any }>(`${this.teacherURL}/${id}`);

  }
  getAllTeachers() {
    return this.http.get<{ teachers: any }>(this.teacherURL);
  }
  research(obj: any) {
    return this.http.post<{ res: any }>(this.teacherURL + "/search", obj);

  }
   
}
