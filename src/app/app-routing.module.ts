import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminGalleryComponent } from './user/admin-gallery/admin-gallery.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  {
    path: 'admin',
    component: AdminGalleryComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);