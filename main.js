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
    //updateNavPoints();
}

const updateNavBarColor = () => {
    var head = document.getElementsByClassName("head")[0];
    head.style.backgroundColor = "rgba(255, 255, 255, " + (window.scrollY / 300) + ")";
    head.style.color = "rgb(" + (255 - ((window.scrollY / 300) * 255)) + ", " + (255 - ((window.scrollY / 300) * 255)) + ", " + (255 - ((window.scrollY / 300) * 255)) + ")";
    if (window.scrollY > 200) {
        head.style.boxShadow = "0px 5px 0.5rem rgba(0, 0, 0, 0.5)";
    } else {
        head.style.boxShadow = null;
    }
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

$(function() {
    setupSmoothScrolling();
    updateNavBarColor();
    document.addEventListener('scroll', debounce(onScroll), { passive: true });
});