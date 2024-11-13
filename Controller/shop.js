const Products=require('../Models/shop');

exports.addProduct = ((req,res,next) => {
    const title=req.body.item;
    const desc=req.body.description;
    const price=req.body.price;
    const quantity=req.body.quantity;
    Products.create({
        title:title,
        description:desc,
        price:price,
        quantity:quantity
    }).then(result => {
        console.log('Item added');
        return res.json(result);
    }).catch(err => console.log(err));
})

exports.getProducts=((req, res, next) => {
    Products.findAll()
    .then(result => {
        res.json(result);
    })
    .catch(err => console.log(err));
});

exports.buyProducts=((req,res, next) => {
    const id=req.params.productId;
    const number=req.params.itemquantity;
    Products.findByPk(id)
    .then(product => {
        if(!product)
        {
            return res.status(404).json({ message: "Product not found" });
        }
        if(number<=product.quantity)
        {
            product.quantity=product.quantity-number;
            product.save().then(updatedproduct =>{
                res.json(updatedproduct);
            })
        }
        else
        {
            res.status(400).json({ message: "Requested quantity exceeds available stock" });
        }
    })
    .catch(err => console.log(err));
})