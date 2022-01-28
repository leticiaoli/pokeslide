'use strict'

const Services = {

    pokeApi: function(){
        const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0'

        return $.get(endpoint, function(res){
            return res
        })
    }

}

export default Services