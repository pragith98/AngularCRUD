import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface ApiResponse {
  products: any[];
}

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productList = new BehaviorSubject<Array<any>>([]);
  productListNew = this.productList.asObservable();

  private url: string = "https://dummyjson.com/products";

  constructor(private http: HttpClient) {
    this.getProductsFromLocalStorage()
  }

  getProductsFromLocalStorage() {
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

  deleteProduct(productID: number) {
    let productList: Product[] = JSON.parse(localStorage.getItem('productList') || '[]');
    let selectedProduct = productList.findIndex(item => item.id === productID);
    let deletedProduct = productList.splice(selectedProduct, 1);
    localStorage.setItem('productList', JSON.stringify(productList));

    this.getProductsFromLocalStorage()

    return deletedProduct;
  }

  addNewProduct(newProduct: any, image: any): boolean {
    try {
      let productList: Product[] = JSON.parse(localStorage.getItem('productList') || '[]');
      newProduct.id = productList.length + 1;
      newProduct.thumbnail = image;
      productList.push(newProduct);

      localStorage.setItem('productList', JSON.stringify(productList));

      this.getProductsFromLocalStorage()
      return true;

    } catch (error) {
      return false;
    }
  }

  editProduct(product: any, image: any,productID:number): boolean {
    try {
      let productList: Product[] = JSON.parse(localStorage.getItem('productList') || '[]');
      let selectedProduct = productList.findIndex(item => item.id === productID);

      productList[selectedProduct].title = product.title;
      productList[selectedProduct].category = product.category;
      productList[selectedProduct].brand = product.brand;
      productList[selectedProduct].price = product.price;
      productList[selectedProduct].description = product.description;

      image? productList[selectedProduct].thumbnail = image: false;

      localStorage.setItem('productList', JSON.stringify(productList));

      this.getProductsFromLocalStorage()
      return true;

    } catch (error) {
      return false;
    }

  }
}
