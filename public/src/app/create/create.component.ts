import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct: any;
  flash = null;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpService,
  ) { }

  ngOnInit() {
    this.newProduct = {title: "", price: 0, imgUrl: "" }
    // //add data
    // this.addProd()
    // console.log("It was submited  - ngOninit add/newProd", this.newProd)
    //make it go to all page to display
    
  }
  onSubmit(){
    
    this.addProduct()
    console.log("It was submited  - ngOninit create under addProd", this.addProduct)
    //this._router.navigate(['/home']);
  }

  addProduct(){
    let observable = this._httpService.newProduct(this.newProduct);
    console.log("This new product", this.newProduct)
    observable.subscribe(data => {
      console.log("AddProduct to our create !", data);

      if (data['message'] == "Success!"){
        this._router.navigate(['/prod']);
      } else {
        this.flash = data['error']['errors']['title']['message']

      }
    })
  }
}
