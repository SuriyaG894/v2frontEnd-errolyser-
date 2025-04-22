import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsoleComponent } from './console/console.component';
import { LogComponent } from './log/log.component';
import { RepoComponent } from './repo/repo.component';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { ErrorListComponent } from './error-list/error-list.component';
import { DetailedBlogComponent } from './detailed-blog/detailed-blog.component';
import { ErrorDetailsComponent } from './error-details/error-details.component';
import { AddNewErrorComponent } from './add-new-error/add-new-error.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // Protected routes wrapped in MainLayoutComponent
  {
    path: '',
    component: MainlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'log', component: LogComponent },
      { path: 'repo', component: RepoComponent },
      { path: 'console', component: BasicComponent },
      { path: 'errorList', component: ErrorListComponent },
      { path: 'detail', component: DetailedBlogComponent },
      { path: 'detail/:id', component: DetailedBlogComponent },
      { path: 'userList', component: ErrorDetailsComponent },
      { path: 'addNewError', component: AddNewErrorComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },

];
