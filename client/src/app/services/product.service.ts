// importerar Injectable så servicen kan användas i andra delar av angular
import { Injectable } from '@angular/core';

// importerar HttpClient så den kan skicka http-anrop till backend
import { HttpClient } from '@angular/common/http';

// importerar Observable som används när vi hämtar data asynkront
import { Observable } from 'rxjs';

// importerar vår Product-typ
import { Product } from '../models/product';

// gör servicen tillgänglig i hela appen
@Injectable({
    providedIn: 'root'
})
// skapar product service
export class ProductService {
// adressen till backendens products-endpoint
    private apiUrl = 'http://localhost:3000/api/products';

// gör HttpClient tillgänglig i servicen
    constructor(private http: HttpClient) {}

// hämtar alla produkter från backend.,
    getProducts(): Observable<Product[]> {

        // skickar ett GET-anrop och förväntar oss en lista med produkter
        return this.http.get<Product[]>(this.apiUrl);
    }
}