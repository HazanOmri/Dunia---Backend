const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {
        const criteria = {}
        // if (filterBy.userId) {
        //     criteria['$or'] = [{ 'createdBy._id': filterBy.userId }, { 'shareWith': filterBy.userId }]
        // }

        // if (filterBy.page) {
        //     criteria.tags = { $regex: filterBy.page, $options: 'i' }
        // }
        const collection = await dbService.getCollection('item')
        var items = await collection.find(criteria).toArray()
        return items
    } catch (err) {
        logger.error('cannot find items', err)
        throw err
    }
}

async function getById(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        const item = collection.findOne({ _id: ObjectId(itemId) })
        return item
    } catch (err) {
        logger.error(`while finding item ${itemId}`, err)
        throw err
    }
}

async function remove(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.deleteOne({ _id: ObjectId(itemId) })
        return itemId
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}

async function add(item) {
    try {
        console.log('item', item)
        const collection = await dbService.getCollection('item')
        await collection.insertOne(item)
        return item
    } catch (err) {
        logger.error('cannot insert item', err)
        console.log(err, 'cannot insert item ')
        throw err
    }
}

async function update(item) {
    try {
        const itemToSave = {
            name: item.name,
            imgUrl: item.imgUrl,
            description: item.description,
            price: item.price,
        }
        const collection = await dbService.getCollection('item')
        await collection.updateOne({ _id: ObjectId(item._id) }, { $set: itemToSave })
        return itemToSave
    } catch (err) {
        logger.error(`cannot update item ${itemId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update
}
