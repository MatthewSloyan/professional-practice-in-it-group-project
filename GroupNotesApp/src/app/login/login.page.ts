import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterPage } from '../register/register.page';
import { UtilitiesService } from '../_services/utilities.service';
import { AuthProvider } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  constructor( private utilitiesService: UtilitiesService, private router: Router, private authService: AuthProvider) {
  }

  users = [];
  // Error message
  loginError: string;

  ngOnInit() {
  }

  onLogin(form) {
    if (form.valid) {
      
      // Call the login method which will check if the email and password match a authenticated account and then login if so.
      this.authService.login(form.value.email, form.value.password).then(
				() => {
          // If successful display message, route to home page and set up display image and name for menu
          this.utilitiesService.presentLoadingWithOptions(),
          this.router.navigateByUrl('/home'),
          this.authService.getSignedInUserDetails().subscribe(data =>{
            sessionStorage.setItem ("username", data.username);
            sessionStorage.setItem ("profileImage", data.profileImage);
          });
        },
        // If error display custom error message depending on result
				error => this.utilitiesService.presentToast(error.message + " Please try again!")
      );
      
    } 
  }
}
