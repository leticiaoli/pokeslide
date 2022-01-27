'use strict'

const PokeSlide = {

    init: function () {
        this.slideHome()
    },

    slideHome: function(){
        $('.pokeSlide').slick({
            mobileFirst: true,
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        dots: false,
                        prevArrow: '<img class="pokeSlide__buttom pokeSlide__buttom-prev" src="../images/seta.svg" alt="icone de seta">',
                        nextArrow: '<img class="pokeSlide__buttom pokeSlide__buttom-next" src="../images/seta.svg" alt="icone de seta">'
                    }
                }
            ]
        })
    }

}

export default PokeSlide
