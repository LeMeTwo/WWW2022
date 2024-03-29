$().ready(function () {
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

    $(".my-form > form > div > button").click(function (e) {
        if ($("#ageConfirm").is(':checked') && $("#rulesConfirm").is(':checked')) {
            var login = $("#nick").val();
            var password = $("#pass").val();
            var email = $("#mail").val();
            var generateJson = {};

            // Regex for password validation
            if (password === '' || email === '' || login === '') {
                $(".form-alert").show().text("You need to fill in all blanks!");
            } else if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&-]).{8,}$/.test(password))) {
                $(".form-alert").show().text("Your password does not meet our password criteria! You need to figure out something more difficult!");
            } else {
                generateJson.login = login;
                generateJson.email = email;
                generateJson.password = password;

                postData(generateJson, "CanRegister").then((response) => response.json())
                    .then((responseJSON) => {
                        if (responseJSON.Response === "WRONG") {
                            $(".form-alert").show().text("The account already exists! Identity theft is not a joke Jim!");
                        } else {
                            localStorage['id'] = responseJSON.ID;
                            localStorage['login'] = login;
                            window.location.replace("../MainPage.html");
                        }
                    });
            }
        } else {
            $(".form-alert").show().text("You need to confirm that you are 15 years old or above and have read and accept Use Terms!");
        }
    });
});
