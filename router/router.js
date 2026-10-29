const express=require("express");
const router=express.Router();
const controller=require("../controller/controller.js");

router.get("/", controller.alltodo);
router.get("/:id", controller.getsingletodo);
router.post("/", controller.createtodo);
router.delete("/:id", controller.deletetodo);
router.patch("/:id", controller.updatetodo);




module.exports=router;