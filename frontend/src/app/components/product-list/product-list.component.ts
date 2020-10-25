import {Component, OnInit} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {ApiService} from '../../services/apiService';
import {Observable, range} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[];
  totalItems: number;
  startIndex: number;
  endIndex: number;
  currentPartition: number;
  PaginatedproductList: ProductModel[];
  nbPartition: number;
  public range: Observable<number>;
  public numbers: number[];
  public loading: boolean;
  public date: any;
  public topicsPourcentage = {};

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

  }

  changePagination(partition) {
    console.log('here');
    this.currentPartition = partition;
    this.startIndex = 5 * (partition - 1) + 1;
    if (this.totalItems <= partition * 5) {
      this.endIndex = this.totalItems;
    } else {
      this.endIndex = this.startIndex + 4;
    }
    this.PaginatedproductList = this.productList.slice(this.startIndex, this.endIndex);
    console.log(this.startIndex);
    console.log(this.endIndex);
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  getData() {
    const date = this.formatDate(this.date);
    console.log(date);
    this.spinner.show();
    this.apiService.getAllProducts(date).then((data: any) => {
      this.productList = data.map((product: any) => {
        // tslint:disable-next-line:max-line-length
        return new ProductModel(product.id, product.name, product.tagline, product.category_id, product.created_at, product.makers, product.thumbnail.image_url, product.user.username, product.comments_count, product.votes_count, product.topics);
      });
      this.spinner.hide();
      this.totalItems = this.productList.length;
      // tslint:disable-next-line:no-bitwise
      this.nbPartition = ~~(this.totalItems / 5);
      this.numbers = Array(this.nbPartition).fill(0).map((x, i) => i + 1);
      this.changePagination(1);
      this.createTopicsPourcentage();
    });
  }

  createTopicsPourcentage() {
    this.topicsPourcentage = {};
    for (let i = 0; i < this.productList.length; i++) {
      const topics: any = this.productList[i].topics;
      for (let j = 0; j < topics.length; j++) {
        if (this.topicsPourcentage[topics[j].name] === undefined) {
          this.topicsPourcentage[topics[j].name] = 1;
        } else {
          this.topicsPourcentage[topics[j].name] += 1;
        }

      }
      //  if (this.topicsPourcentage[thi])

    }
    console.log(this.topicsPourcentage);
  }

}
