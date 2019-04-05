'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://moveoutadmin:moveoutadmin@moveoutdb-lzomt.mongodb.net/moveoutdb?retryWrites=true';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:8080';
exports.PORT = process.env.PORT || 8080;
