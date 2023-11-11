import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  errorMessage = null;
  isloading = false;
  constructor(private authService: AuthServiceService,private router:Router) {}

  ngOnInit(): void {
  }



  onSubmit(authForm: NgForm) {
    if(!authForm.valid){
      return;
    }
    this.isloading =true;
    let username = authForm.value.username;
    let password = authForm.value.password;
    this.authService.login(username, password).subscribe((res: User) => {
      this.isloading = false;
      this.router.navigate(["/products"])
    },
    (errorMessage) => {
      this.errorMessage = errorMessage;
      this.isloading = false;
    });
  }

}
