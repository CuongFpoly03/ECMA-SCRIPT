const listProduct = document.getElementById("listProduct");
const formAdd = document.getElementById("formAdd");
const API = "http://localhost:3000/product";
let edit = null;
const listPro = async () => {
  try {
    // Fetch product data
    const respon = await fetch(API);
    const data = await respon.json();

    // Fetch category data
    const responseCate = await fetch("http://localhost:3000/category");
    const dataCate = await responseCate.json();
    // console.log(data);
    listProduct.innerHTML = "";
    data.forEach((Pro) => {
      const create = document.createElement("div");
      create.innerHTML = `
      <div class=" text-center">
            <div class="">
                <div class="col" style="border: 3px solid pink; width: 33%; float: left; padding: 2px 5px">
                    <h4 class="border text-white bg-dark">Số ID ⏫: ${Pro.id}</h4>
                    <img src="../../../../${Pro.imgPro}"/>
                    <p><strong>Name🟦: </strong>${Pro.pricePro}</p>
                    <p><strong>Price💲: </strong>${Pro.pricePro}</p>
                    <p><strong>Quantity❇️: </strong>${Pro.quantityPro}</p>
                    <p><strong>View🎇:</strong>${Pro.viewPro}</span>
                    <div>
                        <button onclick="deletePro(${Pro.id})" class="btn btn-danger">Delete</button>
                        <button onclick="updatePro(${Pro.id})" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
        `;
      listProduct.appendChild(create);
    });
    const idCategoryDropdown = document.getElementById("idCategory");
    if (idCategoryDropdown) {
      idCategoryDropdown.innerHTML = `<option selected>Category</option>`;
      dataCate.forEach((cate) => {
        const option = document.createElement("option");
        option.value = cate.id;
        option.textContent = cate.nameCategory;
        idCategoryDropdown.appendChild(option);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const Action = async(api, method, data) => {
  try {
    const res = await fetch(api, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    await res.json();
    listPro();
    formAdd.reset();
    edit=null;
  } catch (error) {
    console.log(error)
  }
}



const addproduct = async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const namePro = document.getElementById("namePro").value;
  const imgPro = document.getElementById("imgPro").value;
  const pricePro = document.getElementById("pricePro").value;
  const quantityPro = document.getElementById("quantityPro").value;
  const viewPro = document.getElementById("viewPro").value;
  const idCategory = document.getElementById("idCategory").value;

  const dataPro = {
    id,
    namePro,
    imgPro,
    pricePro,
    quantityPro,
    viewPro,
    idCategory,
  };
  const api = edit ? `${API}/${edit}` : API;
  const method = edit ? "PUT" : "POST";
  try {
    await Action(api, method, dataPro)
  } catch (error) {
    console.log(error)
  }
};

const updatePro = async(pid) => {
  edit = pid;
  try {
    const res = await fetch(`${API}/${pid}`);
    const {namePro, imgPro, pricePro, quantityPro, viewPro, idCategory} =await res.json();
    document.getElementById('namePro').value = namePro;
    document.getElementById('imgPro').value = imgPro;
    document.getElementById('pricePro').value = pricePro;
    document.getElementById('quantityPro').value = quantityPro;
    document.getElementById('viewPro').value = viewPro;
    document.getElementById('idCategory').value = idCategory;
  } catch (error) {
    console.log(error)
  }
}

const deletePro = async(pid) => {
  const confirms = confirm("bạn có muốn xoá không ?");
  if(confirms){
    try {
      await fetch(`${API}/${pid}`, {
        method: "DELETE",
      });
      listPro();
    } catch (error) {
      console.log(error)
    }
  }
}

formAdd.addEventListener("submit", addproduct);
listPro();
