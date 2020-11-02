module.exports = (sequelize, DataTypes) => { //sequlize za nas vytvori ak uz neexistuje specifikovanu tabulku
    const user = sequelize.define("user", {
      idusers: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement : true,     //mozme definovat rozne integridne obmedzenia, typ dat atd
        primaryKey: true     //meno je unikatny primarny kluc
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }

    },{timestamps: false});
    return user;
  };