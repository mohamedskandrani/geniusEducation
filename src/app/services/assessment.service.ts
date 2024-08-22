import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private baseUrl = 'http://localhost:3000/api/assessments';

  constructor(private http: HttpClient) { }
  addAssessment(studentId: string, idCourse: string, assessmentData: any): Observable<any> {
    // Exemple d'URL basée sur les paramètres
    const url = `${this.baseUrl}/student/${studentId}/course/${idCourse}`;
    return this.http.post(url, assessmentData);
  }

  getAssessmentsByStudent(studentId: number): Observable<{ assessments:any[] }> {
    return this.http.get<{ assessments:any }>(`${this.baseUrl}/${studentId}`);
  }
}
