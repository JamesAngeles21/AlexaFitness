
$(document).ready(function() {
    $("#scroll").click(function() {

        $('html, body').animate({
        scrollTop: $("#choose-page").offset().top
    }, 1000);
        return false;
    });
    
    $("#own").click(function() {

        $('html, body').animate({
        scrollTop: $("#third-page").offset().top
    }, 1000);
        return false;
    });
    
    
    
    
    $("#one").click(function() {

        $('html, body').animate({
        scrollTop: $("#fourth-page").offset().top
    }, 1000);
        return false;
    });
    
    $("#three").click(function() {

        $('html, body').animate({
        scrollTop: $("#fourth-page").offset().top
    }, 1000);
        return false;
    });
    
    $("#five").click(function() {

        $('html, body').animate({
        scrollTop: $("#fourth-page").offset().top
    }, 1000);
        return false;
    });
});


