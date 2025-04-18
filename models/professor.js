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

    Produto.associate = (models) => {
        Produto.belongsTo(models.Materia, {
          foreignKey: "materiaId",
          as: "Materia", 
        });
      };


    return Professor;
};
