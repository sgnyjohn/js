/*
 * Signey John ago/2020 
 * dez/2020 - novo
 * 
 * - estat tempo de leitura: clicou ficou lendo, voltou
 * - link q repete, mesclar no bd.
 * 
 */

var jorn = new (function() {
	var eu = this;
	var ped = new pedido();
	var b1,b2,dv,wa,ds,qu,dias,runn,list;
	var nDias = 1*cookieGet('dias');
	var oj = {},vj;
	var dDia = 24*60*60*1000;
	var bd = new bancoDados('news');
	//dad add
	function show() {
		//di	df	nv	niv	pos	url	tx
		ds.innerHTML = '';
		//condição
		var cdc = new strPesq(qu.value);
		var txVazio = vazio(qu.value);
		var dti = ms()-1*nDias*dDia;
		//lert(txVazio+' '+dti);
		var Cond = x => {
			return bd.getNum('di')>dti
				&& oj.sel(bd.get('jor'))
				&& ( txVazio || cdc.pesq(bd.get('tx')+bd.get('url')) )
			;
		};
		//var Cond = ()=>{return true;};
		//conteúdo
		var qb = '',tlist=0;
		var mostra = x => {
			tlist++;if (tlist%100==0) list.innerHTML = format(tlist);
			var dt = dataSql(bd.getNum('di')).substring(0,16);
			if (dt!=qb) {
				qb = dt;
				domObj({tag:'p',class:'qb',targ:ds,'':dt});
			}
			//"<p class=list><b>"+apelido(n)+"</b> "+(a.df-a.di)/1000/60/60+"hs</p>"
			domObj({tag:'p'
				,class:'list'
				,'':'<b>'+oj.getJor(bd.getNum('jor')).nome+'</b> '
					+'<span title="tempo na capa">'+(bd.getNum('di')-bd.getNum('di'))/3600000+'hs</span>'
				,targ:ds
			});
			domObj({tag:'span'
				,class:'url'
				,title:bd.get('url')
				,'':troca(trimm(bd.get('tx'),'~'),'~~','<br>')
				,targ:domObj({tag:'div',class:'list',targ:ds,'':'◦ '})
			});
			
		}
		//ordena
		if (bd.count()==0) {
			alert('no data');
			return;
		}
		bd.sort('di desc,jor');
		bd.eval({cond:Cond,func:mostra});
		list.innerHTML = format(tlist);

		//lert('fim show');

	}
	//clicou em uma url ?
	function click(ev) {
		if (ev.ctrlKey) {
			return;
		} else if (event.type=='mousedown') {
			mouset = ms();
			return;
		}
		if (ms()-mouset>250) {
			return;
		}
		if (ev.button!=0) {
			return;
		}
		
		//bjNav(ev);alert(event.type);
		var ob = getParentByClassName(targetEvent(ev),'url');
		if (!ob) return;
		abre(ob);
	}
	// abre url do DOM - e grava estat
	// op - 1 - não - grava estat de matérias para não mostrar
	function abre(ob,op) {
		var url=(op?'-':'')+ob.getAttribute('title');
		var tx = troca(ob.innerHTML.substring(2),'<br>','~');
		//grava estatistica
		var c = new carregaUrl();
		c.abre('?op=urlOpen&url='+encodeURIComponent(url)
			+'&tx='+encodeURIComponent(tx)
		,function(a,b,tx){});
		if (!op) {
			window.open(url,'_blank');
		}
	}	
	//resize
	function resize() {
		//objNav(window);
		var mg = 7;
		var w = browse.getTX(document.body);
		//if (wa==w) return;
		wa = w;
		//lert(browse.getY(dv)+" resize ") ;
		var tx = (w-(browse.getTX(b1)+mg*2)*2)*1;
		setCss(dv,'width',tx+'px');
		setCss(dv,'left',(w-tx)/2+'px');
		setCss(b1,'top',0);setCss(b1,'left',0);setCss(b1,'margin',mg+'px');
		setCss(b1,'top',(browse.getY(dv)+(browse.getTY(dv)-browse.getTY(b1))/2)+'px');
		setCss(ds,'margin-top',(1*browse.getY(dv)+browse.getTY(dv)+mg*4)+'px');
		//alert(w+' resize='+ds.style.cssText
		//	+'Y='+browse.getY(dv)+' TY='+browse.getTY(dv)
		//);
	}
	//botão menu - chamado pelo HTML
	this.menu = function() {
		window.title = 'noticias novo';
		window.addEventListener('resize',resize);
		//lert('mre');
		document.body.innerHTML = '';
		browse.setBodyClassDevice();
		b1 = domObj({tag:'a'
			,class:'botFloat1 botMenu'
			,'':'<span></span><span></span><span></span>'
			,targ:document.body
			,ev_click: function(ev) {
				//lert('ev='+ev);
				var od = getParentByTagName(ev.target,'a');
				od.innerHTML = 'X';
				var a = '<span></span><span></span><span></span>';
				setTimeout(function(){od.innerHTML = a;},2000);
			}	
			,ev_mouseover:function(ev){setClass(ev.target,'gira');}
			,ev_mouseout: function(ev){delClass(ev.target,'gira');}
		});
		b2 = domObj({tag:'a'
			,class:'botFloat1 botTop'
			,'': '<i></i>'
			,title:'topo da página'
			,targ:document.body
			,ev_click:function(){window.scrollTo(0,0);}
		});
		dv = domObj({tag:'div'
			,class:'pesq'
			,'':'🔎 '
			,targ:document.body
		});
		qu = domObj({tag:'input'
			,class:'q'
			,name:'q'
			,value:cookieGet('palavra','')
			,targ:dv
			,ev_change:ev=>{cookiePut('palavra',ev.target.value);show();}
		});
		domObj({tag:'span','':' dias:',targ:dv});
		dias = domObj({tag:'input'
			,class:'dias',size:4
			,name:'dias'
			,value:cookieGet('dias','')
			,targ:dv
			,ev_change:ev=>{nDias = calcRpn(ev.target.value);
				ev.target.value = nDias;
				if (nDias<1) nDias=14;
				if (cookiePut('dias',nDias)) {
					oj.dados();
				}
			}
		});
		runn = domObj({tag:'span',title:'dados arquivos tempo registros',class:'runn',targ:dv});
		list = domObj({tag:'span',title:'listados',class:'runn',targ:dv});
		ds = domObj({tag:'div'
			,class:'dest'
			,targ:document.body
		});
		for (var i=0;i<50;i++) {
			domObj({tag:'p'
				,'': 'teste '+i+' w='+browse.getTX(document.body)
				,targ:ds
			});
		}
		//obj lista jor
		oj = new (function(){
			var ojv = [];
			var mJor;
			var sel = cookieGet('jor');
			var msClick;
			var dad = {};
			var dadL = {n:-1};
			//jor selecionado
			this.sel = function(cdJor) {
				return sel.indexOf('~'+cdJor+'~')!=-1;
			}
			//getJor
			this.getJor = n => {
				return ojv[n];
			}
			//serial process data
			function dadosProc() {
				for (url in dad) {
					var dd = dad[url];
					if (!dd.proc && dd.fim!=0) {
						if (vazio(dd.tx)) {
							/*alert('não carregado '+url
								+' ini='+dd.ini+' fim='+dd.fim
								+' res='+dd.res+' tx='+dd.tx.length
								+' status='+dd.status+' '+dd.statusText
							);
							*/
							dadL.er++;
							dd.proc = true;
						} else {
							dd.proc = true;
							dadL.p++;
							bd.addTxt(dd.tx,{
								//add vlr
								onAddReg:x => {bd.set('jor',dd.jor);}

							});
							dd.tx = '';
							//lert(url+' ok '+dd.tx.length);
						}
					}
				}
				dadL.np++;
				runn.innerHTML = dadL.p+'/'+dadL.n
					+(dadL.er!=0?'<span class=er>er'+dadL.er+'</span>':'')
					+' '+format((ms()-dadL.ini)/1000,0)+'s'
					+' '+format(bd.count())
				;
				//repeat until end or timeout: 30s
				if (dadL.np<300 && dadL.n-dadL.p-dadL.er>0) {
					setTimeout(dadosProc,100);
				} else {
					if (dadL.n-dadL.p-dadL.er!=0) alert(dadL.n-dadL.p-dadL.er+'fim\nped:'
						+dadL.n+' \nproc:'+dadL.p+'\ner:'+dadL.p
						+'\n\n'+(ms()-dadL.ini)/1000+'s'
					);
					dadL.n=-1;
					// end serial process
					show();
				}
			}
			//paralel load data
			this.dados = dados;
			function dados() {
				if (dadL.n!=-1) return;
				dadL.n=0;dadL.np=0;dadL.p=0;dadL.er=0;dadL.ini=ms();
				//carrega outros dias
				var dd = nDias;
				runn.innerHTML = '...';
				for (var d=0;d<dd;d++) {
					var dt = ''+leftAt(dataSql(new Date(ms()-d*24*3600000)),' ');
					aeval(trimm(sel,'~').split('~'), i => {
						//lert(i+' '+typeof(dt));
						var u = '?op=bx&aq='+dt.substring(0,7)
							+'/'+dt.substring(8,10)
							+'-'+ojv[1*i].host
							+'.csv'
							//+'&cjor='+i
						;
						if (!dad[u]) {
							dadL.n++;
							dad[u] = {ini:ms(),fim:0,tx:'?',proc:false,jor:i};
							(new carregaUrl()).abre(u,(a,b,tx) => {
								var dd = dad[u];
								if (dd.fim!=0) {
									alert('dados: ped url dupla='+u);
								} else if (tx.length==0) {
									//lert('dados: vazio '+u+' '+objA(b));
								}
								if (true || a==4) { 
									dd.tx = tx;
									dd.res = a;
									dd.cod = b.httpReq.readyState+' '+b.httpReq.status;
									dd.codTx = b.httpReq.statusText;
									dd.fim = ms();
								}
							});
						}
					});
				}
				runn.innerHTML = '.';
				setTimeout(dadosProc,100);
			}
			//atualiz text
			function atText() {
				var t = '';
				aeval(vj,function(v){
					var a = v.getAttribute('id');
					if (sel.indexOf('~'+a+'~')!=-1) {
						t += ' | <span>'+v.firstChild.textContent+'</span>';
						//t += ' | '+v.firstChild.textContent;
					}
				});
				pj.innerHTML = t==''?'?':t.substring(2);
				//pj.innerHTML = t;
				
			}
			//atualiz menu
			function atMenu(o) {
				if (!o) {
					var t = '';
					aeval(ojv,function(v,i){
						atMenu(vj[i]);
					});
					atText();
					return;
				}
				var a = o.getAttribute('id');
				if (sel.indexOf('~'+a+'~')!=-1) {
					setCss(o,'color','#ffffff');
					setCss(o,'background-color','#000000');
				} else {
					setCss(o,'color','#000000');
					setCss(o,'background-color','none');
				}
				atText();					
			}
			//init
			(new carregaUrl()).abre('?op=bx&aq=jornais.lst', (a,b,tx) => {
				var t = '';
				var t1 = '';
				aeval(tx.split('\n'),function(v,i){
					if (!vazio(v)&&v.charAt(0)!='#') {
						var o = {};
						var v = v.split('\t');
						o.url=v[0];
						o.bx=v[1];
						o.host = leftAt(substrAt(o.url,'://'),'/');
						o.nome=v.length<3||vazio(v[2])
							?troca(troca(o.host,["www.","www1.",".com.br",".com"],''),'.',' ')
							:v[2]
						;
						o.nomeS = o.nome;while (o.nomeS.length<11) {o.nomeS="~"+o.nomeS+'~'};
						t += '<span id='+ojv.length+'>'
							+troca(o.nomeS,'~','&nbsp;')
							+'</span> '
						;
						t1 += '<tr id='+ojv.length+'><td title="'+o.url+'">'+o.nome+'<td title="only"><td title="all-">';
						ojv[ojv.length] = o;
					}
				});
				var d = domObj({tag:'div',class:'jor'
					,'':'salvar<input type=text><input type=button>'
					,targ:document.body
					,ev_click: ev => {
						if (ev.target.tagName != 'TD') {
							jor10();
							return;
						}
						var o = getParentByTagName(ev.target,'tr');
						var p = domPos(ev.target);
						var a = o.getAttribute('id');
						//lert('td '+a+' '+p);
						if (p==1) {
							sel = '~'+a+'~';
							atMenu();
							return;
						} else if (p==2) {
							sel = '~';
							aeval(ojv, (v,i) => {
								if (i!=1*a) sel += i+'~';
							});
							atMenu();
							return;
						} else if (sel.indexOf('~'+a+'~')==-1) {
							sel += a+'~';
						} else {
							sel = troca(sel,'~'+a+'~','~');
						}						
						atMenu(o);
					}
				});
				mJor = new contextDiv(d,{f:d});
				vj = domObj({tag:'table'
					,targ:domObj({tag:'div',targ:d})
					,class:'jor'
					,'':t1
				}).querySelectorAll('tr');
				//mostra e esconde menu jornais
				var selO = sel;
				var jor10 = ev => {
					//lert(mJor.visible+' sel='+sel+' a='+selO);
					if (mJor.visible) {
						mJor.hide();
						if (selO!=sel) {
							alert('fechar sel dif');
							cookiePut('jor',sel);
							setTimeout(resize,1000);
							alert('fechar sel dif1');
							oj.dados();
							selO = sel;
						}
					} else {
						selO = sel;
						mJor.center();
					}
				}
				pj = domObj({tag:'p'
					,class:'jor'
					,'':t
					,targ:dv
					,ev_click: jor10
				});
				//finaliza load lista jornais
				atMenu();		
				setTimeout(resize,100);
				setTimeout(dados,200);
				document.body.addEventListener('mouseup',click);
				document.body.addEventListener('mousedown',click);				
			});
		});

	}
})();



var jor = new (function() {
	var eu = this;
	var ped = new pedido();
	var tma;
	var mouset;
	var jor;
	var menu,menuUrl;

	//botao direito
	function context(ev) {
		var v = getSelectionText();
		if (!vazio(v)) {
			return;
		} 		//bjNav(ev);alert(event.type);
		menuUrl = getParentByClassName(targetEvent(ev),'url');
		if (!menuUrl) return;

		ev.preventDefault();
		//ev.stopPropagation();
		//ev.preventDefault();
		//objNav(ev);alert(ev);
		if (menu.visible) {
			menu.hide();
		} else {
			menu.show(ev);
		}
		return;
	}
	//clicou menu
	function menuClick(ev) {
		var o = trimm(ev.target.innerHTML);
		//lert('('+o+')');
		if (o=='Abre') {
			abre(menuUrl);
		} else if (o=='Sim') {
		} else if (o=='Não') {
			abre(menuUrl,true);
		}
		menu.hide();
	}
	//clicou em uma url ?
	function click(ev) {
		if (ev.ctrlKey) {
			return;
		} else if (event.type=='mousedown') {
			mouset = ms();
			return;
		}
		if (ms()-mouset>250) {
			return;
		}
		if (ev.button!=0) {
			return;
		}
		
		//bjNav(ev);alert(event.type);
		var ob = getParentByClassName(targetEvent(ev),'url');
		if (!ob) return;
		abre(ob);
	}
	// abre url do DOM - e grava estat
	// op - 1 - não - grava estat de matérias para não mostrar
	function abre(ob,op) {
		var url=(op?'-':'')+ob.getAttribute('title');
		var tx = troca(ob.innerHTML.substring(2),'<br>','~');
		//grava estatistica
		var c = new carregaUrl();
		c.abre('?op=urlOpen&url='+encodeURIComponent(url)
			+'&tx='+encodeURIComponent(tx)
		,function(a,b,tx){});
		if (!op) {
			window.open(url,'_blank');
		}
	}
	this.font = function(ob) {
		var ts = 'font-size';
		var a = new style(ob);
		if (a.get(ts)=='50%') {
			a.set(ts,'140%');
		} else {
			a.set(ts,'50%');
		}
		a.text(ob);
	}
	this.vai = function(t) {
		document.body.innerHTML = '<img src=/imagens/loading.gif>';
		window.location = ped.atalho();
	}
	function change(ev) {
		ped.put(ev.target.name,ev.target.value);
		cookiePut(ev.target.name,ev.target.value);
		//lert(ev.target.name+'='+ev.target.value);
	}
	function textToInput(t) {
		//dois cliques =s envia
		if (tma && ms()-tma<1000 && jor==t) {
			eu.vai(t);
			return;
		}
		jor = t;
		tma = ms();
		ped.set('jor',t);
		cookiePut('jor',t);
		v = document.querySelector('TABLE.jorSel').querySelectorAll('INPUT');
		//atualiza checkbox cfrme t
		for (var i=0;i<v.length;i++) {
			v[i].checked = t.indexOf('~'+trimm(v[i].value)+'~')!=-1;
		}
		return;
	}
	//gerencia checkbox
	this.sel = function(ev) {
		//clicou
		var ob = targetEvent(ev);
		//ver situação atual
		var v = getParentByTagName(ob,'table').querySelectorAll('INPUT');
		var t = '~';
		for (var i=0;i<v.length;i++) {
			t += (v[i].checked?v[i].value+"~":"");
		}		
		var cm = ob;
		if (ob.tagName=='INPUT') {
			//alterou um checkbox, acerta cookie
			textToInput(t);
			return;
		}

		//clicou no td
		cm = ob.querySelector('INPUT');
		//clicou na parte de cima ?
		if (ev.offsetY<ob.offsetHeight/2) {
			//clicou a direita ?
			if (ev.offsetX<ob.offsetWidth/2) {
				//o único
				var t = '~'+cm.value+'~';
				textToInput(t);
			} else {
				//todos exeto este
				var t = '~';
				for (var i=0;i<v.length;i++) {
					t += (v[i]!=cm?v[i].value+"~":"");
				}
				textToInput(t);
			}
		} else {
			//apenas inverte jor
			cm.checked = !cm.checked;
			if (cm.checked) {
				t += cm.value+'~';
			} else {
				t = troca(t,'~'+cm.value+'~','~');
			}
			textToInput(t);
		}
			
	}
	function init() {
		document.body.addEventListener('mouseup',click);
		document.body.addEventListener('mousedown',click);
		var v =  document.querySelector('.form').querySelectorAll('INPUT');
		for (var i=0;i<v.length;i++) {
			if (v[i].name) {
				v[i].addEventListener('change',change);
			}
		}
		// menu contexto funciona apenas marcar "não"
		//  desativado pq no firefox android, não permite selecionar.
		/** document.body //querySelector('div.list')
			.addEventListener('contextmenu', context) // e => {e.preventDefault();})
		;
		menu = new contextDiv(
			'<p class=op>Abre</p><p class=op>Sim</p><p class=op>Não</p>'
			,menuClick
		);
		*/
	}
	
	//init
	if (ped.get('op')=='novo') {
	} else {
		window.onload = init;
	}

})()

addStyleId(`
	body {font-family:Arial,Helvetica,sans-serif;
		background1-color:#654565;background1-color:#456545
	}
	p {margin:13px;}
	a {color:black;text-decoration:none;}
	p.tm{margin:0;background:#e8e8e8;xborder-bottom:1px solid black;}
	p.tm:hover {color:blue;}
	p.list {font-size:80%;color:#505050;margin:0;}
	div.list {padding-left:5em;margin:0 0 5px;
		background-image:url(/imagens/2botoes.png);
		background-repeat:no-repeat;
		background-size:4.6em 100%;
	}
	P.qb {font-weight:bold;color:darkred;}
	SPAN.url {cursor:pointer;font-size:130%;color:#101010;}
	TABLE.jorSel {font-size:77%;}
	TD.selJor {
		background-image:url(/imagens/2botoes.png);
		background-repeat:no-repeat;
		background-size:100% 50%;
		min-width:50px;
	}
	p.op {cursor:pointer;margin:0;padding:5px;}
	p.op:hover {background-color:#8efefe;}

	
	/***********************************************************************/
	/*novo*/
	a.botFloat {text-align:center;color:#fff;font-size:18px;border:2px solid #fff;
		margin-right:7px;
		width:22px;height:22px;padding:6px 6px 5px;position:absolute;cursor:pointer;
		border-radius:5px;
		box-shadow:rgba(0, 0, 0, 0.5) 0px 2px 10px 0px;
	}
	a.botFloat1 {
		text-align:center;color:#fff;font-size:18px;
		width:22px;height:22px;padding:6px 6px 5px;
		position:fixed;
		box-shadow1:rgba(0, 0, 0, 0.5) 0px 2px 10px 0px;
		box-shadow:0px 2px 10px 0px #ffff; 
		background-color:rgb(219, 39, 35);
		border-color:rgb(219, 39, 35);border-radius:5px;
	}
	
	a.botMenu span {display:block;background:#fff;
			height:2px;margin-top:4px;
			top:0;left:0;
	}
	
	a.botTop {
		right:5px;bottom:5px;
		background-image:url('/imagens/setaDown.svg');
		background-repeat:no-repeat;;
		background-position:0px 5px ;
		transform: rotate(180deg);
	}
	.pulse {
		animation-delay:0.1s;animation-direction: normal;animation-duration: 1.5s;
		animation-fill-mode: forwards;animation-iteration-count: infinite;
		animation-name: pulse;xanimation-play-state: running;
		xanimation-timing-function: ease;
	}
	.gira {
		transform: matrix(-1, 0, 0, -1, 0, 0);
		transition-delay:0s;
		transition-duration: 0.3s;
		transition-property: all;
		transition-timing-function: ease;
	}
	a.botTop i {}
	@keyframes pulse {
	  from { transform: scale3d(1, 1, 1); }
	  50% { transform: scale3d(1.05, 1.05, 1.05); }
	  to { transform: scale3d(1, 1, 1); }
	}
	div.pesq {
		position:fixed;
		xwidth:90%;
		top:5px;
		margin:5px;
		border:1px solid;
		padding:7px;
		border-radius:5px;
		background-color:#B0D0E0;
	}
	xDIV.pesq INPUT.q {
		width:94%;
	}
	DIV.dest {
		margin:60px;
	}
	P.jor {
		line-height:190%;
		font-size:75%;
		margin:0;
		xborder-right:1px solid;
		margin:3px 3px 0;
		padding:2px 4px;
		cursor:pointer;
		xborder-radius:2px;
	}	
	P.jor:hover  {
		color:red;
		background-color:#afefaf;
	}
	P.jor SPAN {
		background-color:#afafaf;
		padding:1px 3px;
		border-radius:2px;
	}
	DIV.jor {
		position:fixed;
		top:0;left:-1000px;
		background-color:#ffffff;
		xdisplay:none;
		padding:12px;
		border-radius:5px;
	}
	DIV.jor {
		overflow:auto;
	}
	DIV.jor TABLE {
		margin:0 auto;
	}
	DIV.jor TD {
		border:1px solid;
		min-width:30px;
	}
	SPAN.runn {
		margin-left:10px;
		background-color:#afafaf;
		padding:1px 3px;
		border-radius:2px;	
		font-size:75%;
		pointer:text;	
	}
	.er {
		color:red;
	}

	/*****************************
	/ * tamanho dispositivo */
	BODY.mobile DIV.dest {
		margin:0;
	}



`,'jornais');


