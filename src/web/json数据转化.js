const {
	data: { executives },
	code
} = require('./response.json');
const http = require('http');
const req = http.request(
	{
		hostname: '10.10.11.2',
		port: 9010,
		method: 'POST',
		path: '/atlas/graph_search/zcw_list?page=1&pagesize=5',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	},
	res => {
		res.on('data', chunk => {
			console.log(chunk.toString());
		});
	}
);

req.on('error', err => {
	console.log(err);
});
req.end();
return;
const fs = require('fs');
const path = require('path');
const resultData = executives.map(item => {
	const {
		personName,
		personId,
		graphId,
		gender,
		unitPosition,
		province,
		committeeType,
		commonDuties,
		AGE_DISTRIBUTION = '',
		ADMINI_LEVEL = '',
		POLITICS_STATUS_TYPE = ''
	} = item;
	const temp = {
		searchType: 'executiveCommittee',
		ssgsl: province,
		title: personName,
		id: graphId,
		tagzw: unitPosition,
		sf: committeeType,
		gender,
		nl: AGE_DISTRIBUTION,
		xzjb: ADMINI_LEVEL,
		zzmm: POLITICS_STATUS_TYPE,
		zxzw: '',
		personId
	};
	if (Array.isArray(commonDuties) && commonDuties.length > 0) {
		commonDuties.forEach(it => {
			const { commonDuty, dutyType } = it;
			if (!commonDuty || commonDuty.length === 0 || commonDuty === null)
				return;
			if (dutyType === '政协职务') {
				temp.zxzw = temp.zxzw + commonDuty + ' ';
			} else if (dutyType === '人大职务') {
				temp.rdzw = commonDuty;
			} else if (dutyType === '政府职务') {
				temp.zfzw = commonDuty;
			} else if (dutyType === '商会职务') {
				temp.zfzw = commonDuty;
			}
		});
	}
	return temp;
});
console.log(resultData);
const content = JSON.stringify(resultData);
const file = path.join(__dirname, 'aa.json');
fs.writeFile(file, content, function (err) {
	if (err) return console.log(err);
	console.log('创建成功');
});
//todo 读取excel文件
