import { carService } from '../services/car.service.local'
// import { carService } from '../services/car.service'

export function getActionRemoveCar(carId) {
    return {
        type: 'removeCar',
        carId
    }
}
export function getActionAddCar(car) {
    return {
        type: 'addCar',
        car
    }
}
export function getActionUpdateCar(car) {
    return {
        type: 'updateCar',
        car
    }
}
export function getActionAddCarMsg(carId) {
    return {
        type: 'addCarMsg',
        carId,
        txt: 'Stam txt'
    }
}

export const carStore = {
    state: {
        cars: []
    },
    getters: {
        cars({cars}) { return cars },
    },
    mutations: {
        setCars(state, { cars }) {
            state.cars = cars
        },
        addCar(state, { car }) {
            state.cars.push(car)
        },
        updateCar(state, { car }) {
            const idx = state.cars.findIndex(c => c._id === car._id)
            state.cars.splice(idx, 1, car)
        },
        removeCar(state, { carId }) {
            state.cars = state.cars.filter(car => car._id !== carId)
        },
        addCarMsg(state, { carId , msg}) {
            const car = state.cars.find(car => car._id === carId)
            if (!car.msgs) car.msgs = []
            car.msgs.push(msg)
        },
    },
    actions: {
        async addCar(context, { car }) {
            try {
                car = await carService.save(car)
                context.commit(getActionAddCar(car))
                return car
            } catch (err) {
                console.log('carStore: Error in addCar', err)
                throw err
            }
        },
        async updateCar(context, { car }) {
            try {
                car = await carService.save(car)
                context.commit(getActionUpdateCar(car))
                return car
            } catch (err) {
                console.log('carStore: Error in updateCar', err)
                throw err
            }
        },
        async loadCars(context) {
            try {
                const cars = await carService.query()
                context.commit({ type: 'setCars', cars })
            } catch (err) {
                console.log('carStore: Error in loadCars', err)
                throw err
            }
        },
        async removeCar(context, { carId }) {
            try {
                await carService.remove(carId)
                context.commit(getActionRemoveCar(carId))
            } catch (err) {
                console.log('carStore: Error in removeCar', err)
                throw err
            }
        },
        async addCarMsg(context, { carId, txt }) {
            try {
                const msg = await carService.addCarMsg(carId, txt)
                context.commit({type: 'addCarMsg', carId, msg })
            } catch (err) {
                console.log('carStore: Error in addCarMsg', err)
                throw err
            }
        },

    }
}