const express = require('express');
const app = express();
const { resolve } = require('path');
app.use('/', express.static(resolve(__dirname, '../modules')));
app.listen(7777, () => {
	console.log(`Example app listening on port 7777`);
});
