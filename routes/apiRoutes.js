const express = require("express");
const { authUser,authAdmin,authenticateToken } = require("../autentification");
const router = express.Router();
const jwt = require('jsonwebtoken')
const db = require("../models");


const paginate = (req) => {    //funkcia nam vzrata a vracia strankovanie
  const offset = req.params.page * req.params.size;
  const limit = parseInt(req.params.size);

  return {
    offset,
    limit,
  };
};

router.post("/login/", async(req, res) => { //hladame usera podla parametrov z tela http requestu
  db.user.findOne({ where: { name: req.body.name, password: req.body.password } }).then(user=>{ 
    if (user == null){
    res.status(403)
      return res.send('wrong username or password')}
  const token = jwt.sign({user},'e1e7c8fa67a96e224cb0f77c4efe9'); 
  res.send(token);})  //ak najdeme vratime token zasifrovany podla tajneho kodu
});

router.get("/all/", authenticateToken,authUser,(req, res) => {   // autentifikujeme cez "Middleware" funkcie
    db.Telefonne_cislo.findAll().then(telefonne_cisla => res.send(telefonne_cisla)); // nakoniec posielame vysledok z databazy
  });

router.get("/all/:page/:size",authenticateToken,authUser, (req, res) => { //strankovanie
    db.Telefonne_cislo.findAll(
      paginate( req )
    ).then(telefonne_cisla => res.send(telefonne_cisla));
  });

router.post("/new",authenticateToken,authUser,authAdmin, (req, res) => { // pridavanie cisel do DB,  moze iba admin(authAdmin)
    db.Telefonne_cislo.create({
      meno: req.body.meno,
      cislo: req.body.cislo
    }).then(telefonne_cislo => res.send(telefonne_cislo));
  });

  router.get("/findname/:name",authenticateToken,authUser,(req,res)=>{ //hladanie podla mena
    db.Telefonne_cislo.findAll({
      where: {
        meno: req.params.name
      }
    }).then(telefonne_cislo => res.send(telefonne_cislo));
  });

  router.get("/findnumber/:number",authenticateToken,authUser,(req,res)=>{ //hladanie podla cisla
    db.Telefonne_cislo.findAll({
      where: {
        cislo: req.params.number
      }
    }).then(telefonne_cislo => res.send(telefonne_cislo));
  });

  router.post("/update/",authenticateToken,authUser,authAdmin, (req, res) => { // odstranenie cisel z DB,  moze iba admin(authAdmin)
    db.Telefonne_cislo.update(
      {
        cislo: req.body.cislo
      },
      {
        where: { meno: req.body.meno }
      }
    ).then(() => res.send("success"));
  });

  router.delete("/delete/:number",authenticateToken,authUser,authAdmin, (req, res) => { // odstranenie cisel z DB,  moze iba admin(authAdmin)
    db.Telefonne_cislo.destroy({
      where: {
        cislo: req.params.number
      }
    }).then(() => res.send("success"));
  });

  module.exports = router;

