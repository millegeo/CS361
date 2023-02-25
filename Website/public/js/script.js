/* 
Function to first alert user then upon selection of yes clear results of table
 */

function clearTable() {
    const answer = confirm("Are you sure you want to clear your results?")
    if (answer) {
        window.location.assign("/")
    } else {
        return;
    }
}

/*
Notify of outcome of proceeding with advanced search.
*/
function alertAdvanced() {
    const answer = confirm("Going to advanced search will not guarantee accuracy. You MUST know the name and spelling of the location you're interested in. Click Okay to proceed.")
    if (answer) {
        window.location.assign("/advanced-search")
    } else {
        return;
    }
}

/*
Update myTable with new destination using ajax.
*/
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

/*
Remove destination from myTable using ajax.
*/
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

/*
Delete row from table
*/
function deleteRow(id) {
    let table = document.getElementById('my-table')
    for (let i=0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == id) {
            table.deleteRow(i)
            break;
        }
    }
}

/*
Select random destination_id
*/
function randomLocation(numOfDest) {
    destination_id = Math.floor(Math.random()*numOfDest);
    var link = '/show-table?input_destination='
    link += destination_id;
    window.location.assign(link);
    }
