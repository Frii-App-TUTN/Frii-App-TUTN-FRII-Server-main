require('dotenv').config();
import { Router } from "express";
const router = Router();
import { body } from 'express-validator';
const { createGroup, addMember, joinGroup, removeMember, fetchGroup, renameGroup } = require('../controllers/Group');
    router.post('/create',
        body("emailAddress", "Email address of admin required").isEmail(),
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

module.exports = router;