import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CourseComponent } from './components/course/course.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { SearchComponent } from './components/search/search.component';
import { BlogComponent } from './components/blog/blog.component';
import { EventComponent } from './components/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeachersTabComponent } from './components/teachers-tab/teachers-tab.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/student/student.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentTabComponent } from './components/student-tab/student-tab.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { StudentAssessmentComponent } from './components/student-assessment/student-assessment.component';
import { ChildrenComponent } from './components/children/children.component';
import { ListOfStudentComponent } from './components/list-of-student/list-of-student.component';
import { StudentAssessementComponent } from './student-assessement/student-assessement.component';
import { SafeUrlPipe } from './pipe/safe-url-pipe.pipe';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CourseComponent,
    TeacherComponent,
    SearchComponent,
    BlogComponent,
    EventComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    TeachersComponent,
    TeachersTabComponent,
    CoursesTabComponent,
    AdminComponent,
    StudentComponent,
    StudentsComponent,
    StudentTabComponent,
    TeacherInfoComponent,
    CourseInfoComponent,
    StudentInfoComponent,
    EditTeacherComponent,
    EditStudentComponent,
    EditCourseComponent,
    AddCourseComponent,
    AddStudentComponent,
    AssessmentComponent,
    StudentAssessmentComponent,
    ChildrenComponent,
    ListOfStudentComponent,
    StudentAssessementComponent,
    SafeUrlPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
