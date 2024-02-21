const logCart = async () => {
  const cart = localStorage.getItem("cart");
  if (cart == null) {
    const message = document.getElementById("cart");
    message.innerHTML = "Không có sản phẩm ";
  } else {
    const products = JSON.parse(cart);
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Clear the existing content before adding new items
    let tongtien = 0;

    for (let item of products) {
      const product = await getProductById(item.pid);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>+</td>
        <td>${product.namePro}</td>
        <td><img src="../${product.imgPro}" alt="Product Image"/></td>
        <td><input type="number" value="${item.quantity}" data-id="${
        item.pid
      }" onchange="ChangeQuantity(this)"/></td>
        <td>${product.pricePro}</td>
        <td>${product.pricePro * item.quantity}</td>
        <td><a onclick="delProductCart('${item.pid}')">Delete</a></td>
      `;
      tongtien += product.pricePro * item.quantity;
      tbody.appendChild(tr);
    }

    const total = document.querySelector("#total span");
    total.innerHTML = tongtien;
  }
};

const getProductById = async (pid) => {
  product = await fetch(`http://localhost:3000/product/${pid}`);
  // console.log(product)
  product = await product.json();
  return {
    namePro: product.namePro,
    pricePro: product.pricePro,
    imgPro: product.imgPro,
  };
};

const ChangeQuantity = (el) => {
  let pid = el.getAttribute("data-id");
  let quantity = el.value;
  const cart = localStorage.getItem("cart");
  cartArr = JSON.parse(cart);
  let keyvalue = -1;
  cartArr.map((value, key) => {
    if (value.pid == pid) {
      keyvalue = key;
    }
  });
  cartArr[keyvalue].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cartArr));
  logCart();
};

const delProductCart = (pid) => {
  const confirmation = window.confirm(
    "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không?"
  );
  if (confirmation) {
    const cart = localStorage.getItem("cart");
    cartArr = JSON.parse(cart);
    let keyvalue = -1;
    cartArr.some((value, key) => {
      if (value.pid == pid) {
        keyvalue = key;
        return true;
      }
    });
    if (keyvalue !== -1) {
      cartArr.splice(keyvalue, 1);
      localStorage.setItem("cart", JSON.stringify(cartArr));
      logCart();
    }
  }
};



logCart();
