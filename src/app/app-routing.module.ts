import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './components/teacher/teacher.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CourseComponent } from './components/course/course.component';
import { BlogComponent } from './components/blog/blog.component';
import { EventComponent } from './components/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersTabComponent } from './components/teachers-tab/teachers-tab.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { StudentAssessmentComponent } from './components/student-assessment/student-assessment.component';
import { ChildrenComponent } from './components/children/children.component';
import { ListOfStudentComponent } from './components/list-of-student/list-of-student.component';

const routes: Routes = [
  { path: 'teacher', component: TeacherComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'teachers-tab', component: TeachersTabComponent },
  { path: 'course', component: CourseComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'student-info/:id', component: StudentInfoComponent },
  { path: 'course-info/:id', component: CourseInfoComponent },
  { path: 'listOfStudent/:id', component: ListOfStudentComponent },
  { path: 'teacher-info/:id', component: TeacherInfoComponent },
  { path: 'Edit-course/:id', component: EditCourseComponent },
  { path: 'Edit-teacher/:id', component: EditTeacherComponent },
  { path: 'Edit-student/:id', component: EditCourseComponent },
  { path: 'assessment/:idCourse/:studentId', component: AssessmentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'addCourse', component: AddCourseComponent },
  { path: 'addStudent', component: AddStudentComponent },
  { path: 'search', component: SearchComponent },
  { path: 'signUp-admin', component: SignupComponent },
  { path: 'signUp-teacher', component: SignupComponent },
  { path: 'signUp-student', component: SignupComponent },
  { path: 'signUp-parent', component: SignupComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'event', component: EventComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'student-assaissement', component: StudentAssessmentComponent },
  { path: 'myChildren', component: ChildrenComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
