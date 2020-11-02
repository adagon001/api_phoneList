const express = require('express')
const db = require("./models")
const app = express()
const PORT =  5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const apiRoutes = require("./routes/apiRoutes");
app.use("/api/v1/phone-numbers", apiRoutes);   //smerujeme crud cesty


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`); //pocuvame na porte PORT
    });
  });


    
