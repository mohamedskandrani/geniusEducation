import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
studentURL:string='http://localhost:3000/api/student'
  constructor( private http:HttpClient) { }

  addStudent(student: any) {
    return this.http.post<{ isAdded: boolean }>(this.studentURL, student);

  }
  editStudent(studentObj: any) {
    return this.http.put<{ isEdited: string }>(this.studentURL, studentObj);

  }
  deleteStudent(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.studentURL}/${id}`);

  }
  //response one object
  getStudentById(id: any) {
    return this.http.get<{ student: any }>(`${this.studentURL}/${id}`);

  }
  getAllStudents() {
    return this.http.get<{ students: any }>(this.studentURL);
  }
  research(obj: any) {
    return this.http.post<{ res: any }>(this.studentURL + "/search", obj);
  }
  studentOfparent(obj: any){
    return this.http.post<{ res: any }>(this.studentURL + "/search", obj);
  }
}
