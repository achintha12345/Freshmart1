document.addEventListener('DOMContentLoaded', () => {
    // Retrieve order items from local storage or set to an empty array if none exist
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    // Select the table body where order items will be displayed
    const tableBody = document.querySelector('#order-summary-table tbody');
    const customerName = document.getElementById("name");
    const address = document.getElementById("address");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const cardType = document.getElementById("card-type");
    const cardNumber = document.getElementById("card-number");
    const expDate = document.getElementById("expiry-date");
    const cvv = document.getElementById("cvv");

    // Initialize total price to 0
    const payBtn = document.getElementById("pay-button");
    let totalPrice = 0;

    // Loop through each order item to display in the table and calculate the total price
    orderItems.forEach(item => {
        // Insert a new row for each item
        const row = tableBody.insertRow();
        // Insert cells for item name, quantity, and price
        row.insertCell(0).textContent = item.item;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = item.price;
        // Add the item's price to the total price
        totalPrice += parseFloat(item.price);
    });

    // Display the total price in the summary
    document.getElementById('summary-total-price').textContent = totalPrice.toFixed(2);

    // Add an event listener to the pay button
    payBtn.addEventListener('click', function(event){
        event.preventDefault();

        // Validate all fields
        if (customerName.value && address.value && email.value && phone.value && cardType.value && cardNumber.value && expDate.value && cvv.value) {
            // Calculate the delivery date (today + 5 days)
            const today = new Date();
            const deliveryDate = new Date(today);
            deliveryDate.setDate(today.getDate() + 5);
            const deliveryDateString = deliveryDate.toDateString();

            const orderDetails = `
                Name: ${customerName.value}
                Address: ${address.value}
                Email: ${email.value}
                Phone: ${phone.value}
                Delivery Date: ${deliveryDateString}
                Card Type: ${cardType.value}
                Card Number: ${cardNumber.value}
                Expiry Date: ${expDate.value}
                CVV: ${cvv.value}
            `;

            alert(`Thank You for your purchase ${orderDetails}`)

            // Update local storage with order details
            localStorage.setItem('orderDetails', JSON.stringify({
                name: customerName.value,
                address: address.value,
                email: email.value,
                phone: phone.value,
                deliveryDate: deliveryDateString
            }));
        } else {
            // Alert the user if not all fields are filled
            alert('Please fill in all the fields.');
        }
    });
});
