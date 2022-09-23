console.log("Entra");
$("#pass").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#btnInicio").click();
    }
});
$("#user").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#btnInicio").click();
    }
});

