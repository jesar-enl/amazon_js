/**
 * Generates HTML elements dynamically based on the data in the `products` array.
 * Handles adding products to a shopping cart and displaying a notification when a product is added.
 *
 * @param {Array} products - An array of objects representing the products.
 * @param {Array} cart - An array representing the shopping cart.
 * @returns {void}
 */

// We are loading data from the `./data/products.js` file which contains
// all the products we have in store for the project

// variable to store the product details and display them on the webpage
let productHtml = '';

// loop through the array and add the results to the variable
products.forEach((product) => {
  productHtml += `
    <div class="product-container">
        <div class="product-image-container">
          <img alt="product-image" class="product-image"
            src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img alt="product-image" class="product-rating-stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart added-to-cart-${product.id}">
          <img alt="product-image" src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary add-to-cart" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
  `;
});

// display the results on the webpage using a query selector
document.querySelector('.js-products-grid').innerHTML = productHtml;

const messageTimeouts = {};

// add interactivity
document.querySelectorAll('.add-to-cart').forEach((button) => {
  /* 
  Each time we run the loop, it will create
  a new variable called addedMessageTimeoutId and do
  button.addEventListener().
  
  */
  let messageTimeoutsId;

  button.addEventListener('click', () => {
    // this tells the server which item to add to the cart
    const { productId } = button.dataset;

    let matchingItem;

    // push the added product to the cart
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    const quantitySelector = document.querySelector(
      `.quantity-selector-${productId}`
    );

    // get the value of the class and convert it to a number
    const quantity = Number(quantitySelector.value);

    // if already in cart, increase the qty
    if (matchingItem) {
      matchingItem.quantity += quantity; // update the cart using this value
    } else {
      // if not, add it
      cart.push({
        productId,
        quantity, // update the cart with this new value
      });
    }

    // calculate the total qty
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-qty').innerHTML = cartQuantity;

    // notify the user that the product is added to the cart
    const message = document.querySelector(`.added-to-cart-${productId}`);

    // add a class to make the message visible
    message.classList.add('added-to-cart-visible');

    // remove the class after 2seconds

    // check if there's a previous timeout for this product.
    const previousTimeoutId = messageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      message.classList.remove('added-to-cart-visible');
    }, 2000);

    //save the timeoutId for the porduct so we can stop it later
    messageTimeouts[productId] = timeoutId;
  });
});
