import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product as ProductModel } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard
  ],
  templateUrl: './product.html'
})

export class Product {

  product = signal<ProductModel | undefined>(undefined);

  relatedProducts = signal<ProductModel[]>([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (!slug) {
        this.product.set(undefined);
        this.relatedProducts.set([]);
        return;
      }

      this.productService.getProduct(slug).subscribe((product: ProductModel | null) => {

        if (!product) {
          this.product.set(undefined);
          this.relatedProducts.set([]);
          return;
        }

        this.product.set(product);

        this.productService.getProducts().subscribe((products: ProductModel[]) => {

          this.relatedProducts.set(
  products
    .filter(
      p =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 3)
);

        });
      });
    });
  }
}