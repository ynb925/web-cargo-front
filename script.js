document.addEventListener('DOMContentLoaded', function () {
    // Функция для загрузки данных с сервера и отображения их
    loadAndRenderOrders();
});

function loadAndRenderOrders() {
    // Fetch data from the API
    fetch('http://localhost:8080/api/orders', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        })
        .then(response => response.json())
        .then(data => {
            // Render the data using Handlebars.js
            renderOrders(data);
        })
        //.catch(error => console.error('Error fetching data:', error));))
}

function renderOrders(orders) {
    // Get the element to display orders
    const orderListElement = document.getElementById('orderList');

    // Get the Handlebars.js template
    const template = `
        <table class="tftable" border="1">
            {{#each this}}
                <tr>
                    <td>{{id}}</td>
                    <td>{{dateField}}</td>
                    <td>{{quantity}}</td>
                    <td>{{units}}</td>
                    <td>{{product}}</td>
                    <td>{{legalEntity}}</td>
                    <td>{{counterparty}}</td>
                    <td>{{unloadingAddresses}}</td>
                    <td>{{mapsLocation}}</td>
                    <td>{{phoneNumberConsignee}}</td>
                    <td>{{fullName}}</td>
                    <td>{{cost}}  грн.</td>
                    <td>{{descriptions}}</td>
                </tr>
            {{/each}}
        </table>
    `;

    // Compile the Handlebars.js template
    const compiledTemplate = Handlebars.compile(template);

    // Use the compiled template to render orders
    orderListElement.innerHTML = compiledTemplate(orders);
}

function saveOrder (form) {
    
    // Получаем данные из полей формы
    var date = form.elements['dateField'].value;
    var quantity = form.elements['quantity'].value;
    var units = form.elements['units'].value;
    var product = form.elements['product'].value;
    var legalEntity = form.elements['legalEntity'].value;
    var counterparty = form.elements['counterparty'].value;
    var unloadingAddresses = form.elements['unloadingAddresses'].value;
    var mapsLocation = form.elements['mapsLocation'].value;
    var phoneNumberConsignee = form.elements['phoneNumberConsignee'].value;
    var fullName = form.elements['fullName'].value;
    var cost = form.elements['cost'].value;
    var descriptions = form.elements['descriptions'].value;

    // Создаем объект с данными для отправки на сервер
    var orderData = {
        date: dateField,
        quantity: quantity,
        units: units,
        product: product,
        legalEntity: legalEntity,
        counterparty: counterparty,
        unloadingAddresses: unloadingAddresses,
        mapsLocation: mapsLocation,
        phoneNumberConsignee: phoneNumberConsignee,
        fullName: fullName,
        cost: cost,
        descriptions: descriptions
    };

    // Отправляем данные на сервер
    fetch('http://localhost:8080/api/orders/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
    window.location.replace("./home-cargo.html")

        
    })
    .catch(error => console.error('Error saving order:', error));
};


