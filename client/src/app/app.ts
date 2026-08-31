// importerar component
import { Component } from '@angular/core';

// importerar commonmodule
import { CommonModule } from '@angular/common';

// importerar product service
import { ProductService } from './services/product.service';

// importerar product typen
import { Product } from './models/product';

// skapar komponenten
@Component({
  selector: 'app-root',

  // gör komponenten standalone
  standalone: true,

  // importerar commonmodule
  imports: [CommonModule],

  // kopplar html filen
  templateUrl: './app.html',

  // kopplar css filen
  styleUrls: ['./app.css']
})

export class App {

  // skapar en tom lista för produkterna
  products: Product[] = [];

  // gör så vi kan använda product service
  constructor(private productService: ProductService) {

    // hämtar produkterna från backend
    this.productService.getProducts().subscribe({

      // körs när vi får tillbaka produkterna
      next: (products: Product[]) => {

        // skriver ut produkterna i console
        console.log(products);

        // sparar produkterna i listan
        this.products = products;
      },

      // körs om något går fel
      error: (error: unknown) => {

        // skriver ut felet i console
        console.error(error);
      }
    });
  }
}