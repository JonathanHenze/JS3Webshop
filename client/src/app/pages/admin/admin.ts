import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin.html'
})
export class Admin {

  private readonly productService = inject(ProductService);
  readonly products = this.productService.products;

  constructor() {

    this.productService.getProducts().subscribe({
      error: (error: unknown) => {
        console.error(error);
      }
    });

  }
  deleteProduct(id: number) {

    this.productService.deleteProduct(id).subscribe({
      error: (error: unknown) => {
        console.error(error);
      }
    });

  }

}