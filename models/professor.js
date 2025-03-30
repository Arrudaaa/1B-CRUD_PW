module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define(
        "Professor",{
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telefone:{
                 type: DataTypes.INTEGER, 
             },
    });
    return Professor;
};
