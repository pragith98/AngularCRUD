import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: any;
  productID: number = 0;

  constructor(private service: ProductService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.productID = +param['id'];
      this.getProductData()
    })
  }

  getProductData() {
    this.service.getProduct(this.productID).subscribe(Response => {
      this.product = Response[0]
    })
  }


  openDeleteDialog(): void {
    this.dialog.open(DeleteProductComponent, {
      data: { productID: this.productID },
    });
  }
}
