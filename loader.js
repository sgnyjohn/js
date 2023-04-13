/* 👉 loader 👈
  
  Signey out/2021
  Signey fev/2022 logon
  * 
  * loader app já prevendo mobile
  * 	- melhor mexer apenas no CSS ?
  * 
  * o loader controla todas as respostas e passará para a classe js 
  * 	- user logado
  * 	- person VS user: user is person logged.
  * 	- index em html ou srv: html permite carga codigo sem logon
  * 	- logon cookie multiplo (divisão de ABA em multi logons).
  *  
  
*/

window.addEventListener('load',() => {
	var jsDir = '/js';
	var head; 
	//vetor apps: classe servidor pode criar novas apps na win
	//  através de tag com class=loader sendo que o 
	//	.textContent='user logon'
	// 	indicara nome objeto (user, ...) e argumento. Caso APP nome não 
	//	exista sera carregado js /js/'nome'.js.
	// a app inicial fica armazenada em appProp
	var apps = {};
	var jsVet = {}; //js carregados
	var onLogonA = [];
	function dev() {
		return (''+window.location).indexOf('://dv.')!=-1;
	}
	function ret(o,t) {
		var a = o.getElementsByTagName(t);
		if (a.length==0) {
			deb('create element '+t+' em '+o);
			var r = domObj({tag:t,targ:o});
		} else {
			r = a[0];
		}
		return r;
	}

	function onLogon(func,obj,param) {
		if (typeof(func)=='function') {
			onLogonA[onLogonA.length] = [func,obj,param];
			return true;
		}
		//lert('onlogon: '+onLogon.length);
		aeval(onLogonA,(f,i)=>{
			//lert(i+' '+f);
			//setTimeout(()=>{});
			f[0].apply(f[1],f[2]);
		});
		onLogonA = [];
		//return new op(prf,urlE(app,'?op=op'));
	}

	//****************************************************
	// mascara do loader para objeto app
	//****************************************************
	// existe a app original q possui urlServer, nas outras seria 
	//		acessório.
	function ap(AppProp) {
		var eu = this;
		var appPr = AppProp?AppProp:{};
		//if (AppProp) setTimeout(()=>{
			//ultimo js
			var nom = appPr.name;
			if (!Lib.isFunction(window[nom])) nom = appPr.js[appPr.js.length-1].substrRat('/');
			if (!Lib.isFunction(window[nom])) {
				alert('erro APP: não existe function com nome '+appPr.name+' ou '+nom);
				return;
			}
			//cria a app REAL
			try {
				this.obj = new window[nom](this);
				//appPr.obj = this.obj;
				apps[nom] = this.obj;
				
				// exige user ?
				initApp();

			} catch (e) {
				alert('erro criando objeto: new '+nom+'()\n\n'+erro(e));
			}
		//});
		//****************************************************
		this.loadJs = function(url,objOUfunc) {
			loadJs(url,objOUfunc);
		}
		//****************************************************
		this.getUserName = function() {
			if (apps['user']) {
				return apps['user'].getUserName();
			}
		}
		//****************************************************
		this.loadObj = function(nome,func) {
			//lert('loader: '+appProp['urlServer']+'?op=op');
			loadObj(nome,func);
		}
		//****************************************************
		this.onLogon = function(func,obj,param) {
			onLogon(func,obj,param);
		}
		//****************************************************
		this.opsLoad = function(func) {
			var u = apps['user'];
			//lert('loader: '+appProp['urlServer']+'?op=op user='+u);
			if (!u) return false;
			return apps['user'].getObjOps(appPr.name,urlE(appPr,'?op=op'),func);
			//return new op(prf,urlE(app,'?op=op'),this);
		}
		//****************************************************
		this.loadTxt = function(url,func) {
			loadTxt(url,func,appPr);
		}
		//****************************************************
		this.load = function(url,post) {
			load(url,post,appPr);
		}
		//****************************************************
		this.get = function(ch) {
			return appPr[ch];
		}
		//****************************************************
		this.getApp = function() {
			return appPr;
		}
		//load user and op
		function init() {
			if (appPr.init) eu.obj[appPr.init]();
		}
		function initApp() {
			if (!appPr.user) {
				init();
				return;
			}
			var us = apps['user'];
			if (!us) {
				loadObj('user');
			} else if (us.logged()) {
				init();
				return;
			}
			//logado, init app ou carrga op e init opp
			onLogon(()=>{
				if (oApp.obj.setOps!==false) {
					//carrega ops
					//lert('vai carregar ops...');
					oApp.opsLoad(oApp.obj[appPr.init]);
				} else {
					init();
				}
			}
			,apps['user'],[]);
		}
	}

	//*******************************
	// exec method de app
	function exec(nomeApp,func) {
		if (vazio(func)) return;
		var m = apps[nomeApp][func];
		if (typeof(m)=='function') {
			m();
		} else {
			var obj=func;
			try {
				eval(func);
			} catch (e) {
				alert('APP '+nomeApp+' not func and eval error expr ('+func+')\n\n'+erro(e));
			}
		}
	}
	//*******************************
	// carrega class user, ou outra com nome
	function loadObj(name,func) {
			//not loaded js, app nova, criar.
			loadJs(jsDir+'/'+name,{load:()=>{
				deb('load: '+name+'.js OK, criar obj ()');
				//armazena app e apos executa
				new ap({name:name});
				//ebJ('loadObj '+name+' func='+func);
				if (func) {
					//alert('func pos logon');
					func();
				}
			}});
	}
	//*******************************
	// load e chama func informada
	function loadTxt(url,func,app) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (a,b,tx) => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (trimm(xhr.responseText)=='-*_login_*-') {
					//guarda reload para após executar login
					onLogon(loadTxt,this,[url,func,app]);
					//lert(app.name+' tesesdef='+xhr.responseText+'\n\n'+url);
					loadObj('user');
				} else {
					func(xhr.responseText,xhr.status==200,xhr);
				}
			}
		}
		//se ? executa classe servidor
		xhr.open("GET", url.charAt(0)=='?' ? urlE(app,url) : url , true);
		xhr.send(null);
	}
	//*******************************
	function loadExecDivLoader(ob) {
		// opcao loader permite q um objeto carregue outro.
		// o objeto deve ser tratado pelo LOADER, tipo logon.
		// para isto o loader precisa de lista de classes/objetos
		var name = leftAt(ob.textContent,' ');
		var func = trimm(substrAt(ob.textContent+' ',' '));
		deb('obj '+app.name+' envia pacote para app '+name);
		if (apps[name]) {
			//executa 
			exec(name,func);
		} else {
			//not loaded js, app nova, criar.
			loadJs(jsDir+'/'+name,{load:()=>{
				deb('load: '+name+'.js OK, criar obj ('+func+')');
				//armazena app e apos executa
				new ap({name:name});
				//exec(nome,'init',func);
			}});
		}
		//windows.init();
	}
	//*******************************
	function loadExecDiv(ob) {
		var h = ob.innerHTML;
		var o = ob.className;
		if (!o) {
			if (typeof(h)!='string') {
				//lixo na resposta...
				return true;
			} else {
				alert('RESP server desconhecido: \n\n'+ob.outerHTML);
			}
		} else if (o=='loader') {
			return loadExecDivLoader(ob);
		} else if (o=='compil') {
			var m = 'compil: '+ob.textContent;
			_c(m);
			if (dev()) alert(m);
			return true;
		} else {
			//procura em todas apps.
			for (k in apps) {
				var a = apps[k];
				if (typeof(a[o])=='function') {
					a[o](h);
					return true
				}
				//lert('procurando metodo... '+k+'.'+o+'='+typeof(a[o]));
			}
		}
		return false;
	}
	//*******************************
	// load e process reply from server
	function load(Url,postString,app) {
		//debJ('loader.load post='+postString);
		var u = urlE(app,Url);
		if (u.indexOf('undefined')!=-1) {
			//deb('name='+name+' u='+u+' '+aProp,aProp);
			deb('name='+name+' u='+u+' Url='+Url);
		}
		deb('pedido url='+Url+' postString='+postString);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (a,b,tx) => {
			//deb('load ret url='+u+'\nresp(a='+a+' b='+b+')=\n'+tx);
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				//application/json
				var mime = xhr.getResponseHeader('Content-Type');
				_c('='+mime+'=');
				if (equals(mime,'application/json')) {
					_c(xhr.responseText);
					alert('dsfsduif='+xhr.responseText);
					var r = JSON.parse(xhr.responseText);
					objNav(r);
					alert('cxvxcvli='+r.computedString);				
				}
				//receive response from server
				a = xhr.readyState;
				tx = trimm(xhr.responseText);
				var x = ms();
				var d = document.createElement('div');
				d.innerHTML = tx;
				for (var i=0;i<d.childNodes.length;i++) {
					var ob = d.childNodes.item(i);
					if (false) deb('load:Receive: '+i+'/'+(d.childNodes.length-1)
						+' tg='+ob.tagName+' tg='+ob.outerHTML
					);
					if (!loadExecDiv(ob)) {
						alert('CLASS RESP '+i+'/'+d.childNodes.length
							+' server desconhecido('+ob.outerHTML+')'
						);
					}
				}
			}
		}
		//send request to server
		if (postString) {
			debJ('POST url='+u+' post='+postString.length+'='+postString);//+' '+erro('carga errada'));
			xhr.open('POST', u, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(postString);
		} else {
			debJ('GET url='+u);
			xhr.open("GET", u, true);
			xhr.send(null);
		}
	}
	//****************************************************
	function urlE(app,u) {
		var s = app.urlServer?app.urlServer:appProp.urlServer;
		//eb('urlE: '+s);
		return s+u;
	}
	//****************************************************
	function deb(tx,obj) {
		if ( window.deb ) {
			window.deb(tx,obj);
		} else {
			console.log('loader: '+tx
				+(arguments.length>2?'\n===>'+obj:'')
			);
		}
	}
	//****************************************************
	// carregou todos os JS, monta html e INIT app
	function end_loader() {
		//eb('head='+h.innerHTML);
		//h.innerHTML = ''; // 👍
		ret(head,'title').innerHTML = (appProp.title?appProp.title:appProp.name);
		domObj({tag:'meta','http-equiv':"Content-Type",content:"text/html; charset=UTF-8",targ:head});
		// problema q objetos não são reajustados ? zoom apenas fonte ?
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag
		//omObj({tag:'viewport',content:"width=device-width,initial-scale=1,user-scalable",targ:h});
		if (appProp.favicon) {
			domObj({tag:'link',rel:"shortcut icon",href:appProp.favicon,targ:head});
			domObj({tag:'link',rel:"icon",href:appProp.favicon,targ:head});
		}
		if (appProp.css) {
			appProp.css = (typeof(appProp.css)=='object'&&appProp.css.length?appProp.css:[appProp.css]);
			aeval(appProp.css,(cs)=>{
				domObj({tag:'link',targ:head,rel:'StyleSheet',href:cs+'?ms='+ms()});
			});
		}
		try {
			oApp = new ap(appProp);
		} catch (e) {
			alert('erro init app '+objText(appProp)+'\n\n'+erro(e));
		}
	}
	//****************************************************
	// carrega 1 js...
	function loadJs(nome,ev) {
		if (typeof(ev)=='function') {
			ev = ['load',ev];
		}
		if (nome.indexOf('.')==-1) nome += '.js';
		var t = (new Date()).getTime();
		if (jsVet[nome]) {
			deb('loadJs: já carregado: '+nome
				+' miliSegs: '+format(t-jsVet[nome])
			);
			return;
		}
		jsVet[nome] = t;
		var scr = document.createElement('script');
		scr.src = nome+'?ms='+(new Date()).getTime();
		deb('loadJs: ('+nome+')');
		head.appendChild(scr);
		//add eventos
		for (i in ev) {
			scr.addEventListener(i,ev[i]);
		}	
	}
	//****************************************************
	// carrega o próximo js
	function nextJs() {
		//lert('pos='+pos+' '+mod[pos]);
		if (appProp.pos==appProp.js.length) {
			end_loader();
		} else {
			var js = appProp.js[appProp.pos];
			loadJs(js,
				{ 
					  load: nextJs
					,error: () => {
						alert('js not found '+js);
					}
				}
			);
			appProp.pos++;
		}
	}
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	//carrega scripts
	var appProp;
	if ( !window['appProp'] ) {
		appProp = {name:'name app'
			,app: false
			,js: [jsDir+'/funcoes']
			,init:()=>{alert('init default app complete');}
			,favicon:false
		};
	} else {
		appProp = window['appProp'];
		//window['app'] = undefined;
	}
	
	//validar propiedades basicas
	//  FALTA
	head = ret(document,'head');

	
	//carrega unico JS stripado ?
	appProp.pos = 0;
	if (appProp.app!==true) {
		nextJs();
	} else {
		alert('carregar app');
		loadJs(appProp.js[appProp.js.length-1]+'App',{
			error: (a,b,c)=>{
				//processa fila
				nextJs();
			}
			,load: (a,b,c)=>{
				//js único, o arq App possui todos os modulos
				end_loader();
			}
		});	
	}
	
});


		/* ajax

  
	Cross-Origin Resource Sharing - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
			GET /resources/public-data/ HTTP/1.1
			Host: bar.other
			...
			Referer: http://foo.example/examples/
			Origin: http://foo.example

			HTTP/1.1 200 OK
			Access-Control-Allow-Origin: *

		JSON.stringify(this.submittedData)
		*
		HTTP/1.1 200 OK
		Content-Type: application/json
		Content-Length: 19
		{"success":"true"}
		* 
		function alertContents() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					alert(response.computedString);
				} else {
					alert('There was a problem with the request.');
				}
			}
		}
		*/
