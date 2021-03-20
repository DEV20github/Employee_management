// console.log('script works');

const employeeList = document.querySelector('.employee-list');
const myTable = document.getElementById('myTable');
const th = document.getElementsByTagName('th');

const get_url = 'http://dummy.restapiexample.com/api/v1/employees';
const post_url = 'http://dummy.restapiexample.com/api/v1/create';
const delete_url = 'http://dummy.restapiexample.com/public/api/v1/delete';
const update_url = 'http://dummy.restapiexample.com/public/api/v1/update';

let output = '';
const employeeForm = document.querySelector('.add-employee-form');
const saveBtn = document.getElementById('save-btn');
const editBtn = document.getElementById('.edit-btn');
const delBtn = document.getElementById('.del-btn');

const employeeId = document.getElementById('employeeId');
const Name = document.getElementById('Name');
const Age = document.getElementById('Age');
const Salary = document.getElementById('Salary');
const Img = document.getElementById('customFile');



// Get the Employees
//Method: GET
fetch(get_url)
    .then((responce) => {
        if (!responce.ok) {
            throw Error("oops can't connect to API");
        } else {
            return responce.json()
        }
    })
    .then((result) => {
        let getEmployeeArray = result.data
        renderEmployee(getEmployeeArray)
    }).catch(err => {
        alert(err);
    });

let renderEmployee = (result) => {
    // console.log(result);
    // console.log(result.data);
    result.forEach(element => {
        output += `<tbody>
                        <tr id = "${element.id}" class="empRows">
                            <td>${element.id}</td>
                            <td class = 'name'>${element.employee_name}</td>
                            <td class = 'age'>${element.employee_age}</td>
                            <td class = 'salary'>${element.employee_salary}/-</td>
                            <td><a id="del-btn"><i class="fa fa-trash"></i></a></td>
                            <td><a id="edit-btn"><i class="fas fa-edit"></i></a></td>  
                        </tr>
                     </tbody>`;
    })
    employeeList.innerHTML = output;
}

// create new employee 
// Method:POST
// saveBtn.addEventListener('click', (e) => {
employeeForm.onsubmit = (e) => {
        e.preventDefault();
        // console.log(e.target);
        // console.log('form submitted');
        fetch(post_url, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    "status": "success",
                    // "data": {
                    // "id": employeeId.value,
                    "employee_name": Name.value,
                    "employee_salary": Salary.value,
                    "employee_age": Age.value,
                    "image": Img.value,
                    // }
                })
            })
            .then((res) => res.json())
            .then(result => {
                // JSON.stringify(result)
                // console.log(result.data);
                const datArr = []
                const postEmployeeArray = result.data;
                datArr.push(postEmployeeArray);
                // console.log(datArr);
                renderEmployee(datArr);
            }).catch(err => {
                alert(err);
            });
        employeeForm.reset();
    }
    // });

//DELETE & EDIT
myTable.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e.target.parentElement.parentElement.id);
    // console.log(e.target.id);
    let id = e.target.parentElement.parentElement.id;

    let deleteBtnPressed = e.target.id == 'del-btn'
    let editBtnPressed = e.target.id == 'edit-btn'

    if (deleteBtnPressed) {
        // console.log('delete row');
        fetch(`${delete_url}/${id}`, {
                method: 'DELETE'
            })
            .then((responce) => {
                if (!responce.ok) {
                    throw Error("oops can't connect to API");
                } else {
                    return responce.json()
                }
            })
            .then(() => location.reload())
            .catch(err => {
                alert(err);
            });
    }

    if (editBtnPressed) {
        const parent = e.target.parentElement.parentElement;
        let editName = parent.querySelector('.name').textContent;
        let editAge = parent.querySelector('.age').textContent;
        let editSalary = parent.querySelector('.salary').textContent;
        // console.log(editName);
        Name.value = editName;
        Age.value = editAge;
        Salary.value = editSalary;

        //UPDATE
        //Method:PUT
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`${update_url}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "status": "success",
                        "employee_name": Name.value,
                        "employee_salary": Salary.value,
                        "employee_age": Age.value,
                    })
                })
                .then(responce => responce.json())
                .then(() => location.reload())
                .catch(err => {
                    alert(err);
                });
        });
    }

});

// search 
const searchFunc = () => {
    let search = document.getElementById('searchTxt').value.toUpperCase();
    let tr = myTable.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(search) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// SORT
for (let x = 0; x < th.length; x++) {
    th[x].addEventListener('click', item(x))
}

function item(x) {
    return function() {
        // console.log(x)
        sortTable(x);
    }
}

function sortTable(x) {
    let shouldSwitch;
    let switching = true;

    while (switching) {
        switching = false;
        let rows = myTable.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            let a = rows[i].getElementsByTagName("TD")[x];
            let b = rows[i + 1].getElementsByTagName("TD")[x];

            if (a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

//creating manually employee Data which is an array of objects.
let manualEmployeedata = [{
        id: 25,
        employee_name: 'sudip bhunia',
        employee_age: 53,
        employee_salary: 12540
    },

    {
        id: 26,
        employee_name: 'dipali kamakar',
        employee_age: 28,
        employee_salary: 67400
    },

    {
        id: 27,
        employee_name: 'biswajit soren',
        employee_age: 22,
        employee_salary: 10540
    },

    {
        id: 28,
        employee_name: 'Shubham Sharma',
        employee_age: 46,
        employee_salary: 34500
    },

    {
        id: 29,
        employee_name: 'saniya panda',
        employee_age: 34,
        employee_salary: 26100
    }
];

function renderManualEmployee(result) {
    // console.log(result);
    result.forEach(element => {
        output += `<tbody>
                        <tr id = "${element.id}" class="empRows">
                            <td>${element.id}</td>
                            <td class = 'name'>${element.employee_name}</td>
                            <td class = 'age'>${element.employee_age}</td>
                            <td class = 'salary'>${element.employee_salary}/-</td>
                            <td><a id="del-btn"><i class="fa fa-trash"></i></a></td>
                            <td><a id="edit-btn"><i class="fas fa-edit"></i></a></td>  
                        </tr>
                     </tbody>`;
    })
    employeeList.innerHTML = output;
};

//Rendering the manual employee data
renderManualEmployee(manualEmployeedata);