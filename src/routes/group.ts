require('dotenv').config();
import { Router } from "express";
const router = Router();
import { body, validationResult } from 'express-validator';
const { createGroup, addMember, joinGroup, removeMember, fetchGroup, renameGroup } = require('../controllers/Group');
router.post('/create',
    createGroup);
router.put('/addmember', addMember);
router.get('/join/:code', joinGroup);
router.put('/removemember', removeMember);
router.get('/fetch', fetchGroup);
router.put('/rename', renameGroup);

module.exports = router;