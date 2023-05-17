const express = require('express')
const router = express.Router()
const { authorizeUser } = require('../Middleware/authentication')

const { getAllReports, deleteReport, updateReport, getReport, getStats, createReport, uploadFile } = require('../Controllers/reportsController')

router.route('/').get(getAllReports).post(createReport)
router.route('/upload-file').post(uploadFile)
router.route('/stats').get(authorizeUser('admin', 'officer'), getStats)
router.route('/:id').get(getReport).patch(updateReport).delete(authorizeUser('admin'), deleteReport)

module.exports = router