var uuidV1 = require('uuid/v1');
var greenNodejs = require('./green-nodejs-invoker.js');

const accessKeyId = '';
const accessKeySecret = '';
const greenVersion = '2017-01-12';
var hostname = 'green.cn-shanghai.aliyuncs.com';
var path = '/green/text/scan';

var clientInfo = {
	"ip": "127.0.0.1"
};

// 请求体,根据需要调用相应的算法
var requestBody = JSON.stringify({
	bizType: 'Green',
	scenes: ['antispam'],
	tasks: [{
		'dataId': uuidV1(),
		'content': ''
	}]
});

var bizCfg = {
	'accessKeyId': accessKeyId,
	'accessKeySecret': accessKeySecret,
	'path': path,
	'clientInfo': clientInfo,
	'requestBody': requestBody,
	'hostname': hostname,
	'greenVersion': greenVersion
}


greenNodejs(bizCfg, execute);


// 业务代码，根据不同算法的返回结果采取相应的业务流程
function execute(chunk) {
	console.log(chunk);
	chunk = JSON.parse(chunk);
	if (chunk.code == 200) {
		var data = chunk.data;
		data = data[0];
		data = data.results[0];
		data = data.suggestion;
		console.log(data);
	}
}
