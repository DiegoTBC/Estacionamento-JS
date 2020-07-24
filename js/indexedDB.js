let db

function getObjectStore(){
    return db.transaction([Veiculos], 'readwrite').objectStore('Veiculos')
}

const DB = {
    start(){
        return new Promise(resolve => {
            let request = indexedDB.open('BD Patio', 1)
            request.onsuccess = (event) => {
                db = request.result
                resolve(this)
            }

            request.onupgradeneeded = (event) => {
                db = event.target.result
                db.createObjectStore('Veiculos', {keypath: 'id'})
            }
        })
    },
    find(id){
        return new Promise(resolve => {
            let request = getObjectStore().get(id)
            request.onsuccess = () => {
                resolve(request.result)
            }
        })
    },
    findAll(){
        return new Promise(resolve => {
            let request = getObjectStore().getAll()
            request.onsuccess = () => {
                resolve(request.result)
            }
        })
    },
    insert(item){
        return new Promise(resolve => {
            item.id = (new Date()).getTime()
            let request = getObjectStore().add(item)
            request.onsuccess = () => {
                resolve(item)
            }
        })
    },
    update(item){
        return new Promise(resolve => {
            let request = getObjectStore().put(item)
            request.onsuccess = () => {
                resolve(item)
            }
        })
    },
    async remove(id){
        return new Promise(resolve => {
            let request = getObjectStore().delete(id)
            request.onsuccess = () => {
                resolve(id)
            }
        })
    }
}

DB.start()