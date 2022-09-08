/* 👉 loader 👈
  
  Signey out/2021
  Signey fev/2022 logon
  * 
  * loader app já prevendo mobile
  * 
  * o loader controla todas as respostas e passará para a classe js 
  * 	- user logado
  * 	- person VS user: user is person logged.
  *  
  
*/

window.addEventListener('load',() => {
	var jsDir = '/js';
	//vetor apps: classe servidor pode criar novas apps na win
	//  através de tag com class=loader sendo que o 
	//	.textContent='user logon'
	// 	indicara nome objeto (user, ...) e argumento. Caso APP nome não 
	//	exista sera carregado js /js/'nome'.js.
	var apps = {}; 
	var jsVet = {}; //js carregados
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
	// load e process reply from server
	function load(url,postString,aProp) {
		if (!aProp) aProp= appProp;
		//lert('usrv='+appProp.urlServer);
		var u = aProp.urlServer+'?'+url+(url.indexOf('&')==-1?'&':'');
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (a,b,tx) => {
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
						if (op[o]) {
							op[o](ob);
						} else if (o=='loader') {
							// o objeto deve ser tratado pelo LOADER, tipo logon.
							// alert(ob.outerHTML);
							var nome = leftAt(ob.textContent,' ');
							var func = trimm(substrAt(ob.textContent+' ',' '));
							if (apps[nome]) {
								//executa 
								exec(nome,func);
							} else {
								//not loaded js, app nova, criar.
								loadJs(jsDir+'/'+nome,{load:()=>{
									deb('load: '+nome+'.js OK, criar obj ('+func+')');
									//armazena app e apos executa
									apps[nome] = new window[nome]();
									exec(nome,'init',func);
								}});
							}
							//windows.init();
						} else if (o=='compil') {
							var m = 'compil: '+ob.textContent;
							_c(m);
							if (dev()) alert(m);
						} else if (op['']&&op[''](ob)) {
							//tem op default e aceitou
						} else {
							alert('CLASS RESP '+i+'/'+d.childNodes.length
								+' server desconhecido('+ob.outerHTML+')'
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
	function deb(a) {
		console.log('loader: '+a);
	}
	//****************************************************
	// carregou todos os JS, monta html e INIT app
	function end_loader() {
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
		//acerta html: head,title,meta,....
		var h = ret(document,'head');
		//deb('head='+h.innerHTML);
		//h.innerHTML = ''; // 👍
		ret(h,'title').innerHTML = appProp.name;
		domObj({tag:'meta','http-equiv':"Content-Type",content:"text/html; charset=UTF-8",targ:h});
		domObj({tag:'viewport',content:"width=device-width,initial-scale=1,minimal-ui",targ:h});
		if (appProp.favicon) {
			domObj({tag:'link',rel:"shortcut icon",href:appProp.favicon,targ:h});
			domObj({tag:'link',rel:"icon",href:appProp.favicon,targ:h});
		}
		//****************************************************
		//****************************************************
		function ap() {
			//****************************************************
			this.load = function(url,post,App) {
				load(url,post,App);
			}
			//****************************************************
			this.getApp = function() {
				return appProp;
			}
			this.teste = ()=>{
				alert(appProp.name);
			}
			if (typeof(appProp.init)=='string') {
				x=1;
				window[appProp.init](this);
			} else if (typeof(appProp.init)=='function')
			 appProp.init(this);
			else {
				alert('init não def');
			}
		}
		new ap();
	}
	//****************************************************
	// carrega 1 js...
	function loadJs(nome,ev) {
		var t = (new Date()).getTime();
		if (jsVet[nome]) {
			deb('loadJs: já carregado: '+nome
				+' miliSegs: '+format(t-jsVet[nome])
			);
			return;
		}
		jsVet[nome] = t;
		var scr = document.createElement('script');
		scr.src = nome+'.js?ms='+(new Date()).getTime();
		deb('loadJs: ('+nome+')');
		document.body.appendChild(scr);
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
			loadJs(appProp.js[appProp.pos],
				{ 
					  load: nextJs
					,error: () => {
						alert('not found '+appProp.js[appProp.pos]);
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

	//carrega unico JS stripado ?
	if (appProp.app!==true) {
		appProp.pos = 0;
		nextJs();
	} else {
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
