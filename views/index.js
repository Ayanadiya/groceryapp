

window.addEventListener('DOMContentLoaded', () => {
    const listofitems=document.getElementById('listofitems');
    axios.get('http://127.0.0.1:3000/get-items').then(res=>{
        const products=res.data
        if(listofitems){
            listofitems.innerHTML='';
        }
        products.forEach(product => {
            addtolist(product);
        });
    })
    .catch(err => console.log(err))
})

function addItem(event) {
    event.preventDefault();
    const item=document.getElementById('item').value;
    const description=document.getElementById('description').value;
    const price=document.getElementById('price').value;
    const quantity=document.getElementById('quantity').value;
    if(!item || !description || !price || !quantity)
    {
        return alert("Please fill required fields");
    }
    const Item={
        item,
        description,
        price,
        quantity
}
const listofitems=document.getElementById('listofitems');
    axios.post('http://127.0.0.1:3000/add-item', Item)
    .then(res => {
        const product=res.data
        console.log(res)
        alert("Item added");
        addtolist(product);
})
    .catch(err => console.log(err));
}

function addtolist(product) {
const listofitems=document.getElementById('listofitems');
    const listitem=document.createElement('li');
    listitem.textContent=`${product.item}-${product.description}-${product.price}-${product.quantity}`
    const buyOnebtn=document.createElement('button')
    buyOnebtn.textContent='BuyOne'
    buyOnebtn.onclick = () => buy(product.id, 1);
    const buyTwobtn=document.createElement('button')
    buyTwobtn.textContent='BuyTwo'
    buyTwobtn.onclick = () => buy(product.id, 2);
    const buyThreebtn=document.createElement('button')
    buyThreebtn.textContent='BuyThree'
    buyThreebtn.onclick = () => buy(product.id, 3);
    listitem.appendChild(buyOnebtn);
    listitem.appendChild(buyTwobtn);
    listitem.appendChild(buyThreebtn);
    listofitems.appendChild(listitem);
}

function buy(productId, itemquantity)
{ 
    axios.get(`http://127.0.0.1:3000/buy/${productId}/${itemquantity}`)
    .then(res => {
        console.log(res);
        location.reload();
    })
    .catch(err => console.log(err))
}