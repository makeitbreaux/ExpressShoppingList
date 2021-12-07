const express = require("express")
const router = new express.Router()
const ExpressError = require("./expressError")
const items = require("./fakeDB")

// CATS = ITEMS

router.get("/", function(req,res){
    res.json({items})
  })

router.post("/", function (req, res,next) {
    try{
      if(!req.body.name) throw new ExpressError("Name and Price required", 400);
      const newItem = {name: req.body.name, price: req.body.price}
      items.push(newItem)
      return res.status(201).json({ item: newItem })
    } catch(error) {
      return next(error)
    }
})

router.get("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name, item => item.price === req.params.price)
    if(foundItem === undefined){
      throw new ExpressError("Item not found", 404)
    }
    res.json({ item: foundItem })
  })

router.patch("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name, item => item.price === req.params.price)
    if(foundItem === undefined){
      throw new ExpressError("Item not found", 404)}
    foundItem.name = req.body.name
    foundItem.price = req.body.price 
    res.json({ item: foundItem })
  })

router.delete("/:name", function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
  })  

module.exports = router;