import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products: any[] = []

  constructor(public dialog: MatDialog, private service: ProductService) { }


  ngOnInit(): void {
    this.service.productListNew.subscribe(Response => {
      this.products = Response
    })
  }


  getProductList() {
    this.service.fetchProducts();
  }


  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent);
  }

}
