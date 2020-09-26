let port;
let devEnvironment;

devEnvironment = false;

if (devEnvironment) {
    port = 3000;
} else {
    port = process.env.PORT || 3000;
}

exports.port = port;
exports.dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority`;
