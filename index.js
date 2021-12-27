var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function check () {
    let checkB = document.getElementById("box")
    if (checkB.checked){
       return checkB.value = "Yes"
    }
   return checkB.value= "No"
}

function checkupdate (boxV) {
    let checkB = document.getElementById("box")
    console.log(boxV)
    if(boxV == "Yes"){
       return checkB.checked = true
    }
   return checkB.checked = false
}

function readFormData() {
    var formData = {};
    formData["fName"] = document.getElementById("fName").value;
    formData["lName"] = document.getElementById("lName").value;
    formData["fullName"] = `${formData["fName"]} ${formData["lName"]}`;
    formData["email"] = document.getElementById("email").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["box"] = check();
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("patientList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.box;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onDelete(this)">Delete</button>`;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button>`;
    document.querySelector(".patients-table").classList.remove("hide");
}

function resetForm() {
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
   let checkB = document.getElementById("box").checked = false
    selectedRow = null
}

function resetTab() {
    let row = document.querySelector("#patientList > tbody");
    if(row.rows.length<=0){
        document.querySelector(".patients-table").classList.add("hide");
    }
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    let fullBreak = selectedRow.cells[0].innerHTML.split(" ")
    document.getElementById("fName").value = fullBreak[0];
    document.getElementById("lName").value = fullBreak[1];
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
    let boxV = selectedRow.cells[3].innerHTML;
    document.getElementById("box").value = checkupdate(boxV);
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.box;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("patientList").deleteRow(row.rowIndex);
        resetTab();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fName").value == "" || 
    document.getElementById("lName").value == "" || 
    document.getElementById("gender").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}