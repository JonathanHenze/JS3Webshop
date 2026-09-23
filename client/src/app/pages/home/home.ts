import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero } from '../../components/hero/hero';
import { ProductCard } from '../../components/product-card/product-card';
import { Spot } from '../../components/spot/spot';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        Hero,
        ProductCard,
        Spot
    ],
    templateUrl: './home.html'
})

export class Home {

    products: Product[] = [];

    selectedCategory = 'Alla';
    
    hero = {
        title: 'Precious',
        text: 'Upptäck vår senaste kollektion',
        buttonText: 'Shoppa nu'
    };
    spots = [
        {
            title: 'Herr',
            image: 'https://www.skyltcentralen.se/cdn/shop/products/SE-T344-svart_dd986145-9283-43a1-ae4f-b34811be991c_448x448.png?v=1674839783',
            link: '/'
        },
        {
            title: 'Dam',
            image: 'https://www.skyltcentralen.se/cdn/shop/products/SE-T345-svart_5cbfd9b7-b76f-407d-b881-34a1a7145e26_448x448.png?v=1674839790',
            link: '/'
        },
        {
            title: 'Barn',
            image: 'https://media.istockphoto.com/id/1178790725/sv/vektor/barn-ikonen.jpg?s=612x612&w=0&k=20&c=w_6WaYKInbGmim9zYp9BeK-AiqHb6Ve39HlPK2HxdlM=',
            link: '/'
        }
    ];

    constructor(private productService: ProductService) {

        this.productService.getProducts().subscribe({

            next: (products: Product[]) => {
                this.products = products;
            },

            error: (error: unknown) => {
                console.error(error);
            }

        });
    }

    selectCategory(category: string) {
        this.selectedCategory = category;
    }

    get filteredProducts() {

        if (this.selectedCategory === "Alla") {
            return this.products;
        }

        const selectedCategory = this.normalizeCategory(this.selectedCategory);

        return this.products.filter(
            product => this.normalizeCategory(product.category) === selectedCategory
        );
    }

    private normalizeCategory(category: string) {
        return category.trim().toLowerCase().replace(/s$/, '');
    }
}