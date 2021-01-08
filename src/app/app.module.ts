import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AlertService } from "./services/common/alert.service";
import { appRoutingModule } from './app.routing';
import { AuthenticateService } from './services/authenticate.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    AlertService,
    AuthenticateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
