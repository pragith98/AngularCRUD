import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

export interface DialogData {
  productID: number
}


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ProductService, private router: Router
  ) { }

  deleteProduct() {
    if (this.service.deleteProduct(this.data.productID)) {
      this.dialogRef.close();
      this.router.navigate(['/']);
    } else {
      console.log("error")
    }

  }


}
