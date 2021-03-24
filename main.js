const debounce = (fn) => {
    let frame;
    return (...params) => {
        if (frame) {
            cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {
            fn(...params);
        });
    }
};

const onScroll = () => {
    updateNavBarColor();
    updateNavPoints();
}

const updateNavBarColor = () => {
    //var head = document.getElementsByClassName("head")[0];
    var head = $(".head")[0];
    $(head).css("backgroundColor", "rgba(255, 255, 255, " + (window.scrollY / 300) + ")");
    //head.style.backgroundColor = "rgba(255, 255, 255, " + (window.scrollY / 300) + ")";

    head.style.color = "rgb("
    + (255 - ((window.scrollY / 300) * 255)) + ", " 
    + (255 - ((window.scrollY / 300) * 255)) + ", " 
    + (255 - ((window.scrollY / 300) * 255)) + ")";

    if (window.scrollY > 200) {
        head.style.boxShadow = "0px 5px 0.5rem rgba(0, 0, 0, 0.5)";
    } else {
        head.style.boxShadow = null;
    }
}

const updateNavPoints = () => {
    var list = $(".nav-point").toArray().filter(p => $($(p).attr("href")).position().top + $(".head").height() > window.scrollY);
    var last = list[list.length - 1];
    $(".nav-point").not(last).removeClass("selected");
    $(last).addClass("selected");
}

const setupSmoothScrolling = () => {
    $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - $(".head").height()
                }, 700);
                return false;
            }
        }
    });
}

var slideIndex = 1;

const advanceSlideShow = (n) => {
    var i;
    //var x = document.getElementsByClassName("slider-image");
    var x = $(".slider-image");
    if(slideIndex + n > x.length) {
        slideIndex = 0;
    }
    if(slideIndex + n < 0) {
        slideIndex = x.length - 1;
    }

    for(i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex].style.display = "block";
}

$(function() {
    setupSmoothScrolling();
    updateNavBarColor();
    updateNavPoints();
    document.addEventListener('scroll', debounce(onScroll), { passive: true });
    document.getElementsByClassName("button-right")[0].addEventListener("click", () => advanceSlideShow(1));
    document.getElementsByClassName("button-left")[0].addEventListener("click", () => advanceSlideShow(-1));
});