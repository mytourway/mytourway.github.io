window.addEventListener('load', function() {
    var postContent = document.querySelector('article.page__post');

    new Pack(postContent)
        .base('js-ease-out-leave-active')
        .base('js-ease-out-leave')
        .transfrom('js-ease-out-enter-active')
        .end(function() {
            var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

            arr.forEach(function(item) {
                postContent.classList.remove(item);
            });
        })
        .toggle();

    $('#image-gallery').lightSlider({
        gallery:true,
        item:1,
        thumbItem:9,
        slideMargin: 0,
        speed:500,
        auto:false,
        loop:false,
        onSliderLoad: function() {
            $('#image-gallery').removeClass('cS-hidden');
        }  
    });
});