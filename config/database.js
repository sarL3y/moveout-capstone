'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/moveoutdb';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL/* || 'mongodb+srv://moveoutadmin:moveoutadmin@moveoutdb-lzomt.mongodb.net/moveoutdbtest?retryWrites=true'*/;
exports.PORT = process.env.PORT || 8080;