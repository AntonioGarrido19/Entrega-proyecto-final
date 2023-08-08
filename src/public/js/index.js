const socketClient = io();

//Add product form
const addForm = document.getElementById("add_form");
const productInput = document.getElementById("product");
const productDescription = document.getElementById("description");
const productPrice = document.getElementById("price");
const productThumbnail = document.getElementById("thumbnail");
const productCode = document.getElementById("code");
const productStock = document.getElementById("stock");
const productsContainer = document.getElementById("products_container");

//Delete product form
const deleteForm = document.getElementById("delete_product");
const productId = document.getElementById("product_id");

socketClient.on("products", (products) => {
  //console.log(products);
  const allProducts = products
    .map((objProducts) => {
      return `
        <p>
        Product: ${objProducts.title}
        Description: ${objProducts.description}
        Price: ${objProducts.price}
        Id: ${objProducts.id}
        </p>`;
    })
    .join(" ");
  productsContainer.innerHTML = allProducts;
});

addForm.onsubmit = (e) => {
  e.preventDefault();

  const newProduct = {
    title: productInput.value,
    description: productDescription.value,
    price: productPrice.value,
    thumbnail: productThumbnail.value,
    code: productCode.value,
    stock: productStock.value,
  };

  //console.log("New Product Object:", newProduct);

  socketClient.emit("newProduct", newProduct);
};

socketClient.on("added", (newProduct) => {
  const addedProductHTML = `
    <p>
    Product: ${newProduct.title}
    Description: ${newProduct.description}
    Price: ${newProduct.price}
    </p>`;

  productsContainer.innerHTML += addedProductHTML;
});

deleteForm.onsubmit = (e) => {
  e.preventDefault();
  const idProductDelete = productId.value;
  console.log("ID:", idProductDelete);

  socketClient.emit("deleteProduct", idProductDelete);
};
