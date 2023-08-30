const socketClient = io()

//carts
const cartsContainer = document.getElementById('carts_container')


socketClient.on("carts", (carts) => {
    const allCarts = carts
      .map((objCarts) => {
        return `
          <p>
          Title: ${objCarts.title}
          Products: ${objCarts.products}
          Id: ${objCarts._id}
          </p>
          `;
      })
      .join(" ");
    cartsContainer.innerHTML = allCarts;
  });
  
