import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){}

  getProduct(){
    console.log("Made it to http.service method")
    return this._http.get('/product');
  }
  newProduct(data:Object){  //Is this a dup for my createProd?
    console.log("Made it to http.service method")
    return this._http.post('/product',data);    
  }

  addProduct(data:Object){
    console.log("Made it to http.service method")
    return this._http.post('/product', data);
  }
  delProduct(id){
    console.log("Made it to http.service method")
    return this._http.delete('/product/' +id);
  }


  edit(data){
    console.log("Made it to http.service method")
    return this._http.put('/product', data);
  }
  getById(id){
    console.log("Made it to http.service method")
    return this._http.get('/product/' +id); 
  }

}
