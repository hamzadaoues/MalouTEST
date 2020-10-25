import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpclient: HttpClient) {
  }

  /* GET ALL POSTS FROM THE API */
  getAllProducts(day) {
    console.log(environment.apiURL + 'posts_day?=' + day);
    return this.httpclient.get(environment.apiURL + 'posts_day?day=' + day, {headers}).toPromise();
  }
}
