import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.html'
})
export class ProductCard {

  @Input() product!: Product;

}