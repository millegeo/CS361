function deletePart(partID) {
    var link = '/delete-part-ajax/';
    link += partID;
    let data = {
      id: partID
    };
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(partID);
      }
    });
  }
  
  function deleteRow(partID){
      let table = document.getElementById("parts-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == partID) {
              table.deleteRow(i);
              deleteDropDownMenu(partID);
              break;
         }
      }
  }

  function deleteDropDownMenu(partID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(partID)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }