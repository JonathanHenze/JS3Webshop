import { Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  readonly products = signal<Product[]>([]);

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.products.set(products))
    );
  }
  
  addProduct(product: Omit<Product, 'id' | 'slug'>): Observable<Product> {

    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(createdProduct => {
        this.products.update(products => [...products, createdProduct]);
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.products.update(products =>
          products.filter(product => product.id !== id)
        );
      })
    );
  }

  getProduct(slug: string): Observable<Product> {

    return this.http.get<Product>(`${this.apiUrl}/${slug}`);
  }
}