const { Sequelize } = require('sequelize')

const connection = new Sequelize('e_trashway', 'root', 'Sen@iDev77!.', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
})

try{
    connection.authenticate()

    console.log('Banco de dados conectado')
}catch(error){
    console.error('Não foi possível conectar com o banco de dados, erro: '+error)
}

module.exports = connection