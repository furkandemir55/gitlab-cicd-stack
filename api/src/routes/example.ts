import express from "express";

const router = express.Router()

router.post('/example1', (req, res) => {
    res.json({response: "Success"})
})

router.post('/example2', (req, res) => {
    const {test} = req.body
    if (typeof test !== 'string') return res.json({completed: false})
    res.json({completed: true})
})

router.post('/example3', (req, res) => {
    const {hello} = req.body
    if (typeof hello !== 'string') return res.json({error: true})
    res.json({error: false})
})

export default router
