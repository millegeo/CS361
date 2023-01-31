/* Function to first alert user then upon selection of yes clear results of table */

function clearTable() {
    const answer = confirm("Are you sure you want to clear your results?")
    if (answer) {
        window.location.assign("/")
    } else {
        return;
    }
}

function alertAdvanced() {
    const answer = confirm("Going to advanced search will not guarantee accuracy. You MUST know the name and spelling of the location you're interested in. Click Okay to proceed.")
    if (answer) {
        window.location.assign("/advanced-search")
    } else {
        return;
    }
}
