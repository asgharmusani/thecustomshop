if (document.getElementById("message")) {
    const messageDiv = document.getElementById("message");
    const messageStatus = messageDiv.getAttribute("data-status");
    const messageValue = messageDiv.getAttribute("data-value");
    toastr[messageStatus.toLowerCase()](
        messageValue,
        messageStatus.charAt(0).toUpperCase() + messageStatus.substr(1).toLowerCase(),
        {
            timeOut: 3000,
            positionClass: "toast-bottom-center",
            toastClass: { opacity: 0 },
        },
    );
}
