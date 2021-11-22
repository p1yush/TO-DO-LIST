const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

const itemSchema = {
    name: String
}

const Item = mongoose.model("item", itemSchema)

const item1 = new Item({
    name: "Welcome to your todolist"
})

const defaultItems = [item1]

Item.insertMany(defaultItems, function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log("saved!!")
    }
})

app.get("/", function(req, res){
 res.render("list", {listTitle: "Today", newListItems: items}) 
})

app.post("/", function(req, res){
    let item = req.body.newItem
    if(req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    }
    else {
        items.push(item)
        res.redirect("/")
    }
}) 

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})


app.listen(3000, function(){
    console.log("Server started")
})