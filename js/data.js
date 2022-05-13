const product = [
  {
    id: 1,
    name: "Bag",
    price: 600000,
    img: "./assets/img/product/pro1.webp",
  },
  {
    id: 2,
    name: "Chain Bag",
    price: 700000,
    img: "./assets/img/product/pro2.webp",
  },
  {
    id: 3,
    name: "Crossbody Bag",
    price: 550000,
    img: "./assets/img/product/pro3.webp",
  },
  {
    id: 4,
    name: "Deviated Flap Bag",
    price: 600000,
    img: "./assets/img/product/pro4.webp",
  },
  {
    id: 5,
    name: "Double Flap Bag",
    price: 600000,
    img: "./assets/img/product/pro5.webp",
  },
  {
    id: 6,
    name: "Hand Bag",
    price: 550000,
    img: "./assets/img/product/pro6.webp",
  },
  {
    id: 7,
    name: "Hand Bag",
    price: 550000,
    img: "./assets/img/product/pro7.webp",
  },
  {
    id: 8,
    name: "Hand Bag",
    price: 600000,
    img: "./assets/img/product/pro8.webp",
  },
  {
    id: 9,
    name: "Large Bag",
    price: 660000,
    img: "./assets/img/product/pro9.png",
  },
  {
    id: 10,
    name: "Large Bag",
    price: 700000,
    img: "./assets/img/product/pro10.png",
  },
  {
    id: 11,
    name: "Round Sole Bag",
    price: 550000,
    img: "./assets/img/product/pro11.png",
  },
  {
    id: 12,
    name: "Round Sole Bag",
    price: 550000,
    img: "./assets/img/product/pro12.webp",
  },
  {
    id: 13,
    name: "Ruffled Bag",
    price: 1000000,
    sale: 550000,
    img: "./assets/img/product/pro12.webp",
  },
  {
    id: 14,
    name: "Twisted Bag",
    price: 500000,
    img: "./assets/img/product/pro14.png",
  },
  {
    id: 15,
    name: "Wrinkled Bag",
    price: 550000,
    img: "./assets/img/product/pro15.png",
  },
  {
    id: 16,
    name: "Large Bag",
    price: 600000,
    img: "./assets/img/product/pro10.png",
  },
];
function renderItem(item) {
  let template = `
    <div class="main-product-item-img" data-id="${item.id}">
            <img src="${item.img}" alt="" />
            <div class="main-product-item-img-icon">
              <span class="icon-cart icon">
                <i class="fas fa-cart-plus"></i>
              </span>
              <span class="icon-search icon">
                <i class="fas fa-search"></i>
              </span>
              <span class="icon-heart icon">
                <i class="far fa-heart"></i>
              </span>
            </div>
    </div>
          <div class="main-product-item-name">
            <span>${item.name}</span>
          </div>
          <div class="main-product-item-price">
            <span>${item.price}</span>
            <span>đ</span>
          </div>
        
          
    `;
  return template;
}

function loadItem(arrayItem, itemCart) {
  let array = 0;
  if (arrayItem.length > itemCart.length) {
    array = itemCart.length;
  } else {
    array = arrayItem.length;
  }
  if (array == 0) {
    for (let i = 0; i < itemCart.length; i++) {
      itemCart[i].innerHTML = "";
    }
  }
  for (let i = 0; i < array; i++) {
    let item = arrayItem[i];
    itemCart[i].insertAdjacentHTML("beforeend", renderItem(item));
  }
}

function formatMoney(num) {
  return Intl.NumberFormat("vi-VN").format(num);
}

function createItem(item) {
  let template = `
      <div class="cart-center-item "   >
      <div class="cart-center-item-img" >
        <img src="${item.img}" alt="">
      </div>
      <div class="cart-center-item-info">
        <div class="cart-center-info-name">
          <span class="cart-center-info-name-js">${item.name}</span>
          <span class="cart-center-info-name-clear " data-id=${item.id}><i class="fas fa-trash-alt"></i></span>
        </div>
        <div class="cart-center-info-qty">
          <span>QTY:</span>
          <span class="cart-center-info-qty-number"> ${item.number}</span>
      
        </div>
        <div class="cart-center-info-price">
          <span class="cart-center-info-prices">${item.price}</span>
          <span>đ</span>
        </div>
      </div>
    
      </div>`;
  return template;
}
const cartCenter = document.querySelector(".cart-center");
const arrayEmpty = document.querySelector(".array-empty");
function showCart(cartCenter, arrayEmpty = "") {
  let arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || []; // lấy dữ liệu từ local
  cartCenter ? (cartCenter.innerHTML = "") : null; // reset cart
  if (arrayItem.length > 0) {
    arrayItem.forEach((item, index) => {
      cartCenter?.insertAdjacentHTML("beforeend", createItem(item));
    });
    arrayEmpty ? (arrayEmpty.textContent = "") : null;
  } else {
    arrayEmpty ? (arrayEmpty.textContent = "NO PRODUCTS") : null;
  }
}
const totalPrice = document.querySelector(".total-price");
const quantityItem = document.querySelector(".quantity-item");
const cartTopQuantity = document.querySelector(".cart-top-quantity");
function sumMoney(totalPrice = "", quantityItem = "", cartTopQuantity = "") {
  let sum = 0;
  let sumNumber = 0;
  let arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || []; // lấy dữ liệu từ local
  arrayItem.forEach((item, index) => {
    sum += item.price * item.number;
    sumNumber += item.number;
  });
  totalPrice ? (totalPrice.textContent = `${formatMoney(sum)} đ`) : null;
  quantityItem ? (quantityItem.textContent = `${sumNumber}`) : null;
  cartTopQuantity ? (cartTopQuantity.textContent = `${sumNumber}`) : null;
}
function removeItemCart(e) {
  let arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || []; // lấy dữ liệu từ local
  if (e.target.matches(".cart-center-info-name-clear i")) {
    let removeItem = e.target.parentNode.parentNode.parentNode.parentNode;
    this.removeChild(removeItem);
    let idItem = e.target.parentNode.dataset.id;
    let index = arrayItem.findIndex((value) => value.id == idItem);
    arrayItem.splice(index, 1);
    window.localStorage.setItem("listItem", JSON.stringify(arrayItem));
    sumMoney(totalPrice, quantityItem, cartTopQuantity);
    showCart(cartCenter, arrayEmpty);
  }
}
export { removeItemCart };

export { sumMoney };

export { showCart };

export { loadItem };
export { product };
export { formatMoney };
