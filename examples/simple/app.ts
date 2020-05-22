import axios from '../../src/index'

axios({
    method: 'get',
    url: '/simple/get',
    params: {
        a: {cv:1},
        b: 2
    }
})





