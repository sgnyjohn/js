/*
 * Signey John ago/2020 
 * dez/2020 - novo
 * 
 * - estat tempo de leitura: clicou ficou lendo, voltou
 * - link q repete, mesclar no bd.
 * 
 */

var jor = new (function() {
	var eu = this;
	var ped = new pedido();
	var b1,b2,dv,ds,qu,dias,runn,list;
	var nDias = 1*cookieGet('dias');
	var oj = {},vj;
	var dDia = 24*60*60*1000;
	var bd = new bancoDados('news');
	var bdx = {};
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
		var qb = '',tlist=0,tnlist=0;
		var mostra = x => {
			
			if (tlist>=500) {
				tnlist++;
			} else {
				tlist++;
				var dt = dataSql(bd.getNum('di')).substring(0,16);
				if (dt!=qb) {
					qb = dt;
					domObj({tag:'p',class:'qb',targ:ds,'':dt});
				}
				//"<p class=list><b>"+apelido(n)+"</b> "+(a.df-a.di)/1000/60/60+"hs</p>"
				domObj({tag:'p'
					,class:'list'
					,'':'<b>'+oj.getJor(bd.getNum('jor')).nome+'</b> '
						+'<span title="tempo na capa '
								+bd.get('niv')+' '
								+dataSql(bd.getNum('di'))+' a '+dataSql(bd.getNum('df'))
								+bd.get('nv')+' '+'">'
							+format((bd.getNum('df')-bd.getNum('di'))/3600000,0)+'hs</span>'
							//+' '+bd.get('niv')+' '+bd.get('pos')
					,targ:ds
				});
				domObj({tag:'span'
					,class:'url'
					,title:bd.get('url')
					,'':'◦ '+troca(trimm(bd.get('tx'),'~ \r\n'),'~~','<br>◦ ')
					,targ:domObj({tag:'div',class:'list',targ:ds,'xx':'◦ '})
				});

			}
			
		}
		//ordena
		if (bd.count()==0) {
			alert('no data');
			return false;
		}
		if (false) {
			bd.sort('di desc,niv');
		} else {
			//di	df	nv	niv	pos	url	tx
			bd.sort( (a,b) => {
				//arredonda 5 minutos
				var a1=Math.floor(a[0]/300000);
				var b1=Math.floor(b[0]/300000);
				if (a1==b1) {
					return fSort(1*a[3],1*b[3]);
				} else {
					return fSort(b1,a1);
				}
			});
		}
		bd.eval({cond:Cond,func:mostra});
		list.innerHTML = format(tlist)
			+(tnlist!=0?' / '+format(tlist+tnlist):'')
		;
		//faltou registros
		if (tnlist>0) {
			domObj({tag:'p'
				,class:'tnlist'
				,'':format(tlist)+' listados - '+format(tnlist)+' não listados'
				,targ:ds
			});			
		}

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
		//wa = w;
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
			,value:cookieGet('dias',14)
			,targ:dv
			,ev_change:ev=>{
				var vn = calcRpn(ev.target.value);
				if (!isNumber(vn)||1*vn<1) {
					alert(ev.target.value+' invalid');
					ev.target.value = nDias;
				} else if (nDias!=1*vn) {
					nDias = 1*vn;
					ev.target.value = nDias;
					cookiePut('dias',nDias)
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
		//bd correcoes
		var dlc='~~',nMerge;
		var mergeTx = (a,b) => {
			var v = a.split(dlc);
			aeval(v, t => {
				if (a!=''&&b.indexOf(dlc+t+dlc)==-1) {
					b += t+dlc;
				}
			});
			return b;
		};
		//redefine addreg para merge, undex url.
		bd.addReg = (arr) => {
			if (typeof(arr)!='object') {
				alert("erro not object add "+arr);
				return false;
			}
			var x = bd.campos['url'];
			if (!isNumber(x)) {
				alert('erro');
			}
			var url = arr[x];
			if (isNumber(bdx[url])) {
				nMerge++;
				//1608704521000,1608762121000,18,3,
				//	pos=~~234~~231~~238~~235~~233~~230~~232~~229~~239~~236~~
				//	,https://www1.folha.uol.com.br/mundo/retrospectiva-da-decada,
				//	~~vale à pena~~imagens~~
				var ur = bdx[url];
				bd.reg(ur);
				bd.set('di',Math.min(1*arr[bd.campos['di']],bd.getNum('di')));
				bd.set('df',Math.max(1*arr[bd.campos['df']],bd.getNum('df')));
				bd.set('nv',Math.max(1*arr[bd.campos['nv']],bd.getNum('nv')));
				bd.set('niv',Math.min(1*arr[bd.campos['niv']],bd.getNum('niv')));
				bd.set('pos',mergeTx(arr[bd.campos['pos']],bd.get('pos')));
				bd.set('tx',mergeTx(arr[bd.campos['tx']],bd.get('tx')));
				//lert(ur+' url já existe...'+url+'\n\n'+arr);
			} else {
				var ur = bd.valores.length;
				bd.valores[ur] = arr;
				bdx[url] = ur;
				bd.reg(ur);
			}
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
				var dp = '';
				for (url in dad) {
					var dd = dad[url];
					if (!dd.proc && dd.fim!=0) {
						dp += substrRat(url,'/')+'\n';
						if (vazio(dd.tx)) {
							dadL.erS += url
								+' --> '+format(dd.fim-dd.ini)+'ms nt:'+dd.nt
								+' res: '+dd.res+' tx: '+dd.tx.length
								+' status: '+dd.cod+' '+dd.codText
								+'\n\n'
							;
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
				//lert(dp);
				dadL.np++;
				runn.innerHTML = dadL.p+'/'+dadL.n
					+(dadL.er!=0?'<span class=er>er'+dadL.er+'</span>':'')
					+' mg('+format(nMerge)+')'
					+' '+format((ms()-dadL.ini)/1000,0)+'s'
					+' '+format(bd.count())
				;
				//repeat until end or timeout: 30s
				if (dadL.np<300 && dadL.n-dadL.p-dadL.er>0) {
					setTimeout(dadosProc,100);
				} else {
					//FIM
					if (dadL.er!=0) alert('ERROS:\n\n'
						+dadL.erS
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
				dadL.n=0;dadL.np=0;dadL.p=0;dadL.er=0;dadL.ini=ms(),dadL.erS='';
				nMerge = 0;
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
							dad[u] = {ini:ms(),fim:0,tx:'?',proc:false,jor:i,nt:0};
							function carr(a,b,tx) {
								var httpReq = b.httpReq;
								var dd = dad[u];
								if (dd.fim!=0) {
									alert('dados: ped url dupla='+u);
								} else if (tx==''&&httpReq.status!=200&&dd.nt<2) {
									//tentar novamente...
									dd.nt++;
									//lert(httpReq.status+' '+httpReq.statusText+' tentar '+dd.nt+' '+u);
									(new carregaUrl()).abre(u,carr);
								} else {
									dd.tx = tx;
									dd.res = a;
									dd.cod = httpReq.readyState+' '+httpReq.status;
									dd.codTx = httpReq.statusText;
									dd.fim = ms();
									//if (u.indexOf('2019-05')!=-1) alert(objText(dd));
								}
							}
							(new carregaUrl()).abre(u,carr);
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
				mJor = new contextDiv({dom:d,container:false});
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
							//lert('fechar sel dif');
							cookiePut('jor',sel);
							setTimeout(resize,100);
							//lert('fechar sel dif1');
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
		font-size:75%;
	}
	xDIV.pesq INPUT.q {
		width:94%;
	}
	DIV.dest {
		margin:60px;
	}
	P.jor {
		line-height:190%;
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
	P.tnlist {
		font-size:170%;
		border-top: 4px solid red;
		margin:10px 0;
		padding:2px 0 0;
	}

	/*****************************
	/ * tamanho dispositivo */
	BODY.mobile DIV.dest {
		margin:0;
	}

`,'jornais');


