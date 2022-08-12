require('dotenv').config();
import { Router } from "express";
const router = Router();
import { body } from 'express-validator';
const { createGroup, addMember, joinGroup, removeMember, fetchGroup, renameGroup, accept } = require('../controllers/Group');
    router.post('/create',
        body("emailAddress", "Email address of admin required").isEmail(),
        body("groupName", "Name of group to is required").isString(),
        body("groupType", "specify the type of group being created").isString(),
        body("threshold", "specify the threshold amount").isString(),
        body("duration", "Specify lock duration").isNumeric(),
        body("friiPeriod", "Specify FRII period").isNumeric(),
        body("reason", "Specify reason for account creation").isString(),
        body("description", "A description is required").isString(),
        body("visibility", "group visibility is required").isBoolean(),
    createGroup);
router.put('/addmember',
    body("userEmail", "Email address of new member required").isEmail(),
    body("groupName", "group name is required").isString(),
    addMember);
router.get('/join/:code', joinGroup);
router.put('/removemember',
    body("userEmail", "Email Address of member to be removed is required").isEmail(),
    body("groupName", "Name of group to be removed from is required").isString(),
    removeMember);
router.get('/fetch',
    body("groupName", "group name is required").isString(),
    fetchGroup);
router.put('/rename',
    body("groupName", "group name is required").isString(),
    body("newName", "new group name is required").isString(),
    renameGroup);
router.put('/accept/:code',renameGroup);
// router.put('/request',
//     body("groupName", "group name is required").isString(),
//     body("newName", "new group name is required").isString(),
//     requestLoan);

module.exports = router;