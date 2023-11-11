import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMessage = null;
  isloading = false;
  constructor(private authService : AuthServiceService,private router : Router) {}

  ngOnInit(): void {
    this.formInit()
  }

  onSubmitRegist() {
    if(!this.registerForm.valid){
      return
    }
    this.isloading =true;
    this.registerForm.value.id = crypto.randomUUID()

    this.authService.register(this.registerForm.value).subscribe(res=>{
      this.isloading = false;
      this.router.navigate(["/products"]);
    },
    (errorMessage) => {
      this.errorMessage = errorMessage;
      this.isloading = false;
    })
  }
  registerForm!: FormGroup;
  name!:FormGroup;
  username!: FormControl;
  password!: FormControl;
  email!: FormControl;
  phone!: FormControl;
  address!:FormGroup;

  private formInit() {
    this.name = new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
      })
    this.username = new FormControl(null, Validators.required);
    this.password = new FormControl(null, [Validators.required,Validators.minLength(6)]);
    this.email = new FormControl(null, [Validators.required,Validators.email]);
    this.phone = new FormControl(null, [Validators.required,Validators.minLength(11),Validators.maxLength(11)]);
    this.address = new FormGroup({
      city : new FormControl(null, Validators.required),
      street : new FormControl(null, Validators.required),
      number : new FormControl(null, Validators.required)
    })

    this.registerForm = new FormGroup({
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      address: this.address
    });
  }
}
