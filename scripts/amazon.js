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
          <select>
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

        <div class="added-to-cart">
          <img alt="product-image" src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>
  `;
});

// display the results on the webpage using a query selector
document.querySelector('.js-products-grid').innerHTML = productHtml;
