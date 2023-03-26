import { Component, Inject } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductService } from 'src/app/services/product.service';

export interface DialogData {
  id: number,
  title: string,
  description: string,
  price: number,
  brand: string,
  category: string,
  thumbnail: string,
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: ProductService, private alertService: AlertsService) { }

  productID: number = this.data.id;
  selectedFile: any;
  image = new FormControl('');
  title = new FormControl(this.data.title, [Validators.required]);
  price = new FormControl(this.data.price, [Validators.required, Validators.min(0)]);
  brand = new FormControl(this.data.brand, [Validators.required]);
  category = new FormControl(this.data.category, [Validators.required])
  description = new FormControl(this.data.description, [Validators.required]);

  myForm = new FormGroup({
    image: this.image,
    title: this.title,
    price: this.price,
    brand: this.brand,
    category: this.category,
    description: this.description

  })

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

  }

  submitForm() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {
        const image = reader.result as string;
        const success = this.service.editProduct(this.myForm.value, image, this.productID)

        if (success) {
          console.log("product update")
        } else {
          console.log('error')
        }
      }

    } else {
      const success = this.service.editProduct(this.myForm.value, '', this.productID)

      if (success) {
        this.alertService.openSnackBar('Product edited successfully', 'Close', 3000);
        this.dialogRef.close();
      } else {
        this.alertService.openSnackBar('Operation failed!', 'Close', 3000);
      }
    }

  }
}
