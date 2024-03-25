const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432
    }
);

sequelize.authenticate().then(() => {
    console.log(`Database connected (Thank you Juses)`)
}).catch((err) => {
    console.log(err)
})

module.exports = sequelize;