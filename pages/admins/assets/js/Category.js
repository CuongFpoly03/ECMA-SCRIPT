const listCategory = document.getElementById("listCategory");
const API = "http://localhost:3000/category";
const formAdd = document.getElementById("formAdd");
let edit = null;
const listCate = async () => {
  try {
    const respon = await fetch(API);
    const data = await respon.json();
    console.log(data);
    listCategory.innerHTML = "";
    data.forEach((cate) => {
      const create = document.createElement("div");
      create.innerHTML = `
      <div class=" text-center">
            <div class="">
                <div class="col" style="border: 3px solid pink; width: 33%; float: left; padding: 2px 5px">
                    <h4 class="border text-white bg-dark">Số ID ⏫: ${
                      cate.id
                    }</h4>
                    <p><strong>Name Category➡️: </strong>${
                      cate.nameCategory
                    }</p>
                    <p><strong>Status❇️:</strong>${cate.status}</span>
                    <div>
                        <button onclick="deleteCate(${
                          cate.id
                        })" class="btn btn-danger">Delete</button>
                        <button onclick="updateCate(${
                          cate.id
                        })" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
        `;
      listCategory.appendChild(create);
    });
  } catch (error) {
    console.log(error);
  }
};

const Action = async (api, method, data) => {
  try {
    const res = await fetch(api, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await res.json();
    listCate();
    formAdd.reset();
    edit = null;
  } catch (error) {
    console.log(error);
  }
};

const validationForm = (nameCategory) => {
  if (!nameCategory) {
    alert("vui lòng nhập thông tin !");
    return false;
  }
  return true;
};

const addCate = async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const nameCategory = document.getElementById("nameCategory").value;
  const status = document.getElementById("status").checked ? "hiện" : "ẩn";
  if (!validationForm(nameCategory)) {
    return;
  }
  const dataCate = {
    id,
    nameCategory,
    status,
  };
  const api = edit ? `${API}/${edit}` : API;
  const method = edit ? "PUT" : "POST";
  try {
    await Action(api, method, dataCate);
  } catch (error) {
    console.log(error);
  }
};

const updateCate = async (cateId) => {
  edit = cateId;
  try {
    const res = await fetch(`${API}/${cateId}`);
    const { nameCategory, status } = await res.json();
    document.getElementById("nameCategory").value = nameCategory;
    document.getElementById("status").checked = status === "hiện";
  } catch (error) {
    console.log(error);
  }
};

const deleteCate = async (cateId) => {
  const confirms = confirm("bạn có muốn xoá không ?");
  if (confirms) {
    try {
      await fetch(`${API}/${cateId}`, {
        method: "DELETE",
      });
      listCate();
    } catch (error) {
      console.log(error);
    }
  }
};
formAdd.addEventListener("submit", addCate);
listCate();
