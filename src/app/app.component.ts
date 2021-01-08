import { Router } from '@angular/router';
import { User } from './models/User';
import { AuthenticateService } from './services/authenticate.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {index: 1, name: 'Thời khóa biểu'},
    {index: 2, name: 'Đăng ký'},
    {index: 3, name: 'Xem thông tin'},
  ];

  selectedIndex = 0;

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
  
  private _mobileQueryListener: () => void;
       
  currentUser: User;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
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

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
