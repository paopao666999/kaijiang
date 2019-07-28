var played={}, mysql=require('mysql'),
http=require('http'),
url=require('url'),
crypto=require('crypto'),
querystring=require('querystring'),
config=require('./config.js'),
calc=require('./kj-data/kj-calc-time.js'),
exec=require('child_process').exec,
execPath=process.argv.join(" "),
parse=require('./kj-data/parse-calc-count.js');
require('./String-ext.js');

// 抛出未知出错时处理
process.on('uncaughtException', function(e){
	console.log(e.stack);
});


// 自动重启
if(config.restartTime){
	setTimeout(function(exec, execPath){
		exec(execPath);
		process.exit(0);
	}, config.restartTime * 3600 * 1000, exec, execPath);
}

var timers={};		// 任务记时器列表
var encrypt_key='cc40bfe6d972ce96fe3a47d0f7342cb0';
var staticlevel=1000;

http.request=(function(_request){
	return function(options,callback){
			// console.log(options,callback);

		var timeout=options['timeout'],
			timeoutEventId;
		var req=_request(options,function(res){
			res.on('end',function(){
				clearTimeout(timeoutEventId);
				// console.log('response end...');
			});
			
			res.on('close',function(){
				clearTimeout(timeoutEventId);
				// console.log('response close...');
			});
			
			res.on('abort',function(){
				// console.log('abort...');
			});
			
			callback(res);
		});
		
		//超时
		req.on('timeout',function(){
			req.res && req.res.abort();
			req.abort();
			req.end();
		});
		
		//如果存在超时
		timeout && (timeoutEventId=setTimeout(function(){
			req.emit('timeout',{message:'have been timeout...'});
		},timeout));
		return req;
	};
})(http.request);

// console.log(config);
getPlayedFun(runTask);

//{{{
function getPlayedFun(cb){
	try{
		var client=createMySQLClient();
	}catch(err){
		//log(err);
		return;
	}
	
	client.query("select id, ruleFun from Z4r5jk12_played", function(err, data){
		if(err){
			//log('读取玩法配置出错：'+err.message);
		}else{
			data.forEach(function(v){
				played[v.id]=v.ruleFun;
			});
			
			if(cb) cb();
		}
	});
	
	client.end();
}

function runTask(){
	if(config.cp.length) config.cp.forEach(function(conf){
		timers[conf.name]={};
		timers[conf.name][conf.timer]={timer:null, option:conf};
		try{
			if(conf.enable) run(conf);
		}catch(err){
			//timers[conf.name][conf.timer].timer=setTimeout(run, config.errorSleepTime*1000, conf);
			restartTask(conf, config.errorSleepTime);
		}
	});	
}

function restartTask(conf, sleep, flag){
	
	if(sleep<=0) sleep=config.errorSleepTime;
	
	if(!timers[conf.name]) timers[conf.name]={};
	if(!timers[conf.name][conf.timer]) timers[conf.name][conf.timer]={timer:null,option:conf};
	
	if(flag){
		var opt;
		for(var t in timers[conf.name]){
			opt=timers[conf.name][t].option;
			clearTimeout(timers[opt.name][opt.timer].timer);
			timers[opt.name][opt.timer].timer=setTimeout(run, sleep*1000, opt);
			//log('休眠'+sleep+'秒后从'+opt.source+'采集'+opt.title+'数据...');
		}
	}else{
		clearTimeout(timers[conf.name][conf.timer].timer);
		timers[conf.name][conf.timer].timer=setTimeout(run, sleep*1000, conf);
		//log('休眠'+sleep+'秒后从'+conf.source+'采集'+conf.title+'数据...');
	}
}

function run(conf){
	//console.log(timers);
	if(timers[conf.name][conf.timer].timer) clearTimeout(timers[conf.name][conf.timer].timer);
	//console.log(timers);
	
	//log('开始从'+conf.source+'采集'+conf.title+'数据');
	var option=JSON.parse(JSON.stringify(conf.option));
	//option.path+='?'+(new Date()).getTime();
	
	http.request(option, function(res){
		
		var data="";
		res.on("data", function(_data){
			//console.log(_data.toString());
			data+=_data.toString();
		});
		
		res.on("end", function(){

			try{
				try{
					//data=onparse[conf.name](data);
					data=conf.parse(data);
				}catch(err){
					throw('解析'+conf.title+'数据出错：'+err);
				}
				
				

				try{
					
					//如果指定则直接提交
					var tag=false;
					var client=createMySQLClient();
			
						
					client.query("select * from Z4r5jk12_data_prev where type=? and number=? limit 1", [data.type, data.number], function(err, rows){
						if(err){

							restartTask(conf, config.errorSleepTime);
						}else{
							if(rows.length>0){
									tag =true;
							}
						}
						
							if(tag){
								data.data=rows[0]["data"];
								//console.log('写入预设成功:'+data.type+"--"+data.number+"--"+data.data);
								submitData(data, conf);
							}else{
									if(data.type=='5' || data.type=='14' || data.type=='26' ||  data.type=='61' ||  data.type=='62' ||  data.type=='63' || data.type=='64'|| data.type=='65' ||  data.type=='66'|| data.type=='67' || data.type=='68' ||  data.type=='69' || data.type=='70' || data.type=='71' || data.type=='72' ||  data.type=='73' ||  data.type=='74' ||  data.type=='75' ||  data.type=='76' ||  data.type=='77' ){
										liRunData(data, conf);
									}else{
										submitData(data, conf);
									}
								
							}
					});
					client.end();
					
					
					
				}catch(err){
					//console.log(err);
					throw('提交出错：'+err);
				}
				
			}catch(err){
				//log('运行出错：%s，休眠%f秒'.format(err, config.errorSleepTime));
				restartTask(conf, config.errorSleepTime);
			}
			
		});
		
		res.on("error", function(err){

			//log(err);
			restartTask(conf, config.errorSleepTime);

		});
		
	}).on('timeout', function(err){
		log('从'+conf.source+'采集'+conf.title+'数据超时');
		restartTask(conf, config.errorSleepTime);
	}).on("error", function(err){
		// 一般网络出问题会引起这个错
		
		log(err);
		restartTask(conf, config.errorSleepTime);
		
	}).end();
}

//}}}

function submitData(data, conf){
	//log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
	//log('提交从'+conf.source+'采集的'+conf.title+'第'+data.number+'数据：'+data.data);
	
	try{
		var client=mysql.createConnection(config.dbinfo);
	}catch(err){
		throw('连接数据库失败');
	}
	
	data.time=Math.floor((new Date(data.time)).getTime()/1000);
	//alert(110);
	client.query("insert into Z4r5jk12_data(type, time, number, data) values(?,?,?,?)", [data.type, data.time, data.number, data.data], function(err, result){
		//console.log(err);
		if(err){
			//console.log(err);
			// 普通出错
			if(err.number==1062){
				// 数据已经存在
				// 正常休眠
				//console.log(calc[conf.name]);
				try{
					sleep=calc[conf.name](data);
					//console.log(sleep);
					if(sleep<0) sleep=config.errorSleepTime*1000;
				}catch(err){
					//console.log(err);
					restartTask(conf, config.errorSleepTime);
					return;
				}
				//log(conf['title']+'第'+data.number+'期数据已经存在数据');
				//timers[conf.name][conf.timer].timer=setTimeout(run, sleep, conf);
				restartTask(conf, sleep/1000, true);

			}else{
				//log('运行出错：'+err.message);
				restartTask(conf, config.errorSleepTime);
			}
		}else if(result){
			// 正常
			try{
				sleep=calc[conf.name](data);
			}catch(err){
				//log('解析下期数据出错：'+err);
				restartTask(conf, config.errorSleepTime);
				return;
			}
			log('写入'+conf['title']+'第'+data.number+'期数据成功');
			restartTask(conf, sleep/1000, true);
			setTimeout(calcJ, 500, data);
		}else{
			//global.log('未知运行出错');
			restartTask(conf, config.errorSleepTime);
		}
	});
	client.end();
}

function isNumber(obj) {
    return obj === +obj
}
function liRunData(data, conf){
	var bjAmount = 0,zjAmount = 0;
	var LiRunLv = 0;
	//getLiRunLv();
	var client=createMySQLClient();
		client.query("select value from z4r5jk12_params where name='LiRunLv'", function(err, rows, fields){
		if(err){
			//log("读取系统彩盈利模式出错，随机开奖"+err);
			submitData(data, conf);
		}else{
			LiRunLv=parseInt(rows[0]['value']);
			if(!isNumber(LiRunLv))
			{
				LiRunLv=0;
			}
			//console.log(LiRunLv);
	///////////////////////////////////////	必杀
	if(LiRunLv==-1){//盈利
	 var client=createMySQLClient();
	 client.query("select * from z4r5jk12_bets where type=? and actionNo=? and isDelete=0 and lotteryNo=''", [data.type, data.number], function(err, rows, fields){
		if(err || rows.length==0){
			//log("读取投注出错联系技术hard_level："+err);
			submitData(data, conf);
		}else{
			
			var tempLotteryResult="";
			var tempLiRunLv=100;
			var hard_level =0;
		
			while(hard_level<staticlevel)
			{
				var a = 0;//奖金
				var b = 0;//本金
			
				for(var i=0;i<rows.length;i++){
					
					var fun;
					try{

						if(rows[i]['type']=='34' || rows[i]['type']=='77'){
							fun=parse[rows[i]['actionName']];
						}else{
							fun=parse[played[rows[i]['playedId']]];
						}
						
						
						
						if(typeof fun!='function') throw new Error('算法不是可用的函数');
					}catch(err){
						log('计算玩法[%f]中奖号码算法不可用：%s');
						return;
					} 
					
						var zjCount=fun(rows[i]['actionData'], data.data, rows[i]['weiShu']) || 0;
		
					
					
					bjAmount=Math.floor(rows[i]['actionNum'])*Math.floor(rows[i]['mode'])*Math.floor(rows[i]['beiShu']);
					zjAmount=Math.floor(rows[i]['bonusProp'])*Math.floor(zjCount)*Math.floor(rows[i]['beiShu'])*Math.floor(rows[i]['mode']/2);
					
			
					a+=zjAmount;//
			
					b+=bjAmount;
					/* if(zjAmount!=0 && zjAmount<bjAmount){//
						log("100%盈利功能已打开，当前有用户号码全买，出现必中情况，随机提交中奖数据，购买金额"+bjAmount+"中奖金额"+zjAmount);
						submitData(data, conf);
					} */
				}
				
				if(b==0)
				{
					break;
				}
				
				else
				{
					hard_level++;
					
					if(parseFloat(a-b)/parseFloat(b)< parseFloat(tempLiRunLv))
					{
						tempLiRunLv=parseFloat(a-b)/parseFloat(b);
						tempLotteryResult=data.data;
						log("100%盈利功能已打开:"+data.number+"-"+data.type+"-"+tempLotteryResult+"--"+tempLiRunLv+"---"+a+"--"+b);
					}
					
					var gameType=0;
					var tempOpenCode=CreateOpenCode(data.type);
					if(tempOpenCode!='')
					{
						data.data = tempOpenCode;
					}
					
				}
				
			}
			
			if(tempLotteryResult!='')
			{
				data.data=tempLotteryResult;
						
			}
			
			submitData(data, conf);
			
		
	 }});
	 client.end();
	}
	///////////////////////////////////////
	else if(LiRunLv>0){//盈利
	 var client=createMySQLClient();
	 client.query("select * from z4r5jk12_bets where type=? and actionNo=? and isDelete=0 and lotteryNo=''", [data.type, data.number], function(err, rows, fields){
		if(err || rows.length==0){
			//log("读取投注出错联系技术hard_level："+err);
			submitData(data, conf);
		}else{
			
			var tempLotteryResult="";
			var hard_level =0;
			while(hard_level<staticlevel)
			{
				var a = 0;//奖金
				var b = 0;//本金
				for(var i=0;i<rows.length;i++){
					
					var fun;
					try{
						if(rows[i]['type']=='34' || rows[i]['type']=='77'){
							fun=parse[rows[i]['actionName']];
						}else{
							fun=parse[played[rows[i]['playedId']]];
						}
						
						
						
						if(typeof fun!='function') throw new Error('算法不是可用的函数');
					}catch(err){
						//log('计算玩法[%f]中奖号码算法不可用：%s');
						return;
					} 
						var zjCount=fun(rows[i]['actionData'], data.data, rows[i]['weiShu']) || 0;
					
					
					
					bjAmount=Math.floor(rows[i]['actionNum'])*Math.floor(rows[i]['mode'])*Math.floor(rows[i]['beiShu']);
					zjAmount=Math.floor(rows[i]['bonusProp'])*Math.floor(zjCount)*Math.floor(rows[i]['beiShu'])*Math.floor(rows[i]['mode']/2);
					
			
					a+=zjAmount;//
			
					b+=bjAmount;
					/* if(zjAmount!=0 && zjAmount<bjAmount){//
						log("100%盈利功能已打开，当前有用户号码全买，出现必中情况，随机提交中奖数据，购买金额"+bjAmount+"中奖金额"+zjAmount);
						submitData(data, conf);
					} */
				}
				
				if(b==0)
				{
					break;
				}
				
				else
				{
					hard_level++;
					
					if(parseFloat(a-b)/parseFloat(b)> parseFloat(LiRunLv))
					{
						tempLotteryResult=data.data;
						//log("具体盈利功能已打开:"+data.type+"-"+tempLotteryResult);
					}
					var gameType=0;
					var tempOpenCode=CreateOpenCode(data.type);
					if(tempOpenCode!='')
					{
						data.data = tempOpenCode;
					}
					
				}
				
			}
			
			if(tempLotteryResult!='')
			{
				data.data=tempLotteryResult;
						
			}

			submitData(data, conf);
			
		
	 }});
	 client.end();
	}
	
	///////////////////////////////////////杀大赔小
	else if(LiRunLv==-2){//盈利
	 var client=createMySQLClient();
	 client.query("select * from z4r5jk12_bets where type=? and actionNo=? and isDelete=0 and lotteryNo='' order by money*odds desc", [data.type, data.number], function(err, rows, fields){
		if(err || rows.length==0){
			//log("读取投注出错联系技术hard_level："+err);
			submitData(data, conf);
		}else{
			
			var tempLotteryResult="";
			var tempLiRunLv=100;
			var hard_level =0;
			while(hard_level<staticlevel)
			{
				var a = 0;//奖金
				var b = 0;//本金
				for(var i=0;i<rows.length/2;i++){
					
					var fun;
					try{
						if(rows[i]['type']=='34' || rows[i]['type']=='77'){
							fun=parse[rows[i]['actionName']];
						}else{
							fun=parse[played[rows[i]['playedId']]];
						}
						
						
						
						if(typeof fun!='function') throw new Error('算法不是可用的函数');
					}catch(err){
						//log('计算玩法[%f]中奖号码算法不可用：%s');
						return;
					} 
						var zjCount=fun(rows[i]['actionData'], data.data, rows[i]['weiShu']) || 0;
					
					
					
					bjAmount=Math.floor(rows[i]['actionNum'])*Math.floor(rows[i]['mode'])*Math.floor(rows[i]['beiShu']);
					zjAmount=Math.floor(rows[i]['bonusProp'])*Math.floor(zjCount)*Math.floor(rows[i]['beiShu'])*Math.floor(rows[i]['mode']/2);
					
			
					a+=zjAmount;//
			
					b+=bjAmount;
					/* if(zjAmount!=0 && zjAmount<bjAmount){//
						log("100%盈利功能已打开，当前有用户号码全买，出现必中情况，随机提交中奖数据，购买金额"+bjAmount+"中奖金额"+zjAmount);
						submitData(data, conf);
					} */
				}
				
				if(b==0)
				{
					break;
				}
				
				else
				{
					hard_level++;
					
					if(parseFloat(a-b)/parseFloat(b)< parseFloat(tempLiRunLv))
					{
						tempLiRunLv=parseFloat(a-b)/parseFloat(b);
						tempLotteryResult=data.data;
						log("杀大赔小功能已打开:"+data.type+"-"+tempLotteryResult);
					}
					var gameType=0;
					var tempOpenCode=CreateOpenCode(data.type);
					if(tempOpenCode!='')
					{
						data.data = tempOpenCode;
					}
					
				}
				
			}
			
			if(tempLotteryResult!='')
			{
				data.data=tempLotteryResult;
						
			}
			submitData(data, conf);
			
		
	 }});
	 client.end();
	}
	///////////////////////////////////////随机杀
	else if(LiRunLv==-3){//盈利
	 var client=createMySQLClient();
	 client.query("select * from z4r5jk12_bets where type=? and actionNo=? and isDelete=0 and lotteryNo='' order by RAND()", [data.type, data.number], function(err, rows, fields){
		if(err || rows.length==0){
			//log("读取投注出错联系技术hard_level："+err);
			submitData(data, conf);
		}else{
			
			var tempLotteryResult="";
			var tempLiRunLv=100;
			var hard_level =0;
			while(hard_level<staticlevel)
			{
				var a = 0;//奖金
				var b = 0;//本金
				for(var i=0;i<rows.length/2;i++){
					
					var fun;
					try{
						if(rows[i]['type']=='34' || rows[i]['type']=='77'){
							fun=parse[rows[i]['actionName']];
						}else{
							fun=parse[played[rows[i]['playedId']]];
						}
						
						
						
						if(typeof fun!='function') throw new Error('算法不是可用的函数');
					}catch(err){
						//log('计算玩法[%f]中奖号码算法不可用：%s');
						return;
					} 
						var zjCount=fun(rows[i]['actionData'], data.data, rows[i]['weiShu']) || 0;
					
					
					
					bjAmount=Math.floor(rows[i]['actionNum'])*Math.floor(rows[i]['mode'])*Math.floor(rows[i]['beiShu']);
					zjAmount=Math.floor(rows[i]['bonusProp'])*Math.floor(zjCount)*Math.floor(rows[i]['beiShu'])*Math.floor(rows[i]['mode']/2);
					
			
					a+=zjAmount;//
			
					b+=bjAmount;
					/* if(zjAmount!=0 && zjAmount<bjAmount){//
						log("100%盈利功能已打开，当前有用户号码全买，出现必中情况，随机提交中奖数据，购买金额"+bjAmount+"中奖金额"+zjAmount);
						submitData(data, conf);
					} */
				}
				
				if(b==0)
				{
					break;
				}
				
				else
				{
					hard_level++;
					
					if(parseFloat(a-b)/parseFloat(b)< parseFloat(tempLiRunLv))
					{
						tempLiRunLv=parseFloat(a-b)/parseFloat(b);
						tempLotteryResult=data.data;
						log("随机杀功能已打开:"+data.type+"-"+tempLotteryResult);
					}
					var gameType=0;
					var tempOpenCode=CreateOpenCode(data.type);
					if(tempOpenCode!='')
					{
						data.data = tempOpenCode;
					}
					
				}
				
			}
			
			if(tempLotteryResult!='')
			{
				data.data=tempLotteryResult;
						
			}
			submitData(data, conf);
			
		
	 }});
	 client.end();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	else{
		submitData(data, conf);
	}
		}
	});

	client.end();
}

function getLiRunLv(){
	var client=createMySQLClient();
	client.query("select value from Z4r5jk12_params where name='LiRunLv'", function(err, data){
		if(err){
			LiRunLv=0;
		}else{
			data.forEach(function(v){
				LiRunLv=v.value;
			});
		}
	});
	client.end();
}

function requestKj(type,number){
	var option={
		host:config.submit.host,
		path:'%s/%s/%s/%'.format(config.submit.path, type, number)
	}
	http.get(config.submit,function(res){
	
	});
}

function createMySQLClient(){
	try{
		return mysql.createConnection(config.dbinfo).on('error', function(err){
			//console.log(err);
			throw('连接数据库失败');
		});
	}catch(err){
		log('连接数据库失败：'+err);
		return false;
	}
}

function calcJ(data, flag){
	var client=createMySQLClient();
	//判断是指定号码
	
	sql="select * from Z4r5jk12_bets where type=? and actionNo=? and isDelete=0";
	if(flag) sql+=" and lotteryNo=''";
	
	client.query(sql, [data.type, data.number], function(err, bets){
		if(err){
			//console.log(data);
			//console.log(err.sql);
			log("读取投注出错："+err);
		}else{
			var sql, sqls=[];
			sql='call kanJiang(?, ?, ?, ?)';
			
			bets.forEach(function(bet){
				var fun;
				
				try{
					if(bet.type=='34' || data.type=='77'){
						fun=parse[bet.actionName];
					}else{
						fun=parse[played[bet.playedId]];
					}
					if(typeof fun!='function') throw new Error('算法不是可用的函数');
				}catch(err){
					//log('-----------------------------------------计算玩法[%f]中奖号码算法不可用：%s'.format(bet.playedId, err.message));
					return;
				}
				
				try{
					var zjCount=fun(bet.actionData, data.data, bet.weiShu)||0;
				}catch(err){
					log('计算中奖号码时出错：'+err);
					return;
				}
				
				sqls.push(client.format(sql, [bet.id, zjCount, data.data, 'ssc-'+encrypt_key]));

			});
			
			try{
				setPj(sqls, data);
			}catch(err){
				//log(err);
			}
		}
	});

	client.end();
}

function setPj(sqls, data){
	if(sqls.length==0) throw('彩种[%f]第%s期没有投注'.format(data.type, data.number));
	
	var client=createMySQLClient();
	if(client==false){
		//log('连接数据库出错，休眠%f秒继续...'.format(config.errorSleepTime));
		setTimeout(setPj, config.errorSleepTime*1000, sqls, data);
	}else{
		client.query(sqls.join(';'), function(err,result){
			if(err){
				//console.log(err);
			}else{
				//log('成功');
			}
		});
		
		client.end();
	}
	
}

// 前台添加数据接口
http.createServer(function(req, res){
	
	log('前台访问'+req.url);
	var data='';
	req.on('data', function(_data){
		data+=_data;
	}).on('end', function(){
		data=querystring.parse(data);
		var msg={},
			hash=crypto.createHash('md5');
		hash.update(data.key);
		
		//console.log(data);
		if(encrypt_key==hash.digest('hex')){
			delete data.key;
			if(req.url=='/data/add'){
				submitDataInput(data);
			}else if(req.url=='/data/kj'){
				//console.log(data);
				calcJ(data, true)
			}
		}else{
			msg.errorCode=1;
			msg.errorMessage='校验不通过';
		}
		
		res.writeHead(200, {"Content-Type": "text/json"});
		res.write(JSON.stringify(msg));
		res.end();
	});
	
}).listen(8800);

function submitDataInput(data){
	//log('提交从前台录入第'+data.number+'数据：'+data.data);
	
	try{
		var client=mysql.createConnection(config.dbinfo);
	}catch(err){
		throw('连接数据库失败');
	}
	
	data.time=Math.floor((new Date(data.time)).getTime()/1000);
	client.query("insert into Z4r5jk12_data(type, time, number, data) values(?,?,?,?)", [data.type, data.time, data.number, data.data], function(err, result){
		if(err){
			//console.log(err);
			// 普通出错
			if(err.number==1062){
				// 数据已经存在
				//log('第'+data.number+'期数据已经存在数据');

			}else{
				log('运行出错：'+err.message);
			}
		}else if(result){
			// 正常
			log('写入第'+data.number+'期数据成功');

			// 计算奖品 
			//setTimeout(requestKj, 500, data.type, data.number);
			setTimeout(calcJ, 500, data);
		}else{
			//global.log('未知运行出错');
		}
	});

	client.end();
}


function CreateOpenCode(gameId)
{
	
	
	var gameType="";
	switch(gameId)
	{
		case 14:
		case 26:
		case 5:
		case 61:
		case 62:
		case 75:
		case 76:
			gameType="ssc";
			break;
		case 65:
		case 66:
			gameType="pk";
			break;
		case 63:
		case 64:
			gameType="k3";
			break;
		case 69:
		case 70:
			gameType="3d";
			break;
		case 67:
		case 68:
			gameType="11x5";
			break;
		case 71:
		case 72:
			gameType="klsf";
			break;
		case 77:
			gameType="lhc";
			break;
		default:
			gameType="";
			break;
		
	}
	
	
	
	
	
	
	
	
	
	switch(gameType){
		case "ssc":
			return randomNum(0,9)+','+randomNum(0,9)+','+randomNum(0,9)+','+randomNum(0,9)+','+randomNum(0,9);
		case "pk":
			var numArray=["1","2","3","4","5","6","7","8","9","10"]; 
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			
			return buling(numArray[0])+','+buling(numArray[1])+','+buling(numArray[2])+','+buling(numArray[3])+','+buling(numArray[4])+','+buling(numArray[5])+','+buling(numArray[6])+','+buling(numArray[7])+','+buling(numArray[8])+','+buling(numArray[9]);
		case "11x5":
			var numArray=["1","2","3","4","5","6","7","8","9","10","11"]; 
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			
			return buling(numArray[0])+','+buling(numArray[1])+','+buling(numArray[2])+','+buling(numArray[3])+','+buling(numArray[4]);
		case "28":
			return randomNum(0,9)+''+randomNum(0,9)+''+randomNum(0,9);
		case "k3":
			return randomNum(1,6)+''+randomNum(1,6)+''+randomNum(1,6);
		case "3d":
			return randomNum(0,9)+''+randomNum(0,9)+''+randomNum(0,9);
		case "lhc":
			var numArray=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49"]; 
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			return buling(numArray[0])+','+buling(numArray[1])+','+buling(numArray[2])+','+buling(numArray[3])+','+buling(numArray[4])+','+buling(numArray[5])+','+buling(numArray[6]);
		case "11x5":
			var numArray=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]; 
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			return buling(numArray[0])+','+buling(numArray[1])+','+buling(numArray[2])+','+buling(numArray[3])+','+buling(numArray[4])+','+buling(numArray[5])+','+buling(numArray[6])+','+buling(numArray[7]);
		case "kl8":
			var numArray=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80"];
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			numArray.sort(function(){return Math.random()>0.5?-1:1;});
			return buling(numArray[0])+','+buling(numArray[1])+','+buling(numArray[2])+','+buling(numArray[3])+','+buling(numArray[4])+','+buling(numArray[5])+','+buling(numArray[6])+','+buling(numArray[7])+','+buling(numArray[8])+','+buling(numArray[9])+','+buling(numArray[10])+','+buling(numArray[11])+','+buling(numArray[12])+','+buling(numArray[13])+','+buling(numArray[14])+','+buling(numArray[15])+','+buling(numArray[16])+','+buling(numArray[17])+','+buling(numArray[18])+','+buling(numArray[19]);
		default:
			return "";
	
		
	}
	
	
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

function buling(num){
	return num<10?"0"+num:""+num;
}