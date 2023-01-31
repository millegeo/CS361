/* Function to first alert user then upon selection of yes clear results of table */

function clearTable() {
    const answer = confirm("Are you sure you want to clear your results?")
    if (answer) {
        window.location.assign("/")
    } else {
        return;
    }
}
