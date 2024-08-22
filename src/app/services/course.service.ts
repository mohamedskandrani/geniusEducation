import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL:string = 'http://localhost:3000/api/course';
  constructor(private http:HttpClient) { }
  addCourse(course: any,file:File) {
    let fData = new FormData();
    fData.append("domaine",course.domaine)
    fData.append("title",course.title)
    fData.append("nbrOfHour",course.nbrOfHour)
    fData.append("price",course.price)
    fData.append("teachers",course.teachers)
    fData.append("file",file)
    return this.http.post<{ isAdded: Boolean }>(this.courseURL, fData);

  }
  editCourse(courseObj: any) {
    return this.http.put<{ isEdited: string }>(this.courseURL, courseObj);

  }
  deleteCourse(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.courseURL}/${id}`);

  }
  //response one object
  getCourseById(id: any) {
    return this.http.get<{ course: any }>(`${this.courseURL}/${id}`);
  }
  getAllCourses() {
    return this.http.get<{ courses: any }>(this.courseURL);
  }
  research(obj: any) {
    return this.http.post<{ courses:[] }>(this.courseURL + "/search", obj);

  }
}
