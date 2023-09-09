//Handles all items 
class Item{
    constructor(name, price, category){
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

/*Handles all events related with UI*/
class UI{
    static showAddForm(){
        formBox.style.display = "grid";
        document.querySelector('.form-box form.item input.product-name').focus();
    }

    static HideAddForm(){
        formBox.style.display = "none";
    }

    static appendContent(item, product){
        product.innerHTML = `
        <section class="product-name">${item.name}</section>
        <section class="product-price">${item.price}</section>
        <section class="product-category">${item.category}</section>
        <section class="icons">
        <p class="edit">I</p>
        <p class="delete">X</p>
        </section>
    `
    }

    static AddItemToList(item){
        const list = document.querySelector('ul.items')
        const listItem = document.createElement('li');
        UI.appendContent(item, listItem)
        listItem.className = 'shop-item';
        list.appendChild(listItem);
    }

    static clearFields(form){
    document.querySelector('.form-box form.item input.product-name').value = '';
    document.querySelector('.form-box form.item input.product-price').value = '';
    document.querySelector('.form-box form.item input.product-category').value = '';
    }

    static deleteItem(item){
        item.parentElement.parentElement.remove();
    }

    static editItem(item, prod){
        var list = prod.parentElement.parentElement;
        UI.appendContent(item, list);
        UI.clearFields(form);
    }

    static showMessage(message, theme){
        const contentBox = document.querySelector('.container .message-box');
        contentBox.style.display = "block";
        const content = document.querySelector('.container .message-box p');
        content.className = theme;
        content.innerHTML = message;

        setTimeout((e) => contentBox.style.display = "none", 3000)
    }
}

var method;
var activeList;
//Display Form
const formBox = document.querySelector('.form-box');
const showFormBtn = document.querySelector('.add-item-icon-section button');
showFormBtn.addEventListener('click', UI.showAddForm);
showFormBtn.addEventListener('click', (e) => {
    method = 'add';
    addButton.innerHTML = "Add Product"
})

//Hide Form
const exitFormBtn = document.querySelector('.form-box section.close-form');
exitFormBtn.addEventListener('click', UI.HideAddForm);
exitFormBtn.addEventListener('click', (a) => UI.clearFields())

//Get Form Details
const form = document.querySelector('.form-box form.item');
const addButton = document.querySelector('.form-box form.item button.submit-product');
addButton.addEventListener('click', getDetails);

function getDetails(e){
    e.preventDefault();
    const name = document.querySelector('.form-box form.item input.product-name').value;
    const price = '$' + document.querySelector('.form-box form.item input.product-price').value;
    const category = document.querySelector('.form-box form.item input.product-category').value;

    //Validate Form
    if(name == '' || price == '' || category == ''){
        UI.showMessage('Please fill all fields!😌', 'danger')
    }
    else{
        //Instantiate Item
        if(method == 'add'){
            const item = new Item(name, price, category);
            UI.AddItemToList(item);
            UI.showMessage('Product Added Successfully🎉 ', 'success');
        }
        //Edit Item
        else{
            const item = new Item(name, price, category);
            UI.editItem(item, activeList);
            UI.showMessage('Product Edited Successfully🎉 ', 'success');
        }
        UI.HideAddForm(); 
        UI.clearFields(form);
    }
}

//Delete And Edit Item
const items = document.querySelector('ul.items');
items.addEventListener('click', locateItem);

function locateItem(e){
    if(e.target.className == 'delete'){
        UI.deleteItem(e.target);
    }
    else if(e.target.className == 'edit'){
        method = 'edit';
        getDetails;
        const thisList = e.target.parentElement.parentElement;
        console.log(thisList)
        /*var currentProdName = document.querySelector('ul.items li section.product-name');
        var currentProdPrice = document.querySelector('ul.items li section.product-price');
        var currentProdCat = document.querySelector('ul.items li section.product-category');
        document.querySelector('.form-box form.item input.product-name').value = currentProdName.innerHTML;
        document.querySelector('.form-box form.item input.product-price').value = currentProdPrice.innerHTML.split('$')[1];
        document.querySelector('.form-box form.item input.product-category').value = currentProdCat.innerHTML;*/
        addButton.innerHTML = 'Edit Product';
        UI.showAddForm();
        activeList = e.target;
    }
}