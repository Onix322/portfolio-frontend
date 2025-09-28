import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Home} from './pages/home/home';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "**",
    component: Home,
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
