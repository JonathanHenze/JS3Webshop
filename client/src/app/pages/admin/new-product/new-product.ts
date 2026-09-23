import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './new-product.html'
})
export class NewProduct {

  newProduct = {
    name: '',
    description: '',
    image: '',
    brand: '',
    sku: '',
    price: 0,
    category: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {

        this.router.navigate(['/admin/products']);

      },
      error: (error: unknown) => {
        console.error(error);
      }
    });

  }

}