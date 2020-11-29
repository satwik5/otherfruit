module.exports = app => {
    const userinformation = require("../controllers/userinformation.controller.js");
  
    var router = require("express").Router();

     router.get("/getnotes/", userinformation.getnotes);
     router.post("/savenotes/", userinformation.savenotes);
     router.get("/deletenotes/:id", userinformation.delete);
     router.get("/updatenotes/:id/:text", userinformation.update);
     
    app.use('/api/userinformation', router);
  }; 