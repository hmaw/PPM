import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css']
})
export class ProdComponent implements OnInit {

  product: Object;
  constructor(
    private _route: ActivatedRoute,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    let observable = this._httpService.getProduct();
    observable.subscribe(data => {
      this.product = data["data"]; //expecting sub data
      console.log("Got our Product in prod.comp.ts!", data);
    });

  }
  delProduct(id) {
    console.log("id deleting in delProduct prodcomp.ts", id)
    let observableDel = this._httpService.delProduct(id);
    
    observableDel.subscribe(data => {
      console.log("Got our product in prodcomptsto delete!", data);
      this.delProduct = data["data"];
      this.getProduct(); //refresh list after a delete
    }); //subscrible to obserabl
  }
  editProduct(id){
    

  }

}
