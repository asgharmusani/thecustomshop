window.onload = (function totalPrice() {
    if (document.getElementById("subTotal") != null) {
        let subTotal = document.getElementById("subTotal").innerText.substring("Rs. ".length);
        let x = parseInt(subTotal) + parseInt(1500);
        document.getElementById("total").innerHTML = "<strong>Rs. " + x + "<strong>";
    }
})();
