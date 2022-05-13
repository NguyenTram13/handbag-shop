import {
  product,
  loadItem,
  formatMoney,
  showCart,
  sumMoney,
  removeItemCart,
} from "./data.js";

window.addEventListener("load", function () {
  const mainProductItem = document.querySelectorAll(".main-product-item");
  const totalPrice = document.querySelector(".total-price");
  const quantityItem = document.querySelector(".quantity-item");
  const cartTopQuantity = document.querySelector(".cart-top-quantity");
  console.log(mainProductItem);
  loadItem(product, mainProductItem);

  const productContainerBtn = document.querySelector(".product-container-btn");
  const productContainerBtnB = document.querySelector(
    ".product-container-btn button"
  );
  console.log(productContainerBtnB);
  console.log(productContainerBtn);

  const heightAuto = document.querySelector(".main-product");
  productContainerBtn?.addEventListener("click", function () {
    window.location.href = "./product.html";
  });

  // active cart

  const cart = document.querySelector(".cart");
  const modelCart = document.querySelector(".model-cart");
  const clear = document.querySelector(".clear i");
  const clearcontainer = document.querySelector(".clear");
  const cartContainer = document.querySelector(".cart-container");
  console.log(clear);
  cart?.addEventListener("click", function (e) {
    modelCart.classList.add("active");
  });
  clearcontainer?.addEventListener("click", function (e) {
    modelCart.classList.remove("active");
  });
  clear?.addEventListener("click", function (e) {
    modelCart.classList.remove("active");
  });
  modelCart?.addEventListener("click", function (e) {
    modelCart.classList.remove("active");
  });
  cartContainer?.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // add cart

  let arrayItem = [];
  function handleAddCart(e) {
    arrayItem = JSON.parse(window.localStorage.getItem("listItem")) || [];
    if (e.target.matches(".icon-cart") || e.target.matches(".icon-cart i")) {
      let item = {
        id: +this.querySelector(".main-product-item-img").dataset.id,
        img: this.querySelector(".main-product-item-img img").src,
        name: this.querySelector(".main-product-item-name span").textContent,
        price: +this.querySelector(
          ".main-product-item-price span:nth-child(1)"
        ).textContent.trim(),
        number: 1,
      };
      let index = -1;
      if (arrayItem.length > 0) {
        index = arrayItem.findIndex((value) => value.id === item.id);
      }

      if (index > -1) {
        let newnumber = arrayItem[index].number + item.number;
        arrayItem[index].number = newnumber;
      } else {
        if (index == -1 || arrayItem.length == 0) {
          arrayItem.push(item);
        }
      }

      window.localStorage.setItem("listItem", JSON.stringify(arrayItem));
      sumMoney(totalPrice, quantityItem, cartTopQuantity);
    }
  }
  //gio hang

  const cartCenter = document.querySelector(".cart-center");
  const arrayEmpty = document.querySelector(".array-empty");
  mainProductItem.forEach(function (item, index) {
    item.addEventListener("click", handleAddCart);
    item.addEventListener("click", function () {
      showCart(cartCenter, arrayEmpty);
    });
  });
  showCart(cartCenter, arrayEmpty);
  cartCenter?.addEventListener("click", removeItemCart);

  //end gio hang
  const header = document.querySelector(".header");
  let heightHeader = header && header.offsetHeight;
  console.log(heightHeader);
  window.addEventListener("scroll", function (e) {
    let scrollY = window.pageYOffset;
    if (scrollY > heightHeader) {
      header ? (header.style.position = "fixed") : null;
      document.body.style.paddingTop = `${heightHeader}px`;
    } else {
      header ? (header.style.position = "static") : null;

      document.body.style.paddingTop = "";
    }
  });

  sumMoney(totalPrice, quantityItem, cartTopQuantity);

  //modile
  const menu = document.querySelector(".icon-mobile-menu i");
  const navLink = document.querySelector(".navbar-link");
  const navList = document.querySelector(".navbar-link-list");
  navList?.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  navLink?.addEventListener("click", function () {
    this.classList.remove("active");
  });
  console.log(navLink);
  menu?.addEventListener("click", function () {
    navLink.classList.add("active");
  });
});
