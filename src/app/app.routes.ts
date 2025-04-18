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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
//   { path: 'console', component: ConsoleComponent },
  { path: 'log', component: LogComponent },
  { path: 'repo', component: RepoComponent },
  {path:'console',component:BasicComponent},
    {path:'errorList',component:ErrorListComponent},
    {path:'detail',component:DetailedBlogComponent},
    {path:'detail/:id',component:DetailedBlogComponent},
    {path:'userList',component:ErrorDetailsComponent},
    {path:'addNewError',component:AddNewErrorComponent},
    {path:'history',component:HistoryComponent}

];
