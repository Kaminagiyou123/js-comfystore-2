// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");
let cart = getStorageItem("cart");

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
    // add item to the cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add item to the DOM;
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  //add one to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in localstorage
  setStorageItem("cart", cart);
  //more stuff comming up
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);

  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount * cartItem.price);
  }, 0);

  cartTotalDOM.textContent = `Total: ${formatPrice(amount)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart
    .map((cartItem) => {
      if (cartItem.id === id) {
        newAmount = cartItem.amount - 1;
        cartItem = { ...cartItem, amount: newAmount };
      }
      return cartItem;
    })
    .filter((cartItem) => cartItem.amount > 0);

  return newAmount;
}

function removeItem(id) {
  return cart.filter((cartItem) => cartItem.id !== id);
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    //remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      parent.parentElement.remove();
    }

    //increase

    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease

    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      parent.previousElementSibling.textContent = newAmount;
      if (newAmount < 1) {
        parent.parentElement.parentElement.remove();
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}

const init = () => {
  displayCartItemCount();
  displayCartTotal();
  displayCartItemsDOM();

  setupCartFunctionality();
};
init();
