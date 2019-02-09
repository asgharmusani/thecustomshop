// function addToCart() {
//     var addToCart = document.querySelectorAll('[data-action="add-to-cart"]');

//     for (i = 0; i < addToCart.length; i++) {
//         addToCart[i].onclick = function(event) {
//             url = this.getAttribute("data-url");
//             qty = this.getAttribute("data-qtyReplace");
//             console.log(qty);
//             var infoCart = {
//                 qty: this.getAttribute("data-qty") ? this.getAttribute("data-qty") : 1,
//                 qtyReplace: this.getAttribute("data-qtyReplace"),
//             };
//             var xhttpAddToCart = new XMLHttpRequest();
//             xhttpAddToCart.open("POST", url, true);
//             xhttpAddToCart.onreadystatechange = function() {
//                 if (this.readyState == 4 && this.status == 200) {
//                     window.location.reload();
//                 }
//             };

//             xhttpAddToCart.setRequestHeader("Content-type", "application/json");
//             xhttpAddToCart.send(JSON.stringify(infoCart));

//             return true;
//         };
//     }
// }
