import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";

/* Use a variable for detail routes,
   as they need to be added to the route
   map in 2 places (see below)... */
const routes = [
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
