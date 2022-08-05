require('dotenv').config();
import { Router } from "express";
const router = Router();
import { body } from 'express-validator';
const { createGroup, addMember, joinGroup, removeMember, fetchGroup, renameGroup } = require('../controllers/Group');
router.post('/create',
    body("emailAddress").isEmail(),
    createGroup);
router.put('/addmember',
    body("userEmail").isEmail(),
    body("groupName").isString(),
    addMember);
router.get('/join/:code', joinGroup);
router.put('/removemember',
    body("userEmail").isEmail(),
    body("groupName").isString(),
    removeMember);
router.get('/fetch',
    body("groupName").isString(),
    fetchGroup);
router.put('/rename',
    body("groupName").isString(),
    body("newName").isString(),
    renameGroup);

module.exports = router;