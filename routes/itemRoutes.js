const Item = require('../item');
const express = require('express');

const router = express.Router();

/** GET all items ROUTE, returns array of item objects */
router.get('', (req,res,next) => {
    try{
        return res.status(200).json({
            items: Item.findAll()
        })
    } catch (e) {
        return next(e);
    }
});

/** POST route, returns new item created */
router.post('', (req, res, next) => {
    try{
        const newItem = new Item(req.body.name, req.body.price);
        return res.status(201).json({item: newItem});
    } catch (e) {
        return next(e);
    }
});

/** GET route, returns a single item by name */
router.get('/:name', (req,res,next) => {
    try {
        const item = Item.find(req.params.name);
        return res.status(200).json({item});
    } catch (e) {
        return next(e);
    }
})

/** PATCH route, returns item patched */
router.patch('/:name', (req,res,next) => {
    try {
        const item = Item.patch(req.params.name, req.body);
        return res.status(200).json({item})
    } catch (e) {
        return next(e);
    }
})

/**DELETE route, returns message */
router.delete('/:name',(req,res,next) => {
    try{
        Item.delete(req.params.name);
        return res.json({message:`Deleted item ${req.params.name}`});
    }catch(e){
        return next(e);
    }
})


module.exports = router;