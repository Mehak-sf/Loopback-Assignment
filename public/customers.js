
const customersData = [
  {
    id: '1',
    name: 'Mohan Kumar',
    address: 'Green Park',
    users: [
      {
        id: '1',
        firstName: 'Mehak',
        middleName: '',
        lastName: 'Gupta',
        email: 'mehak@example.com',
        phoneNumber: '9876543210',
        role: 'ADMIN',
        address: 'Aggar Nagar',
        customerId: '1',
      },
      {
        id: '2',
        firstName: 'Raju',
        middleName: '',
        lastName: 'Kumar',
        email: 'raju@example.com',
        phoneNumber: '7576543211',
        role: 'ADMIN',
        address: 'SBS Nagar',
        customerId: '2',
      },
    ],
  },
  {
    id: '2',
    name: 'Pritam Malik',
    address: 'Atam Nagar',
    users: [
      {
        id: '1',
        firstName: 'Sakshi',
        middleName: '',
        lastName: 'Gupta',
        email: 'sakshi@example.com',
        phoneNumber: '7576543210',
        role: 'ADMIN',
        address: 'Aggar Nagar',
        customerId: '1',
      },
      {
        id: '2',
        firstName: 'Astha',
        middleName: '',
        lastName: 'Mittal',
        email: 'astha@example.com',
        phoneNumber: '7576543211',
        role: 'ADMIN',
        address: 'SBS Nagar',
        customerId: '2',
      },
    ],
  },
  
];

let currentCustomer = null;


function populateCustomersTable() {
  const customersTableBody = document.querySelector('#customersTable tbody');
  customersTableBody.innerHTML = '';

  customersData.forEach(customer => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.address}</td>
      <td>
        <button class="showUsersBtn" data-id="${customer.id}">Show Users</button>
        <button class="deleteCustomerBtn" data-id="${customer.id}">Delete</button>
      </td>
    `;

    tr.querySelector('.showUsersBtn').addEventListener('click', () => showUsers(customer));
    tr.querySelector('.deleteCustomerBtn').addEventListener('click', () => deleteCustomer(customer));

    customersTableBody.appendChild(tr);
  });
}


function showUsers(customer) {
  currentCustomer = customer;
  const customersTable = document.getElementById('customersTable');
  const usersContainer = document.getElementById('usersContainer');
  const backToCustomersBtn = document.getElementById('backToCustomersBtn');
  const usersTableBody = document.querySelector('#usersTable tbody');

  customersTable.style.display = 'none';
  usersContainer.style.display = 'block';
  backToCustomersBtn.addEventListener('click', backToCustomers);
  populateUsersTable();

  function populateUsersTable() {
    usersTableBody.innerHTML = '';

    customer.users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.middleName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.role}</td>
        <td>${user.address}</td>
        <td>
          <button class="editUserBtn">Edit</button>
          <button class="deleteUserBtn">Delete</button>
          <button class="saveUserBtn" style="display: none;">Save</button>
          <button class="cancelUserBtn" style="display: none;">Cancel</button>
        </td>
      `;

      tr.querySelector('.editUserBtn').addEventListener('click', () => makeUserEditable(tr));
      tr.querySelector('.deleteUserBtn').addEventListener('click', () => deleteUser(tr));
      tr.querySelector('.saveUserBtn').addEventListener('click', () => saveUser(tr));
      tr.querySelector('.cancelUserBtn').addEventListener('click', () => cancelUserEdit(tr));

      usersTableBody.appendChild(tr);
    });
  }

  function backToCustomers() {
    customersTable.style.display = 'block';
    usersContainer.style.display = 'none';
  }
}


function makeUserEditable(row) {
  const editBtn = row.querySelector('.editUserBtn');
  const deleteBtn = row.querySelector('.deleteUserBtn');
  const saveBtn = row.querySelector('.saveUserBtn');
  const cancelBtn = row.querySelector('.cancelUserBtn');

  editBtn.style.display = 'none';
  deleteBtn.style.display = 'none';
  saveBtn.style.display = 'inline-block';
  cancelBtn.style.display = 'inline-block';


  const cells = row.querySelectorAll('td:not(:last-child)');
  cells.forEach(cell => {
    const value = cell.textContent;
    cell.innerHTML = `<input type="text" value="${value}" />`;
  });
}


function saveUser(row) {
  const cells = row.querySelectorAll('td:not(:last-child)');
  const newUser = {};

  cells.forEach((cell, index) => {
    const input = cell.querySelector('input');
    newUser[Object.keys(usersData[0])[index]] = input.value;
  });


  const userId = row.getAttribute('data-id');
  const index = usersData.findIndex(user => user.id === Number(userId));
  usersData[index] = { ...usersData[index], ...newUser };

  populateTable();
}


function cancelUserEdit(row) {
  populateTable();
}


function deleteUser(row) {
  const userId = row.getAttribute('data-id');
  const index = usersData.findIndex(user => user.id === Number(userId));
  usersData.splice(index, 1);

  populateTable();
}


function deleteCustomer(customer) {
  const index = customersData.findIndex(c => c.id === customer.id);
  customersData.splice(index, 1);
  populateCustomersTable();
}


function loadCustomers() {
  const loadCustomersBtn = document.getElementById('loadCustomersBtn');
  const customersTable = document.getElementById('customersTable');

  if (loadCustomersBtn.textContent === 'Load Customers') {
    loadCustomersBtn.textContent = 'Refresh Customers';
    customersTable.style.display = 'block';
    populateCustomersTable();
  } else {
    populateCustomersTable();
  }
}

document.getElementById('loadCustomersBtn').addEventListener('click', loadCustomers);
