import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard
  ],
  templateUrl: './search.html'
})
export class Search {

  
  searchText = '';

  
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.route.queryParams.pipe(
      map(params => (params['q'] || '').trim()),
      switchMap(searchText => {
        this.searchText = searchText;

        return this.productService.getProducts().pipe(
          map(products => products.filter(product =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
          ))
        );
      })
    ).subscribe(products => {
      this.products = products;
      this.changeDetectorRef.markForCheck();
    });
  }
}