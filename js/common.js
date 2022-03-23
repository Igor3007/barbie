
if (document.querySelector('#video-one-page')) {
    document.getElementById('video-one-page').addEventListener('ended', myHandler, false);

    function myHandler(e) {
        $('.one-video__right-media img').show()
        $(".one-video__player").fadeOut(300)
        $('.one-video__btn').show()
        $('.one-video__btn-right').text('Посмотреть еще раз')
    }
}

$(document).ready(function () {

    /* gallery */

    if ($('.gal.wee .grid .item').length <= 8) {
        $('.gal.wee .grid').parent().find('.more').hide()
    }

    /* stories */
    $('[data-owl="stories"]').owlCarousel({
        loop: false,
        margin: 40,
        dots: false,
        nav: true,
        navSpeed: 750,
        dotsSpeed: 750,
        smartSpeed: 750,
        autoplaySpeed: 750,
        items: 4,
        //lazyLoad: true,
        responsive: {
            992: {
                items: 4
            },
            768: {
                items: 3
            },
            480: {
                items: 2
            },
            0: {
                items: 1,
                margin: 25,
            }
        },
        onInitialized: function (event) {
            //$('.reviews .slider_wrap .count .total span').text(event.item.count)
        },
        onTranslate: function (event) {
            //$('.reviews .slider_wrap .count .current').text(event.item.index + 1)
        },

    });

    //toggle

    if ($(window).width() >= 480) {
        if ($('[data-more-container="review"]').find('.review').length > 8) {
            $('[data-more-toggle="review"]').show()
            $('[data-more-container="review"]').addClass('hide-more')
        }
    }

    $('[data-more-toggle="review"]').on('click', function (event) {

        $('[data-more-container="review"]').toggleClass('hide-more')

        if ($('[data-more-container="review"]').hasClass('hide-more')) {
            $(this).find('.btn').text('Показать больше')
            $(this).removeClass('open')
        } else {
            $(this).find('.btn').text('Свернуть')
            $(this).addClass('open')
        }

    })

    //send contact-form

    $(document).on('submit', '.wpcf7-form', function(e){

        e.preventDefault();

        let _this = $(this);

        $.ajax({
            type: "post",
            url: _this.attr('action') ,
            data: {
                data: _this.serialize()
            },
            dataType: "json",

            beforeSend: function(){
                _this.find('input').each(function(){
                    if($(this).val() == ''){
                        $(this).addClass('error')
                    }else{
                        $(this).removeClass('error')
                    }
                })

                if(_this.find('input.error').length){
                    _this.find('.wpcf7-response-output').text('Все поля обязательны для заполнения').addClass('active')
                    return false;
                }

                _this.find('.btn-violet').addClass('btn-loading')
            },
            
            success: function (response) {

                _this.find('.btn-violet').removeClass('btn-loading')
                _this.find('.wpcf7-response-output').removeClass('active')

                if(response.status == 'send'){
                    console.log(response)
                    _this[0].reset()

                    $.fancybox.close()
                    $.fancybox.open({
                        type: 'html',
                        src: '<div class="success-send" ><h3>Спасибо</h3><div>Сообщение отправлено успешно!</div></div>'
                    })
                }

                if(response.status == 'error'){
                    console.log(response)
                    _this.find('.wpcf7-response-output').text(response.msg).addClass('active')
                }
                
            }
        });

    })

})

