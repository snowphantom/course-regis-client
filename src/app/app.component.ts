import { Router } from '@angular/router';
import { User } from './models/User';
import { AuthenticateService } from './services/authenticate.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { UserType } from './common/bunchOfEnum';
import { RegistrationService } from './services/registration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = [
    // {index: 1, name: 'Thời khóa biểu'},
    // {index: 2, name: 'Đăng ký'},
    // {index: 3, name: 'Xem thông tin'},
  ];

  selectedIndex = 0;

  private _mobileQueryListener: () => void;
       
  currentUser: User;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
    private registrationService: RegistrationService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.authenticateService.currentUserSubject.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.registrationService.clear();
    this.authenticateService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 300);
  }

  login() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    });
  }

  selectNavItem(navItem) {
    switch(navItem.index) {
      case 2:
        break;
      case 3:
        break;
      default:

    }
  }

  getPosition() {
    switch(this.currentUser && this.currentUser.type) {
      case UserType.Admin:
        return "Quản trị";
      case UserType.Student:
        return "Học sinh";
      default:
        return "Người dùng";
    }
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
