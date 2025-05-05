let cart = {};

// shorthand for $(document).ready(function() { ... });
$(function () {
  displayCards();

  // get number of movies in cart
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));

  // display number of items in html
  if (productNumbers) {
    $(".itemCount").text(productNumbers);
  }

  //
  displayCart();

  cart = $(".superduper-button").get();
  for (let i = 0; i < cart.length; i++) {
    $(cart[i]).on("click", function () {
      addItem(products[i]);
      totalCost(products[i]);
    });
  }
});

// array of objects for movies. Hardcoded as per specification. The posters are file paths to folder inside project

let products = [
  {
    id: 1,
    name: "Spiderman",
    director: "Sam Raimi",
    runtime: "2h 1m",
    release_year: 2002,
    description:
      "Peter Parker's life changes when he is bitten by a genetically altered spider and gains superpowers. He uses his powers to help people and finds himself facing the Green Goblin, an evil maniac.",
    poster: "./images/spiderman_poster.jpg",
    cinema: 1,
    price: 20,
    inCart: 0,
  },
  {
    id: 2,
    name: "Pulp Fiction",
    director: "Quentin Tarantino",
    runtime: "2h 34m",
    description:
      "In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.",
    poster: "./images/pulp_fiction_poster.jpg",
    release_year: 1994,
    cinema: 2,
    price: 25,
    inCart: 0,
  },
  {
    id: 3,
    name: "Shrek",
    director: "Vicky Jenson, Andrew Adamson",
    runtime: "1h 30m",
    release_year: 2001,
    description:
      "Shrek, an ogre, embarks on a journey with a donkey to rescue Princess Fiona from a vile lord and regain his swamp.",
    poster: "./images/shrek_poster.jpg",
    cinema: 3,
    price: 30,
    inCart: 0,
  },
  {
    id: 4,
    name: "Puss in Boots",
    director: "Chris Miller",
    runtime: "1h 30m",
    release_year: 2011,
    description:
      "Puss teams up with his friends, Humpty Dumpty and Kitty Softpaws, in order to defeat two criminals, Jack and Jill, and retrieve the magical beans that they possess.",
    poster: "./images/puss_in_boots_poster.jpg",
    cinema: 4,
    price: 15,
    inCart: 0,
  },
];

// function that will increase the number of items in cart. Display at top will change and the items will be set in the localStorage (setItems function is called at end)
function addItem(product) {
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    $(".itemCount").text(productNumbers + 1);
  } else {
    localStorage.setItem("cartNumbers", 1);
    $(".itemCount").text(1);
  }

  setItems(product);
}

// function to add product to object list in localStorage
function setItems(product) {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

  if (productsInCart) {
    // if item is not in localstorage add it, otherwise just increment inCart
    if (!productsInCart[product.id]) {
      // use rest operator (research)
      productsInCart = {
        ...productsInCart,
        [product.id]: product,
      };
    }
    productsInCart[product.id].inCart += 1;
  } else {
    product.inCart = 1;

    productsInCart = {
      [product.id]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

function totalCost(product) {
  let cartTotal = parseInt(localStorage.getItem("totalCost"));

  if (cartTotal) {
    localStorage.setItem("totalCost", cartTotal + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

// function to increase products in cart (clicking on blue arrow). Various parts need to be updated such as the quantity in table, Total Cost, Total and Number in Cart
function IncreaseProduct(element) {
  let productItems = JSON.parse(localStorage.getItem("productsInCart"));
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  var prodId = element.getAttribute("data-id");
  let cartTotal = parseInt(localStorage.getItem("totalCost"));
  var cartAdd = productItems[prodId].price;

  if (cartTotal) {
    localStorage.setItem("totalCost", cartTotal + cartAdd);
  } else {
    localStorage.setItem("totalCost", productItems[prodId].price);
  }

  var data = window.localStorage.getItem("productsInCart");
  if (data != null) {
    let cart = JSON.parse(data);
    cart[prodId].inCart = cart[prodId].inCart + 1;
    window.localStorage.setItem("productsInCart", JSON.stringify(cart));
  }
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    $(".itemCount").text(productNumbers + 1);
  } else {
    localStorage.setItem("cartNumbers", 0);
    $(".itemCount").text(0);
  }

  displayCart();
}

// function to decrease products in cart (clicking on blue arrow). Various parts need to be updated such as the quantity in table, Total Cost, Total and Number in Cart
function DecreaseProduct(element) {
  let productItems = JSON.parse(localStorage.getItem("productsInCart"));
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  var prodId = element.getAttribute("data-id");
  let cartTotal = parseInt(localStorage.getItem("totalCost"));
  var cartRemove = productItems[prodId].price;
  var quantity = productItems[prodId].inCart - 1;

  if (cartTotal) {
    localStorage.setItem("totalCost", cartTotal - cartRemove);
  } else {
    localStorage.setItem("totalCost", productItems[prodId].price);
  }
  var data = window.localStorage.getItem("productsInCart");
  if (data != null) {
    let cart = JSON.parse(data);
    cart[prodId].inCart = cart[prodId].inCart - 1;
    window.localStorage.setItem("productsInCart", JSON.stringify(cart));
  }
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    $(".itemCount").text(productNumbers - 1);
  } else {
    localStorage.setItem("cartNumbers", 0);
    $(".itemCount").text(0);
  }

  if (quantity == 0) {
    DeleteProduct(element);
  }

  displayCart();
}

// function to remove product from table
function DeleteProduct(element) {
  let productItems = JSON.parse(localStorage.getItem("productsInCart"));
  let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
  let cartTotal = parseInt(localStorage.getItem("totalCost"));
  var prodId = element.getAttribute("data-id");
  var totalsRemove = productItems[prodId].price * productItems[prodId].inCart;
  var cartRemove = productItems[prodId].inCart;
  delete productItems[prodId];

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers - cartRemove);
    $(".itemCount").text(productNumbers - cartRemove);
  } else {
    localStorage.setItem("cartNumbers", 0);
    $(".itemCount").text(0);
  }
  if (cartTotal) {
    localStorage.setItem("totalCost", cartTotal - totalsRemove);
  } else {
    localStorage.setItem("totalCost", 0);
  }
  localStorage.setItem("productsInCart", JSON.stringify(productItems));
  displayCart();
}

// function to display cart in table
function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let totalCost = parseInt(localStorage.getItem("totalCost"));
  $("#table-body").empty();
  $("#table-footer").empty();
  if (cartItems) {
    for (var i in cartItems) {
      console.log(cartItems[i]);
      $(".table-body").append(
        `<tr>` +
          `<td><span class="remove-item" style="color:red;"><i class="fa-solid fa-circle-xmark fa-lg" onclick="DeleteProduct(this)" data-id="${cartItems[i].id}"></i></span> ${cartItems[i].name}</td>` +
          `<td>${cartItems[i].price}</td>` +
          `<td><span class="increase" style="color:#89cff0"><i class="fa-solid fa-circle-left fa-lg" onclick=DecreaseProduct(this) data-id="${cartItems[i].id}"></i></span> ${cartItems[i].inCart} <span class="decrease" style="color:#89cff0"><i class="fa-solid fa-circle-right fa-lg" onclick=IncreaseProduct(this) data-id="${cartItems[i].id}"></i></span></td>` +
          `<td>R${cartItems[i].price * cartItems[i].inCart},00</td>` +
          `</tr>`
      );
    }
    $(".table-footer").append(
      `<tr>` +
        `<td></td>` +
        `<td></td>` +
        `<td><b>Total:</b></td>` +
        `<td style="color:red;">R${totalCost},00</td>` +
        `</tr>`
    );
  } else {
    $(".table-body").html("<h3 class='my-3'>No movies in your cart.</h3>");
  }
}

// Code to call the modal. Note the data being passed inside using the hardcoded array of objects.

var myModal = document.getElementById("exampleModal");

myModal.addEventListener("shown.bs.modal", function (e) {
  const product = products[e.relatedTarget.id - 1];
  $(".modal-title").html(product.name);
  $(".modal-body").html(`<p><b>Title:</b> ${product.name}</p>
  <p><b>Director/s:</b> ${product.director}</p>
  <p><b>Release Year:</b> ${product.release_year}</p>
  <p><b>Runtime:</b> ${product.runtime}</p>`);
});

// function to dynamically display the movie cards in the html. Note the data being passed inside using the hardcoded array of objects.
function displayCards() {
  for (let i = 0; i < products.length; i++) {
    $(".row").append(
      `
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
      <div class="card h-100">
        <div class="card-header">Cinema ${products[i].cinema}</div>
        <img 
          src="${products[i].poster}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${products[i].name}</h5>
          <p class="card-text">
          ${products[i].description}
          
          </p>
        </div>
        <div>
        <h5 style="text-align:right; padding:10px;">R${products[i].price},00</h5>
        </div>
        <div class="card-footer">
          <p class="card-text">
            <button
              class="btn btn-outline-primary my-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              id="${products[i].id}"
            >
              <i class="bi bi-eye-fill"></i> Show Details
            </button>
            <button class="btn btn-success text-white superduper-button">
              <i class="bi bi-cart-plus"></i>BOOK TICKET
            </button>
          </p>
        </div>
      </div>
    </div>
      `
    );
  }
}
