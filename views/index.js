

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
    .catch(err => {
        console.log(err);
        alert(err);
    })
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
    .catch(err => {
        console.log(err);
        alert(err);
    });
}

function addtolist(product) {
const listofitems=document.getElementById('listofitems');
    const listitem=document.createElement('li');
    listitem.textContent=`${product.title}-${product.description}-${product.price}Rs-${product.quantity}Nos`
    const buyOnebtn=document.createElement('button')
    buyOnebtn.textContent='BuyOne'
    buyOnebtn.onclick = () => buy(listitem,product.id, 1);
    const buyTwobtn=document.createElement('button')
    buyTwobtn.textContent='BuyTwo'
    buyTwobtn.onclick = () => buy(listitem,product.id, 2);
    const buyThreebtn=document.createElement('button')
    buyThreebtn.textContent='BuyThree'
    buyThreebtn.onclick = () => buy(listitem,product.id, 3);
    listitem.appendChild(buyOnebtn);
    listitem.appendChild(buyTwobtn);
    listitem.appendChild(buyThreebtn);
    listofitems.appendChild(listitem);
}

function buy(listitem,productId, itemquantity)
{ 
    axios.get(`http://127.0.0.1:3000/buy/${productId}/${itemquantity}`)
    .then(res => {        
        const updatedproduct=res.data;
        updatelist(listitem, updatedproduct);
        alert("Product bought Successfully");
    })
    .catch(err => {
        if(err.response.status===400)
        {
            alert("Requested quantity is not available");
        }
        else{
            alert(err);
        }
    })
}

function updatelist(listitem,updatedproduct) {
    listitem.innerHTML='';
    listitem.textContent=`${updatedproduct.title}-${updatedproduct.description}-${updatedproduct.price}Rs-${updatedproduct.quantity}Nos`
    const buyOnebtn=document.createElement('button')
    buyOnebtn.textContent='BuyOne'
    buyOnebtn.onclick = () => buy(listitem,updatedproduct.id, 1);
    const buyTwobtn=document.createElement('button')
    buyTwobtn.textContent='BuyTwo'
    buyTwobtn.onclick = () => buy(listitem,updatedproduct.id, 2);
    const buyThreebtn=document.createElement('button')
    buyThreebtn.textContent='BuyThree'
    buyThreebtn.onclick = () => buy(listitem,updatedproduct.id, 3);
    listitem.appendChild(buyOnebtn);
    listitem.appendChild(buyTwobtn);
    listitem.appendChild(buyThreebtn);
}