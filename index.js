$().ready(function() {
    $(".active-counter h4").text($(".count").length);
    $("#room-1").hover(
        function () {
            $("#room-1 .rooms-users").slideDown().removeClass("default-room");
        },
        function () {
            $("#room-1 .rooms-users").slideUp().addClass("default-room");
        }
    )
    $("#room-2").hover(
        function () {
            $("#room-2 .rooms-users").slideDown().removeClass("default-room");
        },
        function () {
            $("#room-2 .rooms-users").slideUp().addClass("default-room");
        }
    )
    $("#room-3").hover(
        function () {
            $("#room-3 .rooms-users").slideDown().removeClass("default-room");
        },
        function () {
            $("#room-3 .rooms-users").slideUp().addClass("default-room");
        }
    )
    $("#room-4").hover(
        function () {
            $("#room-4 .rooms-users").slideDown().removeClass("default-room");
        },
        function () {
            $("#room-4 .rooms-users").slideUp().addClass("default-room");
        }
    )
    $("#room-5").hover(
        function () {
            $("#room-5 .rooms-users").slideDown().removeClass("default-room");
        },
        function () {
            $("#room-5 .rooms-users").slideUp().addClass("default-room");
        }
    )

});