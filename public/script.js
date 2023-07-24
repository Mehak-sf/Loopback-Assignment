
const usersData = [
  {
    id: 1,
    firstName: 'Mehak',
    middleName: '',
    lastName: 'Gupta',
    email: 'mehak@example.com',
    phoneNumber: '9876543210',
    role: 'Admin',
    address: 'Aggar Nagar'
  },
  {
    id: 2,
    firstName: 'Nimrat',
    middleName: 'Kaur',
    lastName: 'Gill',
    email: 'nimrat@example.com',
    phoneNumber: '7876543210',
    role: 'Subscriber',
    address: 'Friends Colony'
  },
];


function populateTable() {
  const tableBody = document.querySelector('#usersTable tbody');
  tableBody.innerHTML = '';

  usersData.forEach(user => {
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
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
        <button class="saveBtn" style="display: none;">Save</button>
        <button class="cancelBtn" style="display: none;">Cancel</button>
      </td>
    `;

    tr.querySelector('.editBtn').addEventListener('click', () => makeRowEditable(tr));
    tr.querySelector('.deleteBtn').addEventListener('click', () => deleteUser(tr));
    tr.querySelector('.saveBtn').addEventListener('click', () => saveUser(tr));
    tr.querySelector('.cancelBtn').addEventListener('click', () => cancelEdit(tr));

    tableBody.appendChild(tr);
  });
}


function makeRowEditable(row) {
  const editBtn = row.querySelector('.editBtn');
  const deleteBtn = row.querySelector('.deleteBtn');
  const saveBtn = row.querySelector('.saveBtn');
  const cancelBtn = row.querySelector('.cancelBtn');

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


function cancelEdit(row) {
  populateTable();
}


function deleteUser(row) {
  const userId = row.getAttribute('data-id');
  const index = usersData.findIndex(user => user.id === Number(userId));
  usersData.splice(index, 1);

  populateTable();
}


function loadData() {
  const loadDataBtn = document.getElementById('loadDataBtn');
  const usersTable = document.getElementById('usersTable');

  if (loadDataBtn.textContent === 'Load data') {
    loadDataBtn.textContent = 'Refresh data';
    usersTable.style.display = 'block';
    populateTable();
  } else {
    populateTable();
  }
}

document.getElementById('loadDataBtn').addEventListener('click', loadData);
