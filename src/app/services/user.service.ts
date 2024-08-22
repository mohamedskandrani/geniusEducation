import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl:string='http://localhost:3000/api/users'

  constructor(private http:HttpClient) { }
   // login(user: any){
  //   return this.http.post(this.userUrl,user);}
  signUp(user: any ,photo:File){
    let fData = new FormData();
    fData.append("firstName",user.firstName)
    fData.append("lastName",user.lastName)
    fData.append("email",user.email)
    fData.append("pwd",user.pwd)
    fData.append("role",user.role)
    fData.append("status",user.status)
    fData.append("speciality",user.speciality)
    fData.append("experience",user.experience)
    fData.append("emailChild",user.emailChild)
    fData.append("telParent",user.telParent)
    fData.append("parent",user.parent)
    fData.append("img",photo)
    return this.http.post<{isAdded:boolean}>(this.userUrl+'/signUp',fData);
  }
  logIn(user: any){
    return this.http.post<{msg:string;user:any}>(this.userUrl+'/login',user);
  }
  validateTeacher(userId: string): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/${userId}/validate`, {});
  }
  validateStudent(object: string): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/${object}/validateStudent`, {});
  }
  addStudentToCourse(obj:any): Observable<any> {
    return this.http.post<{msg:string}>(`${this.userUrl}/addToCourse`,{obj});
  }
  
  
}
