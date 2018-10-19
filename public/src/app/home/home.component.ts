import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    // this.getProduct();
  }
  // getProduct() {
  //   let observable = this._httpService.getProd();
  //   observable.subscribe(data => {
  //     this.prod = data["data"]; //expecting sub data
  //     console.log("Got our tasks!", data);
  //   });
  // }
}
