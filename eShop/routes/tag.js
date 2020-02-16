const express = require('express');
const isAdmin = require('../middleware/isAdmin.js');
const validation = require('../middleware/validation.js');
const tagController = require('../controllers/tag.js');
const router = express.Router();
const tryCatch=require('../helpers/tryCatchWrapper.js');
const isAuthentication = require('../middleware/isAuthentication.js');

router.use(isAuthentication);
router.get("/getAll",tryCatch(tagController.getAllTags));
//router.get("/:id",tryCatch(tagController.getTag));

router.use(isAdmin);
router.post("/add",tryCatch(tagController.addTag));
router.put("/update/:id",tryCatch(tagController.updateTeg));
router.delete("/delete/:id",tryCatch(tagController.deleteTag));
router.get("/byValue",tryCatch(tagController.getByValue));

module.exports=router;
