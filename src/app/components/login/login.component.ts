import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { AlertService } from '../../services/common/alert.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticateService: AuthenticateService,
    private alertService: AlertService,
    private toastService: ToastService
  ) {
    if (this.authenticateService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
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
      .subscribe(result => {
        if (result.success) {
          this.router.navigate(['/']);
        } else {
          this.toastService.error(result.message);
        }
      });
  }
}
