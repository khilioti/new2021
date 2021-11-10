function func() {
    const person = new WeakRef( {
        name: 'Nikita'
    })
    console.log(person.deref().name)
}

const registry = new FinalizationRegistry((value) => {
    console.log('Clearing garbage', value)
})

async function start() {
    // await new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve(func())
    //     }, 300)
    // })
    //
    // await new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve(func())
    //     }, 700)
    // })

    // const ref = new WeakRef({a:17})
    const obj = {a:17}
    registry.register(obj, 'MyWeakRef')
}

start()

// Example

const listenerRegistry = new FinalizationRegistry(({target, wrapper, type}) => {
    target.removeEventListener(type, wrapper)
})

function addWeakListener(target, type, listener) {
    const wr = new WeakRef(listener)
    const wrapper = (event) => wr.deref()?.(event)
    listenerRegistry.register(listener, {target, wrapper, type})
    target.addEventListener(type, wrapper)
}


addWeakListener(document, 'click', (event) => {
    console.log(event)
})