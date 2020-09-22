let port;
let devEnvironment;

devEnvironment = false;

if (devEnvironment) {
    port = 3000;
} else {
    port = process.env.PORT || 3000;
}

exports.port = port;
