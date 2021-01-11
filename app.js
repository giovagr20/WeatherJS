class Product {
    _name;
    _price;
    _year;

    constructor(name, price, year) {
        this. _year = year;
        this._name = name;
        this._price = price;
    }
}

class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                        <strong>Product Name: </strong>${product._name}
                        <strong>Product Price: </strong>${product._price}
                        <strong>Product Year: </strong>${product._year}<br>
                        <a class="btn btn-danger" id="delete" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    deleteProduct(target){
        if(target.name === 'delete') target.remove();
        this.showMessage(`Product deleted successfully`, `info`);
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // DOM message
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(()=> {
            document.querySelector('.alert').remove();
        }, 3000)

    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
}

//DOM Events

document.getElementById('product-form')
    .addEventListener('submit',(e)=> {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        const product = new Product(name, price, year);
        const ui = new UI();
        if(name === "" || price === '' || product === '') {
            return ui.showMessage(`Please, complete all fields`, `warning`);
        }

        ui.addProduct(product);
        ui.showMessage(`Product added successfully`, `success`);

    });
document.getElementById('product-list')
    .addEventListener('click', (e)=>{
        const ui = new UI();
        ui.deleteProduct(e.target)
    });