$().ready(function() {
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

});