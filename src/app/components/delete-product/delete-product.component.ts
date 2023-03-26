import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
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
    private service: ProductService, private router: Router, private alertService: AlertsService
  ) { }

  deleteProduct() {
    const success = this.service.deleteProduct(this.data.productID)

    if (success) {
      this.dialogRef.close();
      this.router.navigate(['/']);

      this.alertService.openSnackBar('Product deleted successfully', 'Close', 3000);
    } else {
      this.alertService.openSnackBar('Operation failed!', 'Close', 3000);
    }
  }


}
