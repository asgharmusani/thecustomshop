var drop = document.getElementById('dropdownProducts');
var down = document.getElementById('showProducts');

drop.onclick = function () {
  if (down.style.display === "none") {
    down.style.display = "block";
  } else {
    down.style.display = "none";
  }
}

var dropReport = document.getElementById('dropdownReports');
var downReport = document.getElementById('showReports');

dropReport.onclick = function () {
  if (downReport.style.display === "none") {
    downReport.style.display = "block";
  } else {
    downReport.style.display = "none";
  }
}