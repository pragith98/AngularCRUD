import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home-page/home.component';
import { ProductPageComponent } from './views/product-page/product-page.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'product' , component:ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
