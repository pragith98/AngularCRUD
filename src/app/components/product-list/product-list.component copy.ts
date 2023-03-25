// import { Component, OnInit } from '@angular/core';
// import { ProductService } from 'src/app/services/product.service';
// // import {MatDialog} from '@angular/material/dialog';
// // import { AddProductComponent } from '../add-product/add-product.component';



// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.scss']
// })

// export class ProductListComponent implements OnInit {

//   products: any[] = [];

//   constructor(private service: ProductService) { }


//   ngOnInit(): void {
//     //this.getProductList();
//   }


//   getProductList() {
//     this.service.getProducts().subscribe(response => {
//       this.products = response.products;
//     })
//   }






//   // animal: string='';
//   //   name: string='';
//   // constructor(public dialog: MatDialog) {}

//   // openDialog(): void {
//   //   const dialogRef = this.dialog.open(AddProductComponent, {
//   //     data: {name: this.name, animal: this.animal},
//   //   });

//   //   dialogRef.afterClosed().subscribe(result => {
//   //     console.log('The dialog was closed');
//   //     this.animal = result;
//   //   });
//   // }
//   openDialog(): void { }

// }
