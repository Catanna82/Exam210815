import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { SameValueDirective } from './same-value.directive';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminGalleryComponent } from './user/admin-gallery/admin-gallery.component';
import { AdminGalleryService } from './user/admin-gallery/admin-gallery.service';
import { GalleryService } from './gallery/gallery.service';
import { CommentService } from './comments/comment.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    GalleryComponent,
    PortfolioComponent,
    CommentsComponent,
    LoginComponent,
    RegisterComponent,
    SameValueDirective,
    AdminGalleryComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8xYgQATRSeiGOSAEMVADt9tftcjndts8'
    })
  ],
  providers: [
    UserService,
    AdminGalleryService,
    GalleryService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
