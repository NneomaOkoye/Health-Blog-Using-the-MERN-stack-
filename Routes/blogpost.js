const express = require (`express`)

const router = express.Router

//Get all blogposts
router.get('/', (req, res) => {
    res.json({message: 'GET all blogpost'})
})

//Get a single blogposts
 router.get('/:id', (res, req) => {
    res.json({message: 'GET a single blogpost'})
 })

 //POST a new blog
 router.post('/', (req, res) => {
    res.json({message:'POST a new blogpost'})
 })

 //DELETE a new blog
 router.delete('/', (req, res) => {
    res.json({message:'DELETE a new blogpost'})
 })

 //UPDATEa new blog
 router.update('/', (req, res) => {
    res.json({message:'UPDATE a new blogpost'})
 })

module.exports = router