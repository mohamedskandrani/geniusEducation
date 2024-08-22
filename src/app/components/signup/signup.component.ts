import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  test: boolean = false;
  actualPath: any;
  imagePreview: any;
  slectedFile: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actualPath = this.router.url
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      experience: ['', this.actualPath === '/signUp-teacher' ? Validators.required : null],
      speciality: ['', this.actualPath === '/signUp-teacher' ? Validators.required : null],
      emailChild: ['', this.actualPath === '/signUp-parent' ? Validators.required : null],
      telParent: ['', this.actualPath === '/signUp-student' ? Validators.required : null],
      parent: ['', this.actualPath === '/signUp-student' ? Validators.required : null],
    })
  }
  signup() {
    if (this.actualPath == '/signUp-teacher') {
      this.signupForm.value.role = 'teacher';
      this.signupForm.value.status='not validated';
    } else if (this.actualPath == '/signUp-student') {
      this.signupForm.value.role = 'student';
    } else if (this.actualPath == '/signUp-parent') {
      this.signupForm.value.role = 'parent';
      this.signupForm.value.status='not validated';
    } else if (this.actualPath == '/signUp-admin') {
      this.signupForm.value.role = 'admin';
    }
  
console.log("status",) 
console.log("role", this.signupForm.value)

this.userService.signUp(this.signupForm.value, this.slectedFile).subscribe((result) => {

  this.router.navigate(['logIn']);
})

  }
onImageSelected(event: Event) {

  const inputElement = event.target as HTMLInputElement;
  if (inputElement && inputElement.files && inputElement.files.length
    > 0) {
    const file = inputElement.files[0];
    this.slectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
    
    }



