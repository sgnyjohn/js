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
	var onLogon = [];
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
	//****************************************************
	// mascara do loader para objeto app
	//****************************************************
	// existe a app original q possui urlServer, nas outras seria 
	//		acessório.
	function ap(AppProp) {
		var app = AppProp?AppProp:{};
		if (AppProp) setTimeout(()=>{
			//ultimo js
			var nom = app.name;
			if (!lib.isFunction(window[nom])) nom = AppProp.js[AppProp.js.length-1].substrRat('/');
			if (!lib.isFunction(window[nom])) {
				alert('erro APP: não existe function com nome '+app.nom+' ou '+nom);
				return;
			}
			//cria a app
			try {
				app.obj = new window[nom](this);
			} catch (e) {
				alert('erro criando objeto: new '+nom+'()\n\n'+erro(e));
			}
		});
		//****************************************************
		this.loadOps = function(prf) {
			//lert('loader: '+appProp['urlServer']+'?op=op');
			return new op(prf,urlE(app,'?op=op'));
		}
		//****************************************************
		this.loadTxt = function(url,func) {
			loadTxt(url,func,app);
		}
		//****************************************************
		this.load = function(url,post) {
			load(url,post,app);
		}
		//****************************************************
		this.get = function(ch) {
			return appProp[ch];
		}
		//****************************************************
		this.getApp = function() {
			return appProp;
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
	function loadObj(name,app) {
			//not loaded js, app nova, criar.
			loadJs(jsDir+'/'+name,{load:()=>{
				deb('load: '+name+'.js OK, criar obj ()');
				//armazena app e apos executa
				new ap({name:nome});
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
					onLogon[onLogon.length] = ()=>{loadTxt(url,func)};
					alert('tesesdef='+xhr.responseText+'\n\n'+url);
					loadObj('user');
				} else {
					func(xhr.responseText,xhr.status==200,xhr);
				}
			}
		}
		xhr.open("GET", urlE(app,url), true);
		xhr.send(null);
	}
	//*******************************
	// load e process reply from server
	function load(Url,postString,app) {
		var u = urlE(app,Url);
		if (u.indexOf('undefined')!=-1) {
			deb('name='+name+' u='+u+' '+aProp,aProp);
		}
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (a,b,tx) => {
			deb('load ret url='+u+'\nresp(a='+a+' b='+b+')=\n'+tx);
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				//application/json
				var mime = xhr.getResponseHeader('Content-Type');
				//if (url=='json') { objNav(xhr);alert(xhr+' '+mime);}
				_c('='+mime+'=');
				if (equals(mime,'application/json')) {
					_c(xhr.responseText);
					alert(xhr.responseText);
					var r = JSON.parse(xhr.responseText);
					objNav(r);
					alert(r.computedString);				
				}
				//receive response from server
				a = xhr.readyState;
				tx = trimm(xhr.responseText);
				var x = ms();
				var d = document.createElement('div');
				//objNav(a);
				//lert('loadY: '+url+' a='+a+' b='+b+' tx='+tx);
				d.innerHTML = tx;
				deb('loadY: '+d.childNodes.length+'\n html: '+(d.innerHTML));
				//lert(d.innerHTML);
				for (var i=0;i<d.childNodes.length;i++) {
					var ob = d.childNodes.item(i)
					var h = ob.innerHTML;
					var o = ob.className;
					deb('load:Receive: '+i+' tg='+ob.tagName+' tg='+ob.outerHTML);
					if (o) {
						if (o=='loader') {
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
						} else if (o=='compil') {
							var m = 'compil: '+ob.textContent;
							_c(m);
							if (dev()) alert(m);
						} else if (typeof(app.obj[o])=='function') {
							app.obj[o](h);
							//tem op default e aceitou
						} else {
							alert('CLASS RESP '+i+'/'+d.childNodes.length
								+' server desconhecido('+ob.outerHTML+')'
								+' app='+app.name
								+' appo='+app.obj[o]
							);
						}
					} else if (typeof(h)!='string') {
					} else {
						alert('RESP server desconhecido: \n\n'+ob.outerHTML);
					}
				}
			}
		}
		//send request to server
		if (postString) {
			deb('POST url='+u+' post='+postString);
			xhr.open('POST', u, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(postString);
		} else {
			deb('GET url='+u);
			xhr.open("GET", u, true);
			xhr.send(null);
		}
	}
	//****************************************************
	function urlE(app,u) {
		var s = app.urlServer?app.urlServer:appProp.urlServer;
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
		oApp = new ap(appProp);
	}
	//****************************************************
	// carrega 1 js...
	function loadJs(nome,ev) {
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
