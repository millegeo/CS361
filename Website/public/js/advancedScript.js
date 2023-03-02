
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
                    var countryXML = new XMLHttpRequest();
                    countryXML.open('GET', "http://localhost:8080/countries", false);
                    countryXML.send();
                    countries = countryXML.responseText;
                    countries = JSON.parse(countries);
                    if (countries.countries.includes(locationName)) {
                        insert_table(data, locationName);
                    } else {
                        locationError(locationName);
                    }                  
                }
            }
            xhttp.send();

    /* 
        Function to add dynamic data to table and show it
    */
    function insert_table(data, locationName) {

        document.getElementById('advanced-table').style.display = 'none'; //Hide search bar
        dataObject = JSON.parse(data)
        let table = document.getElementById('display-table');
        // Create elements for table
        create_insert_elements(dataObject, locationName, table);
        // Create add button and clear button
        create_clear_add(dataObject, locationName);
    }
})

/*
    Function to create and add clear button and add to my table button
*/
function create_clear_add(dataObject, locationName) {

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

/*
    Function to create table elements and insert data into table
*/
function create_insert_elements(data, locationName, table) {

    let headArray = [null, null, null];
    let rowArray = [null, null, null];
    let headers = ["Location", "Description", "Image"];
    for (i = 0; i < 3; i++) {
        headArray[i] = document.createElement("TH");
        headArray[i].innerText = headers[i];
        rowArray[i] = document.createElement("TD");
    }
    rowArray[0].innerText = locationName;
    rowArray[1].innerText = data.wiki;
    let image_cell = create_image(data);
    rowArray[2].appendChild(image_cell);
    create_rows(headArray, rowArray, table);
}

/*
    Function to create rows for the table;
*/
function create_rows(headArray, rowArray, table) {

    console.log(rowArray);
    let headRow = document.createElement("TR");
    let dataRow = document.createElement("TR");
    for (i=0; i<3; i++) {
        headRow.appendChild(headArray[i]);
        dataRow.appendChild(rowArray[i]);
    }
    table.appendChild(headRow);
    table.appendChild(dataRow);
}

/*
    Function to create image element
*/
function create_image(data) {

    let image = document.createElement("IMG");
    image.setAttribute("src", data.images[0]);
    image.setAttribute("width", "400px");
    image.setAttribute("height", "200px");
    return image;
}

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

/*
    Invalid country requested/display prompt to user.
*/
function locationError(locationName) {
    alert(`${locationName} is not a valid country`);
    window.location.assign("/advanced-search");
}
