import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { CoinDetailsComponent } from './components/views/coin-details/coin-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: '',
      component: SearchComponent
    }]
  },
  {
    path: 'coin/:id',
    component: CoinDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
