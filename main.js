// Object to hold the prices of different items
const prices = {
    apple: 450,
    banana: 380,
    Mangos: 420,
    pineapple: 350,
    Papaya: 600,
    Anoda: 320,
    GreenBeans: 240,
    Pumpkin: 220,
    Dabala: 180,
    carrot: 380,
    Drumsticks: 260,
    Beetroot: 340,
    FreshMilk: 280,
    HappyCowCheese: 450,
    FreshCurd: 520,
    DrinkingYoghurt: 180,
    AmbewelaYoghurt: 80,
    Beef: 1800,
    Thalapath: 1400,
    chicken: 1200,
    tunaFish: 1100,
    flour: 260,
    sugar: 240,
    salt: 170,
    CurryPowder: 200,
    CoconutOil: 350,
    StringHopperFlour: 240,
    ChilliePowder: 160,
    kotmaleCheese:420,
};

// Function to add item to the order table
function addItemToOrder(itemId, quantity) {
    const tableBody = document.querySelector('#order-table tbody');
    let existingRow = null;

    // Check if the item is already in the order table
    Array.from(tableBody.rows).forEach(row => {
        if (row.cells[0].textContent === itemId) {
            existingRow = row;
        }
    });

    // If the item is already in the order table, update its quantity and price
    if (existingRow) {
        const newQuantity = parseFloat(existingRow.cells[1].textContent) + parseFloat(quantity);
        existingRow.cells[1].textContent = newQuantity;
        existingRow.cells[2].textContent = (newQuantity * prices[itemId]).toFixed(2);
    } else {
        // If the item is not in the order table, add a new row for it
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = itemId;
        row.insertCell(1).textContent = quantity;
        row.insertCell(2).textContent = (quantity * prices[itemId]).toFixed(2);
        const removeCell = row.insertCell(3);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
            row.remove();
            updateTotalPrice();
        });
        removeCell.appendChild(removeButton);
    }

    // Update the total price of the order
    updateTotalPrice();

    // Show alert message to confirm the addition
    alert(`Added ${quantity} kg of ${itemId.replace(/^\w/, c => c.toUpperCase())} to your order`);
}

// Function to update the total price of the order
function updateTotalPrice() {
    const tableBody = document.querySelector('#order-table tbody');
    let totalPrice = 0;

    // Sum the prices of all items in the order table
    Array.from(tableBody.rows).forEach(row => {
        totalPrice += parseFloat(row.cells[2].textContent);
    });

    // Update the total price in the table footer
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Add event listeners to all "Add" buttons
document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item');
        const quantity = document.getElementById(itemId).value;
        if (quantity > 0) {
            addItemToOrder(itemId, quantity);
        }
    });
});

// Add event listener to the "Add to Favourites" button
document.getElementById('add-to-favourites').addEventListener('click', () => {
    const formData = new FormData(document.getElementById('grocery-form'));
    const favouriteItems = {};
    let alertMessage = 'Added to favourites:\n';

    // Collect all items with a quantity greater than 0
    formData.forEach((value, key) => {
        if (value > 0) {
            favouriteItems[key] = value;
            alertMessage += `${value} kg of ${key.replace(/^\w/, c => c.toUpperCase())}\n`;
        }
    });

    // Save the favourite items to local storage
    localStorage.setItem('favouriteOrder', JSON.stringify(favouriteItems));
    alert(alertMessage);
});

// Add event listener to the "Apply Favourites" button
document.getElementById('apply-favourites').addEventListener('click', () => {
    const favouriteItems = JSON.parse(localStorage.getItem('favouriteOrder'));

    if (favouriteItems) {
        // Add each favourite item to the order table
        for (const [key, value] of Object.entries(favouriteItems)) {
            addItemToOrder(key, value);
        }
    }
});

// Add event listener to the "Clear Favourites" button
document.getElementById('clear-favourites').addEventListener('click', () => {
    localStorage.removeItem('favouriteOrder');
    alert('Favourite order cleared!');
});

// Add event listener to the "Buy Now" button
document.getElementById('buy-now').addEventListener('click', () => {
    const tableBody = document.querySelector('#order-table tbody');
    if (tableBody.rows.length > 0) {
        const orderItems = [];

        // Collect all items in the order table
        Array.from(tableBody.rows).forEach(row => {
            orderItems.push({
                item: row.cells[0].textContent,
                quantity: row.cells[1].textContent,
                price: row.cells[2].textContent
            });
        });

        // Save the order items to local storage and redirect to the summary page
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        window.location.href = 'summary.html';
    } else {
        alert('Please add items to your order before proceeding.');
    }
});
