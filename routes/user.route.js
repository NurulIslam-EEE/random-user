const express = require("express");
const router = express.Router();

const useController=require('../controller/user.controller')



router
  .route("/random")
  .get(useController.getRandomUser)

  router
  .route("/all")
  .get(useController.getAllUser)

  router
  .route("/save")
  .post(useController.saveUser)

  router
  .route("/update")
  .patch(useController.updateUser)

  router
  .route("/bulk-update")
  .patch(useController.bulkUpdate)

  router
  .route("/delete")
  .delete(useController.deleteUser)


  module.exports = router;