const Sequelize = require("sequelize");
const db = require("../models/");
const Hp = db.hp;

exports.create = async (req, res) => {
  const hp = req.body;
  if (Object.keys(req.body).length === 2) {
 
    const query = await Hp.findOne({
      where: {
        name: req.body.name,
        type : req.body.type
      },
    });
    if (!query) {
      Hp.create(hp)
        .then((data) => {
          res.status(200).send({
            data: data,
            message: "health problem created successfully ",
          });
        })
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            const errors = err.errors.map((e) => ({
              field: e.path,
              message: e.message,
            }));
            res.status(400).json({ errors });
          } else {
            if (err.name === "SequelizeUniqueConstraintError") {
              const errors = err.errors.map((e) => ({
                field: e.path,
                message: e.message,
              }));
              res.status(400).json({ errors });
            } else {
              res.status(500).json({ message: "server error " });
            }
          }
        });
    } else {
      res.send("health problem already exist ");
    }
  } else {
    res.send({ message: "please set  valid inputs " });
  }
};
exports.getAllHp = async (req, res) => {
  Hp.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
};
exports.getHp = async (req, res) => {
  Hp.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
     if (data){ res.send({data :data , message : "hp "});}
     else {
      res.send({message : "hp does not exist "})
     }
    })
    .catch((error) => {
      res.send({ error: error.message });
    });
};
exports.update = async (req, res) => {
  if (!req.params){
   res.send ({message :'please fill out the id '})
  }
  else {
   if (Object.keys(req.body).length === 2){
  const hp = await Hp.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!hp) {
    res.send({ message: "not found health problem " });
  } else {
    hp.name = req.body.name ? req.body.name : hp.name;
    hp.type = req.body.type ? req.body.type : hp.type;
    hp.save()
      .then((data) => {
        res.send({ data: hp, message: "hp updated successfully " });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
          }));
          res.status(400).json({ errors });
        } else {
          if (err.name === "SequelizeUniqueConstraintError") {
            const errors = err.errors.map((e) => ({
              field: e.path,
              message: e.message,
            }));
            res.status(400).json({ errors });
          } else {
            res.status(500).json({ message: "server error " });
          }
        }
      });
  }}
 else{
  res.send({message:"verify hp input "})
 }}
};
exports.delete = async (req, res) => {
  const hp = await Hp.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (hp) {
    Hp.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res
          .status(200)
          .send({ message: "health problem  deleted successfully " });
      })
      .catch((error) => {
        res.status(500).send("server error " + error.message);
      });
  }
};



