import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticateService: AuthenticateService,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit() {
    this.authenticateService.currentUserSubject.subscribe(user => {
      this.currentUser = user;

      if (this.currentUser && this.currentUser.token) {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 300);
      }
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticateService.login(this.f.get('username').value, this.f.get('password').value)
      .pipe(first())
      .subscribe(
        result => {
          if (result.success) {
            this.submitted = false;
            this.loading = false;

            this.toastrService.success(result.message);
          }
        },
        err => {
          this.submitted = false;
          this.loading = false;

          this.toastrService.error(err.error && err.error.message || err);
        }
      )
  }
}
