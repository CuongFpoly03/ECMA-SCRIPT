const listProduct = document.getElementById("listProduct");
const API = "http://localhost:3000/product";
const CATE = "http://localhost:3000/category";
const category = document.getElementById("category");
const listPro = async () => {
  try {
    const respon = await fetch(API);
    const data = await respon.json();
    // console.log(data);
    listProduct.innerHTML = "";

    data.forEach((Pro) => {
      const create = document.createElement("div");
      create.innerHTML = `
      <div class="product-image-wrapper" style="width: 33.3%; float: left">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src="../../../${Pro.imgPro}" alt="" />
            <h2>${Pro.pricePro}$</h2>
            <p>${Pro.namePro}</p>
          </div>
          <div class="product-overlay">
            <div class="overlay-content">
              <h2>${Pro.pricePro}</h2>
              <p>Easy Polo Black Edition</p>
              <p onclick="addToCart(${Pro.id})" class="btn btn-default add-to-cart"
                > <i class="fa fa-shopping-cart"></i>Add to cart </p
              >
            </div>
          </div>
        </div>
        <div class="choose">
          <ul class="nav nav-pills nav-justified">
            <li>
              <a href="#"
                ><i class="fa fa-plus-square"></i>Add to wishlist</a
              >
            </li>
            <li>
              <a href="./product-details.html?id=${Pro.id}"
                ><i class="fa-solid fa-house"></i>🎇 See detail</a
              >
            </li>
          </ul>
        </div>
      </div>
      `;
      listProduct.appendChild(create);
    });
    TotalProduct();
  } catch (error) {
    console.log(error);
  }
};
listPro();

const addToCart = (e) => {
  const cart = {
    pid: e,
    quantity: 1,
  };
  const carts = localStorage.getItem("cart");
  // console.log(carts)
  if (carts == null) {
    const mang = [cart];
    localStorage.setItem("cart", JSON.stringify(mang));
  } else {
    let slg = 1;
    const cartArr = JSON.parse(carts);
    checkKey = -1;
    cartArr.map(({ pid, quantity }, key) => {
      if (e == pid) {
        slg = quantity + 1;
        checkKey = key;
      }
    });
    if (checkKey > -1) {
      cartArr[checkKey].quantity = slg;
      localStorage.setItem("cart", JSON.stringify(cartArr));
    } else {
      const productinCart = [...cartArr];
      productinCart.push(cart);
      localStorage.setItem("cart", JSON.stringify(productinCart));
    }
  }
  TotalProduct();
};

const TotalProduct = () => {
  const carts = localStorage.getItem("cart");
  let slg = 0;
  if (carts !== null) {
    const cartArr = JSON.parse(carts);
    for (let item of cartArr) {
      slg += item.quantity;
    }
    const quantity = document.querySelector(".quantity");
    quantity.innerHTML = slg;
  }
};

const showCate = async () => {
  const res = await fetch(CATE);
  const data = await res.json();
  // console.log(data);
  category.innerHTML = "";
  data.forEach((cate) => {
    const create = document.createElement("button");
    create.innerText = cate.nameCategory;
    create.addEventListener("click", () => showProductsByCategory(cate.id));
    category.appendChild(create);
  });
};

const showProductsByCategory = async (Idcategory) => {
  try {
    const respon = await fetch(`${API}?idCategory=${Idcategory}`);
    // console.log(respon);
    const data = await respon.json();
    // console.log(data);
    listProduct.innerHTML = "";

    data.forEach((Pro) => {
      const create = document.createElement("div");
      create.innerHTML = `
      <div class="product-image-wrapper" style="width: 33.3%; float: left">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src="../../../${Pro.imgPro}" alt="" />
            <h2>${Pro.pricePro}$</h2>
            <p>${Pro.namePro}</p>
          </div>
          <div class="product-overlay">
            <div class="overlay-content">
              <h2>${Pro.pricePro}</h2>
              <p>Easy Polo Black Edition</p>
              <p onclick="addToCart(${Pro.id})" class="btn btn-default add-to-cart"
                > <i class="fa fa-shopping-cart"></i>Add to cart </p
              >
            </div>
          </div>
        </div>
        <div class="choose">
          <ul class="nav nav-pills nav-justified">
            <li>
              <a href="#"
                ><i class="fa fa-plus-square"></i>Add to wishlist</a
              >
            </li>
            <li>
              <a href="./product-details.html?id=${Pro.id}"
                ><i class="fa-solid fa-house"></i>🎇 See detail</a
              >
            </li>
          </ul>
        </div>
      </div>
      `;
      listProduct.appendChild(create);
      TotalProduct();
    });
  } catch (error) {
    console.log(error);
  }
};

function Filter() {
  const minPrice = document.querySelector('input[name="minprice"]').value;
  const maxPrice = document.querySelector('input[name="maxprice"]').value;
  showProductsByPriceRange(minPrice, maxPrice);
}
const showProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const minPriceNumber = parseFloat(minPrice);
    const maxPriceNumber = parseFloat(maxPrice);

    if (isNaN(minPriceNumber) || isNaN(maxPriceNumber)) {
      console.error('Giá trị không hợp lệ.');
      return;
    }

   const url = `http://localhost:3000/product?pricePro_gte=${minPriceNumber}&pricePro_lte=${maxPriceNumber}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    listProduct.innerHTML = "";

    data.forEach((Pro) => {
      const create = document.createElement("div");
      create.innerHTML = `
      <div class="product-image-wrapper" style="width: 33.3%; float: left">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src="../../../${Pro.imgPro}" alt="" />
            <h2>${Pro.pricePro}$</h2>
            <p>${Pro.namePro}</p>
          </div>
          <div class="product-overlay">
            <div class="overlay-content">
              <h2>${Pro.pricePro}</h2>
              <p>Easy Polo Black Edition</p>
              <p onclick="addToCart(${Pro.id})" class="btn btn-default add-to-cart"
                > <i class="fa fa-shopping-cart"></i>Add to cart </p
              >
            </div>
          </div>
        </div>
        <div class="choose">
          <ul class="nav nav-pills nav-justified">
            <li>
              <a href="#"
                ><i class="fa fa-plus-square"></i>Add to wishlist</a
              >
            </li>
            <li>
              <a href="./product-details.html?id=${Pro.id}"
                ><i class="fa-solid fa-house"></i>🎇 See detail</a
              >
            </li>
          </ul>
        </div>
      </div>
      `;
      listProduct.appendChild(create);
      TotalProduct();
    });
  } catch (error) {
    console.error(error);
  }
};

showCate();
listPro();
