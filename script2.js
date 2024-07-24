document.addEventListener('DOMContentLoaded', (event) => {
    loadInventory();
});

let currentDeleteButton;

function addRow(item = '', quantity = '', shipmentDate = '') {
    var table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.contentEditable = "true";
    cell1.textContent = item;

    var quantitySelect = document.createElement('select');
    for (var i = 1; i <= 100; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        quantitySelect.appendChild(option);
    }
    quantitySelect.value = quantity.split(' ')[0]; // Set the quantity if provided

    var unitSelect = document.createElement('select');
    var units = ['Boxes', 'Units'];
    units.forEach(unit => {
        var option = document.createElement('option');
        option.value = unit;
        option.text = unit;
        unitSelect.appendChild(option);
    });
    unitSelect.value = quantity.split(' ')[1] || 'Boxes'; // Set the unit if provided, default to 'Boxes'

    cell2.appendChild(quantitySelect);
    cell2.appendChild(unitSelect);

    var shipmentInput = document.createElement('input');
    shipmentInput.type = 'date';
    shipmentInput.value = shipmentDate; // Set the shipment date if provided
    cell3.appendChild(shipmentInput);

    cell4.innerHTML = '<button onclick="confirmDelete(this)">Delete</button>';

    quantitySelect.addEventListener('change', saveInventory);
    unitSelect.addEventListener('change', saveInventory);
    shipmentInput.addEventListener('change', saveInventory);

    saveInventory();
}

function confirmDelete(button) {
    currentDeleteButton = button;
    document.getElementById("codeModal").style.display = "block";
}

function closeModal() {
    document.getElementById("codeModal").style.display = "none";
}

function checkCode() {
    var code = document.getElementById("deleteCode").value;
    if (code === "vios") {
        deleteRow(currentDeleteButton);
        closeModal();
    } else {
        alert("Incorrect code. The item will not be deleted.");
    }
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveInventory();
}

function saveInventory() {
    var table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    var rows = table.rows;
    var inventory = [];

    for (var i = 0; i < rows.length; i++) {
        var item = rows[i].cells[0].textContent;
        var quantity = rows[i].cells[1].children[0].value + ' ' + rows[i].cells[1].children[1].value;
        var shipmentDate = rows[i].cells[2].children[0].value;
        inventory.push({item: item, quantity: quantity, shipmentDate: shipmentDate});
        checkLowInventory(rows[i], quantity);
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function checkLowInventory(row, quantity) {
    var quantityValue = parseInt(quantity.split(' ')[0]);
    var unit = quantity.split(' ')[1];

    if ((unit === 'Boxes' && quantityValue < 3) || (unit === 'Units' && quantityValue < 20)) {
        row.style.backgroundColor = '#ffcccc'; // Light red shade
    } else {
        row.style.backgroundColor = ''; // Reset background color if not low
    }
}

function loadInventory() {
    var inventory = JSON.parse(localStorage.getItem('inventory'));
    if (inventory) {
        for (var i = 0; i < inventory.length; i++) {
            addRow(inventory[i].item, inventory[i].quantity, inventory[i].shipmentDate);
        }
    } else {
        // Default items
        addRow('Fedex Padded Pack', '20 Boxes', '');
        addRow('Usp Pak', '10 Box', '');
        addRow('Ice 8 Ounces', '3 Boxes', '');
    }
}

document.querySelector('.topnav-logout').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.querySelector('.topnav-homepage').addEventListener('click', function() {
    window.location.href = 'homepage.html';
});

document.getElementById('inventoryTable').addEventListener('input', saveInventory);
