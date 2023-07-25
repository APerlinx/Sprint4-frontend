import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg
}

window.cs = carService // for console usage

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('car', filterBy)
}
function getById(carId) {
    return httpService.get(`car/${carId}`)
}

async function remove(carId) {
    return httpService.delete(`car/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await httpService.put(`car/${car._id}`, car)
    } else {
        savedCar = await httpService.post('car', car)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, {txt})
    return savedMsg
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}