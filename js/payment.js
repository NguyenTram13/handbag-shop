import { showCart, removeItemCart, sumMoney } from "./data.js";
window.addEventListener("load", function () {
  let userInfo = JSON.parse(window.localStorage.getItem("infoUser")) || [];
  const valueFirstName = document.querySelector(".firstname");
  const valueLastName = document.querySelector(".lastname");
  const valueEmail = document.querySelector(".email");
  const valueSdt = document.querySelector(".sdt");
  const valueAddress = document.querySelector(".address");
  const sumMoneyValue = document.querySelector("#checkout__subtotal");
  const sumMoneyValue2 = document.querySelector("#checkout__total");

  const tbody = document.querySelector("#ListCheckOut");

  const order = document.querySelector(".form-oder");
  console.log(tbody);
  if (userInfo.length > 0) {
    let indexLastName = userInfo[0].name.trim().lastIndexOf(" ");
    let firstName = userInfo[0].name.slice(0, indexLastName).trim();
    let lastName = userInfo[0].name.slice(indexLastName).trim();

    valueFirstName.value = firstName;
    valueLastName.value = lastName;
    valueEmail.value = userInfo[0].email;
    valueSdt.value = userInfo[0].sdt;
    valueAddress.value = userInfo[0].address;
  }
  showCart(tbody);
  tbody?.addEventListener("click", removeItemCart);
  tbody?.addEventListener("click", function () {
    sumMoney(sumMoneyValue);
    sumMoney(sumMoneyValue2);
  });

  sumMoney(sumMoneyValue);
  sumMoney(sumMoneyValue2);
  function validateOrder(e) {
    e.preventDefault();
    let valueFirstName = this.querySelector(".firstname").value;
    let valueLastName = this.querySelector(".lastname").value;
    let valueEmail = this.querySelector(".email").value;
    let valueSdt = this.querySelector(".sdt").value;
    let valueAddress = this.querySelector(".address").value;

    let isFirstName = false;
    let isLastName = false;
    let isEmail = false;
    let isSdt = false;
    let isAddress = false;

    const errorName = document.querySelector(".error-name");
    const errorEmail = document.querySelector(".error-email");
    const errorSdt = document.querySelector(".error-sdt");
    const errorAdd = document.querySelector(".error-address");
    const message = document.querySelector(".message");
    console.log(errorName);
    if (valueFirstName.length == 0 || valueLastName.length == 0) {
      errorName.textContent = "Họ tên không được trống";
      isFirstName = false;
      isLastName = false;
    } else {
      errorName.textContent = "";
      isFirstName = true;
      isLastName = true;
    }

    if (valueEmail.length == 0) {
      errorEmail.textContent = "Email không được trống";
      isEmail = false;
    } else {
      errorEmail.textContent = "";
      isEmail = true;
    }
    if (valueSdt.length == 0) {
      errorSdt.textContent = "Số điện thoại không được trống";
      isSdt = false;
    } else {
      errorSdt.textContent = "";
      isSdt = true;
    }
    if (valueAddress.length == 0) {
      errorAdd.textContent = "Địa chỉ không được trống";
      isAddress = false;
    } else {
      errorAdd.textContent = "";
      isAddress = true;
    }

    if (isAddress && isEmail && isFirstName && isLastName && isSdt) {
      message.textContent =
        "Thanh toán thành công! Vui lòng đến trang cá nhân xem chi tiết.";
      message.style.padding = "8px";
      message.style.backgroundColor = "green";
      window.location.href = "#";
    } else {
      message.textContent =
        "Thanh toán thất bại! Vui lòng kiểm tra thông tin nhận hàng.";
      message.style.padding = "8px";
      message.style.backgroundColor = "rgb(171, 5, 5)";
      window.location.href = "#";
    }
  }
  order.addEventListener("submit", validateOrder);
});
