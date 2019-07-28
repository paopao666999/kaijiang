// 彩票开奖配置
exports.cp=[
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                         	//
		title:'澳门5分彩',                                                                                   	//
		source:'澳汇娱乐',                                                                                        	//
		name:'amssc',                                                                                         	//
		enable:true,                                                                                          	//
		timer:'amssc',                                                                                        	//
		option:{                                                                                              	//
			host:"127.0.0.2",                                                                                   	//
			port:80,timeout:50000,                                                                                    	//
			path: '/index.php/xingcai/xcamssc',                                                               	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//杏
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//彩
				var m;                                                                                        	//系
				if(m=str.match(reg)){                                                                         	//统
					return {                                                                                  	//彩
						type:61,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('澳门5分彩解析数据不正确');                                                            	//
			}                                                                                                 	//
		}                                                                                                     	//
	},  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                           //
		title:'16彩票重庆时时彩',                                                                               //
		source:'16彩票',                                                                                 		//
		name:'cqssc',                                                                                           //
		enable:true,                                                                                            //
		timer:'cqssc',                                                                                          //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //
			path: '/388/cqssc.php',                                                                      //重
			headers:{                                                                                           //庆
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //时
			}                                                                                                   //时
		},                                                                                                      //彩
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:1,                                                                                 //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //
				}					                                                                            //
			}catch(err){                                                                                        //
				throw('--------16彩票重庆时时彩解析数据不正确');                                                //
			}                                                                                                   //
		}                                                                                                       //
	},	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                           //
		title:'新疆时时彩',                                                                           	    	//
		source:'新疆福彩网',                                                                                 	//
		name:'xjssc',                                                                                           //
		enable:true,                                                                                            //
		timer:'xjssc',                                                                                          //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //新
			path: '/388/xjssc.php',                                                                       	//疆
			headers:{                                                                                           //时
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //时
			}                                                                                                   //彩
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:12,                                                                                //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //
				}					                                                                            //
			}catch(err){                                                                                        //
				throw('--------新疆福利彩票解析数据不正确');                                                    //
			}                                                                                                   //
		}                                                                                                       //新
	},	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                           //
		title:'天津时时彩',                                                                           	    	//
		source:'天津福利彩票网',                                                                                //
		name:'tjssc',                                                                                           //
		enable:true,                                                                                            //
		timer:'tjssc',                                                                                          //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //天
			timeout:50000,                                                                                     //津
			path: '/388/tjssc.php',                                                                 		    //时
			headers:{                                                                                           //时
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //彩
			}                                                                                                   //
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:60,                                                                                //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //天
				}					                                                                            //津
			}catch(err){                                                                                        //时
				throw('--------天津时时彩解析数据不正确');                                                      //时
			}                                                                                                   //彩
		}                                                                                                       //
	},	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                           //
		title:'爱彩乐广东11选5',                                                                                //
		source:'广东11x5爱彩乐',                                                                                //
		name:'gd11',                                                                                            //
		enable:true,                                                                                            //
		timer:'gd11',                                                                                           //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //广
			path: '/388/gd115.php',                                                                     //东
			headers:{                                                                                           //11
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //选
			}                                                                                                   //5
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:6,                                                                                 //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //
				}					                                                                            //
			}catch(err){                                                                                        //
				throw('--------广东11x5解析数据不正确');                                                        //
			}                                                                                                   //
		}                                                                                                       //
	},	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                           //
		title:'山东11选5',                                                                               //
		source:'澳汇娱乐',                                                                                	    //
		name:'sd11',                                                                                            //
		enable:true,                                                                                            //
		timer:'sd11',                                                                                           //
		option:{                                                                                              	//
			host:"127.0.0.2",                                                                                   	//
			timeout:50000,                                                                                    	//
			path: '/388/sd115.php',                                                                 	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//
				if(m=str.match(reg)){                                                                         	//
					return {                                                                                  	//
						type:7,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                               //
				throw('--------360彩票山东11选5解析数据不正确');                                                //
			}                                                                                                   //
		}                                                                                                       //
	},	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                           //
		title:'上海11选5',                                                                           	    	//
		source:'澳汇娱乐',                                                                                 	//
		name:'sh11x5',                                                                                           //
		enable:true,                                                                                            //
		timer:'sh11x5',                                                                                          //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //新
			path: '/388/sh115.php',                                                                       	//疆
			headers:{                                                                                           //时
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //时
			}                                                                                                   //彩
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:15,                                                                                //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //
				}					                                                                            //
			}catch(err){                                                                                        //
				throw('--------上海11选5彩票解析数据不正确');                                                    //
			}                                                                                                   //
		}                                                                                                       //新
	},		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                           //选
		title:'彩88江西11选5',                                                                              	//5
		source:'彩88',                                                                                			//
		name:'jx11',                                                                                            //
		enable:true,                                                                                            //
		timer:'jx11',                                                                                           //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //
			path: '/388/jx115.php',                                                                      //
			headers:{                                                                                           //
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //
			}                                                                                                   //
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:16,                                                                                //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //江
				}					                                                                            //西
			}catch(err){                                                                                        //11
				throw('--------彩88江西11选5解析数据不正确');                                                  	//选
			}                                                                                                   //5
		}                                                                                                       //
	}, 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                           //
		title:'北京pk10',                                                                           	    	//
		source:'百度',                                                                                 			//
		name:'bjpk10',                                                                                          //
		enable:true,                                                                                            //
		timer:'bjpk10',                                                                                         //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //北
			path: '/388/pk10.php',                                                                       //京
			headers:{                                                                                           //PK
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //拾
			}                                                                                                   //
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:20,                                                                                //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //
				}					                                                                            //
			}catch(err){                                                                                        //
				throw('--------重庆时时彩解析数据不正确');                                                      //
			}                                                                                                   //北
		}                                                                                                       //京
	},	 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{
        title:'北京快乐8',
        source:'168',
        name:'bjk8',
        enable:true,
        timer:'bjk8',
        option:getOption(78),
        parse:function(str){
            try{
                var json={};
                if (json = JSON.parse(str)) {
                    return getData(78, json);
                }
            }catch(err){
                throw('北京快乐8解析数据不正确');
            }
        }
    },	
	{                                                                                                           //
		title:'北京快乐8',                                                                           	    	//
		source:'澳汇娱乐',                                                                                 			//
		name:'bjpk10',                                                                                          //
		enable:true,                                                                                            //
		timer:'bjpk10',                                                                                         //
		option:{                                                                                                //
			host:"127.0.0.2",                                                                                   //
			timeout:50000,                                                                                     //北
			path: '/388/bjkl8.php',                                                                       //京
			headers:{                                                                                           //PK
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                             //拾
			}                                                                                                   //
		},                                                                                                      //
		parse:function(str){                                                                                    //
			try{                                                                                                //
				str=str.substr(0,200);	                                                                        //
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;              //
				var m;                                                                                          //
				if(m=str.match(reg)){                                                                           //
					return {                                                                                    //
						type:15,                                                                                //
						time:m[3],                                                                              //
						number:m[1],                                                                            //
						data:m[2]                                                                               //
					};                                                                                          //
				}					                                                                            //
			}catch(err){                                                                                        //
				throw('--------北京快乐8解析数据不正确');                                                      //
			}                                                                                                   //北
		}                                                                                                       //京
	},		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                         	//
		title:'幸运飞艇',                                                                                    	//
		source:'xyft',                                                                                        	//
		name:'xyft',                                                                                           	//
		enable:true,                                                                                          	//
		timer:'xyft',                                                                                          	//
		option:{                                                                                              	//杏
			host:"127.0.0.2",                                                                                   	//彩
			timeout:50000,                                                                                   	//系
			path: '/388/xyft.php',                                                                 	//统
			headers:{                                                                                         	//彩
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//
				if(m=str.match(reg)){                                                                         	//
					return {                                                                                  	//
						type:81,                                                                               	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('幸运飞艇解析数据不正确');                                                             	//
			}                                                                                                 	//
		}                                                                                                     	//
	},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                         	//统
		title: '六合彩',                                                                                                                      //
		source: '9800开奖网',                                                                                                                 //
		name: 'hklhc',                                                                                                                        //
		enable: true,                                                                                                                         //
		timer: 'hklhc',                                                                                         	//
		option:{                                                                                              	//
			host:"127.0.0.2",                                                                                   	//
			timeout:50000,                                                                                   	//
			path: '/388/lhc.php',                                                                 	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//
				if(m=str.match(reg)){                                                                         	//
					return {                                                                                  	//
						type:34,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('高速六合彩解析数据不正确');                                                            	//
			}                                                                                                 	//
		}                                                                                                     	//
	},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                         	//统
		title:'高速六合彩',                                                                                   	//彩
		source:'永利国际',                                                                                        	//
		name:'gslhc',                                                                                         	//
		enable:true,                                                                                          	//
		timer:'gslhc',                                                                                        	//
		option:{                                                                                              	//
			host:"127.0.0.2",                                                                                   	//
			timeout:50000,                                                                                   	//
			path: '/index.php/xingcai/xclhc',                                                                 	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//
				if(m=str.match(reg)){                                                                         	//
					return {                                                                                  	//
						type:77,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('高速六合彩解析数据不正确');                                                            	//
			}                                                                                                 	//
		}                                                                                                     	//
	},	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                         	//
		title:'澳门pk10',                                                                                     	//
		source:'永利国际',                                                                                        	//杏
		name:'ampk10',                                                                                         	//彩
		enable:true,                                                                                          	//系
		timer:'ampk10',                                                                                        	//统
		option:{                                                                                              	//彩
			host:"127.0.0.2",                                                                                   	//
			timeout:50000,                                                                                   	//
			path: '/index.php/xingcai/xcampk10',                                                              	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//
				if(m=str.match(reg)){                                                                         	//
					return {                                                                                  	//
						type:65,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//杏
						data:m[2]                                                                             	//彩
					};                                                                                        	//系
				}					                                                                          	//统
			}catch(err){                                                                                      	//彩
				throw('澳门pk10解析数据不正确');                                                              	//
			}                                                                                                 	//
		}                                                                                                     	//
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                         	//
		title:'澳门5分彩',                                                                                   	//
		source:'澳汇娱乐',                                                                                        	//
		name:'amssc',                                                                                         	//
		enable:true,                                                                                          	//
		timer:'amssc',                                                                                        	//
		option:{                                                                                              	//
			host:"127.0.0.2",                                                                                   	//
			port:80,timeout:50000,                                                                                    	//
			path: '/index.php/xingcai/xcamssc',                                                               	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//杏
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//彩
				var m;                                                                                        	//系
				if(m=str.match(reg)){                                                                         	//统
					return {                                                                                  	//彩
						type:61,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('澳门5分彩解析数据不正确');                                                            	//
			}                                                                                                 	//
		}                                                                                                     	//
	},  
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	{                                                                                                         	//
		title:'极速飞艇',                                                                                     	//
		source:'永利国际',                                                                                        	//
		name:'twpk10',                                                                                         	//
		enable:true,                                                                                          	//
		timer:'twpk10',                                                                                        	//
		option:{                                                                                              	//
			host:"127.0.0.2",                                                                                   	//
			timeout:50000,                                                                                   	//
			path: '/index.php/xingcai/xctwpk10',                                                              	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//杏
				if(m=str.match(reg)){                                                                         	//彩
					return {                                                                                  	//系
						type:66,                                                                              	//统
						time:m[3],                                                                            	//彩
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('台湾pk10解析数据不正确');                                                              	//
			}                                                                                                 	//
		}                                                                                                     	//
	},		
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	{                                                                                                         	//
		title:'澳门快3',                                                                                      	//
		source:'永利国际',                                                                                        	//杏
		name:'amk3',                                                                                         	//彩
		enable:true,                                                                                          	//系
		timer:'amk3',                                                                                        	//统
		option:{                                                                                              	//彩
			host:"127.0.0.2",                                                                                   	//
			timeout:50000,                                                                                   	//
			path: '/index.php/xingcai/xcamk3',                                                                	//
			headers:{                                                                                         	//
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) "                           	//
			}                                                                                                 	//
		},                                                                                                    	//
		parse:function(str){                                                                                  	//
			try{                                                                                              	//
				str=str.substr(0,200);	                                                                      	//
				var reg=/<row expect="([\d\-]+?)" opencode="([\d\,]+?)" opentime="([\d\:\- ]+?)"/;            	//
				var m;                                                                                        	//
				if(m=str.match(reg)){                                                                         	//
					return {                                                                                  	//
						type:63,                                                                              	//
						time:m[3],                                                                            	//
						number:m[1],                                                                          	//
						data:m[2]                                                                             	//
					};                                                                                        	//
				}					                                                                          	//
			}catch(err){                                                                                      	//
				throw('澳门快3解析数据不正确');                                                               	//
			}                                                                                                 	//
		}                                                                                                     	//
	}			 
];                                                                                                              

// 出错时等待 15                                                                                                
exports.errorSleepTime=5;                                                                                      

// 重启时间间隔，以小时为单位，0为不重启
exports.restartTime=0.4;
//exports.restartTime=0;

exports.submit={

	host:'localhost',
	path:'/index.php/dataSource/kj'
}

exports.dbinfo={
	host:'localhost',
	user:'root',
	password:'aohui123456',
	database:'vip2018xc'

}

global.log=function(log){
	var date=new Date();
	console.log('['+date.toDateString() +' '+ date.toLocaleTimeString()+'] '+log)
}


function reparseFrom9800(bet, type) {
	str = bet.str;

	exports.errorSleepTime=500;  

	reg = new RegExp("<TD bgColor=#f6f6f6 align=\"center\"" + bet.actionNo + "<\/TD>[\s\S].*?<TD align=middle>(.*?)<\/TD>[\s\S].*?<TD align=middle>[\s\S].*?<font color=\"#FF0000\"><b>(\d+) (\d+) (\d+) (\d+) (\d+) (\d+)<\/b><\/font>[\s\S].*?\+ <b><font color=\"#009933\">(\d+)<\/font><\/b>", ""); //

	match = str.match(reg);
	var myDate = new Date();
	var year = myDate.getFullYear(); //年
	var month = myDate.getMonth() + 1; //月
	var day = myDate.getDate(); //日
	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;
	var mytime = match[1] + " " + myDate.toLocaleTimeString();
	try {
		var data = {
			type: type,
			time: mytime,
			number: bet.actionNo
		}

		data.data = match[2] + "," + match[3] + "," + match[4] + "," + match[5] + "," + match[6] + "," + match[7] + "," + match[7];

		//console.log(data);
		return data;
	} catch (err) {
		throw ('解析数据失败');
	}

}

function getFrom9800(str, type) {

	str = str.substr(str.indexOf('bai12'), 560);
	exports.errorSleepTime=500;  

	var reg = /<TD bgColor=#f6f6f6 align="center">(\d+)<\/TD>[\s\S].*?<TD align=middle>(.*?)<\/TD>[\s\S].*?<TD align=middle>[\s\S].*?<font color="#FF0000"><b>(\d+) (\d+) (\d+) (\d+) (\d+) (\d+)<\/b><\/font>[\s\S].*?\+ <b><font color="#009933">(\d+)<\/font><\/b>/,
		match = str.match(reg);

	var myDate = new Date();
	var year = myDate.getFullYear(); //年
	var month = myDate.getMonth() + 1; //月
	var day = myDate.getDate(); //日
	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;
	var mytime = match[2] + " " + myDate.toLocaleTimeString();
	try {
		var data = {
			type: type,
			time: mytime,
			number: match[1]
		}

		data.data = match[3] + "," + match[4] + "," + match[5] + "," + match[6] + "," + match[7] + "," + match[8] + "," + match[9];

		//console.log(data);
		return data;
	} catch (err) {
		throw ('解析数据失败');
	}

}


function getOption(type) {
    //var host="api.1680210.com";
	var host = "api.api68.com";
    var uri = "";
    switch (type) {
		case 1:
            uri = "/CQShiCai/getBaseCQShiCai.do?lotCode=10002";
            break;
		case 81:
            uri = "/CQShiCai/getBaseCQShiCai.do?lotCode=10056";
            break;	
		case 82:
            uri = "/CQShiCai/getBaseCQShiCai.do?lotCode=10050";
            break;	
		case 50:
            uri = "/pks/getLotteryPksInfo.do?lotCode=10001";
            break;
		case 58:
            uri = "/pks/getLotteryPksInfo.do?lotCode=10001";
            break;	
		case 59:
            uri = "/pks/getLotteryPksInfo.do?lotCode=10037";
            break;	
		case 72:
            uri = "/pks/getLotteryPksInfo.do?lotCode=10037";
            break;	
        case 120:
            uri = "/CQShiCai/getBaseCQShiCai.do?lotCode=10004";
            break;	
	    case 119:
            uri = "/CQShiCai/getBaseCQShiCai.do?lotCode=10003";
            break;	
		case 116:
            uri = "/lotteryJSFastThree/getBaseJSFastThree.do?lotCode=10027";
            break;	
        case 21:
            uri = "/ElevenFive/getElevenFiveInfo.do?lotCode=10006";
			 break;
		case 117:
            uri = "/ElevenFive/getElevenFiveInfo.do?lotCode=10018";
			 break;
		case 118:
            uri = "/ElevenFive/getElevenFiveInfo.do?lotCode=10017";
			 break;
		case 10:
            uri = "/lotteryJSFastThree/getBaseJSFastThree.do?lotCode=10007";
            break;
		case 114:
            uri = "/lotteryJSFastThree/getBaseJSFastThree.do?lotCode=10026";
            break;
		case 115:
            uri = "/lotteryJSFastThree/getBaseJSFastThree.do?lotCode=10030";
            break;	
		case 116:
            uri = "/lotteryJSFastThree/getBaseJSFastThree.do?lotCode=10027";
            break;	
       	
        case 78://北京快乐8
            uri = "/LuckTwenty/getBaseLuckTewnty.do?lotCode=10014";
            break;
        case 66:
            uri = "/LuckTwenty/getPcLucky28.do?&lotCode=";
            break;
		case 60:
            uri = "/klsf/getLotteryInfo.do?lotCode=10005";
            break;
        case 61:
            uri = "/klsf/getLotteryInfo.do?lotCode=10009";
            break;	
		case 55:
            uri = "/pks/getLotteryPksInfo.do?lotCode=10057";
            break;
        case 70:
            host="1680660.com/smallSix/findSmallSixInfo.do?lotCode=10048"
            uri = "/smallSix/findSmallSixInfo.do?lotCode=10048";
            break;
       
    }
    return {
        host: host,
        timeout: 5000,
        path: uri,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
			"User-Agent": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0)"

        }
    }
}

function getData(type, json) {
    var data = {};
    if (json.errorCode == 0 && json.result.businessCode == 0) {
        data = json.result.data;
        var numbers=data.preDrawIssue.toString();
       
        return {
            type: type,
            time: getNowTime(),
            number: numbers,
            data: data.preDrawCode,
        };
    }
}
function getNowTime() {
    var myDate = new Date();
    var year = myDate.getFullYear();       //年
    var month = myDate.getMonth() + 1;     //月
    var day = myDate.getDate();            //日
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var mytime = year + "-" + month + "-" + day + " " + myDate.toLocaleTimeString();
    return mytime;
}