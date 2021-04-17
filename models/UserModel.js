const db = require("./connection");

async function select() {
    let query = "select * from users";
    let result = await db.executeQuery(query, conn);
    return result;
}

async function selectId(id) {
    let query = `select * from users where id ='${id}'`;
    let result = await db.executeQuery(query, conn);
    return result;
}

async function insert(data) {
    try {
        let query = `insert into users set ${data}`;
        let result = await db.executeQuery(query, conn);
        return data;
    } catch (err) {
        return err;
    }
}

async function update(data) {
    try {
        let query = `update users set ${data} where id = '${data.id}'`;
        let result = await db.executeQuery(query, conn);
        if (result.affectedRows > 0) return data;
        else return null;
    } catch (err) {
        return err;
    }
}

module.exports = {
    select: select,
    selectId: selectId,
    insert: insert,
    update: update,
};
