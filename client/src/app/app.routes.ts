import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Product } from './pages/product/product';
import { Admin } from './pages/admin/admin';
import { Search } from './pages/search/search';
import { NewProduct } from './pages/admin/new-product/new-product';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'products/:slug',
    component: Product
  },
  {
    path: 'search',
    component: Search
  },
  {
    path: 'admin/products',
    component: Admin
  },
  {
    path: 'admin/products/new',
    component: NewProduct
  },
  {
    path: 'admin',
    redirectTo: 'admin/products',
    pathMatch: 'full'
  }
];