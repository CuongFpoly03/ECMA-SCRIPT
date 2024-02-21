const productDetails = document.getElementById("productdetail");
const API = "http://localhost:3000/product";
const getProductIdFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

const fetchProductDetails = async () => {
  try {
    const productId = getProductIdFromURL();
    const response = await fetch(`${API}/${productId}`);
    const data = await response.json();
    console.log(data);

    productDetails.innerHTML = "";

    const create = document.createElement("div");
    create.innerHTML = `
    <div>
      <div class="product-details"><!--product-details-->
      <div class="col-sm-5">
        <div class="view-product">
          <img src="../${data.imgPro}" alt="" />
          <h3>ZOOM</h3>
        </div>
        <div id="similar-product" class="carousel slide" data-ride="carousel">
          
            <!-- Wrapper for slides -->
              <div class="carousel-inner">
              <div class="item active">
                <a href=""><img src="../images/product-details/similar1.jpg" alt=""></a>
                <a href=""><img src="../images/product-details/similar2.jpg" alt=""></a>
                <a href=""><img src="../images/product-details/similar3.jpg" alt=""></a>
              </div>
              <div class="item">
                <a href=""><img src="../images/product-details/similar1.jpg" alt=""></a>
                <a href=""><img src="../images/product-details/similar2.jpg" alt=""></a>
                <a href=""><img src="../images/product-details/similar3.jpg" alt=""></a>
              </div>
              <div class="item">
                <a href=""><img src="../images/product-details/similar1.jpg" alt=""></a>
                <a href=""><img src="../images/product-details/similar2.jpg" alt=""></a>
                <a href=""><img src="../images/product-details/similar3.jpg" alt=""></a>
              </div>
              
            </div>

            <!-- Controls -->
            <a class="left item-control" href="#similar-product" data-slide="prev">
            <i class="fa fa-angle-left"></i>
            </a>
            <a class="right item-control" href="#similar-product" data-slide="next">
            <i class="fa fa-angle-right"></i>
            </a>
        </div>

      </div>
      <div class="col-sm-7">
        <div class="product-information"><!--/product-information-->
          <img src="../images/product-details/new.jpg" class="newarrival" alt="" />
          <h2>${data.namePro}</h2>
          <p>ID: ${data.id}</p>
          <img src="../images/product-details/rating.png" alt="" />
          <span>
            <span>US:${data.pricePro}$</span>
            <label>Quantity:</label>
            <input type="text" value="${data.quantityPro}"/>
            <p onclick="addToCart(${data.id})" class="btn btn-default add-to-cart"
                > <i class="fa fa-shopping-cart"></i>Add to cart </p
              >
          </span>
          <p><b>Availability:</b> In Stock</p>
          <p><b>Condition:</b> New</p>
          <p><b>Brand:</b> E-SHOPPER</p>
          <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
        </div><!--/product-information-->
      </div>
    </div>
  </div>
    `;
    productDetails.appendChild(create);
  } catch (error) {
    console.log(error);
  }
};

fetchProductDetails();
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
