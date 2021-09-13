const loadProducts = () => {
    // const url = `https://fakestoreapi.com/products`;
    fetch('data.json')
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();


const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.images;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<div class="single-product">
        <div>
      <img class="product-image" src=${product.image}></img>
        </div>
        <h3>${product.title.slice(0, 10)}</h3>
        <p>Category: ${product.category}</p>
        <h2>Price: $ ${product.price}</h2>
        <p>Rating Count : ${product.rating.count}</p>
        <small>Rating Average : ${product.rating.rate}</small>
        <br>
        <br>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger">Details</button></div>
        `;
        document.getElementById("all-products").appendChild(div);
    }
};
// add to cart money
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
    updateTotal()
};
// getting input value
const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element)
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = parseFloat(convertedOldPrice + convertPrice).toFixed(2);
    document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2));
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2));
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2));
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") + getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};