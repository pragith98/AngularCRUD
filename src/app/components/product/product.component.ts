import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input('product') product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    brand: '',
    category: '',
    thumbnail: '',
  };

  constructor() { }


}
