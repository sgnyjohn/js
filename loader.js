/* 👉 loader 👈
	https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS
*/

window.addEventListener('load',() => {
	
	if ( !window['app'] ) {
		var app = {name:'name app'
			,app: false
			,js: ['/js/funcoes']
			,init:()=>{alert('init default app complete');}
			,favicon:false
		};
		window['app'] = app;
	} else {
		var app = window['app'];
		window['app'] = undefined;
	}
	
	function fim() {
		function ret(o,t) {
			var a = o.getElementsByTagName(t);
			if (a.length==0) {
				console.log('create element '+t+' em '+o);
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
		if (typeof(app.init)=='string') window[app.init]();
		if (typeof(app.init)=='function') app.init();
	}
	function loadJs(nome,ev) {
		var scr = document.createElement('script');
		scr.src = nome+'.js?ms='+(new Date()).getTime();
		console.log('load: '+scr.src);
		document.body.appendChild(scr);
		//add eventos
		for (i in ev) {
			scr.addEventListener(i,ev[i]);
		}	
	}
	function proxFila() {
		//lert('pos='+pos+' '+mod[pos]);
		if (app.pos==app.js.length) {
			fim();
		} else {
			loadJs(app.js[app.pos],
				{ 
					  load: proxFila
					,error: () => {
						alert('not found '+app.js[app.pos]);
					}
				}
			);
			app.pos++;
		}
	}
	//carrega scripts
	if (app.app!==true) {
		app.pos = 0;
		proxFila();
	} else {
		loadJs(app.js[app.js.length-1]+'App',{
			error: (a,b,c)=>{
				//processa fila
				proxFila();
			}
			,load: (a,b,c)=>{
				//js único, o arq App possui todos os modulos
				fim();
			}
		});	
	}
});
