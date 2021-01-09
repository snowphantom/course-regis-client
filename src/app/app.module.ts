import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AuthenticateService } from './services/authenticate.service';
import { AppRoutingModule } from './app-routing.module';
import { Overlay, OverlayContainer, ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatTabsModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatNativeDateModule } from '@angular/material';
import { DemoMaterialModule } from './material/material.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InformationComponent } from './components/information/information.component';
import { CourseComponent } from './components/course/course.component';
import { NgZeeTimeTableModule } from 'ng-zee-timetable';
import { JwtModule } from '@auth0/angular-jwt';
import { NewcourseFormComponent } from './components/newcourse-form/newcourse-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TimeTableComponent,
    RegistrationComponent,
    InformationComponent,
    CourseComponent,
    NewcourseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatTableModule,
    AppRoutingModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgZeeTimeTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:3000']
      }
    })
  ],
  providers: [
    UserService,
    AuthenticateService,
    ToastrService,
    Overlay,
    OverlayContainer,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewcourseFormComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
