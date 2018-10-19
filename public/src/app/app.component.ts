import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { getPreviousOrParentNode } from '@angular/core/src/render3/instructions';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  newProd : any;
  constructor(
    private _router: Router,
    private _httpService: HttpService
  ){}

  ngOninit(){  
    // this.getProdFromService();
    // this.newProd = {title: "", price: "", imgUrl: ""}
    this._router.navigate(['/home']);  //IS THIS WORKING?
  }
  // getProdFromService(data){
  //   this._httpService.createdProduct(data);//Not sure I need this
  // }
}
