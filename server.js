
// =-=-=-=-=- Express -=-=-=-=- //
var express = require('express');
var app = express();

// =-=-=-=-=- Mongoose -=-=-=-=- //
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product', {useNewUrlParser: true}); // name of DataBase!!!!

//Use Native Promises
mongoose.Promise = global.Promise;

// Require path
var path = require('path');

// Integrate body-parser with our App

const bodyParser = require("body-parser");

// -=-=-=-=-=-=-=-=-=-=-=-=- Use static folder directory -=-=-=-=-=-=-=-=-=-//
//app.use(express.static(path.join(__dirname, 'static'))); dup
// app.use(express.static(__dirname + "/static"));Altered for static anglar files
app.use(express.static( __dirname + '/public/dist/public' ));

// -=-=-=-=-=-=-=-=-=-=-=-=- // Setting our View Engine location -=-=-=-=-=-=-=-=-=-//
//app.set('views', path.join(__dirname, './views')); now in json

// -=-=-=-=-=-=-=-=-=-=-=-=- Setting up SCHEMAs -=-=-=-=-=-=-=-=-=-//
//var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Title must be longer than 4 chars"], minlength: [4, "Title must be at least 4 chars long"]}, //validations added so that no empty fields are permitted
    // desc: {type: String, default: "", required: [true, "descriptions must be longer than 1 chars"], minlength: [1, "descriptions must be at least 1 chars long"]}, //validations added so that no empty fields are permitted
    price: { type: Number, required: [true, "Product must have a price"]},
    imgUrl: { type: String }, //Not required
    // comp: {type: Boolean, required: [false, "false is not, true means that it is done"]}, 
    },{ timestamps: true });

//-=-=-=-=-=- Store models in variables
mongoose.model("Product", ProductSchema); // make collection

// -=-=-=-=- Set models by passing the schemas -=-=-=-=--=//

var Product = mongoose.model("Product"); //store collection inside

// ================================== ROUTES!!! ===============================//

app.use(bodyParser.json());

//GET ALL -

app.get('/product', function(req, res){
    Product.find({}, function(err, data){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
            console.log('Success - get in app.get - get all');
            res.json({message: "Success", data: data})
        }
    })
})

//GET by Id
app.get('/product/:id', function(req, res){
    Product.findById(req.params.id, function(err, data){
        if(err){
            console.log("Returned error Getting by ID", err);
             // respond with JSON
            res.json({message: "Returned error Getting by ID", error: err})
         }
         else {
             // respond with JSON
             console.log('Success - get in app.get - get by id!');
             res.json({message: "Success got data in app.get by id", data: data})
         }
    })
})

// //POST -

app.post('/product/', function(req, res){
    console.log("Posting in a new Prod: ", req.body);
    Product.create(req.body, function(err, data){
        if(err){
            // handle the error from creating a blog
            //console.log("Something went wrong in - saving task/post", err);
            res.json({message: "Error - Posting in a  new prod", error: err})
        }
        else {
            console.log('Success - Posting in app.post - new prod!');
            res.json({message: "Success!", data:data})
        }
    })    
})

//PUT by id - corrected
app.put('/product/', function(req, res){
    console.log("ADDing in a name: ", req.body);
    //Product.create(req.body, function(err, data){
    Product.findByIdAndUpdate({_id: req.body._id}, {$set:{title: req.body.title, price: req.body.price, imgUrl: req.body.imgUrl}}, function(err, data){
        if(err){
            // handle the error from creating a blog
            console.log("Something went wrong in - app.put Putting in an ID", err);
            res.json({message: "Error", error: err})
        }
        else {
            console.log('Success - Posting app.put in a Task by ID!');
            res.json({message: "Success!", data:data})
        }
    })
})

//DELETE by id ?
app.delete('/product/:id', function(req, res){
    console.log("deleting by id, in a name: ", req.body);
    Product.findByIdAndDelete(req.params.id, function(err, data){
        if(err){
            // handle the error from creating a blog
            console.log("Something went wrong in - app.delete Deleting by ID", err);
            res.json({message: "Error", error: err});
        }
        else {
            console.log('successfully Deleted!');
            res.json({message: "Success!", data:data});
        }
    })    
})

// this route will be triggered if any of the routes above did not match
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});


// -=-=-=-=-=-=-=-Setting our Server to Listen on Port: 8000 -=-=-=-=-
app.listen(8000, function() {
    console.log("Board is running, listening on port 8000");
    });  



