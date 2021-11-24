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

app.get("/", function(req, res){
 Item.find({}, function(err, foundItems) {
     if(foundItems.length == 0) {
        Item.insertMany(defaultItems, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("saved!!")
            }
        })
        res.redirect("/")
     } else {
    res.render("list", {listTitle: "Today", newListItems: foundItems}) 
     }
 })
})

app.post("/", function(req, res){
    let itemName = req.body.newItem
    const item = new Item({
        name: itemName
    })
    item.save()
    res.redirect("/")
}) 

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})


app.listen(3000, function(){
    console.log("Server started")
})