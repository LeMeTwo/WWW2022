$().ready(function() {
    // REST API GET
    async function getData(suffix) {
        url = 'http://127.0.0.1:8081/' + suffix;                     
        return await fetch(url).then(res => res.json());
    }


    // REST API POST
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

    var myId = {};
    myId.id = localStorage['id'];

    postData(myId, 'api/roomInfo').then((response) => response.json())
    .then((responseJSON) => {
        if (responseJSON.Response === "WRONG") {
            $("#room-place").append("You don't belong to any room :(");
        } else {
            for (let i = 0; i < responseJSON.length; i++) {
                var base = '<a class="list-group-item" href="ChatRoom.html/' + responseJSON[i].roomID + '">\
                                <div class="rooms" id="room-' + (i + 1) + '">\
                                    <img class="rooms-backgr" src="rooms_db/room_1.png" alt="room#1">\
                                    <div class="rooms-users hide-me">' + responseJSON[i].memberCount + ' usr' + '</div>\
                                    <div class="rooms-title">\
                                        <p style="margin: 0">' + responseJSON[i].name + '</p>\
                                        <p style="margin: 0" class="hide-me">' + '\
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + responseJSON[i].name + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                            Aktywni teraz: ' + responseJSON[i].activeUsers + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ostatnia aktywność:' + responseJSON[i].lastUpdate + '\
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                                        ' + '</p>\
                                    </div>\
                                </div>\
                            </a>';
                $("#room-place").append(base);
            }
        }
    });

    getData('api/friendsInfo').then((response) => response.json())
    .then((responseJSON) => {

    });

    // Personalised user interface
    $("#user-name-logo").text(localStorage['login']);

    $(".active-counter h4").text($(".count").length);
    $("#room-1").hover(
        function () {
            $("#room-1 .rooms-users").stop().slideDown().removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").addClass("hide-me");
        },
        function () {
            $("#room-1 .rooms-users").stop().slideUp().addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").removeClass("hide-me");
        }
    );
    $("#room-2").hover(
        function () {
            $("#room-2 .rooms-users").stop().slideDown().removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").addClass("hide-me");
        },
        function () {
            $("#room-2 .rooms-users").stop().slideUp().addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").removeClass("hide-me");
        }
    )
    $("#room-3").hover(
        function () {
            $("#room-3 .rooms-users").stop().slideDown().removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").addClass("hide-me");
        },
        function () {
            $("#room-3 .rooms-users").stop().slideUp().addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").removeClass("hide-me");
        }
    )
    $("#room-4").hover(
        function () {
            $("#room-4 .rooms-users").stop().slideDown().removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").addClass("hide-me");
        },
        function () {
            $("#room-4 .rooms-users").stop().slideUp().addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").removeClass("hide-me");
        }
    )
    $("#room-5").hover(
        function () {
            $("#room-5 .rooms-users").stop().slideDown().removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").removeClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").addClass("hide-me");
        },
        function () {
            $("#room-5 .rooms-users").stop().slideUp().addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(2)").addClass("hide-me");
            $("#room-1 > div.rooms-title > p:nth-child(1)").removeClass("hide-me");
        }
    )

    $("#submitmsg").click(function () {
        var clientmsg = $("#usermsg").val();
        $.post("post.php", { text: clientmsg });
        $("#usermsg").val("");
        return false;
    })

    $("#message-input").emojioneArea({
       pickerPosition: 'bottom'
    });

    $("#priv-message-input").emojioneArea({
        pickerPosition: 'bottom'
     });

    $("#send-button").click(function (e){
        document.getElementsByClassName('.emojionearea-editor').value='';
    });
});