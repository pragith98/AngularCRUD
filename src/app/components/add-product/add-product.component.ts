import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent {

  constructor(public dialogRef: MatDialogRef<AddProductComponent>, private service: ProductService, private alertService: AlertsService) { }

  selectedFile: any;
  image = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required, Validators.min(0)]);
  brand = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required]);

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
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const image = reader.result as string;
      const success = this.service.addNewProduct(this.myForm.value, image)

      if (success) {
        this.alertService.openSnackBar('Product added successfully', 'Close', 3000);
        this.dialogRef.close();
      } else {
        this.alertService.openSnackBar('Operation failed!', 'Close', 3000);
      }
    }

  }

}
