import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list/:id',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'register', 
    loadChildren: './register/register.module#RegisterPageModule' 
  },
  { path: 'hasil/:id', 
    loadChildren: './hasil/hasil.module#HasilPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
