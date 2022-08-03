require('dotenv').config();
import { Router } from "express";
const router = Router();
const { createGroup, addMember, joinGroup } = require('../controllers/Group');
router.post('/create', createGroup);
router.put('/addmember', addMember);
router.get('/join/:code', joinGroup);

// router.put('/removemember', removeMember)
// router.get('/fetch', fetchGroup);

module.exports = router;