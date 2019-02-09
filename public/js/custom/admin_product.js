document.getElementById("addImages").addEventListener("click", function(event) {
    var table = document.getElementById("imagesTable");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    cell1.innerHTML = "<input type='file' class='form-control mt-10' name='productImage'>";
    event.preventDefault();
});
