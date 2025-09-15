import {RouterModule, Routes, withViewTransitions} from '@angular/router';
import {NotFound} from './pages/not-found/not-found';
import {NgModule} from '@angular/core';
import {Home} from './pages/home/home';
import {Work} from './pages/work/work';

export const routes: Routes = [
  {
    path: "home",
    component: Home,
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: '/home',
    pathMatch: "full"
  },
  {
    path: "work",
    component: Work,
    pathMatch: "full"
  },
  {
    path: "**",
    component: NotFound,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
