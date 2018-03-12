/**
 *
 * pokeys adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "pokeys",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "1.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Pokeys Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@pokeys.com>"
 *          ]
 *          "desc":         "pokeys adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "materialize":  true,                       // support of admin3
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": false,
 *          "test2": 0,
 *          "mySelect": "auto"
 *      }
 *  }
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

var request = require('request');

 //installNpm('xml2js');
 var path = __dirname;
 var cmd = 'npm install xml2js --production --prefix "' + path + '"';
 var exec = require('child_process').exec;
 var child = exec(cmd);
 var parseString = require('xml2js').parseString;
// you have to require the utils module and call adapter function
var utils =    require(__dirname + '/lib/utils'); // Get common adapter utils
var test_;
// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.pokeys.0
var adapter = new utils.Adapter('pokeys');

// is called when adapter shuts down - callback has to be called under any circumstances!
/*adapter.on('unload', function (callback) {
    try {
       // adapter.log.info('cleaned everything up...');
        callback();
    } catch (e) {
        callback();
    }
});

// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
    // Warning, obj can be null if it was deleted
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
    if (typeof obj === 'object' && obj.message) {
        if (obj.command === 'send') {
            // e.g. send email or pushover or whatever
            console.log('send command');

            // Send response in callback if required
            if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
        }
    }
});
*/




// Wenn Adapter fertig geladen ist, -> Main starten
adapter.on('ready', function () {
    main();
});

// Initialisierung starten
function init(num){
	var url0 = "";
	var url1 = adapter.config.test1;
	var url2 = adapter.config.test2;
	var url3 = adapter.config.test3;
	var url4 = adapter.config.test4;
	var url5 = adapter.config.test5;
	var url_ = [url0, url1, url2, url3, url4, url5];
	var url  = url_[num];
   
    adapter.subscribeStates('*');
	if ( url != ""){
		request('http://' + url + '/devData.xml', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				parseString(body, {
					explicitArray: false,
					mergeAttrs: true
				},
				function (err, result) {
					if (err) {
						adapter.log.info("Fehler: " + err);
					} else {
						var devname_ = JSON.stringify(result.devD.dev);
						var  devname = devname_.replace(/"/g, '');
						var devip_ = JSON.stringify(result.devD.IP);
						var  devip = devip_.replace(/"/g, '');
						var devdhcp_ = JSON.stringify(result.devD.DHCP);
						var  devdhcp = devdhcp_.replace(/"/g, '');
						var devser_ = JSON.stringify(result.devD.ser);
						var devser = devser_.replace(/"/g, '');
						var devuid_ = JSON.stringify(result.devD.uID);
						var  devuid = devuid_.replace(/"/g, '');
						var devmac_ = JSON.stringify(result.devD.MAC);
						var  devmac = devmac_.replace(/"/g, '');
						var devsec_ = JSON.stringify(result.devD.Security);
						var  devsec = devsec_.replace(/"/g, '');
						var devuser_ = JSON.stringify(result.devD.User);
						var  devuser = devuser_.replace(/"/g, '');
						var devallow_ = JSON.stringify(result.devD.AllowO);
						var  devallow = devallow_.replace(/"/g, '');
						var devsubnet_ = JSON.stringify(result.devD.Subnet);
						var  devsubnet = devsubnet_.replace(/"/g, '');
						var devgateway_ = JSON.stringify(result.devD.Gateway);
						var  devgateway = devgateway_.replace(/"/g, '');
									
						adapter.setObject(num + '.Device.Name', {
							type: 'state',
								common: {
									name: 'Name',
									type: 'string',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.DHCP', {
							type: 'state',
								common: {
									name: 'DHCP',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.Seriennummer', {
							type: 'state',
								common: {
									name: 'Seriennummer',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.uID', {
							type: 'state',
								common: {
									name: 'uID',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.MAC', {
							type: 'state',
								common: {
									name: 'MAC',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.Security', {
							type: 'state',
								common: {
									name: 'Security',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.User', {
							type: 'state',
								common: {
									name: 'User',
									type: 'string',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.AllowO', {
							type: 'state',
								common: {
									name: 'AllowO',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.Subnet', {
							type: 'state',
								common: {
									name: 'Subnet',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.Gateway', {
							type: 'state',
								common: {
									name: 'Gateway',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.IP', {
							type: 'state',
								common: {
									name: 'IP',
									type: 'boolean',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.SensorList', {
							type: 'state',
								common: {
									name: 'SensorList',
									type: 'string',
									role: 'indicator'
								},
							native: {}
						});
						adapter.setObject(num + '.Device.Status', {
							type: 'state',
								common: {
									name: 'Status',
									type: 'string',
									role: 'indicator'
								},
							native: {}
						});
					
						adapter.setState(num + '.Device.Name', devname);
						adapter.setState(num + '.Device.IP', devip);
						adapter.setState(num + '.Device.DHCP', devdhcp);
						adapter.setState(num + '.Device.Seriennummer', devser);
						adapter.setState(num + '.Device.uID', devuid);
						adapter.setState(num + '.Device.MAC', devmac);
						adapter.setState(num + '.Device.Security', devsec);
						adapter.setState(num + '.Device.User', devuser);
						adapter.setState(num + '.Device.AllowO', devallow);
						adapter.setState(num + '.Device.Subnet', devsubnet);
						adapter.setState(num + '.Device.Gateway', devgateway);
						adapter.setState(num + '.Device.Status', "true");
				   
						request('http://' + url + '/sensorList.json', function (error, response, body) {
							if (!error && response.statusCode == 200) {
								adapter.setState(num + '.Device.SensorList', body);
								var list = JSON.parse(body);
								var count = list.sensors.length;
									for ( var i= 0 ; i<count ;i++) {
										if (list.sensors[i].P1 >= 4){
											var mul = 100;
										} else {
											var mul = 1;
										};
										
										adapter.setObject(num + '.States.' + list.sensors[i].ID, {
											type: 'state',
											"unit": list.sensors[i].U,
											common: {
												name: list.sensors[i].ID,
												type: 'state',
												"mul": mul,
												"unit": list.sensors[i].U,
												"min": list.sensors[i].Min,
												"max": list.sensors[i].Max,
												"read": true,
												"write": true,
												"web_id": i,
												"role": 'state'
											},
												native: {}
										});
										adapter.setState(num + '.States.' + list.sensors[i].ID, list.sensors[i].Val);
									};
							} else  {
								adapter.log.info(error);
							};
						});
					}
				});
			} else  {
				adapter.log.info(error);
			}
		});
	};
};

// Anstoß für aktuelle Daten holen (get_data())
function _get_data(){
	
	if(adapter.config.test1 != ""){
		get_data(1);
	};
	if(adapter.config.test2 != ""){
		get_data(2);
	};
	if(adapter.config.test3 != ""){
		get_data(3);
	};
	if(adapter.config.test4 != ""){
		get_data(4);
	};
	if(adapter.config.test5 != ""){
		get_data(5);
	};
};

// Aktuelle Daten holen
function get_data(num){
	var url0 = "";
	var url1 = adapter.config.test1;
	var url2 = adapter.config.test2;
	var url3 = adapter.config.test3;
	var url4 = adapter.config.test4;
	var url5 = adapter.config.test5;
	var url_ = [url0, url1, url2, url3, url4, url5];
	var url  = url_[num];
	
	adapter.getForeignState('pokeys.0.' + num + '.Device.SensorList', function ( err, state){
		var old = state.val;
		request('http://' + url + '/sensorList.json', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				adapter.setState(num + '.Device.Status', "true");
				if ( old != body){
					adapter.setState(num + '.Device.SensorList', body);
					var list = JSON.parse(body);
					var count = list.sensors.length;
					for ( var i= 0 ; i<count ;i++) {
						adapter.setState(num + '.States.' + list.sensors[i].ID, list.sensors[i].Val);
					};
				};
			};
		});
	});
};

// Geänderte Werte an Pokeys übertragen
adapter.on('stateChange', function (id, state) {
    //WEB ID ERMITTELN
	adapter.getForeignObject(id, function (err, obj) {
		var objid = obj._id;
		var idsplit = objid.split(".");
		var pfadip = idsplit[0]+"."+idsplit[1]+"."+idsplit[2]+".Device.IP";
		var nummer = idsplit[2];
		/*var nummer__  = nummer_.split("-");
		var nummer = nummer__[0];
		var usr0 = "";
		var usr1 = adapter.config.user1;
		var usr2 = adapter.config.user2;
		var usr3 = adapter.config.user3;
		var usr4 = adapter.config.user4;
		var usr5 = adapter.config.user5;
		var usr_ = [usr0, usr1, usr2, usr3, usr4, usr5];
		var usr  = usr_[nummer];
		var pass0 = "";
		var pass1 = adapter.config.pass1;
		var pass2 = adapter.config.pass2;
		var pass3 = adapter.config.pass3;
		var pass4 = adapter.config.pass4;
		var pass5 = adapter.config.pass5;
		var pass_ = [pass0, pass1, pass2, pass3, pass4, pass5];
		var pass  = pass_[nummer];
		/adapter.log.info(nummer + " " + usr + " " + pass);*/
		if ( !isNaN(obj.common.web_id) ){
			var _web_id = obj.common.web_id;	
			var multi = obj.common.mul;																																							
			adapter.getForeignState(pfadip, function ( err, state){
				var ip = state.val;
				ip = ip.replace(".0", ".");
				adapter.getForeignState(id, function ( err, state){
					var _state = state.val;
					_state = _state * multi;
					//adapter.log.info(nummer + " " + _state + " " + usr + " " + pass);
					exec('wget -O - -q -t 1 "http://' + ip + '/setS.html?Sensor=' + _web_id + '&State=' + _state + '"');
					//exec('wget -O - -q -t 1 "http://' + ip + '/setS.html?Sensor=' + _web_id + '&State=' + _state + '&u=' + usr + '&p=' + pass + '"');
				});
			});
		};	
	});
});

// Main aufrufen 
function main() {
	init(1);
	init(2);
	init(3);
	init(4);
	init(5);	
	setInterval(_get_data,adapter.config.interval*1000);
}
