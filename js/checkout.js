const getProductById = async (pid) => {
  product = await fetch(`http://localhost:3000/product/${pid}`);
  product = await product.json();
  return {
    namePro: product.namePro,
    pricePro: product.pricePro,
    imgPro: product.imgPro,
  };
};

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
            <td>${item.quantity}</td>
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
const submitForm = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Call your checkOut function
  await checkOut();

  // Redirect to the home page
  window.location.href = "http://127.0.0.1:5500/pages/index.html";
};
const checkOut = async () => {
  let hoten = document.querySelector('input[name="name"]').value;
  let diachi = document.querySelector('input[name="address"]').value;
  let sdt = document.querySelector('input[name="phone"]').value;
  let status = "Đang xử lý";
  let created_date = new Date();
  const order = await fetch("http://localhost:3000/order", {
    method: "POST",
    body: JSON.stringify({
      customer_name: hoten,
      customer_address: diachi,
      customer_phone_number: sdt,
      status: status,
      created_date: created_date,
    }),
  });
  const order_id = await order.json();
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  for (let item of cart) {
    const product = await getProductById(item.pid);
    console.log(item);
    await fetch("http://localhost:3000/order_details", {
      method: "POST",
      body: JSON.stringify({
        order_id: order_id.id,
        product_id: item.pid,
        quantity: item.quantity,
        unit_price: item.quantity * product.pricePro,
      }),
    });
  }
  localStorage.removeItem("cart");
  window.location.href = "http://127.0.0.1:5500/pages/index.html";
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
        return true; // exit loop once found
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
