$().ready(function() {

    /*
    var waypoint = new Waypoint({
       element: $('.count-me'),
       handler: function(direction) {

       }
    });

    waypoint;

    $(document).on('scroll', function() {
    var pixelsFromTop = $(document).scrollTop();
    if (pixelsFromTop > 500) {
    });

     */
    $('.count-me').counterUp({
        delay: 10,
        time: 2000
    });
});