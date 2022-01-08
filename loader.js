/* 👉 loader 👈
  
  Signey out/2021
  
  
	Cross-Origin Resource Sharing - https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
			GET /resources/public-data/ HTTP/1.1
			Host: bar.other
			...
			Referer: http://foo.example/examples/
			Origin: http://foo.example

			HTTP/1.1 200 OK
			Access-Control-Allow-Origin: *
*/

window.addEventListener('load',() => {
	//****************************************************
	function deb(a) {
		console.log('loader: '+a);
	}
	//****************************************************
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
		var h = ret(document,'head');
		h.innerHTML = ''; // 👍
		ret(h,'title').innerHTML = app.name;
		domObj({tag:'meta','http-equiv':"Content-Type",content:"text/html; charset=UTF-8",targ:h});
		domObj({tag:'viewport',content:"width=device-width,initial-scale=1,minimal-ui",targ:h});
		if (app.favicon) {
			domObj({tag:'link',rel:"shortcut icon",href:app.favicon,targ:h});
			domObj({tag:'link',rel:"icon",href:app.favicon,targ:h});
		}
		function ap() {
			this.teste = ()=>{
				alert(app.name);
			}
			if (typeof(app.init)=='string') window[app.init](this);
			if (typeof(app.init)=='function') app.init(this);
		}
		new ap();
	}
	//****************************************************
	// carrega 1 js...
	function loadJs(nome,ev) {
		var scr = document.createElement('script');
		scr.src = nome+'.js?ms='+(new Date()).getTime();
		deb('load: '+scr.src);
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
		if (app.pos==app.js.length) {
			end_loader();
		} else {
			loadJs(app.js[app.pos],
				{ 
					  load: nextJs
					,error: () => {
						alert('not found '+app.js[app.pos]);
					}
				}
			);
			app.pos++;
		}
	}
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	//carrega scripts
	var app;
	if ( !window['app'] ) {
		app = {name:'name app'
			,app: false
			,js: ['/js/funcoes']
			,init:()=>{alert('init default app complete');}
			,favicon:false
		};
	} else {
		app = window['app'];
		window['app'] = undefined;
	}

	if (app.app!==true) {
		app.pos = 0;
		nextJs();
	} else {
		loadJs(app.js[app.js.length-1]+'App',{
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
