$().ready(function (){

    // Define POST method with fetch API
    async function postData(data = {}, suffix) {
        // Default options are marked with *n
        url = 'http://127.0.0.1:8081/' + suffix;
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response; // parses JSON response into native JavaScript objects
    }

    $("#passDisplay").click(showPass);
    function showPass() {
        var x = document.getElementById("pass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    // Submit listener
    $(".form-alert").hide();

    $(".my-form > form > div > button").click(function(e){
        var password = $("#pass").val();
        var login = $("#login").val();
        var generateJson = {};

        // Regex for password validation
        if (password === '' || login === '') {
            $(".form-alert").show().text("You need to fill in all blanks!");
        } else {
            generateJson.login = login;
            generateJson.password = password;
            postData(generateJson, "CanLogin").then((response) => response.json())
                .then((responseJSON) => {
                    if (responseJSON.Response === "WRONG") {
                        $(".form-alert").show().text("Incorrect password or login!");
                    } else {
                        localStorage['login'] = login;
                        window.location.replace("../MainPage.html");
                    }
                });;
            //window.location.replace("../MainPage.html");
        }
    });
});