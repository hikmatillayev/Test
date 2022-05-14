const PRECENT = 75 / 100;

const addZero = function (number) {
  return number < 10 ? "0" + number : number
}

const currentDate = new Date();
const current = function () {
  return `${addZero(currentDate.getDate())}.${addZero(currentDate.getMonth() + 1)}.${currentDate.getFullYear()}`;
}

const showDate = function (dateString) {
  const date = new Date(dateString);
  return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}

const productsCards = document.querySelector("#products-card");

const createElement = function (elName, className, textContent) {
  const createdElement = document.createElement(elName);
  createdElement.className = className;
  if (textContent) {
    createdElement.textContent = textContent;
  }
  return createdElement
}
const appendChildren = function (parentElement, children) {
  for (let l = 0; l < children.length; l++) {
    parentElement.append(children[l])
  }
  return parentElement;
}
// DESTRUCATSION=DESTRUKATSIYA
const renderProducts = function (products) {
  productsCards.innerHTML = null;
  for (let product of products) {
    const { id, title, price, model, addedDate, } = product;
    const productLine = document.createElement("li", "col-4");
    const productCard = document.createElement("div", "card");
    const productImg = createElement("img", "card-img-top");
    productImg.src = product.img;
    const productCardBody = document.createElement("div", "card-body");
    const productTitle = createElement("h3", "card-title", title);
    const productPrice = createElement("p", "card-text fw-bold", price * PRECENT);
    const productDiscount = createElement("p", "card-text");
    const productDiscountChild = createElement("s", "", price);
    const productCharacters = createElement("ul", "d-flex flex-wrap list-unstyled");
    const productModel = createElement("p", "badge bg-success", model);
    const productMarkedDate = createElement("p", "card-text", showDate(addedDate));

    for (let j = 0; j < product.benefits.length; j++) {
      const productCharacter = createElement("li", "badge bg-primary me-1 mb-1", product.benefits[j]);
      appendChildren(productCharacters, [productCharacter]);
    }
    //ADD BENEFITS
    const benefitsInput = document.querySelector("#benefits");
    const optionsWrapper = document.querySelector(".benefits-list");
    options = [];

    benefitsInput.addEventListener("input", function () {
      options = benefitsInput.value.trim().split(" ");
      optionsWrapper.innerHTML = null
      for (let k = 0; k < options.length; k++) {
        const optionWrapper = document.createElement("li", "me-1 mb-1");
        const optionWrapperBtn = document.createElement("button", "btn btn-sm badge rounded-pill btn-danger");
        optionWrapperBtn.textContent = options[k];
        appendChildren(optionsWrapper, [optionWrapper]);
        appendChildren(optionWrapper, [optionWrapperBtn]);
      }
    })
    const btn = document.querySelector("button");
    btn.addEventListener("click", function () {
      optionsWrapper.innerHTML = "";
      options = [];
    })
    const productButton = createElement("div", "position-absolute top-0 end-0 d-flex",);
    const productEditBtn = createElement("button", "btn rounded-0 btn-secondary edit-btn-x",);
    const productEditIcon = createElement("i", "fa-solid fa-pen ");
    productEditBtn.setAttribute("data-bs-toggle", "modal");
    productEditBtn.setAttribute("data-bs-target", "#edit-student-modal");
    productEditBtn.setAttribute("data-id", id);
    productEditIcon.style.pointerEvents = "none";
    const productDelBtn = createElement("button", "btn rounded-0 btn-danger remove-button",);
    const productDelIcon = createElement("i", "fa-solid fa-trash");
    productDelIcon.style.pointerEvents = "none"; // Bu kodimizda iconka bosilmaydi
    /// ADD CLASS
    productLine.classList.add("col-4");
    productCard.classList.add("card");
    productCardBody.classList.add("card-body");
    productDelBtn.setAttribute("data-id", id);
    //append
    appendChildren(productsCards, [productLine]);
    appendChildren(productLine, [productCard]);
    appendChildren(productCard, [productImg, productCardBody]);
    appendChildren(productCardBody, [productTitle, productPrice, productDiscount, productModel, productMarkedDate, productCharacters, productButton]);
    appendChildren(productDiscount, [productDiscountChild]);
    appendChildren(productButton, [productEditBtn, productDelBtn]);
    appendChildren(productEditBtn, [productEditIcon]);
    appendChildren(productDelBtn, [productDelIcon]);
  }
}
renderProducts(products)

let showingProducts = products;

const titleEdit = document.querySelector("#edit-title");
const priceEdit = document.querySelector("#edit-price");
const manufacturerEdit = document.querySelector("#edit-manufacturer");
const benefitsEdit = document.querySelector("#edit-benefits");

productsCards.addEventListener("click", function (evt) {
  if (evt.target.matches(".remove-button")) {
    const clickedItemId = +evt.target.dataset.id;

    const clickedItemIndex = products.findIndex(function (product) {
      return product.id === clickedItemId
    })
    showingProducts.splice(clickedItemIndex, 1);
    products.splice(clickedItemIndex, 1);
    renderProducts(products);
  } else if (evt.target.matches(".btn-secondary")) {
    const clickedId = +evt.target.dataset.id;
    const clickedItem = products.find(function (product) {
      return product.id === clickedId;
    })
    titleEdit.value = clickedItem.title;
    priceEdit.value = clickedItem.price;
    manufacturerEdit.value = clickedItem.model;
    benefitsEdit.value = clickedItem.benefits;
    editForm.setAttribute("data-editing-id", clickedItem.id)
  }
})
//MODAL
const addForm = document.querySelector("#add-form");
const addProductModalEl = document.querySelector("#add-student-modal");
const addProductModal = new bootstrap.Modal(addProductModalEl);

const elEditBtn = document.querySelector('.edit-btn-x')
elEditBtn.addEventListener('click', function () {
  const selectEl = document.querySelector(".modal-select");
  for (let k = 0; k < manufacturers.length; k++) {
    const optionsEl = createElement("option");
    optionsEl.textContent = manufacturers[k].name;
    appendChildren(selectEl, [optionsEl]);
  }
})
// Options
for (let k = 0; k < manufacturers.length; k++) {
  const selectEl = document.querySelector("#product-manufacturer");
  const optionsEl = createElement("option");
  optionsEl.textContent = manufacturers[k].name;
  appendChildren(selectEl, [optionsEl]);
}
//ADDFORM
addForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const elements = evt.target.elements;
  const titleInput = elements["product-title"];
  const priceInput = elements.price;
  const manufacturerInput = elements["product-manufacturer"];
  const benefitsInput = elements.benefits;

  const titleValue = titleInput.value;
  const priceValue = priceInput.value;
  const manufacturerValue = manufacturerInput.value;
  const benefitsValue = benefitsInput.value;

  if (titleValue.trim() && priceValue.trim() && manufacturerValue && benefitsValue.trim()) {
    const product = {
      id: Math.floor(Math.random() * 1000),
      img: "https://picsum.photos/300/200",
      title: titleValue,
      price: priceValue,
      model: manufacturerValue,
      benefits: benefitsValue.split(" "),
      addedDate: current(),
    }
    products.push(product);
    showingProducts.push(product);
    addForm.reset();
    addProductModal.hide();
    renderProducts(products);
  }
});
const editForm = document.querySelector(".edit-form");
const editProductModalEl = document.querySelector("#edit-student-modal");
const editProductModal = new bootstrap.Modal(editProductModalEl);

//ADDFORM
editForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  // const elements = evt.target.elements;
  // const priceInput = elements.price;
  // const manufacturerInput = elements["product-manufacturer"];
  // const benefitsInput = elements.benefits;
  const editingId = +evt.target.dataset.editingId;

  const titleValue = titleEdit.value;
  const priceValue = priceEdit.value;
  const manufacturerValue = manufacturerEdit.value;
  const benefitsValue = benefitsEdit.value;

  if (titleValue.trim() && priceValue.trim() && manufacturerValue.trim() && benefitsValue.trim()) {
    var product = {
      id: editingId,
      img: "https://picsum.photos/300/200",
      title: titleValue,
      price: priceValue,
      model: manufacturerValue,
      benefits: benefitsValue.split(","),
      addedDate: current(),
    }
  }
  const editingItemIndex = products.findIndex(product => product.id == editingId)
  products.splice(editingItemIndex, 1, product);
  showingProducts.splice(editingItemIndex, 1, product);
  products[editingItemIndex] = product
  editForm.reset();
  editProductModal.hide();
  renderProducts(products)
});
const filterForm = document.querySelector(".filter-form");
filterForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const elements = evt.target.elements;
  const fromValue = elements.from.value;
  const toValue = elements.to.value;
  const searchValue = elements.search.value;

  const filtredProducts = products
    .filter(function (product) {
      return product.price >= fromValue;
    })
    .filter(function (toProduct) {
      return toProduct.price <= toValue;
    })
    .filter(function (product) {
      // return product.title.toLowerCase().includes(searchValue.toLowerCase());
      const searchRegExp = new RegExp(searchValue, "gi");
      return product.title.match(searchRegExp);
    });
  renderProducts(filtredProducts);
})
