import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface ApiResponse {
  products: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productList = new BehaviorSubject<Array<any>>([]);
  productListNew = this.productList.asObservable();

  private url: string = "https://dummyjson.com/products";

  constructor(private http: HttpClient) {
    const fetchedProducts = JSON.parse(localStorage.getItem('productList') || '{}');
    if (fetchedProducts.length > 0) {
      this.productList.next(fetchedProducts);
    } else {
      this.fetchProducts()
    }
  }

  fetchProducts() {
    this.http.get<ApiResponse>(this.url).subscribe(response => {
      localStorage.setItem('productList', JSON.stringify(response.products));
      this.productList.next(response.products);
      console.log('api called!!!!!!!!!!!!!!!!!')
    })
  }

  getProduct(productID: number): Observable<any> {
    return this.productListNew.pipe(map(products => products.filter(product => product.id === productID)))
  }
}
