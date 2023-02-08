/* Function to first alert user then upon selection of yes clear results of table */

function clearTable() {
    const answer = confirm("Are you sure you want to clear your results?")
    if (answer) {
        window.location.assign("/")
    } else {
        return;
    }
}

//Notify of outcome of proceeding with advanced search.
function alertAdvanced() {
    const answer = confirm("Going to advanced search will not guarantee accuracy. You MUST know the name and spelling of the location you're interested in. Click Okay to proceed.")
    if (answer) {
        window.location.assign("/advanced-search")
    } else {
        return;
    }
}

//Update myTable with new destination using ajax.
function updateTable(destinationId) {
    var link = '/update-table/';
    link += destinationId;
    
    let data = {
        id: destinationId
    };
    $.ajax({
        url: link,
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
    })
    alert("Successfully added destination to your table")
}

//Remove destination from myTable using ajax.
function removeFromTable(destinationId) {
    const answer = confirm("Are you sure you want to remove from your table?")
    if (answer) {
        var link = '/delete-table/'
        link += destinationId;
        let data = {
            id: destinationId
        }
        $.ajax({
            url: link,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                deleteRow(destinationId);
            }
        })
    } else {
        return;
    }
    
}

//Delete row from table
function deleteRow(id) {
    let table = document.getElementById('my-table')
    for (let i=0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == id) {
            table.deleteRow(i)
            break;
        }
    }
}

//Request travel information from microservice and call addInformation to add to table.
function microservice(location) {
    var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'http://localhost:9124/translator?random=' + location, true) //Need URL for microservice
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = xhttp.responseText;
                addInformation(data);
            }
        }
        xhttp.send();
}

//  ****TO IMPLEMENT**** Get data from microservice and add information to table
function addInformation(location) {
    table = document.getElementById('travel-info');
}