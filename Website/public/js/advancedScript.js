/*
Set-up event listener for advanced search and perform call to microservice on event.
*/

let advancedTable = document.getElementById('advanced-table');

advancedTable.addEventListener("submit", function (e) {

    e.preventDefault();

    locationName = document.getElementById("location").value
    var xhttp = new XMLHttpRequest();
            xhttp.open('GET', 'http://localhost:8081/query/' + locationName, true) //XML call to web scraping microservice
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = xhttp.responseText;
                    insert_table(data, locationName);
                }
            }
            xhttp.send();


/* 
Function to add dynamic data to table and show it
*/
function insert_table(data, locationName) {

    hide = document.getElementById('advanced-table').style.display = 'none';

    dataObject = JSON.parse(data)
    let table = document.getElementById('display-table');
    // Create elements for table
    let locationHead = document.createElement("TH");
    let descriptionHead = document.createElement("TH");
    let imageHead = document.createElement("TH");
    let row = document.createElement("TR");
    let headRow = document.createElement("TR");
    let descriptionCell = document.createElement("TD");
    let imageCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
  
    // Input data into created elements
    locationHead.innerText = "Location"
    descriptionHead.innerText = "Description";
    imageHead.innerText = "Image";
    locationCell.innerText = locationName;
    descriptionCell.innerText = dataObject.wiki;
    // Create image object
    let image = document.createElement("IMG");
    image.setAttribute("src", dataObject.images[0]);
    image.setAttribute("width", "400px");
    image.setAttribute("height", "200px");
    imageCell.appendChild(image);

    headRow.appendChild(locationHead);
    headRow.appendChild(descriptionHead);
    headRow.appendChild(imageHead);
    row.appendChild(locationCell);
    row.appendChild(descriptionCell);
    row.appendChild(imageCell);

    table.appendChild(headRow);
    table.appendChild(row);

    dynamicField = document.getElementById("dynamic-update");
    let clearButton = document.createElement("button");
    let addToTable = document.createElement("button");

    clearButton.innerText = "Clear Table";
    addToTable.innerText = "Add to My Table";

    clearButton.setAttribute("onclick","clearAdvTable()");
    addToTable.setAttribute("onclick", "update_database(dataObject, locationName)");

    dynamicField.appendChild(clearButton);
    dynamicField.appendChild(addToTable);
}

})

/*
Update the database so destination information is A) Stored and B) Displayed on my table
*/
function update_database(locationObject, locationName) {
    let data = {
        destination: locationName,
        destination_description: locationObject.wiki,
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/advanced-search/update-db', true)
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert("Successfully added destination to your table")
        }
    }
    xhttp.send(JSON.stringify(data));
}

/*
Ask user to confirm they want to clear the result from table in case it was
accidentally clicked.
*/
function clearAdvTable() {
    const answer = confirm("Are you sure you want to clear your results?")
    if (answer) {
        window.location.assign("/advanced-search")
    } else {
        return;
    }
}

/*
Prompt user that location is not a valid query
*/
function displayError(locationName) {
    alert(`${locationName} is not a valid search query`);
    window.location.assign("/advanced-search");
}
