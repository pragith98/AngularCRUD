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





//------------ for dialog box
  animal: string = '';
  name: string = '';

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
//-----------------------------

}
