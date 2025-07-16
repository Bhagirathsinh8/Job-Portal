const express = require('express');
const router = express.Router();
const Controller = require('../module/company/company.controller');
const { verifyToken, roleMiddleware } = require('../middleware/auth.middleware');


// /api/companies
router.post('/', verifyToken, roleMiddleware(['recuiter']), Controller.createCompany);
router.get('/',  verifyToken, roleMiddleware(['recuiter','student','admin']), Controller.getAllCompanies);
router.get('/:id', verifyToken, roleMiddleware(['recuiter','student','admin']), Controller.getCompanyById);
router.put('/:id', verifyToken, roleMiddleware(['recuiter','admin']), Controller.updateCompany);
router.delete('/:id',verifyToken, roleMiddleware(['recuiter','admin']), Controller.deleteCompany);

module.exports = router;



