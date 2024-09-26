document.addEventListener("DOMContentLoaded", () => {
    let chemicalData = [];
  
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            chemicalData = data;
            loadTableData();
        })
        .catch(error => console.error('Error fetching data:', error));
  
    function loadTableData(reverse = false) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
  
        const dataToLoad = reverse ? [...chemicalData].reverse() : chemicalData;
  
        dataToLoad.forEach(item => {
            const row = `<tr>
                <td>${item.id}</td>
                <td>${item.chemical_name}</td>
                <td>${item.vendor}</td>
                <td>${item.density}</td>
                <td>${item.viscosity}</td>
                <td>${item.packaging}</td>
                <td>${item.pack_size}</td>
                <td>${item.unit}</td>
                <td>${item.quantity}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
  
    function addRow() {
        const tableBody = document.getElementById('tableBody');
        const newRow = document.createElement('tr');
  
        newRow.innerHTML = `<td>New</td><td>New Chemical</td><td>New Vendor</td><td>New Density</td><td>New Viscosity</td><td>New Packaging</td><td>New Size</td><td>New Unit</td><td>New Quantity</td>`;
        tableBody.appendChild(newRow);
    }
  
    function moveUp() {
        loadTableData(false);
    }
  
    function moveDown() {
        loadTableData(true);
    }
  
    function deleteLastRow() {
        const tableBody = document.getElementById('tableBody');
        const rows = tableBody.getElementsByTagName('tr');
        if (rows.length > 0) {
            tableBody.removeChild(rows[rows.length - 1]);
        }
    }
  
    function deleteRow() {
        const table = document.getElementById('chemicalTable');
        const rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].classList.contains('selected')) {
                rows[i].parentNode.removeChild(rows[i]);
                break;
            }
        }
    }
  
    function refreshData() {
        loadTableData();
    }
  
    function saveData() {
        console.log('Save functionality to be implemented');
    }
  
    function handleButtonClick(event) {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => button.style.backgroundColor = '');
        event.target.style.backgroundColor = 'blue';
    }
  
    document.getElementById('addRow').addEventListener('click', (e) => {
        addRow();
        handleButtonClick(e);
    });
    document.getElementById('moveUp').addEventListener('click', (e) => {
        moveUp();
        handleButtonClick(e);
    });
    document.getElementById('moveDown').addEventListener('click', (e) => {
        moveDown();
        handleButtonClick(e);
    });
    document.getElementById('deleteRow').addEventListener('click', (e) => {
        deleteRow();
        handleButtonClick(e);
    });
    document.getElementById('deleteLastRow').addEventListener('click', (e) => {
        deleteLastRow();
        handleButtonClick(e);
    });
    document.getElementById('refresh').addEventListener('click', (e) => {
        refreshData();
        handleButtonClick(e);
    });
    document.getElementById('save').addEventListener('click', (e) => {
        saveData();
        handleButtonClick(e);
    });
  
    // Event listener for table row selection
    document.getElementById('chemicalTable').addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === "TD") {
            const rows = document.querySelectorAll('#chemicalTable tr');
            rows.forEach(row => row.classList.remove('selected'));
            e.target.parentNode.classList.add('selected');
        }
    });
  });
