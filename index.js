$().ready(function() {
    $(".active-counter h4").text($(".count").length);
    $("#room-1").hover(
        function () {
            $("#room-1 .rooms-users").stop().slideDown().removeClass("default-room");
        },
        function () {
            $("#room-1 .rooms-users").stop().slideUp().addClass("default-room");
        }
    );
    $("#room-2").hover(
        function () {
            $("#room-2 .rooms-users").stop().slideDown().removeClass("default-room");
        },
        function () {
            $("#room-2 .rooms-users").stop().slideUp().addClass("default-room").off("mouseenter mouseleave");
        }
    )
    $("#room-3").hover(
        function () {
            $("#room-3 .rooms-users").stop().slideDown().removeClass("default-room");
        },
        function () {
            $("#room-3 .rooms-users").stop().slideUp().addClass("default-room").off("mouseenter mouseleave");
        }
    )
    $("#room-4").hover(
        function () {
            $("#room-4 .rooms-users").stop().slideDown().removeClass("default-room");
        },
        function () {
            $("#room-4 .rooms-users").stop().slideUp().addClass("default-room").off("mouseenter mouseleave");
        }
    )
    $("#room-5").hover(
        function () {
            $("#room-5 .rooms-users").stop().slideDown().removeClass("default-room");
        },
        function () {
            $("#room-5 .rooms-users").stop().slideUp().addClass("default-room").off("mouseenter mouseleave");
        }
    )

});