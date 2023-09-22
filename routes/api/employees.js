const express = require('express');
const router = express.Router();

const employeesController = require('../../middleware/employeesControllers');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')


router.route('/')
    .get(employeesController.getEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.postEmployees)
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.putEmployees)
    .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployees)


router.route('/:id')
    .get(employeesController.getSpecificEmployee)

module.exports = router;