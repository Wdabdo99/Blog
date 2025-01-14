const Sequelize = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("blogdb", "u0_a291", "Magdadlil0$", {
    host: "localhost",
    dialect: "postgres"
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    connect,
    sequelize
};
