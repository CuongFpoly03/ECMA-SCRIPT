const listProduct = document.getElementById("listProducts");
const API = "http://localhost:3000/product";
let edit = null;
const listPro = async () => {
  try {
    const respon = await fetch(API);
    const data = await respon.json();
    const responseCate = await fetch("http://localhost:3000/product");
    const dataCate = await responseCate.json();
    console.log(dataCate)
    listProduct.innerHTML = "";
    data.forEach((Pro) => {
      const create = document.createElement("div");
      create.innerHTML = `
    <div class="product-image-wrapper" style="width: 33% ; float:left">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src="../../../${Pro.imgPro}" alt="" />
            <h2>${Pro.pricePro}$</h2>
            <p>${Pro.namePro}</p>
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
  } catch (error) {
    console.log(error);
  }
};
console.log(listPro);
listPro();
