
window.AKSDK = (function (w, d) {
	var PARTNER_SDK;
	var ua = navigator.userAgent;

	var adsReady = false;
	if(self == top || window.akopenapi || /JyslSdk/i.test(ua) || /native_iOS/i.test(ua)){//SDK微端
		if(/iOS_JyslSdk/i.test(ua) || /Android_JyslSdk/i.test(ua)){
			PARTNER_SDK = nativeSdk();
		}else{
			PARTNER_SDK = h5Sdk();
		}
	}else if(/kongke_fante/i.test(ua)){
		PARTNER_SDK = h5Sdk();
	}else{//H5
		PARTNER_SDK = h5Sdk();
	}

	var PARTNER_CALLS = [];
	w.DKMGetParameter = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null){
			return decodeURIComponent(r[2]);
		}else{
			return '';
		}
	};

	w.DKM_LOADING_SCRIPT = {};
	w.DKM_SCRIPT_LOAD_CALLBACKS = {};
	w.DKM_GAME_INFO = {};

	// 任务队列
	function TaskQueue(delay) {
		this.queue = []; // 使用数组存储队列中的任务
		this.isRunning = false; // 标记是否有任务正在执行
		this.delay = delay || 10; // 执行的间隔（ms）
	}

	// 添加任务到队列
	TaskQueue.prototype.enqueue = function(task) {
		this.queue.push(task);
		this.run(); // 尝试执行任务
	};

	// 执行队列中的任务
	TaskQueue.prototype.run = function() {
		if (!this.isRunning && this.queue.length > 0) {
			this.isRunning = true; // 设置运行标志
			var self = this;
			var task = this.queue.shift(); // 取出队列中的第一个任务

			// // 执行任务
			// task();
			//
			// // 设置延时以递归调用run方法，继续执行下一个任务
			// setTimeout(function() {
			// 	self.isRunning = false; // 重置运行标志
			// 	self.run(); // 继续执行下一个任务
			// }, this.delay);


			try {
				task();
			} catch(e) {
				console.error("任务执行异常:", e);
			} finally {
				// 无论任务成功还是失败，都确保重置运行标志
				setTimeout(function() {
					self.isRunning = false;
					self.run();
				}, this.delay);
			}

		}
	};

	var eventTaskQueue = new TaskQueue()




	function run(method, data, callback) {
		(method in PARTNER_SDK) && PARTNER_SDK[method](data, callback);
	}


	var akSdk = {
		//调用登录／注册界面
		login: function (callback) {
			run('login', '', callback);
		},

		//用户登出
		logout: function(callback){
			run('logout', '', callback);
		},

		//支付
		pay: function(data, callback){
			console.log("研发发起支付请求");
			console.log(data);
			run('pay', data, callback);
		},

		//打开客服窗口
		openCsCenter: function () {
			run('openCsCenter');
		},
		//广告相关
		loadVideoAds:function (data) {
			run('loadVideoAds',data);
		},
		showVideoAds:function (data,callback) {
			run('showVideoAds',data,callback);
		},
		//数据分析相关
		miscConfigAnalytics:function (data) {
			run('miscConfigAnalytics',data);
		},
		sendCustomEvent:function (data) {
			run('sendCustomEvent',data);
		},
		regCheckConfigurationStart:function (data) {
			run('regCheckConfigurationStart',data);
		},
		regCDNDownloadStart:function (data) {
			run('regCDNDownloadStart',data);
		},
		regCDNDownloadFinish:function (data) {
			run('regCDNDownloadFinish',data);
		},
		regExtractResourceStart:function (data) {
			run('regExtractResourceStart',data);
		},
		regExtractResourceEnd:function (data) {
			run('regExtractResourceEnd',data);
		},
		agree_all_term:function (data) {
			run('agree_all_term',data);
		},
		nruJoinedServer:function (data) {
			run('nruJoinedServer',data);
		},
		//完成新手创角
		nruCreateRoleSuccess:function (data) {
			run('nruCreateRoleSuccess',data);
		},

		nruNamedRole:function (data) {
			run('nruNamedRole',data);
		},

		nruTutorialStart:function (data) {
			run('nruTutorialStart',data);
		},
		nruTutorialProgressFinish:function (data) {
			run('nruTutorialProgressFinish',data);
		},
		mdaLevelUp:function (data) {
			run('mdaLevelUp',data);
		},
		iapOpenShop:function (data) {
			run('iapOpenShop',data);
		},
		iapClickToBuyItem:function (data) {
			run('iapClickToBuyItem',data);
		},
		iapPurchasedItem:function (data) {
			run('iapPurchasedItem',data);
		},
		iapVipLevelUp:function (data) {
			run('iapVipLevelUp',data);
		},
		iapBuyVipRewardLevel:function (data) {
			run('iapBuyVipRewardLevel',data);
		},


		miscCustomEvent:function (data) {
			run('miscCustomEvent',data);
		},

		miscCustomEventNew:function (data) {
			run('miscCustomEventNew',data);
		},

		//角色创建LOG
		logCreateRole: function (serverId, serverName, roleId, roleName, roleLevel, roleCreateTime) {
			var data = {
				serverid: serverId,
				servername: serverName,
				roleid: roleId,
				rolename: roleName,
				rolelevel: roleLevel,
				rolecreatetime: roleCreateTime
			};
			run('logCreateRole', data);
		},

		//进入游戏LOG
		logEnterGame: function (serverId, serverName, roleId, roleName, roleLevel, roleCreateTime) {
			var data = {
				serverid: serverId,
				servername: serverName,
				roleid: roleId,
				rolename: roleName,
				rolelevel: roleLevel,
				rolecreatetime: roleCreateTime,
				fightvalue: arguments[6],
				goldnum:arguments[7],
				revival:arguments[8],
				revivalclass:arguments[9],
				viplevel:arguments[10],
			};

			run('logEnterGame', data);
		},

		//进入游戏LOG
		logRoleUpLevel: function (serverId, serverName, roleId, roleName, roleLevel, roleCreateTime) {
			var data = {
				serverid: serverId,
				servername: serverName,
				roleid: roleId,
				rolename: roleName,
				rolelevel: roleLevel,
				rolecreatetime: roleCreateTime,
				fightvalue: arguments[6],
				goldnum:arguments[7],
				revival:arguments[8],
				revivalclass:arguments[9],
				viplevel:arguments[10],
			};
			run('logRoleUpLevel', data);
		},

		//战力变化LOG
		logFightLevel: function (serverId, serverName, roleId, roleName, roleLevel, roleCreateTime,fightvalue) {
			var data = {
				serverid: serverId,
				servername: serverName,
				roleid: roleId,
				rolename: roleName,
				rolelevel: roleLevel,
				rolecreatetime: roleCreateTime,
				fightvalue: fightvalue
			};
			run('logFightLevel', data);
		},

		//处理退出事件
		onLogout: function(callback){
			run('onLogout', '', callback);
		},

		getSdkPartnerId: function () {
			return DKMGetParameter('dkm_partner_id') || DKMGetParameter('pf');
			// return run('getSdkPartnerId');
		},
		logLoadingFinish:function(callback){

			run('logLoadingFinish','',callback);
		},
		openIdCheck:function(){
			run('openIdCheck');
		},
		svipInterfc:function(){
			run('svipInterfc');
		},
		getSvipInfo : function(data,callback){
			run('getSvipInfo',data,callback);
		},
		loadCPUrl:function(data){
			run('loadCPUrl',data);
		},
		verify:function(){
			run('verify');
		},
		inputLeave:function () {
			run('inputLeave');
		},
		bindPhone :function (callback) {
			run('bindPhone', '', callback);
		},
		bindPhoneHd :function (callback) {
			run('bindPhoneHd', '', callback);
		},
		realName : function (callback) {
			run('realName', '', callback);
		},
		share : function(data,callback){
			run('share',data,callback);
		},
		follow : function (data,callback) {
			run('follow',data,callback);
		},
		microtQuery : function (callback) {
			run('microtQuery', '', callback);
		},
		phoneQuery : function (callback) {
			run('phoneQuery', '', callback);
		},
		microtOation : function (data,callback) {
			run('microtOation',data,callback);
		},
		totalHd : function (data,callback) {
			run('totalHd',data,callback);
		},
		openThirdChannel:function(method, params){
			var data = {
				'method' : method,
				'params' : params
			};
			run('openThirdChannel',data);
		},
		checkWord : function (data, callback) {
			run('checkWord', data, callback);
		},
		beQuit : function (data, callback) {
			run('beQuit', data, callback);
		},
		getAge:function(data,callback){
			run('getAge', data, callback);
		},
		getGameTime:function(data,callback){
			run('getGameTime', data, callback);
		},
		getNoticeStatus:function (data,callback){
			// 获取消息盒子状态
			console.log('获取消息盒子状态');
			run('getNoticeStatus', data, callback);
		},
		toggleNotice:function (data,callback){
			// 开启或者关闭成功
			console.log('开启或者关闭成功');
			run('toggleNotice', data,callback);
		},
		//打开红包
		openRedPack:function (){
			run('openRedPack');
		},
		expansion:function (data,callback){
			run('expansion', data,callback);
		},
		// vip等级升级事件上报
		logAction: function (eventType, jsonData) {
			var data = {
				'eventType' : eventType,
				'jsonData' : jsonData
			};

			data.jsonData = encodeURIComponent(JSON.stringify(data.jsonData));

			data = JSON.stringify(data);
			run('logAction', data);
		},

		// 激励广告
		inspireVideo: function(data,callback){
			console.log("研发发起点击广告请求");
			console.log(data);
			run('inspireVideo', data, callback);
		},
		// 打开小游戏请求
		openMinGame: function(jsonData,callback){
			console.log("研发发起打开小游戏请求");
			console.log(jsonData);
			jsonData = JSON.parse(jsonData);
			var data = {
				'eventType' : 'PASSKEYGAMECARD',
				'jsonData' : jsonData,
			};
			data.jsonData = (JSON.stringify(data.jsonData));
			data = JSON.stringify(data);
			run('openMinGame', data, callback);
		},
		//上报登录成功
		onLogin:function (data,callback){
			run('onLogin', data,callback);
		},
		//上报新手引导完成
		onFinishGuide:function (data,callback){
			run('onFinishGuide', data,callback);
		},
		//获取所有商品本地价格
		getPriceList:function (data,callback){
			run('getPriceList', data,callback);
		},
		//新手引导完成
		tutorialComplete:function (data,callback){
			run('tutorialComplete', data,callback);
		},
		//首日付费且次日登录
		retent2DayPurchase:function (data,callback){
			run('retent2DayPurchase', data,callback);
		},
		//首日註冊次日付費
		S2DayPurchase:function (data,callback){
			run('S2DayPurchase', data,callback);
		},
		//注册次留 1  3 7
		retention:function (data,callback){
			run('retention', data,callback);
		},
		//付费次留1 3 7
		purchaseRetention:function (data,callback){
			run('purchaseRetention', data,callback);
		},
		//在线时长
		onlineTime:function (data,callback){
			run('onlineTime', data,callback);
		},
		//加入公会
		joinTheAlliance:function (data,callback){
			run('joinTheAlliance', data,callback);
		},
		//结婚
		getMarried:function (data,callback){
			run('getMarried', data,callback);
		},
		//战斗力
		combatEffectiveness:function (data,callback){
			run('combatEffectiveness', data,callback);
		},
		showAccountCenter:function (data,callback){
			run('showAccountCenter', data,callback);
		},
		showQiYuDialog:function (){
			run('showQiYuDialog');
		},
		checkAccountBind:function (callback){
			run('checkAccountBind','',callback);
		},
		serverCheck:function (data){
			run('serverCheck', data);
		},
		getPhoneDeviceInfo:function (callback){
			run('getPhoneDeviceInfo', '',callback);
		},
		sonMegAction:function (data){
			run('sonMegAction', data);
		},
		onLogEvent:function (data){
			run('onLogEvent', data);
		},
		openUrl:function (data){
			run("openUrl",data)
		},
		GoToSite:function (data){
			run("GoToSite",data)
		},
		DelAccount:function (data) {
			run("DelAccount",data)
		},
		ShowCustomerService:function (data) {
			run("ShowCustomerService",data)
		},
		toReview:function (data) {
			run("toReview",data)
		}
	};

	function h5Sdk() {
		var callbacks = {};
		var userInfo = "";
		function getUrlFromJson(json){
			var url = '';
			for(var i in json){
				if(i == 'price'){
					json[i] = parseFloat(json[i]);
				}else{
					json[i] =  String(json[i]);
				}
				url += i + "=" + json[i] + '&';
			}
			return url.substring(0, url.length - 1);
		}
		function dgetJson(url, callback) {
			var f = d.getElementsByTagName('script')[0];
			var j = d.createElement('script');
			var json_callback = 'DKM_JSON_CALLBACK_' + parseInt(Math.random() * 1000000);
			w[json_callback] = function (data) {
				callback && callback(data);
			};
			j.async = true;
			j.src= url + (url.indexOf('?') === -1 ? '?' : '&') + 'jsoncallback=' + json_callback;
			f.parentNode.insertBefore(j, f);
		}

		function loadScriptIfNotExists(url, callback) {
			var scripts = document.getElementsByTagName('script');
			var scriptExists = false;

			// 检查是否已经加载了指定的脚本
			for (var i = 0; i < scripts.length; i++) {
				if (scripts[i].src.includes(url)) {
					scriptExists = true;
					break;
				}
			}

			// 如果脚本不存在，则动态加载
			if (!scriptExists) {
				var script = document.createElement("script");
				script.type = "text/javascript";

				if (script.readyState) {  // 仅适用于IE
					script.onreadystatechange = function() {
						if (script.readyState === "loaded" || script.readyState === "complete") {
							script.onreadystatechange = null;
							callback();
						}
					};
				} else {  // 适用于其他浏览器
					script.onload = function() {
						callback();
					};
				}

				script.src = url;
				var f = d.getElementsByTagName('script')[0];
				f.parentNode.insertBefore(script, f);
			} else {
				// 如果脚本已经存在，直接调用回调函数
				callback();
			}
		}

		window.addEventListener("vnggamessdk_ready", () => {
			console.log("vnggamessdk_ready go11111!");

		});

		return {
			//调用登录／注册界面
			login: function (data, callback) {
				//先加载js
				// 使用示例

				// 使用示例
				loadScriptIfNotExists("https://cdn.choingay.vn/js/vnggamessdk-mini-v3.js", function() {
					console.log("Script loaded and executed.");
					window.addEventListener("vnggamessdk_ready", () => {
						console.log("vnggamessdk_ready go!");
						if(window.VNGGamesSDK){



							// 这里可以调用脚本中的函数
							window.VNGGamesSDK.init().then((res) =>{
								console.log("SDK init result:", res);


								window.VNGGamesSDK.Ads.config({
									preloadAdBreaks: "on",
									onReady: () => {
										adsReady = true;
										// call window.VNGGamesSDK.Ads.show
										console.log("ready call window.VNGGamesSDK.Ads.show");
										// callback && callback (1);

									},
								});

								if(res.success){
									console.log("SDK init success:", res);
									// 这里可以调用脚本中的函数
									var p9130_userid = DKMGetParameter('9130_user_id');
									var p9130_token = DKMGetParameter('9130_token');
									var p9130_token_timeout = DKMGetParameter('9130_token_timeout');
									var is_token_timeout = false;
									if(p9130_token_timeout && (new Date()).getTime() >=  p9130_token_timeout * 1000){
										is_token_timeout = true;
									}

									if(p9130_userid && p9130_token && !is_token_timeout){//SDK先登录
										//window.location,登录失败
										callback(0, {userid: p9130_userid, account: p9130_userid, token: p9130_token});
									}else{
										const result = window.VNGGamesSDK.Auth.getUser();
										console.log("sdk login result:",result);
										if(result.success){
											console.log("sdk login success:",result);
											userInfo = result.data;
											const result1 = window.VNGGamesSDK.General.getPlatform();
											var platform_os = "";
											var os_version = "";
											var device_id = "";
											var device_name = "";
											if (result1.success) {
												platform_os = (result1.data)?(result1.data.data.os):"";
											}
											var platform_os1 = DKMGetParameter('9130_platform_os');
											if(platform_os1){
												platform_os = platform_os1;
											}
											callback(0, {userid: result.data.userId, account: result.data.userId, token: result.data.token.token,tokey_type:result.data.token.type,platform_os:platform_os,
												os_version:os_version,device_id:device_id,device_name:device_name});
										}else{
											console.log("sdk login fail:",result);
										}

									}
								}else{
									console.log("SDK init fail:", res);
								}

							});
						}else{
							console.log("SDK not loading:");
						}
					});


				});




			},

			getPriceList:async function (data, callback) {
				const result = await window.VNGGamesSDK.Payment.getProductList(data);
				console.log("SDK getPriceList result:", result);
				if (result.success) {
					console.log("SDK getPriceList success:", result);
					if (result.data && result.data.products) {
						callback && callback(result.data.products)
					}
				} else {
					console.log("SDK getPriceList fail:", result);
				}
			},
			loadVideoAds:function (data,callback) {

			},
			showVideoAds:function (data,callback) {







				if (data && data.sound) {
					window.VNGGamesSDK.Ads.config({sound: data.sound});
				}
				// when your game is loading
				if(adsReady){
					window.VNGGamesSDK.Ads.show({
						type: "reward",
						name: data.name?data.name:"name",
						beforeAd: () => {
							// fake code to change game state
							// replace with your game's code
							// game.disableAudio();
							// game.pause();
							console.log("ad beforeAd");
						},
						afterAd: () => {
							// fake code to change game state
							// replace with your game's code
							// game.resume();
							// game.enableAudio();
							console.log("ad afterAd");
						},
						adBreakDone: (placementInfo) => {
							switch (placementInfo.breakStatus) {
								case "viewed":
								case "dismissed":
									// already handled below => do nothing here
									break;
								// handle other error cases here
								// ...
							}
							console.log("ad adBreakDone");
						},
						beforeReward: (showAdFn) => {
							// rewarded ad has been fetched
							// fake code to display confirmation dialog
							// replace with your game's code
							// const confirmed = game.showConfirm("Are you sure you want to view this ad for reward?");
							// if (confirmed) {
							// 	// display ad
								showAdFn();
							// }
							console.log("ad beforeReward");
						},
						adDismissed: () => {
							// fake code to display dialog
							// replace with your game's code
							// game.showMessage("You dismissed the ad => no reward");
							console.log("ad adDismissed");
						},
						adViewed: (payload) => {
							// ad viewed => give reward
							// you can also use payload for extra information about the reward
							console.log("ad adViewed");
							callback && callback({type:"adRewarded"});
						},
					});
				}else{
					console.log("not ready call window.VNGGamesSDK.Ads.show");
				}

				// ...
				// when user changes audio settings
				// fake code to get game settings
				// replace with your game's code

				// ...
				// when user wants to see an ad to get reward
				// if (!adsReady) {
				// 	// fake code to display dialog
				// 	// replace with your game's code
				// 	console.log("Ads not ready! Please wait...");
				// 	callback && callback (0)
				// } else {
				//
				// }


			},
			//用户登出
			logout: function(data, callback){
				callbacks['logout'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('logout');
			},

			//支付
			pay: async function (data, callback) {
				callbacks['pay'] = typeof callback == 'function' ? callback : null;
				//demo data
				var pay_demo = {
					productId: data.ApplePrdId,
					appTransId: data.cpbill,
					price: data.price,
					currency: "VND",
					serverId: data.serverid,
					roleId: data.roleid,
					roleName: data.rolename,
					userId: userInfo ? userInfo.userId : "",
					addInfo: data.cpbill,
				}
				try{
					const result = await window.VNGGamesSDK.Payment.requestInAppPurchase(pay_demo);
					if (result.success) {
						// fake code to display dialog
						// replace with your game's code
						console.log("SDK pay success:", result);
						callback && callback(1);
					} else {
						// fake code to display error
						// replace with your game's code
						console.log("SDK pay fail:", result);
						callback && callback(0);
					}
				} catch (error) {
					if (String(error).toLowerCase().includes("unimplemented")) {
						window.open('https://shop.vnggames.com/vn/game/kvpv', '_blank');
					}
				}

			},
			iapPurchasedItem:function (data) {
				console.log("h5 iapPurchasedItem");
			},
			miscConfigAnalytics:function (data) {
				console.log("h5 miscConfigAnalytics");
			},
			sendCustomEvent:function (data) {
				console.log("h5 sendCustomEvent");
			},
			regCheckConfigurationStart:function (data) {
				console.log("h5 regCheckConfigurationStart");
			},
			regCDNDownloadStart:function (data) {
				console.log("h5 regCDNDownloadStart");
			},
			regCDNDownloadFinish:function (data) {
				console.log("h5 regCDNDownloadFinish");
			},

			//角色创建LOG
			logCreateRole: function (data) {
				this.postTopMessage('create', data);
			},

			//进入游戏LOG
			logEnterGame: function (data) {
				this.postTopMessage('enter', data);
			},

			//角色升级LOG
			logRoleUpLevel: function (data) {
				this.postTopMessage('levelup', data);
			},

			//战力升级LOG
			logFightLevel: function (data) {
				this.postTopMessage('fightup', data);
			},

			//首次登录成功到创角页面
			logLoadingFinish:function(data){
				this.postTopMessage('loadingFinish',data);
			},
			//首次登录成功到创角页面
			openIdCheck:function(data){
				this.postTopMessage('openIdCheck',data);
			},
			svipInterfc:function(data){
				this.postTopMessage('svipInterfc',data);
			},
			getSvipInfo: function (data,callback) {
				var partner_id = DKMGetParameter('9130_game_partner_id');
				var game_id = DKMGetParameter("9130_game_id");
				var game_pkg = DKMGetParameter("9130_game_pkg");
				var that = this;
				if(partner_id == 1 || partner_id == 2 || partner_id == 348 || partner_id == 349){
					dgetJson("//sdk.sh9130.com/user/?ct=pkgQrCode&ac=getQrcode&game_pkg="+game_pkg+"&partner_id="+partner_id+"&game_id="+game_id,function (res){
						if(res && res.data && res.data.qrcode){
							var temp_data = {errMsg:'success',isShow:true,qrcode:res.data.qrcode}
							callback && callback(temp_data);
						}else{
							callbacks['getSvipInfo'] = typeof callback == 'function' ? callback : null;
							that.postTopMessage('getSvipInfo', data);
						}
					});
				}else{
					callbacks['getSvipInfo'] = typeof callback == 'function' ? callback : null;
					that.postTopMessage('getSvipInfo', data);
				}

			},
			loadCPUrl:function(data){
				this.postTopMessage('loadCPUrl',data);
			},
			verify:function (data) {
				this.postTopMessage('verify',data);
			},
			//处理退出事件
			onLogout: function(data, callback){
				callbacks['on_logout'] = typeof callback == 'function' ? callback : null;
			},

			getSdkPartnerId: function () {
				return DKMGetParameter('dkm_partner_id') || DKMGetParameter('pf');
			},

			share: function (data,callback) {
				callbacks['share'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('share', data);
			},

			follow: function (data,callback) {
				callbacks['follow'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('follow', data);
			},
			microtQuery : function (data, callback) {
				callbacks['microtQuery'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('microtQuery',data);
			},
			phoneQuery : function (data, callback) {
				callbacks['phoneQuery'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('phoneQuery',data);
			},
			microtOation: function (data,callback) {
				callbacks['microtOation'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('microtOation', data);
			},
			totalHd: function (data,callback) {
				callbacks['totalHd'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('totalHd', data);
			},
			download: function (data) {
				this.postTopMessage('download', data);
			},
			inputLeave : function (data) {
				this.postTopMessage('inputLeave',data);
			},
			realName : function (data, callback) {
				if(DKMGetParameter('9130_game_partner_id') == 2 ){
					if(DKMGetParameter('9130_game_pkg') == "tjqy_jgxappstore_IL"){
						dgetJson(document.referrer + "/fante/?ct=user&ac=isTruename&uid=" + DKMGetParameter('9130_user_id'), callback);
					}else{
						dgetJson("//sdk.sh9130.com/fante/?ct=user&ac=isTruename&uid=" + DKMGetParameter('9130_user_id'), callback);
					}
				}else{
					callbacks['realName'] = typeof callback == 'function' ? callback : null;
					this.postTopMessage('realName',data);
				}
			},
			bindPhone : function (data,callback) {
				callbacks['bindPhone'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('bindPhone',data);
			},
			bindPhoneHd : function (data,callback) {
				callbacks['bindPhoneHd'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('bindPhoneHd',data);
			},
			//检测敏感词
			checkWord: function (data, callback) {
				callbacks['checkWord'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('checkWord', data);
			},
			beQuit: function (data, callback) {
				callbacks['beQuit'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('beQuit', data);
			},
			// 获取消息盒子状态
			getNoticeStatus: function (data,callback) {
				callbacks['getNoticeStatus'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('getNoticeStatus', data);
			},
			// 开启或者关闭成功
			toggleNotice: function (data,callback) {
				callbacks['toggleNotice'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('toggleNotice', data);
			},
			openRedPack:function (data) {
				this.postTopMessage('openRedPack',data);
			},
			expansion: function (data,callback) {
				callbacks['expansion'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('expansion', data);
			},
			addShortcut:function (callback){
				callbacks['expansion'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('expansion', '');
			},
			inspireVideo: function (data,callback) {
				callbacks['inspireVideo'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('inspireVideo',data);
			},
			callMessage: function (data,callback) {
				callbacks['callMessage'] = typeof callback == 'function' ? callback : null;
				this.postTopMessage('callMessage',data);
			},
			callHttpWeb:function (data){
				var partner_id = DKMGetParameter('9130_game_partner_id');
				var game_id = DKMGetParameter("9130_game_id");
				var game_pkg = DKMGetParameter("9130_game_pkg");
				if(/^[0-9]+.?[0-9]*$/.test(data)){
					dgetJson("//sdk.sh9130.com/user/?ct=typeUrl&ac=index&game_pkg="+game_pkg+"&partner_id="+partner_id+"&game_id="+game_id+"&type="+data,function (res){
						if(res && res.data && res.data.url){
							// akopenapi.callHttpWeb(res.data.url);
							if(partner_id == 2){
								location.href = "dkmweb://opensflink?url=" + res.data.url;
							}
						}else{
							console.log("没有配置");
						}
					});
				}else{
					if(partner_id == 2){
						location.href = "dkmweb://opensflink?url=" + data;
					}else {
						//a8调用了这个接口,额外处理下
						callbacks['expansion'] = typeof callback == 'function' ? callback : null;
						this.postTopMessage('expansion', data);
					}
				}

			},
			hmUnbind:function (callback) {
				var p9130_userid = DKMGetParameter('9130_user_id');
				var partner_id = DKMGetParameter('9130_game_partner_id');
				var pkg = DKMGetParameter("9130_game_pkg");
				if(partner_id == 919){
					dgetJson("//sdk.sh9130.com/partner/data/unbind1/919/"+pkg+"?thirdOpenId="+p9130_userid,function (res){
						if(res && res.status && res.status ==1){
							callback && callback(1);
						}else{
							callback && callback(0);
						}
					});
				}else{
					callback && callback(0);
				}
			},


			postTopMessage: function(action, args) {
				args = args || {};
				var data = {action: action, data: args, is_from_9130:1 };
				console.log('发送数据：');
				console.log(data);
				//alert(JSON.stringify(data));
				//log(JSON.stringify(data));
				if(window.location.href.match("wstx_xlwsyyh_AO")!=null){
					parent.postMessage(JSON.stringify(data), '*');
				}else{
					parent.postMessage(data, '*');
				}

			}
		};
	}

	function nativeSdk() {
		var CODE_INIT_SUCCESS = 1;
		var CODE_INIT_FAILURE = 2;
		var CODE_LOGIN_SUCCESS = 3;
		var CODE_LOGIN_FAILURE = 4;
		var CODE_SWITCH_ACCOUNT_SUCCESS = 5;
		var CODE_SWITCH_ACCOUNT_FAILURE = 6;
		var CODE_LOGOUT_SUCCESS = 7;
		var CODE_LOGOUT_FAILURE = 8;
		var CODE_PAY_SUCCESS = 9;
		var CODE_PAY_WAIT = 10;
		var CODE_PAY_FAILURE = 11;
		var CODE_PAY_CANCEL = 13;
		var EXITGAME = 12;
		var CODE_GETID_CHECK = 16;
		var CODE_ID_CHECK = 17;

		var CODE_GET_PRICE = 21;


		var CODE_OPEN_MIN_GAME = 18

		var CODE_GET_INFO = 19
		var CODE_VIDEO_CALLBACK = 25

		var callbacks = {};

		function dgetJson(url, callback) {
			var f = d.getElementsByTagName('script')[0];
			var j = d.createElement('script');
			var json_callback = 'DKM_JSON_CALLBACK_' + parseInt(Math.random() * 1000000);
			w[json_callback] = function (data) {
				callback && callback(data);
			};
			j.async = true;
			j.src= url + (url.indexOf('?') === -1 ? '?' : '&') + 'jsoncallback=' + json_callback;
			f.parentNode.insertBefore(j, f);
		}
		//针对iOS
		if(!window.akopenapi){
			function loadURL(url) {
				var game_pkg = DKMGetParameter('9130_game_pkg');
				var game = '';
				if(game_pkg){
					game = game_pkg.split('_')[0];
				}
				if(game == 'jpdgr' || game == 'bzws'){
					var iframe = document.createElement('iframe');
					iframe.style.display = 'none';
					iframe.src = url;
					document.body.appendChild(iframe);
				}else{
					location.href=url;
				}

			}

			function getUrlFromJson(json){
				var url = '';
				for(var i in json){
					if(i == 'price'){
						json[i] = parseFloat(json[i]);
					}else{
						json[i] =  String(json[i]);
					}
					url += i + "=" + json[i] + '&';
				}
				return url.substring(0, url.length - 1);
			}
			window.akLoginResult = function(account, userid, uid, token,platform_os,os_version,device_id,device_name,login_channel){
				console.log('ios回调:'+account+"token:"+token);
				if(typeof callbacks['login'] == 'function'){
					console.log('ios回调1:'+account+"token:"+token);
					callbacks['login'](0, {uid: uid, userid: userid, accountId: account, token: token,
						platform_os:platform_os,os_version:os_version,device_id:device_id,device_name:device_name,login_channel:login_channel});
				}
			};

			window.aklogoutResult = function(code){
				if(typeof callbacks['logout'] == 'function'){
					callbacks['logout'](0, '');
				}
				if(typeof callbacks['on_logout'] == 'function'){
					callbacks['on_logout'](0, '');
				}
			};

			//切换帐号成功回调
			window.akswitchLoginResult = function akswitchLoginResult(code){
				if(typeof callbacks['on_logout'] == 'function'){
					callbacks['on_logout'](0, '');
				}
			};

			window.akpayResult = function(code){
				if(typeof callbacks['pay'] == 'function'){
					//data = {uid:'', account: '', cpOrderNo: '', orderNo: '', amount: '', extension: ''}
					callbacks['pay'](code);
				}
			};
			window.akgetPriceListResult = function(currencyCode,data){
				if(typeof callbacks['getPriceList'] == 'function'){
					//data = {uid:'', account: '', cpOrderNo: '', orderNo: '', amount: '', extension: ''}
					// data = JSON.parse(data);
					var temp_data = {};
					temp_data['currencyCode'] = currencyCode;
					temp_data['data'] = data;
					callbacks['getPriceList'](temp_data);
				}
			};
			window.VideoResult = function(data){
				if(typeof callbacks['showVideoAds'] == 'function'){
					//data = {uid:'', account: '', cpOrderNo: '', orderNo: '', amount: '', extension: ''}
					// data = JSON.parse(data);
					callbacks['showVideoAds'](data);
				}
			};

			window.akopenapi = {
				openThirdChannel: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://openThirdChannel?" + getUrlFromJson(data));
				},
				login: function(){
					loadURL("akopenapi://login");
				},
				logout: function(){
					eventTaskQueue.enqueue(function(){
						loadURL("akopenapi://logout");
					})

				},
				pay: function(data){
					eventTaskQueue.enqueue(function(){
						data = JSON.parse(data);
						if(!data['ApplePrdId']){
							data['ApplePrdId'] = data['productid'];
						}

						loadURL("akopenapi://pay?" + getUrlFromJson(data));
					})
				},

				createrole: function(data){
					eventTaskQueue.enqueue(function(){
						data = JSON.parse(data);
						loadURL("akopenapi://createrole?" + getUrlFromJson(data));
					})

				},

				entergame: function(data){

					eventTaskQueue.enqueue(function(){
						data = JSON.parse(data);

						loadURL("akopenapi://entergame?" + getUrlFromJson(data));
					})


				},

				roleuplevel: function(data){

					eventTaskQueue.enqueue(function(){
						data = JSON.parse(data);
						loadURL("akopenapi://roleuplevel?" + getUrlFromJson(data));
					})


				},

				fightuplevel: function(data){
					data = JSON.parse(data);
					loadURL("akocopenapi://fightuplevel?" + getUrlFromJson(data));
				},

				loadingFinish: function () {
					loadURL("akocopenapi://loadingFinish" );
				},

				openIdCheck: function () {
					loadURL("akocopenapi://openIdCheck" );
				},
				svipInterfc:function () {
					loadURL("akocopenapi://svipInterfc" );
				},
				realName:function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://realName?" + getUrlFromJson(data));
				},
				openRedPack: function () {
					loadURL("akocopenapi://openRedPack" );
				},
				logAction: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://logAction?"+ getUrlFromJson(data));
				},
				beQuit: function(data){
					console.log('beQuit#1');
					loadURL("akocopenapi://beQuit");
				},

				openMinGame: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://openMinGame?"+ getUrlFromJson(data));
				},
				onLogin: function (data) {

					eventTaskQueue.enqueue(function(){
						data = JSON.parse(data);
						loadURL("akocopenapi://onLogin?"+ getUrlFromJson(data));
					})


				},
				onFinishGuide: function (data) {

					eventTaskQueue.enqueue(function(){
						data = JSON.parse(data);
						loadURL("akocopenapi://onFinishGuide?"+ getUrlFromJson(data));
					})


				},
				getPriceList: function (data,callback) {
					data = JSON.parse(data);
					loadURL("akocopenapi://getPriceList?"+ getUrlFromJson(data));
				},
				tutorialComplete: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://tutorialComplete?"+ getUrlFromJson(data));
				},
				retent2DayPurchase: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://retent2DayPurchase?"+ getUrlFromJson(data));
				},
				S2DayPurchase: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://S2DayPurchase?"+ getUrlFromJson(data));
				},
				retention: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://retention?"+ getUrlFromJson(data));
				},
				purchaseRetention: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://purchaseRetention?"+ getUrlFromJson(data));
				},
				onlineTime: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://onlineTime?"+ getUrlFromJson(data));
				},
				joinTheAlliance: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://joinTheAlliance?"+ getUrlFromJson(data));
				},
				getMarried: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://getMarried?"+ getUrlFromJson(data));
				},
				combatEffectiveness: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://combatEffectiveness?"+ getUrlFromJson(data));
				},
				showAccountCenter: function (data) {

					eventTaskQueue.enqueue(function(){
						data = {};
						loadURL("akocopenapi://showAccountCenter?"+ getUrlFromJson(data));
					})


				},
				showQiYuDialog: function () {
					var data = {};
					loadURL("akocopenapi://showQiYuDialog?"+ getUrlFromJson(data));
				},
				checkAccountBind: function () {
					var data = {};
					loadURL("akocopenapi://checkAccountBind?"+ getUrlFromJson(data));
				},
				serverCheck: function (data) {
					data = JSON.parse(data);
					loadURL("akocopenapi://serverCheck?"+ getUrlFromJson(data));
				},
				sonMegAction:function (data){

					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://sonMegAction?"+data);
					})


				},
				onLogEvent:function (data){
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://onLogEvent?"+ data);
					})
				},
				openUrl:function (data){
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://openUrl?"+ data);
					})
				},
				GoToSite:function (data){
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://GoToSite?"+ data);
					})
				},
				DelAccount:function (data){
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://DelAccount?"+ data);
					})
				},
				ShowCustomerService:function (data){
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://ShowCustomerService?"+ data);
					})
				},
				toReview:function (data){
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://toReview?"+ data);
					})
				},
				openCsCenter:function () {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://openCsCenter");
					})
				},
				loadVideoAds:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://loadVideoAds"+ getUrlFromJson(data));
					})
				},
				showVideoAds:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://showVideoAds?"+ getUrlFromJson(data));
					})
				},

				//数据分析相关
				miscConfigAnalytics:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://miscConfigAnalytics?"+ getUrlFromJson(data));
					})
				},
				sendCustomEvent:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://sendCustomEvent?"+ getUrlFromJson(data));
					})
				},
				regCheckConfigurationStart:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://regCheckConfigurationStart?"+ getUrlFromJson(data));
					})
				},
				regCDNDownloadStart:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://regCDNDownloadStart?"+ getUrlFromJson(data));
					})
				},
				regCDNDownloadFinish:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://regCDNDownloadFinish?"+ getUrlFromJson(data));
					})
				},
				regExtractResourceStart:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://regExtractResourceStart?"+ getUrlFromJson(data));
					})
				},
				regExtractResourceEnd:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://regExtractResourceEnd?"+ getUrlFromJson(data));
					})
				},
				agree_all_term:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://agree_all_term?"+ getUrlFromJson(data));
					})
				},
				nruJoinedServer:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://nruJoinedServer?"+ getUrlFromJson(data));
					})
				},

				//完成新手创角
				nruCreateRoleSuccess:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://nruCreateRoleSuccess?"+ getUrlFromJson(data));
					})
				},

				nruNamedRole:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://nruNamedRole?"+ getUrlFromJson(data));
					})
				},

				nruTutorialStart:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://nruTutorialStart?"+ getUrlFromJson(data));
					})
				},
				nruTutorialProgressFinish:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://nruTutorialProgressFinish?"+ getUrlFromJson(data));
					})
				},
				mdaLevelUp:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://mdaLevelUp?"+ getUrlFromJson(data));
					})
				},
				iapOpenShop:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://iapOpenShop?"+ getUrlFromJson(data));
					})
				},
				iapClickToBuyItem:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://iapClickToBuyItem?"+ getUrlFromJson(data));
					})
				},
				iapPurchasedItem:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://iapPurchasedItem?"+ getUrlFromJson(data));
					})
				},
				iapVipLevelUp:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://iapVipLevelUp?"+ getUrlFromJson(data));
					})
				},
				iapBuyVipRewardLevel:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://iapBuyVipRewardLevel?"+ getUrlFromJson(data));
					})
				},
				miscCustomEvent:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://miscCustomEvent?"+ (data));
					})
				},

				miscCustomEventNew:function (data) {
					eventTaskQueue.enqueue(function(){
						loadURL("akocopenapi://miscCustomEventNew?"+ getUrlFromJson(data));
					})
				},
			}
		}


		//安卓的回调
		window.akresultcallback = function (code, data) {
			console.log('回调返回'+JSON.stringify(data)+"返回code"+code);
			switch(code)
			{
				//登录成功
				case CODE_LOGIN_SUCCESS:
					console.log('登录返回1');
					console.log(typeof callbacks['login'] == 'function');
					//data = {uid: '', account: '', token: ''}
					if(typeof callbacks['login'] == 'function'){
						console.log('登录返回');
						console.log(data);
						callbacks['login'](0, data);
					}
					break;

				//登录失败
				case CODE_LOGIN_FAILURE:
					akSdk.login(callbacks['login'] == 'function' ? callbacks['login'] : null);
					if(typeof callbacks['login'] == 'function'){
						callbacks['login'](1, '');
					}
					break;
				//注销成功,游戏处理
				case CODE_LOGOUT_SUCCESS:
					if(typeof callbacks['logout'] == 'function'){
						callbacks['logout'](0, '');
					}
					if(typeof callbacks['on_logout'] == 'function'){
						callbacks['on_logout'](0, '');
					}
					break;
				case CODE_LOGOUT_FAILURE://注销失败

					if(typeof callbacks['logout'] == 'function'){
						callbacks['logout'](1, '');
					}
					if(typeof callbacks['on_logout'] == 'function'){
						callbacks['on_logout'](1, '');
					}
					break;
				//支付成功
				case CODE_PAY_SUCCESS:
					console.log('支付返回');
					console.log(data);
					if(typeof callbacks['pay'] == 'function'){
						//data = {uid:'', account: '', cpOrderNo: '', orderNo: '', amount: '', extension: ''}
						callbacks['pay'](0, data);
					}
					break;
				//支付失败
				case CODE_PAY_FAILURE:
					console.log('支付返回');
					console.log(data);
					if(typeof callbacks['pay'] == 'function'){
						callbacks['pay'](1, '');
					}
					break;
				//支付取消
				case CODE_PAY_CANCEL:
					console.log('支付返回');
					console.log(data);
					if(typeof callbacks['pay'] == 'function'){
						callbacks['pay'](2, '');
					}
					break;
				case CODE_GETID_CHECK:
					if(typeof callbacks['realName'] == 'function'){
						callbacks['realName'](data);
					}
					break;
				case CODE_ID_CHECK:
					if(typeof callbacks['openIdCheck'] == 'function'){
						callbacks['openIdCheck'](data);
					}
					break;
				case CODE_OPEN_MIN_GAME:
					if(typeof callbacks['openMinGame'] == 'function'){
						callbacks['openMinGame'](data);
					}
					break;
				case CODE_GET_INFO:
					if(typeof callbacks['getPhoneDeviceInfo'] == 'function'){
						callbacks['getPhoneDeviceInfo'](data);
					}
					break;
				case CODE_GET_PRICE:
					if(typeof callbacks['getPriceList'] == 'function'){
						callbacks['getPriceList'](data);
					}
					break;
				case CODE_VIDEO_CALLBACK:
					if(typeof callbacks['showVideoAds'] == 'function'){
						callbacks['showVideoAds'](data);
					}
					break;

			}
		};

		return {
			//调用登录／注册界面
			login: function (data, callback) {
				var p9130_userid = DKMGetParameter('9130_user_id');
				var p9130_token = DKMGetParameter('9130_token');
				var p9130_token_timeout = DKMGetParameter('9130_token_timeout');
				var is_token_timeout = false;
				if(p9130_token_timeout && (new Date()).getTime() >=  p9130_token_timeout * 1000){
					is_token_timeout = true;
				}
				if(p9130_userid && p9130_token && !is_token_timeout){//SDK先登录
					callback(0, {userid: p9130_userid, account: p9130_userid, token: p9130_token});
				}else{
					callbacks['login'] = typeof callback == 'function' ? callback : null;
					console.log(typeof callbacks['login'] == 'function')
					akopenapi.login();
				}
			},

			//用户登出
			logout: function(data, callback){
				callbacks['logout'] = typeof callback == 'function' ? callback : null;
				akopenapi.logout();
			},

			//支付
			pay: function(data, callback){
				callbacks['pay'] = typeof callback == 'function' ? callback : null;
				akopenapi.pay(JSON.stringify(data));
			},
			openCsCenter:function () {
				akopenapi.openCsCenter();
			},
			loadVideoAds:function (data) {
				akopenapi.loadVideoAds(JSON.stringify(data));
			},

			showVideoAds:function (data,callback) {
				callbacks['showVideoAds'] = typeof callback == 'function' ? callback : null;
				akopenapi.showVideoAds(JSON.stringify(data));
			},

			//数据分析相关
			miscConfigAnalytics:function (data) {
				akopenapi.miscConfigAnalytics(JSON.stringify(data));
			},
			sendCustomEvent:function (data) {
				akopenapi.sendCustomEvent(JSON.stringify(data));
			},
			regCheckConfigurationStart:function (data) {
				akopenapi.regCheckConfigurationStart(JSON.stringify(data));
			},
			regCDNDownloadStart:function (data) {
				akopenapi.regCDNDownloadStart(JSON.stringify(data));
			},
			regCDNDownloadFinish:function (data) {
				akopenapi.regCDNDownloadFinish(JSON.stringify(data));
			},
			regExtractResourceStart:function (data) {
				akopenapi.regExtractResourceStart(JSON.stringify(data));
			},
			regExtractResourceEnd:function (data) {
				akopenapi.regExtractResourceEnd(JSON.stringify(data));
			},
			agree_all_term:function (data) {
				akopenapi.agree_all_term(JSON.stringify(data));
			},
			nruJoinedServer:function (data) {
				akopenapi.nruJoinedServer(JSON.stringify(data));
			},

			//完成新手创角

			nruCreateRoleSuccess:function (data) {
				akopenapi.nruCreateRoleSuccess(JSON.stringify(data));
			},

			nruNamedRole:function (data) {
				akopenapi.nruNamedRole(JSON.stringify(data));
			},

			nruTutorialStart:function (data) {
				akopenapi.nruTutorialStart(JSON.stringify(data));
			},
			nruTutorialProgressFinish:function (data) {
				akopenapi.nruTutorialProgressFinish(JSON.stringify(data));
			},
			mdaLevelUp:function (data) {
				akopenapi.mdaLevelUp(JSON.stringify(data));
			},
			iapOpenShop:function (data) {
				akopenapi.iapOpenShop(JSON.stringify(data));
			},
			iapClickToBuyItem:function (data) {
				akopenapi.iapClickToBuyItem(JSON.stringify(data));
			},
			iapPurchasedItem:function (data) {
				akopenapi.iapPurchasedItem(JSON.stringify(data));
			},
			iapVipLevelUp:function (data) {
				akopenapi.iapVipLevelUp(JSON.stringify(data));
			},
			iapBuyVipRewardLevel:function (data) {
				akopenapi.iapBuyVipRewardLevel(JSON.stringify(data));
			},

			miscCustomEvent:function (data) {
				akopenapi.miscCustomEvent(data);
			},

			miscCustomEventNew:function (data) {
				akopenapi.miscCustomEventNew(JSON.stringify(data));
			},

			//角色创建LOG
			logCreateRole: function (data) {
				akopenapi.createrole(JSON.stringify(data));
			},

			//进入游戏LOG
			logEnterGame: function (data) {
				akopenapi.entergame(JSON.stringify(data));
			},

			//进入游戏LOG
			logRoleUpLevel: function (data) {
				akopenapi.roleuplevel(JSON.stringify(data));
			},

			//战力升级LOG
			logFightLevel: function (data) {
				akopenapi.fightuplevel(JSON.stringify(data));
			},

			logLoadingFinish: function () {
				akopenapi.loadingFinish();
			},
			openIdCheck: function () {
				callbacks['openIdCheck'] = typeof callback == 'function' ? callback : null;
				akopenapi.openIdCheck();
			},
			svipInterfc:function () {
				akopenapi.svipInterfc();
			},
			verify:function () {
				akopenapi.verify();
			},
			openThirdChannel:function(data){
				akopenapi.openThirdChannel(JSON.stringify(data));

			},
			realName:function (data,callback) {
				// callbacks['realName'] = typeof callback == 'function' ? callback : null;
				// akopenapi.realName(JSON.stringify(data));
				dgetJson("//sdk.sh9130.com/fante/?ct=user&ac=isTruename&uid=" + DKMGetParameter('9130_user_id'), callback);
			},

			//处理退出事件
			onLogout: function(data, callback){
				callbacks['on_logout'] = typeof callback == 'function' ? callback : null;
			},

			getSdkPartnerId: function () {
				return DKMGetParameter('pf');
			},
			getAge:function(data,callback){

			},
			getGameTime:function(data, callback){
			},

			openRedPack:function (data) {
				callbacks['openRedPack'] = typeof callback == 'function' ? callback : null;
				akopenapi.openRedPack();
			},

			logAction:function (data) {
				akopenapi.logAction(data);
			},

			beQuit: function (data) {
				console.log('beQuit#2');
				akopenapi.beQuit();
			},

			openMinGame:function (data,callback){
				callbacks['openMinGame'] = typeof callback == 'function' ? callback : null;
				akopenapi.openMinGame(data);
			},
			onLogin:function (data,callback){
				callbacks['onLogin'] = typeof callback == 'function' ? callback : null;
				akopenapi.onLogin(JSON.stringify(data));
			},
			onFinishGuide:function (data,callback){
				callbacks['onFinishGuide'] = typeof callback == 'function' ? callback : null;
				akopenapi.onFinishGuide(JSON.stringify(data));
			},
			getPriceList:function (data,callback){
				callbacks['getPriceList'] = typeof callback == 'function' ? callback : null;
				akopenapi.getPriceList(JSON.stringify(data));
			},
			tutorialComplete:function (data,callback){
				callbacks['tutorialComplete'] = typeof callback == 'function' ? callback : null;
				akopenapi.tutorialComplete(JSON.stringify(data));
			},
			retent2DayPurchase:function (data,callback){
				callbacks['retent2DayPurchase'] = typeof callback == 'function' ? callback : null;
				akopenapi.retent2DayPurchase(JSON.stringify(data));
			},
			S2DayPurchase:function (data,callback){
				callbacks['S2DayPurchase'] = typeof callback == 'function' ? callback : null;
				akopenapi.S2DayPurchase(JSON.stringify(data));
			},
			retention:function (data,callback){
				callbacks['retention'] = typeof callback == 'function' ? callback : null;
				akopenapi.retention(JSON.stringify(data));
			},
			purchaseRetention:function (data,callback){
				callbacks['purchaseRetention'] = typeof callback == 'function' ? callback : null;
				akopenapi.purchaseRetention(JSON.stringify(data));
			},
			onlineTime:function (data,callback){
				callbacks['onlineTime'] = typeof callback == 'function' ? callback : null;
				akopenapi.onlineTime(JSON.stringify(data));
			},
			joinTheAlliance:function (data,callback){
				callbacks['joinTheAlliance'] = typeof callback == 'function' ? callback : null;
				akopenapi.joinTheAlliance(JSON.stringify(data));
			},
			getMarried:function (data,callback){
				callbacks['getMarried'] = typeof callback == 'function' ? callback : null;
				akopenapi.getMarried(JSON.stringify(data));
			},
			combatEffectiveness:function (data,callback){
				callbacks['combatEffectiveness'] = typeof callback == 'function' ? callback : null;
				akopenapi.combatEffectiveness(JSON.stringify(data));
			},
			showAccountCenter:function (data,callback){
				callbacks['showAccountCenter'] = typeof callback == 'function' ? callback : null;
				akopenapi.showAccountCenter(JSON.stringify(data));
			},
			showQiYuDialog: function () {
				akopenapi.showQiYuDialog();
			},
			checkAccountBind: function (data,callback) {
				callbacks['checkAccountBind'] = typeof callback == 'function' ? callback : null;
				akopenapi.checkAccountBind();
			},
			serverCheck: function (data,callback) {
				callbacks['serverCheck'] = typeof callback == 'function' ? callback : null;
				akopenapi.serverCheck(JSON.stringify(data));
			},
			getPhoneDeviceInfo:function (data,callback){
				callbacks['getPhoneDeviceInfo'] = typeof callback == 'function' ? callback : null;
				akopenapi.getPhoneDeviceInfo();
			},
			sonMegAction:function (data){
				callbacks['sonMegAction'] = typeof callback == 'function' ? callback : null;
				akopenapi.sonMegAction(data);
			},
			onLogEvent:function (data){
				callbacks['onLogEvent'] = typeof callback == 'function' ? callback : null;
				akopenapi.onLogEvent(data);
			},
			openUrl:function (data){
				callbacks['openUrl'] = typeof callback == 'function' ? callback : null;
				akopenapi.openUrl(data);
			},
			GoToSite:function (data){
				callbacks['GoToSite'] = typeof callback == 'function' ? callback : null;
				akopenapi.GoToSite();
			},
			DelAccount:function (data){
				callbacks['DelAccount'] = typeof callback == 'function' ? callback : null;
				akopenapi.DelAccount();
			},
			ShowCustomerService:function (data){
				callbacks['ShowCustomerService'] = typeof callback == 'function' ? callback : null;
				akopenapi.ShowCustomerService();
			},
			toReview:function (data){
				callbacks['toReview'] = typeof callback == 'function' ? callback : null;
				akopenapi.toReview();
			},
		};
	}
	return akSdk;
})(window, document);

window.iosIndexedDB = function () {
	var callbacks = {};
	var onSaveSuccess = function () {

	};
	function base64ToUint8Array(base64String) {
		var padding = '='.repeat((4 - base64String.length % 4) % 4);
		var base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');

		var rawData = window.atob(base64);
		var outputArray = new Uint8Array(rawData.length);

		for (var i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}
	function arrayBufferToBase64 (buffer) {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}


	//OC直接调用window['gameFrame'].contentWindow.postMessage，这里就可以收到了
	window.addEventListener("message", function (event) {
		console.log('收到数据2：');
		console.log(event.data);

		var action = event && event.data && event.data.action ? event.data.action : false;
		var result = event && event.data && event.data.data ? event.data.data : {};

		if(action != 'onOCDataReceived' && action != 'onSaveSuccess'){
			return;
		}

		//保存成功回调
		if(action == 'onSaveSuccess'){
			onSaveSuccess && onSaveSuccess();
			return;
		}

		var func = result.callback;
		var data = result.data;

		var obj = callbacks[func] || null;

		if(!obj){
			return;
		}

		var ver = obj.ver || '';
		var callback = obj.func || null;

		if(data == ""){
			callback && callback(null);
			return;
		}

		data = data.split('|');
		var s_ver = '';
		var base64 = '';
		var type = '';
		if(data.length == 3){
			type = data[0];
			s_ver = data[1];
			base64 = data[2];

		}else{
			type = 'string';
			s_ver = ver;
			base64 = data[0];
		}

		var reData = null;
		if(s_ver != ver){
			callback && callback(null);
		}else{
			if(type == 'string'){
				reData = window.atob(base64);
			}else{
				data = base64ToUint8Array(base64);
				reData = data.buffer;
			}

			callback && callback(reData);
		}
		delete callbacks[func]; //过河拆桥

	});
	return {
		id: 0,
		put: function (key, value, ver, callback) {
			key = key.split('?')[0];
			var type = 'string';
			if(value.byteLength){
				value = arrayBufferToBase64(value);
				type = 'arraybuffer';
			}else{
				value = window.btoa(value);
			}

			value = type + "|" + ver + "|" + value;
			var obj = {
				key: key,
				data: value
			};


			onSaveSuccess = callback;

			if(!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.saveData){
				return false;
			}
			window.webkit.messageHandlers.saveData.postMessage(obj);
			return true;
		},
		get: function (key, ver, callback) {
			key = key.split('?')[0];
			var self = this;

			this.id = this.id + 1;

			var func = 'onOCDataReceived' + this.id;

			//类似jsonp 每次获取数据，回调函数都不一样
			callbacks[func] = {
				ver: ver,
				func: callback
			};

			var obj = {
				key: key,
				callback: func
			};

			if(!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.getData){
				callback && callback(null);
				return false;
			}

			window.webkit.messageHandlers.getData.postMessage(obj);
			return true;
		},
		del: function (key) {
			key = key.split('?')[0];
			var obj = {
				key: key
			};

			if(!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.delData){
				return false;
			}

			window.webkit.messageHandlers.delData.postMessage(obj);
			return true;
		},

		deleteDatabase: function () {
			if(!window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.deleteDatabase){
				return false;
			}
			var obj = {

			};

			window.webkit.messageHandlers.deleteDatabase.postMessage(obj);
			return true;
		}
	};
}();