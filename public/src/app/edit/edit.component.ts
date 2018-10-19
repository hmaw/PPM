import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  product = {
    title: "",
    price: 0,
    imgUrl: "",  //set this to not get an error
  };

  flash = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService
  ) {}

  ngOnInit() {
    //obserable here
    this._route.params.subscribe((params: Params) => { // Passing the object from the DB, but not editing it.
      console.log(" Id was passed in ngOnInit ",params['id'])

      let obserable =this._http.getById(params['id'])
      obserable.subscribe(data => {
        console.log("Got the specific data back from the server", data);
        this.product = data['data']
      })
    });
  }
  editProduct(){
    if (this.product.title.length > 4  && this.product.price < 0 && this.product.imgUrl.length > 4) { //validations
      let obserable = this._http.edit(this.product)
      obserable.subscribe(data => {
        console.log("Got the specific data back from the server", data);
        // this. = data['data'] //Don't need this?
        if (data['message'] == "Success!"){
          this._router.navigate(['/prod']);
        }
      })
    }
    else { 
      //flash error message
      this.flash = "Please make sure that all imputs are valid."
    }
  //reprs what the observalbe sees
  }
}
