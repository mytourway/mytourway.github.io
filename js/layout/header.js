window.addEventListener('load', function() {
    (function() {
        var headerEle = document.getElementById('page-header');

        function toggleNavStyle() {
            var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            headerEle.classList[ scrollTop > 30 ? 'add' : 'remove' ]('page__header--small');
        }

        headerEle && document.addEventListener('scroll', toggleNavStyle);
    })();
    
    (function() {
        var 
            btn = document.querySelector('button.page__menu-btn'),
            menu = document.querySelector('nav.page__nav');

        if (btn && menu) {
            var packMenu = new Pack(menu);

            packMenu.base('js-open').transfrom('page__nav--open');

            btn.addEventListener('click', function() {
                packMenu.toggle();
            });
        }
    })();

    (function() {
        var header = document.getElementById('page-header');
        
        if (!header) return;

        var
            title = header.querySelector('.info__title'),
            desc = header.querySelector('.info__desc');

        title && new Pack(title)
            .animation('js-animation')
            .end(function() {
                var arr = ['js-animation'];

                arr.forEach(function(item) {
                    title.classList.remove(item);
                });
            })
            .toggle();

        desc && new Pack(desc)
            .base('js-ease-out-leave-active')
            .base('js-ease-out-leave')
            .transfrom('js-ease-out-enter-active')
            .end(function() {
                var arr = ['js-ease-out-enter', 'js-ease-out-enter-active', 'js-ease-out-leave', 'js-ease-out-leave-active'];

                arr.forEach(function(item) {
                    desc.classList.remove(item);
                });
            })
            .toggle();
    })();

    (function(){
        $('a[href="#"]').on('click', function(e){
          e.preventDefault();
        });
        
        $('.nav__list > li').on('mouseover', function(e){
          $(this).find("ul:first").show();
          $(this).find('> a').addClass('active');
        }).on('mouseout', function(e){
          $(this).find("ul:first").hide();
          $(this).find('> a').removeClass('active');
        });
        
        $('.nav__list li li').on('mouseover',function(e){
          if($(this).has('ul').length) {
            $(this).parent().addClass('expanded');
          }
          $('ul:first',this).parent().find('> a').addClass('active');
          $('ul:first',this).show();
        }).on('mouseout',function(e){
          $(this).parent().removeClass('expanded');
          $('ul:first',this).parent().find('> a').removeClass('active');
          $('ul:first', this).hide();
        });
      })();
});