/*  .querySelectorAll
Copyright (c) 2002/2011 Signey John

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
 * alguns acreditam em fadas, outros num reino de freiras descalças... 
 * não importa, só há salvação sob domínios do escrito, da lei, para TODOS.
 * 
 * a parte superior para +longe está muito estreita, 
 * a parte inferior da tela do computador fica borrada.
 * 
 * " possível irrelevância das massas
 * ...
 * É muito mais difícil lutar contra a irrelevância do que contra a exploração. " Harari
 * 
 * https://www.youtube.com/watch?v=zNoLeZi5gpk&t=41m18s
 * 
 */

if (true) {

	//***********************************************
	var _contextDiv;
	function contextDiv(htmlORdom) {
		var f = _contextDiv;
		if (!f) {
			_contextDiv = document.createElement('div');
			f = _contextDiv;
			f.style.cssText = 'z-index:500;position:fixed;overflow: auto;'//position:absolute;'
				+'background:#f0f0f0;border:2px solid blue;'
				+'top:0;left:0;'
				+'padding:4px 8px;'
			;
			document.body.appendChild(f);
		}
		if (htmlORdom) {
			text(htmlORdom);
		}
		this.text = text;
		function text(htmlORdom) {
			f.innerHTML = '';
			if (typeof(htmlORdom)=='string') {
				f.innerHTML = htmlORdom;
			} else {
				f.appendChild(htmlORdom);
			}
		}
		this.show = function(ev) {
			//screenX: 2679 screenY: 292
			var nx = ev.x-browse.getTX(f);
			if (nx<0) nx=ev.x;
			var ny = ev.y-browse.getTY(f);
			if (ny<0) ny=ev.y;
			styleSet(f,'left',nx);
			styleSet(f,'top',ny);
			browse.mostra(f);
		}
		this.hide = function() {
			browse.esconde(f);
		}
	}

	//***********************************************
	function replacePos(str,arr) {
		var v = str.split('@');
		if (arr.length!=v.length-1) {
			alert('replacePos: tamanho array incompatível com substituições');
			return;
		}
		r = v[0];
		for (var i=1;i<v.length;i++) {
			r += arr[i-1]+v[i];
		}
		return r;
	}
		
		
	//***********************************************
	function running(domObj,tpImage) {
		var im = tpImage;
		var tb='🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛';
		var ni = tb.length/12;
		var n=-ni;
		var oDm = domObj;
		var vDm = domObj.innerHTML;
		var ti = ms(),nv=0;
		if (im) {
			oDm.innerHTML = '<img style="display: block;margin:0 auto;" src="/imagens/loading.gif">';
		} else {
			var to;
			inc();
		}
		function inc() {
			nv++;
			n += ni;
			if (n>=tb.length) n=0;
			oDm.innerHTML = tb.substring(n,n+ni);
			to = setTimeout(inc,200);
		}
		this.end = function() {
			clearTimeout(to);
			oDm.innerHTML = vDm;
			//lert('fim '+nv+' t='+(ms()-ti));
		}
	}


	//***********************************************
	function addStyleId(cssText,id) {
		var v = document.querySelectorAll('style#'+id);
		if (v.length!=0) return false;
		var ne = document.createElement('style');
		ne.id = id;
		ne.innerHTML = cssText;
		var x = document.querySelector('head style');
		if (x) {
			//style exist, insert before
			x.parentNode.insertBefore(ne,x);
		} else {
			//append to head
			document.querySelector('head').appendChild(ne);
		}
		return true;
	}

	//***********************************************
	// tabs 
	function tabs(Op) {
		var op = mergeOptions({id:'tabs'},Op);
		var vt = []; //vetor objetos
		var cnt;//destiny of objects
		var idx = {};
		var objAtivo=0;
		var lin; //linha menu 
		//************************
		function click(ev) {
			cnt.innerHTML = '';
			if (ev) {
				//lert(ev.target.value+' e='+ev.target.getAttribute('value'))
				classOff(lin.childNodes.item(objAtivo),op.id+'A');
				objAtivo = 1*ev.target.getAttribute('value');
				classOn(ev.target,op.id+'A');
				if (op.ped) op.ped.putJ(op.id,objAtivo);
			} else if (vt.length<=objAtivo) { //active invalid
				objAtivo = 0;
			}
			var o = vt[objAtivo].obj;
			//lert('ev='+ev.target.value+' o='+o);
			aeval(o.length?o:[o],function(a,i){
				try {
					cnt.appendChild(a);
				} catch (e) {
					alert('erro add obj tab '+e+' '+i+'='+a);
				}
			});
		}
		//************************
		this.css = function() {
			var x = `
				TABLE.### {border-spacing:0;xborder-collapse:collapse;xborder:2px solid;width:100%;}
				TABLE.### TD.### {cursor:pointer;border:2px solid;padding:1px 5px;
					text-align:center;
					border-top-left-radius:7px;border-top-right-radius:13px;
				}
				TABLE.### TD.###C {padding:1px 5px 5px;text-align:center;
						border-left:2px solid;
						border-right:2px solid;border-bottom:2px solid;
				}
				TABLE.### TD.###A {border-bottom:0;}
				TABLE.### TD.###:hover {color: blue;}
				TABLE.### TD.###V {border:0;
					border-bottom:2px solid;width:100%;
				}
				`
			;
			addStyleId(x.replaceAll('.###','.'+op.id),op.id);
		}
		//************************
		this.show = function() {
			this.css();
			var r = domObj({tag:'table',class:op.id});
			//lert('sh vt='+vt);
			if (op.tab) objAtivo=1*op.tab;
			if (op.ped&&op.ped.getJ(op.id))
				objAtivo = 1*op.ped.getJ(op.id);
			lin = domObj({tag:'tr',targ:r});
			for (var i=0;i<vt.length;i++) {
				domObj({tag:'td',class:op.id+(objAtivo==i?' '+op.id+'A':'')
					,title:vt[i].title?vt[i].title:''
					,targ:lin
					,value:i
					,ev_click:click
					,'':vt[i].label
				});
			}
			//linha 100%
			domObj({tag:'td',class:op.id+'V',targ:lin,'x':'sdfsdf'});
			
			
			cnt = domObj({tag:'td',class: op.id+'C'
				,colspan:vt.length+1
				,targ:domObj({tag:'tr',targ:r})
			});
			//bjNav(r);
			//lert('r='+r+' op.dst='+op.dst);
			if (op.dst) {
				op.dst.innerHTML = '';
				op.dst.appendChild(r);
			}
			click();
			return r;
		}
		//************************
		this.addTop = function(obj) {
			var pos = idx[obj.label];
			if (typeof(pos)=='number') {
				var o = vt[pos].obj;
				//add older to the end
				aeval(o.length?o:[o]
					,function(a){obj.obj[obj.obj.length] = a;}
				);
			}
			this.add(obj);
		}
		//************************
		this.add = function(obj) {
			//mergeOptions({label:,title:,obj:},obj);
			var ch = obj.label;
			var pos = idx[ch];
			if (typeof(pos)!='number') {
				pos = vt.length;
			} else if (cnt && objAtivo==pos) {
				click();
			}
			vt[pos] = obj;
			idx[ch] = pos;
		}
	}
	
	//***********************************************
	// search for classes "expland" and reduce
	function domExpland(Doc,Cl) {
		var doc = Doc;
		var cl = Cl?Cl:"expand";
		var sim = ['▶','▽'];
		var vo = [];
		setTimeout(init,100);
		function init() {
			var v = doc.querySelectorAll('.'+cl);
			//lert('domExpand: '+v.length+' '+cl);
			for (var i=0;i<v.length;i++) {
				var o = domDoc(doc).createElement('div');
				o.i = i;
				o.addEventListener('click',change);
				v[i].parentNode.insertBefore(o,v[i]);
				//o.appendChild(v[i]);
				//alert(o.firstChild);
				vo[i] = Array(v[i],o);
				change(vo[i]); 
			}
		}
		function change(ev) {
			var v1 = (ev[0]?ev:vo[ev.target.i]);
			if (hasClass(v1[0],cl+'_0')) {
				v1[1].innerHTML = sim[1];
				setCss(v1[0],'display','inline');
				//browse.mostra(v1[0]);
				classOff(v1[0],cl+'_0');
				classOn(v1[0],cl+'_1');
			} else {
				v1[1].innerHTML = sim[0];
				setCss(v1[0],'display','none');
				//browse.esconde(v1[0]);
				classOff(v1[0],cl+'_1');
				classOn(v1[0],cl+'_0');
			}
		}
	}
	
	function opener_() {
		alert('opener');
		try {
			var r = opener;
		} catch (e) {
		}
		return r;
	}

	//***********************************************
	// []
	function fSortCols(a,b,vCols,vDesc) {
		vDesc = vDesc?vDesc:[];
		for (var i=0;i<vCols.length;i++) {
			var swap = fSort(a[vCols[i]],b[vCols[i]],vDesc[i]);
			if (swap!=0) return swap;
		}
		return 0;
	}

	//**************************
	// load seq of XMLHttpRequest
	// obj de obj -> 0 -> n {0:{url:'',callback:function,timeout},timeout:60,callback:?}
	function loader(op) {
		//default op
		var op = mergeOptions({timeout:30,msegs:200,withCredentials:true},op);
		var i=0;
		while (op[i]) {
			op[i] = mergeOptions({timeout:op.timeout},op[i]);
			i++;
		}
		if (i==0) {
			eu.error = 'no task XMLHttpRequest informed {0:{},...}'
			return;
		}
		var eu = this;
		var pos = 0;
		this.end = false;
		setTimeout(next);
		//**************************
		function newOReq(v) {
			var oReq;
			try {
				var tp = 0;
				if (typeof(XMLHttpRequest)=='object') {
					//safari 2015
					oReq = new XMLHttpRequest();
					oReq.tp = 1;
				} else if (typeof(XMLHttpRequest)=='function') {
					oReq = new XMLHttpRequest();
					oReq.tp = 2;
				} else {
					var b=true?"Microsoft.XMLHTTP":"Msxml2.XMLHTTP";
					oReq = new ActiveXObject(b);
					oReq.tp = 3;
				}
				//lert(tp);
				//interdominios cookies...
				try {
					oReq.withCredentials = op.withCredentials;
				} catch (e) {
					alert('ss withCredentials');
				}
			} catch (e) {
				alert('erro criando obj AJAX obj='+oReq+' er='+erro(e));
			}
			return oReq;		
		}
		//**************************
		function end(v) {
			this.end = v;
			if (op.callback) {
				op.callback(eu);
			}
		}
		//**************************
		function next() {
			if (!op[pos].timeBegin) {
				//(new carregaUrl()).abre(op[pos].url,ret);
				var oReq = newOReq();
				oReq.pos = pos;
				oReq.onload = ret;
				oReq.open("get", op[pos].url, true);
				oReq.send();
				op[pos].timeBegin = ms()/1000;
			} else if (op[pos].timeEnd) {
				pos++;
				if (!op[pos] || eu.error) {
					end(true);
					return;
				}
			} else if (op[pos].timeout<ms()/1000-op[pos].timeBegin) {
				eu.error = 'timeout step '+pos+' '+(ms()/1000-op[pos].timeBegin);
				//lert(pos.url+' '+eu.error);
				end(true);
				return;
			}
			setTimeout(next,op.msegs);
		}
		//**************************
		function ret() {
			//status: 200 //readyState: 4
			//objNav(this);lert('xxcd url='+op[this.pos].url+' th='+this.getAllResponseHeaders());
			if (this.readyState != 4) {
				return;
			} else if (this.status!=200) {
				eu.error = 'status: '+this.status+'\nurl: '+op[this.pos].url;
				//lert(pos.url+' '+eu.error);
				end(true);	
				return;			
			}
			op[pos].callback(this.responseText,this);
			op[pos].timeEnd = ms()/1000;
		}
	}

	//**************************
	// sizeKey = first columns from matrice
	// others columns is totaled
	function total(SizeKey) {
		var sizeKey = SizeKey;
		var ix = {};
		var v = [];
		this.dec = []; //decimal
		//**************************
		// sort in matrice
		this.sort = function(func) {
			v.sort(func);
			//ix refresh
			ix = {};
			aeval(v,function(rg,n) {ix[getKey(rg)]=n;});
		}
		//**************************
		// aeval in matrice
		this.aeval = function(func) {
			aeval(v,func);
		}
		//**************************
		// get key
		function getKey(arr) {
			var k = '';
			feval(sizeKey, function(i) { k += arr[i]; } );
			return k;
		}
		//**************************
		// show in table order
		this.show = function() {
			var cnt = domObj({tag:domCustomElement({tag:'table'})});
			var t = cnt.elem;
			var sn = ':nth-child(n+'+(sizeKey+1)+'):nth-child(-n+'+v[0].length+')'
			cnt.css.textContent = 'TABLE {border-spacing:0;border-collapse:collapse;}'
				+'\nTABLE TH,TABLE TD {text-align:left;padding:2px 7px;border:2px solid;}'
				+'\nTABLE TH'+sn+',TABLE TD'+sn+' {'
				+'text-align:right;}'
			;
			//protege ?
			//cnt.elem=false;
			//cnt.css = false;
			if (this.cab) domObj({tag:'tr','':this.cab,targ:t});
			dec = this.dec;
			aeval(v,function(rg) {
				var r = domObj({tag:'tr',targ:t});
				aeval(rg,function(c,i) {
					domObj({tag:'td',targ:r,'':i<sizeKey?c:format(c,dec[i-sizeKey]?dec[i-sizeKey]:0)});
				});
			});
			return cnt;
		}
		//**************************
		// return line key
		this.getRow = function(aKey) {
			var k = getKey(aKey);
			if (typeof(ix[k])=='undefined') return;
			return v[ix[k]];			
		}
		//**************************
		// return row key sorted matrice 
		this.getVector = function(descend) {
			descend = descend?-1:1;
			v.sort(function(a,b) { 
				var r=0;
				for (var i=0;i<sizeKey;i++) {
					if (a[i]<b[i]) {
						return -1*descend;
					} else if (a[i]>b[i]) {
						return 1*descend;
					}
				}
				return 0;
			});
			return v;
		}
		//**************************
		this.set = function(arr) {
			var k = getKey(arr);
			var rg = ix[k];
			if (typeof(rg)=='undefined') {
				rg = v.length;
				ix[k] = rg;
			}
			v[rg] = arr;
			return rg;
		}
		//**************************
		// incrementa numericos no registro
		this.inc = function(arr) {
			var k = getKey(arr);
			var rg = ix[k];
			if (typeof(rg)=='undefined') {
				rg = v.length;
				ix[k] = rg;
				v[rg] = arr;
			} else {
				//sum not keys
				for (var i=sizeKey;i<arr.length;i++) {
					v[rg][i] += arr[i];
				}
			}
		}
	}
	
	//***********************************************
	// dom customElement
	function domCustomElement(op) {
		/* sgnyjohn mai/2020
			através de event.rangeParent
				é possível acessar dom objetos internos.
		*/
		op = mergeOptions({tag:'div'},op);
		if ( ! op.customName ) {
			op.customName = 'custom-'+((ms()-Math.floor(Math.random()*ms()/3)).toString(16));
		}
		window.customElements.define(op.customName, class extends HTMLElement {
			constructor() {
				super();
				const shadow = this.attachShadow({mode: 'open'});
				const elem = document.createElement(op.tag);
				const style = document.createElement('style');
				shadow.appendChild(style);
				shadow.appendChild(elem);
				//objNav(this);alert('ok '+op.tag);
				this.elem = elem;
				this.css = style;
			}
		});
		return op.customName;
	}
	

	//**************************//
	function styleSet(dom,key,value) {
		var o = textObj(dom.style.cssText);
		o[key] = value;
		dom.style.cssText = objText(o);
	}
	//**************************//
	function objText(obj,delimElem,delimValue) {
		delimElem = delimElem?delimElem:';'
		delimValue = delimValue?delimValue:':'
		var r = '';
		for (var k in obj) {
			r += k+delimValue+obj[k]+delimElem;
		}		
		return r;
	}
	//**************************//
	function textObj(tex,delimElem,delimValue) {
		var v = (tex?tex:'').split(delimElem?delimElem:';');
		var r = {};
		for (var i=0;i<v.length;i++) {
			var l = v[i].split(delimValue?delimValue:':');
			l[0] = trimm(l[0]);
			if (l.length==1) { 
				if (l[0]!='') {
					r[l[0]] = true;
				}
			} else {
				r[l[0]] = trimm(l[1]);
			} 
		}
		return r;
	}

	//**************************//
	function objDebug(o,Op) {
		var op = mergeOptions({lim:200,filt:function(){return true;}},Op);
		var doc = op.doc?op.doc:domDoc(o);
		var z,e,i=0;
		if ('~object~array~'.indexOf('~'+typeof(o)+'~')!=-1) {
			var r = doc.createElement('table');
			r.border=1;
			for(var prop in o) {
				try {
					z = o[prop];
				} catch (e) {
					z = '?erro:'+erro(e);
				}
				
				var l = domObj({tag:'tr',targ:r});
				domObj({'':prop,tag:'td',targ:l});
				domObj({tag:'td',targ:l}).appendChild(objDebug(z));

				i++;
				if (i>op.lim) break;
			}
			return r;
		} else {
			return domObj({tag:'span','':''+o});
		}
	}


	//***********************************************
	// mescla objeto opcoes com obj opcoes padrao
	function mergeOptions(opDefault,op) {
		if (typeof(op)!='object') {
			return opDefault;
		}
		aeval(opDefault,function(x,k){typeof(op[k])=='undefined'?op[k]=opDefault[k]:false;});
		return op;
	}
	
	//***********************************************
	function getElementIndex(o) {
		var op = o.parentNode;
		for (var i=0;i<op.childNodes.length;i++) {
			if (op.childNodes[i]==o) {
				return i;
			}
		}
		return -1;
	}
	//***********************************************
	// pagination
	function pages(pgA,tm,fim) {
		var r = '';
		var f = Math.floor(fim/tm+0.9999);
		for (var i=1;i<=f;i++) {
			r += ' <span class="pages'+(pgA==i?' pagesCurrent':'')+'" page="'+i+'">'+i+'</span>'
		}
		return r;
	}

	//***********************************************
	// line txt 'pdftotext -layout' 
	//		or ocr tesseract -> text paragraph
	function txtPdfJpgTexto(tx) {
			tx = trocaTudo(tx,' \n','\n');
			tx = trocaTudo(tx,'\t ',' ');
			tx = trocaTudo(tx,' \t',' ');
			tx = trocaTudo(tx,'\n\t','\n ');
			tx = trocaTudo(tx,'\n  ','\n ');
			tx = trocaTudo(tx,'\n ','@@@');
			tx = trocaTudo(tx,'\n\n','@@@');
			tx = trocaTudo(tx,'.\n','.@@@');
			tx = trocaTudo(tx,'-\n','');
			tx = trocaTudo(tx,'\n',' ');
			tx = trocaTudo(tx,'  ',' ');
			tx = trocaTudo(tx,'@@@','\n');
			return tx;
	}

	//***********************************************
	// dom
	function dom(doc) {
		doc = doc?doc:document;
		this.query = function(str) {
			var r;
			str = trimm(str);
			var tg,cl;
			var p = str.indexOf('.');
			if (p!=-1) {
				v=palavraA(str,'.');
				tg = vazio(v[0])?tg:v[0];
				cl = vazio(v[1])?cl:v[1];
			}
			var v;
			if (cl) {
				v = doc.getElementsByClassName(cl);
				if (tg) {
					for (var i=0;i<v.length;i++) {
						if (v[i].tagName == tg) {
							return v[i];
						}
					}
					return r;
				} else {
					return v.length>0?v[0]:r;
				}
			} else if (tg) {
				v = doc.getElementsByClassName(tg);
				return v.length>0?v[0]:r;
			}
			return r;
		}
	}

	//***********************************************
	function htmlToTxt(str) {
		return troca(str.replace(/<\/?[^>]+(>|$)/g, ' '),'  ',' ');
	}
	//***********************************************
	function pedidoRevisto(strGet) {
		pedidoRenew(strGet);
	}
	//***********************************************
	function pedidoRenew(strGet) {
		var p = new pedido();
		var v = palavraA(strGet,'&');
		for (var i=0;i<v.length;i++) {
			if (v[i].indexOf('=')==-1) {
				continue;
			}
			var n = leftAt(v[i],'=');
			var v = substrAt(v[i],'=');
			if (p.get(n)==v) {
				p.set(n,'');
			} else {
				p.set(n,v);
			}
			
		}
		window.location = p.atalho();
	}
	//***********************************************
	function domDoc(obj) {
		return document;
	}
	//***********************************************
	function domWin(obj) {
		return window;
	}
	//***********************************************
	function domAEval(o,fun) {
		for (var i = 0;i<o.childNodes.length;i++) {
			fun(o.childNodes.item(i),i);
		}
	}
	//***********************************************
	function domObj(p) {
		p.doc=(p.doc?p.doc:document);
		p.tag=(p.tag?p.tag:'p');
		//p.targ=(p.targ?p.targ:p.doc.body);
		//lert(p.svg);
		if (p.svg) {
			var uSvg = 'http://www.w3.org/2000/svg';
			//uSvg = 'org.w3c.dom.svg';
			var ret=p.doc.createElementNS(uSvg,p.tag);
		} else {
			var ret=p.doc.createElement(p.tag);
		}
		for (var i in p) {
			//lert('dfsf='+i);
			if (i=='innerHTML'||i=='') {
				var oo = typeof(p[i])=='object';
				//lert('oo='+oo);
				if (oo && p[i].tagName) {
					ret.appendChild(p[i]);
				} else if (oo && typeof(p[i].length)=='number') {
					aeval(p[i],function(v){ret.appendChild(v);});
				} else {
					ret.innerHTML = ''+p[i];
				}
			} else if (equals(i,'ev_')) {
				var ev = substrAt(i,'_');
				//lert('domObj.evento '+ev+'\n'+p[i]);
				ret.addEventListener(ev,p[i]);
			} else if ('-doc-tag-targ-svg-'.indexOf('-'+i+'-')==-1) {
				if (false && p.svg) {
					ret.setAttributeNS(uSvg,i,p[i]);
				} else {
					ret.setAttribute(i,p[i]);
				}
			}
		}
		if (p.targ) {
			p.targ.appendChild(ret);
		}
		/*if (p.svg) {
			objNav(ret);alert('svg');
		}
		*/
		return ret;
	}
	//***********************************************
	function objToHtml(o,Op) {
		var op = (Op?Op:{});
		var opP = {limite:200};
		//carrega opcoes padrao
		for (var i in opP) {
			if (!op[i]) {
				op[i] = opP[i];
			}
		}
		if (typeof(o)=='object') {
			return objToHtml(o,op);
		}
		
	}
	//*******************************************
	function getIrmao(obj,anterior) {
		var p = obj.parentNode;
		for (var i=0;i<p.childNodes.length;i++) {
			//lert('irmao='+i+' d '+p.childNodes.length);
			if (p.childNodes.item(i)==obj) {
				if (anterior && i==0) return;
				return p.childNodes.item(i+(anterior?-1:1));
			}
		}
		return;
	}
	//***********************************************
	//ADD cmd para ordenar a tabela conforme colunas.
	// p1 é objeto dom table ou id de table
	// p2 vetor strings para cada coluna com as possíveis ordens 'ad','d','da',''
	function tabelaSort(id,Ord) {
		var vOrd = (Ord?Ord:[]);
		var obj = id;
		//var sAt = -1;
		//var col,colA = -1; //ordem anterior
		if (typeof(obj)=='string') {
			obj = document.getElementById(id);
		}
		//rows
		//lert('rows len='+rows.length);
		// header row add event click
		//rows[0].addEventListener('click',click);
		// init: cols order
		var sStr = function(x){return x;};
		var sNum = function(x){return x.localToNumber();};
		var vImg = '⬍⬆⬇'
		var runSort = false;
		var oOrd;
		setTimeout(init);
		//*****************************************
		function init() {
			var rows = obj.getElementsByTagName('tr');
			//store original position on row 'ord' attribute...
			for (var i=1;i<rows.length;i++) {
				rows[i].setAttribute('ord',i);
			}
			//add click options
			feval(rows[0].childNodes.length,function(x){
				vOrd[x]={pos:x
					,col: rows[0].childNodes.item(x)
					,op:vOrd[x]?vOrd[x]:'da'
					,ord:-1
					,dom: domObj({tag:'sup'
						,targ:rows[0].childNodes.item(x)
						,title:'click to change column order'
						,'':vImg.substring(0,1)
						,style:'padding:1px 3px;cursor:pointer;'
						,ev_click: click
						,pos:x
					})
				};
			});
		}
		//*****************************************
		function val(col,row) {
			if ( vOrd[col].ord != -1 ) {
				//sort by column 'col'
				return vOrd[col].func(row.childNodes.item(col).textContent);
			} else {
				//original ord
				return 1*row.getAttribute('ord');
			}
		}		
		//*****************************************
		// ordena
		function click(ev) {
			//running sort?
			if ( runSort !== false ) {
				alertDev('ja rodando');
				return;
			}
			var ob = targetEvent(ev);
			if (!ob) {
				return;
			}
			
			var col = 1*ob.getAttribute('pos');
			oOrd = vOrd[col];
			oOrd.oClick = ob;
			
			//sinaliza ordenando.
			runSort = new running(ob);
			
			try {
				run(oOrd);
			} catch (e) {
				alertDev('erro '+erro(e));
			}
		}
		//*****************************************
		function runEnd() {
			runSort.end();
			runSort = false;
			//desmarca ordem por outras colunas
			aeval(vOrd,function(x){x.dom.innerHTML=vImg.substring(0,1);});
			oOrd.oClick.innerHTML = vImg.substring(oOrd.ord+1,oOrd.ord+2)			
		}
		//*****************************************
		function run() {
			//verify field type of column
			if (!oOrd.func) {
				oOrd.func = sNum;
				var rows = obj.getElementsByTagName('tr');
				for (var i=1;i<rows.length;i++) {
					if ( isNaN(rows[i].childNodes.item(oOrd.pos).textContent.localToNumber()) ) {
						oOrd.func = sStr;
						break;
					}
				}
				//lert('col num? '+(valueSort[col] == sNum));
			}
			//ordem atual da coluna
			oOrd.ord++;
			if (oOrd.ord>=oOrd.op.length) {
				oOrd.ord = -1;
			}
			setTimeout(runTask,100);
		}
		//*****************************************
		// sort task - Bubble sort.
		// toDo - Quicksort
		function runTask() {
			var cont = false;
			//pega lista de linha toda vez, muda
			var t =obj.getElementsByTagName('tr');
			//bjNav(t[1]);
			//lert('t='+t.length);
			for (var l=2;l<t.length;l++) {
				var v2 = val(oOrd.pos,t[l]);
				var v1 = val(oOrd.pos,t[l-1]);
				//trocar
				if (oOrd.ord==-1 || oOrd.op.substring(oOrd.ord,oOrd.ord+1)=='a') {
					var f = v2<v1;
				} else {
					var f = v2>v1;
				}
				//swap
				if (f) {
					t[l-1].parentNode.insertBefore(t[l],t[l-1]);
					cont = true;
				}
			}
			if (!cont) {
				runEnd();
			} else {
				setTimeout(runTask,22);
			} 
		}
	} //fim tabelaSort
	
	//***********************************************
	//monta  banco de dados estilo tabela com estrutura 'fixa', mas
	//		permite campo others cujo conteúdo será v[nomeCampo]=valor
	// pode preencher a partir de: 
	//		1 - objeto dom table - setTable
	//		2 - txt csv - setMatriz ou vetor 1a linha cab
	//		3 - vcard - addVCard
	function bancoDados(Nome,Doc) {
		var doc = Doc?Doc:document;
		var eu = this;
		var nome = Nome;
		var nr = 0; //nro regs
		var ur = -1; //registro atual
		//vetor de nome de campos
		var others = false; //name of field others
		var campos = {}; //[nome]=posicao
		//vetor campos index posição
		var camposN = Array(); //[]=nome
		//var valor;this.valor = valor;
		var valores = Array(); //valores string
		//var valoresProp = Array(); //propriedade dos valores
		//o q colocar em campo indefinido
		var Nulo = '';
		this.dev = false;
		this.dlRow = '\n';
		this.dlCol = '\t';
		var fileHead;
		//*********************************************
		// eval em todos registros
		this.eval = function(op) {
			if (typeof(op)=='function') {
				var x = op;
				op = {};
				op.func = x;
			}
			eu.top();
			while (eu.next()) {
				if (!op.cond || op.cond()) {
					op.func(ur);
				}
			}
		}
		//*********************************************
		// pivot calc like
		this.pivot = function(Ds) {
			var bd = this;
			alert('regs='+bd.count()+' '+[1,2,3,4]);
			var ds = Ds; //destino
			var rs; //resultado
			var sf,sc,sl,sd; //selects
			init();
			//************************************
			function mostra() {
				var vd = getParentByTagName(sd,'td').getElementsByTagName('p');
				if (vd.length==0) return;
				var vl = getParentByTagName(sl,'td').getElementsByTagName('p');
				var vc = getParentByTagName(sc,'td').getElementsByTagName('p');
				//acumula
				var e = {};
				bd.top();
				while (bd.next()) {

					//linha
					var chl = [];
					for (var l = 0;l<vl.length;l++) {
						chl[chl.length] = bd.get(vl[l].innerHTML);
					}
					var ln = e[chl];
					if (!ln) {
						ln = {};
						e[chl] = ln;
					}
					
					//coluna
					var chc = [];
					for (var c = 0;c<vc.length;c++) {
						chc[chc.length] = bd.get(vc[c].innerHTML);
					}
					//valor
					var v = ln[chc];
					if (!v) {
						v = new Array(vd.length).fill(0);
						ln[chc] = v;
					}
					for (var d = 0;d<vd.length;d++) {
						v[d] += 1*bd.get(vd[d].innerHTML);
					}
				}
				//tot linha e coluna
				var tl = {};
				var tc = {};
				for (chl in e) {
					var l = tl[chl];
					if (!l) {
						l = new Array(vd.length).fill(0);
						tl[chl] = l;
					}
					for (chc in e[chl]) {
						var c = tc[chc];
						if (!c) {
							c = new Array(vd.length).fill(0);
							tc[chc] = c;
						}
						//soma ln
						aeval(l,function(v,i){l[i]+=e[chl][chc][i]});
						//soma c
						aeval(c,function(v,i){c[i]+=e[chl][chc][i]});
					}
				}
				//sort lin d[0]
				var lo = [];
				aeval(tl,function(v,i){lo[lo.length]=[i,v];});
				lo.sort(function(a,b){return fSort(b[1][0],a[1][0])});
				//sort col d[0]
				var co = [];
				aeval(tc,function(v,i){co[co.length]=[i,v];});
				co.sort(function(a,b){return fSort(b[1][0],a[1][0])});
				//col tm h
				
				//mostra
				var t = '<table border=1><tr>';
				/*if (false) {
					//cab 1
					feval(0,vc.length-1,function(i) {
						t += '<th colspan='+vl.length+'>';
						//quantos dif
						
						aeval(vc,function(v,i){t+='<th colspan='+sp+' title='+v.innerHTML+'>'; });
					});
				} */
				//cab 2
				if (vd.length==1) {
					aeval(vl,function(v,i){t+='<th>'+v.innerHTML});
					aeval(co,function(v,i){t+='<th>'+v[0]});
				} else {
					t += '<th colspan='+vl.length+'>';
					aeval(co,function(v,i){t+='<th colspan='+vd.length+'>'+v[0]});
					t += '<tr>';
					aeval(vl,function(v,i){t+='<th>'+v.innerHTML});
					aeval(co,function(){aeval(vd,function(v,i){t+='<th>'+v.innerHTML})});
				}
				//dados
				var zero = new Array(vd.length).fill('-');
				for (var l=0;l<lo.length;l++) {
					//t += '<tr><td>'+lo[l][0];
					t += '<tr>';
					aeval(lo[l][0].split(','),function(v,i){t+='<th>'+v});
					var vl = e[lo[l][0]];
					for (var c=0;c<co.length;c++) {
						var vc = vl[co[c][0]];
						if (vc) {
							aeval(vc,function(v,i){t+='<td class=num>'+format(v,0)});
						} else {
							aeval(zero,function(v,i){t+='<td>'+v});
						}
					}
				}
				rs.innerHTML = t;
			}
			//************************************
			function selectChange(ev) {
				var c = targetEvent(ev);
				//lert((1*c.value)+' '+ds);
				var d = getParentByTagName(c,'td');
				var v = d.getElementsByTagName('p');
				var t = camposN[c.value];
				c.firstChild.selected = true;
				for (var i=0;i<v.length;i++) {
					if (v[i].innerHTML==t) {
						domRemove(v[i]);
						mostra();
						return;
					}
				}
				//add
				v = doc.createElement('p');v.innerHTML = t;
				v.addEventListener('click',function(ev) {domRemove(targetEvent(ev));});
				d.appendChild(v);
				mostra();
			}
			//************************************
			function init() {
				t = doc.createElement('table');ds.appendChild(t);

				var l = doc.createElement('tr');t.appendChild(l);
				//filtro
				var c = doc.createElement('td');t.appendChild(c);
				c.setAttribute('colspan','2');c.style.cssText = 'background-color:red;';
				sf = selectCampo('<option selected>filtro');c.appendChild(sf);

				var l = doc.createElement('tr');t.appendChild(l);
				//vazia
				var c = doc.createElement('td');t.appendChild(c);
				//coluna
				var c = doc.createElement('td');t.appendChild(c);
				sc = selectCampo('<option selected>coluna');c.appendChild(sc);
				
				var l = doc.createElement('tr');t.appendChild(l);
				//linha
				var c = doc.createElement('td');t.appendChild(c);
				sl = selectCampo('<option selected>linha');c.appendChild(sl);
				//dados
				var c = doc.createElement('td');t.appendChild(c);
				sd = selectCampo('<option selected>dados');c.appendChild(sd);

				//dest result
				rs = doc.createElement('div');
				ds.appendChild(rs);
			}
			//************************************
			//retorna select dos campos
			function selectCampo(opi,opf) {
				var r = doc.createElement('select');
				r.addEventListener('change',selectChange);
				var t = opi?opi:'';
				for (var i=0;i<camposN.length;i++) {
					t += '<option value='+i+'>'+camposN[i];
				}
				r.innerHTML = t+(opf?opf:'');
				//lert(t);
				return r;
			}
		}		
		//*********************************************
		// get Arr
		this.getArr = function(arr) {
			var r = [];
			aeval(arr,function(v,i) {r[i]=eu.get('v')});
			return r;
		}
		//*********************************************
		// get row
		this.getRow = function() {
			return valores[ur];
		}
		this.getVetor = this.getRow;
		//*********************************************
		// cria objeto hash do registro
		this.getReg = function() {
			var r = {};
			for (var i=0;i<camposN.length;i++) {
				var v = this.get(camposN[i]);
				if (v) {
					r[camposN[i]] = v;
				}
			}
			return r;
		}		
		//*********************************************
		// cria objeto index por campo
		this.index = function(nomeCampo,uniq) {
			var r = {};
			var bur = ur; //guarda reg atual
			this.top(); 
			while (this.next()) {
				var vc = this.get(nomeCampo);
				if (!r[vc]) {
					if (uniq) {
						r[vc] = ur;
					} else {
						r[vc] = [ur];
					}
				} else if (uniq) {
					alert('index: error, duplicate value of key '
						+nomeCampo+'['+vc+' & '+this.get(nomeCampo,'?',''+r[vc])+']'
					);
				} else {
					r[vc][r[vc].length] = ur;
				}
			}
			ur = bur;
			return r;
		}
		//*********************************************
		// show in lists 
		this.showField = function(reg,field) { //,fieldName) {
			if (typeof(reg[field])=='undefined') {
				return '-';
			}
			return troca(''+reg[field],'\n','<br>');
		}
		//*********************************************
		// show in lists 
		this.showHeader = function(field) { //,fieldName) {
			return troca(''+camposN[field],'_',' ');
		}		
		//*********************************************
		// gera objetos html 
		// 	targ = target dom destino
		//	limit = limita nro regs
		//	values = substitui dados originais por este vetor compatível
		this.toDom = function(op,Xlimit,XValores) {
			if (!op || op.tagName) {
				var r  = {targ:op,limit:Xlimit,values:XValores};
				var op = r;
			}
			var vlr = op.values?op.values:valores;
			if (!vlr) {
				alert('bd.toDom: invalid values '+vlr);
				return;
			}
			var dst = op.targ?op.targ:false;
			//lert('dst='+dst);
			var doc = dst?domDoc(dst):document;
			var limit = op.limit?op.limit:false;
			var tb = doc.createElement('table');tb.className = this.className?this.className:'bdToDom';
			tb.border=1;
			// head
			var l = doc.createElement('tr');l.className='head';tb.appendChild(l);
			for (var i=0;i<camposN.length;i++) {
				var c = doc.createElement('th');
				c.innerHTML = eu.showHeader(i);
				l.appendChild(c);
			}
			// data
			var r;
			// all rows
			for (r=0;r<vlr.length && (!op.limit||r<op.limit);r++) {
				l = doc.createElement('tr');tb.appendChild(l);
				// all cols
				try {
					for (var i=0;i<vlr[r].length;i++) {
						var c = doc.createElement('td');
						c.innerHTML = eu.showField(vlr[r],i);//troca(vlr[r][i],'\n','<br>');
						l.appendChild(c);
					}
				} catch (e) {
					alert('erro bd.toDom:'+e+' reg:'+r+' vlr[r]:'+vlr[r]
						+'\n\n'+erro(e)
					);
				}
			}
			// limit rows ?
			if (r<vlr.length) {
				l = doc.createElement('tr');tb.appendChild(l);
				var c = doc.createElement('td');
				c.setAttribute('colspan',''+vlr[r].length);
				c.innerHTML = '<h1>stop limit '+limit+'</h1>';
				l.appendChild(c);
			}
			//adiciona ao dst
			if (dst) dst.appendChild(tb);
			//permite ordenar colunas
			tabelaSort(tb);
			return tb;
		}		
		//*********************************************
		function ver(vlr) {
			if (vazio(vlr)) {
				return '';
			} else if (vlr.regs) {
				return vlr.toTxt();
			} else {
				return vlr;
			}
		}		
		//*********************************************
		this.toTxt = function() {
			var t = '';//tam='+valores.length;
			for (var r=0;r<valores.length;r++) {
				t +='<p>';
				for (var c=0;c<camposN.length;c++) {
					if (typeof(valores[r][c])!='undefined') {
						t += (c==0?'':' ')+(camposN[c]!=''?camposN[c]+':':'')+ver(valores[r][c]);
					}
				}
				t +='</p>';
			}
			return t;
		}		
		//*********************************************
		this.mergeTo = function(dest) {
			for (var r=0;r<valores.length;r++) {
				dest.addReg();
				for (var c=0;c<valores[r].length;c++) {
					dest.set(camposN[c],valores[r][c]);
				}
			}
		}		
		//*********************************************
		this.getNome = function(vv) {
			return nome;
		}		
		//*********************************************
		this.setOthers = function(nomeCampo) {
			others = nomeCampo;
		}
		//*********************************************
		this.setStruct = function(obj) {
			campos = obj;
			camposN = [];
			for (var i=0;i<campos.length;i++) {
				camposN[campos[i]] = i;
			}
		}		
		//*********************************************
		// recebe vetor de [campo]='valor'
		this.addVCard = function(obj) {
			var tv=0,tp=0; //total valores, propriedades
			eu.addReg();
			for (var k in obj) {
				if (k.indexOf(';')!=-1) {
					//converte em bancoDados
					var v = eu.stringDelim(k);
					v.set('',obj[k]); //seta valor
					eu.set(v.getNome(),v,true);
				} else {
					eu.set(k,obj[k]);
				}
			}
		}
		//*********************************************
		// recebe string tipo http GET e separa em vars
		//  - delimitador ';' e '=' - retorna bancoDados
		this.stringDelim = function(k) {
			var v = palavraA(k,';');
			var o = new bancoDados(v[0]);
			o.addReg();
			for (var i=1;i<v.length;i++) {
				var p=v[i].indexOf('=');
				if (p==-1) {
					var vl;
					o.set(v[i],vl);
				} else {
					o.set(v[i].substring(0,p),v[i].substring(p+1));
				}
			}			
			return o;
		}				
		//*********************************************
		this.setVCards = function(txt) {
			var v = palavraA(txt,'\n');
			var nv = 0;
			var pes;
			for (var i=0;i<v.length;i++) {
				if (v[i]=='') {
					continue;
				}
				var pc = v[i].substring(0,1);
				var l = trimm(v[i]);
				if (l=='BEGIN:VCARD') {
					pes = [];
				} else if (l=='END:VCARD') {
					eu.addVCard(pes);
					pes = 0;
				} else {
					var p = l.indexOf(':');
					if (p==-1) {
						// toDo - linhas q comecem por = (ENCODING=QUOTED-PRINTABLE)
						//	 ou ' ' ENCODING=BASE64
						if ('= '.indexOf(pc)==-1) {
							alert('linha sem : ('+l+')');
						}
					} else {
						pes[l.substring(0,p)] = trimm(l.substring(p+1));
					}
				}
			}
		}
		//*********************************************
		this.verFicha = function(rg) {
			var r = '<table border=1>';
			for (var c=0;c<camposN.length;c++) {
				if (typeof(valores[rg][c])!='undefined') {
					r += '\n<tr>'
						+'<td style="font-size:80%;font-weight:bold;">'+camposN[c]
						+'<td>'+ver(valores[rg][c])
					;
				}

			}
			var d = new dialogo(r+'</table>');
			//d.setHtml();
			d.ver();
			alert('foi?');
		}
		//*********************************************
		this.rel = function(cv,qb) {
			if (!qb) {
				qb=[''];
			}
			//quebras
			var qv = [],qc = [];
			for (var k in  qb) {
				qc[k] = campos[qb[k]];
				qv[k] = '43:?834/54';
			}
			//campos
			var cc = [],ce = [];
			for (var k in  cv) {
				cc[k] = campos[cv[k]];
				ce[k] = tiraAcentos(troca(cv[k],' ','_'));
			}
			//cab
			var cab = '';
			for (var k2 in cv) {
				cab += '<th style="'+eu.stth+'">'+cv[k2];
			}
			//monta rel
			var tip=1;
			var t=(tip==1?'<table border=1><tr>'+cab:'');
			for (var k in valores) {
				var rg = valores[k];
				//quebras
				for (var k1 in qb) {
					if ( qv[k1] != rg[qc[k1]] ) {
						if (tip==1) {
							t += '<tr><td colspan='+cv.length+'>'
								+(qb[k1]==''?'':'<h1>'+qb[k1]+': '+rg[qc[k1]]+'</h1>')
								+'<tr>'
							;
						} else {
							t += (t==''?'':'</table>')
								+(qb[k1]==''?'':'<h1>'+qb[k1]+': '+rg[qc[k1]]+'</h1>')
								+'<table border=1><tr>'+cab
							;
						}
						qv[k1] = rg[qc[k1]];
					}
				}
				//linha
				t += '<tr><td onclick="'+nome+'.verFicha('+k+');">'+k;
				for (var k1 in cv) {
					t +='<td style="'+'">'+ver(rg[cc[k1]]);
				}
				t += '</tr>';
			}
			return t+'</table><p>.</p><p>.</p>';
		}
		//*********************************************
		// string - like 'ORDER BY' sql
		this.sort = function(ar) {
			//passou funcao
			if (typeof ar == 'function') {
				valores.sort(ar);
				return;
			} else if (typeof(ar)=='string') {
				var ar = ar.split(',');
				aeval(ar,function(v,i) {
					v = trimm(v);
					var nom = trimm(v.leftRat(' '));
					if (isNaN(nom)) {
						//lert(v+' n'+nom+' c'+campos[nom]);
						nom = campos[nom]; 
						if (isNaN(nom)) {
							alert('bd.sort: field name '+nom+' not exists!');
							return false;
						}
					}
					ar[i] = [1*nom
						,v.indexOf(' ')>0 && v.substrRat(' ').toLowerCase()=='desc'?1:-1
					];
				});
				//lert(ar);
			} else if (typeof(ar)=='object') {
				//passou só um objeto
				if (ar['campo']) {
					ar = [ar];
				}
				//processa array de objetos
				for (k in ar) {
					if (typeof(ar[k].length)!='number') {
						ar[k] = [campos[ar[k]['campo']],(ar[k]['desc']?1:-1)];
					}
				}
			}
			//ar is two columns array
			//	column 1 - numeric position of field
			//	column 2 - order 1=descend -1=ascend
			var i1=0,i2=0,i3=0;
			valores.sort(
				function(a,b) {
					for (var k=0;k<ar.length;k++) {
						var ch=ar[k][0];
						//lert(ch+' a='+a[ch]+' b='+b[ch]);
						if ( a[ch] < b[ch] ) {
							i1++;
							return ar[k][1];
						}
						if ( a[ch] > b[ch] ) {
							i2++;
							return -ar[k][1];
						}
					}
					i3++;
					return 0;
				}
			);
			//lert(' i1='+i1+' i2='+i2+' i3='+i3 );
		}
		//*********************************************
		this.count = function() {
			return valores.length;
		}
		//*********************************************
		this.regs = function() {
			return ur;
		}
		//*********************************************
		//se parametro seta e volta anterior
		//sem parametro retorna atual
		this.reg = function(r) {
			var ret =  ur;
			if (typeof r === 'number') {
				ur = r;
			}
			return ret;
		}
		//*********************************************
		this.init = function() {
			ur = -1;
		}
		this.top = this.init;
		//*********************************************
		this.next = function() {
			ur++;
			return ur < valores.length;
		}
		//*********************************************
		// retorna txt 1a linha nome campos e o reguistros
		this.getTxt = function() {
			var l='reg';
			for(var i=0;i<camposN.length;i++) {
				l += '\t'+camposN[i];
			}
			var r = l+'\n';
			for(var rn in valores) {
				var rg = valores[rn];
				l = ''+rn;
				for(var i=0;i<camposN.length;i++) {
					l += '\t'+(typeof(rg[i])=='undefined'?Nulo:rg[i]);
				}
				r += l+'\t@\n';
			}
			return r;
		}
		//*********************************************
		this.estru = function() {
			var e = new estat('struct table '+nome);
			for (var r=0;r<valores.length;r++) {
				for (var c=0;c<camposN.length;c++) {
					if ( valores[r][c] ) {
						e.inc(camposN[c],1);
					}
				}
			}
			
			return e.toTxt()+'\n n='+camposN.length+' ('+camposN+')\n'+e;
		}
		//*********************************************
		// recebe txt 1a linha campos* e add regs
		// 		se 1a linha = ':' assume cabeçalho arquivo no padrão eml
		//		separado do nome de campos e bloco dados por linha vazia
		//		cabeçalho arquivo pode conter campo 'delimiter' this.dlCol
		this.setTxt = function(tx) {
			//var x = palavraA(trimm(tx),this.dlRow);
			var x = trimm(tx).split(this.dlRow);
			
			//possui fileHead
			if (trimm(x[0])==':') {
				//read fileHead
				fileHead = {'delimiter': this.dlCol};
				for (var i=1;i<x.length;i++) {
					var l = trimm(x[i]);
					if (l=='') {
						break;
					}
					var c = leftAt(l,':');
					fileHead[c] = trimm(substrAt(l,':'));
				}
				this.dlCol = fileHead['delimiter'];
				var xn=[];
				//read dad
				for (var d=i+1;d<x.length;d++) {
					if (trimm(x[d])!='') {
						xn[xn.length] = x[d].split(eu.dlCol);
					}
				}
				x = xn;
			} else {
				//separa colunas
				aeval(x,function(e,i) { x[i] = e.split(eu.dlCol); });
			}
			//lert(x[0]);
			this.setMatriz(x);
		}
		//*********************************************
		// GET valor de um campo pelo nome, ret padrão, se number mov ponteiro mv ou reg nro
		this.getDate = function(Nome,pdr,mv) {
			return strToDate(this.get(Nome,pdr,mv));
		}
		//*********************************************
		// GET valor de um campo pelo nome, ret padrão, se number mov ponteiro mv ou reg nro
		this.getNum = function(Nome,pdr,mv) {
			return 1*this.get(Nome,pdr,mv);
		}
		//*********************************************
		// GET valor de um campo pelo nome, ret padrão, se number mov ponteiro mv ou reg nro
		this.get = function(Nome,pdr,mv) {
			//registro solicitado, pode haver movimento.
			var rf = ur;
			if (typeof(mv)=='number') {
				rf = ur+mv;
			} else if (typeof(mv)=='string') {
				rf = 1*mv;
			}
			//lert('mv='+mv+' ur='+ur+' rf='+rf);
			//registro calculado fora de faixa, retorna pdr
			if ( isNaN(rf) || typeof(rf)!='number'|| rf >= valores.length || rf < 0) {
				//alert('erro..'+ur);
				return pdr;
			}
			if (typeof(campos[Nome])=='undefined') {
				return pdr;
			}
			var pc = campos[Nome];
			try {
				if ( typeof(pdr)!='undefined' && typeof(valores[rf][pc])=='undefined' ) {
					return pdr;
				}
				try {
					return valores[rf][pc];
				}  catch (e) {
					alert('bancoDados.get ERRO ur='+rf+' pc='+pc+' nome='+Nome+' '+erro(e));
				}
			} catch (e) {
				alert('rf='+rf+' pc='+pc+' '+erro(e));
			}
		}
		//*********************************************
		// recebe table com 1a tr nome campos
		this.setTable = function(ob) {
			var v = ob.getElementsByTagName('tr');
			//bjNav(v[0]);alert(22);
			for (var i=0;i<v[0].childNodes.length;i++) {
				var n = trimm(v[0].childNodes.item(i).textContent);
				campos[n] = i;
				camposN[i] = n;
			}
			//lert('v='+v[0]+'='+camposN);
			//lert(campos+' '+camposN);
			for (var i=1;i<v.length;i++) {
				var vc = [];
				for (var c=0;c<v[i].childNodes.length;c++) {
					vc[c] = trimm(v[i].childNodes.item(c).textContent);
				}
				//lert(vc);
				valores[valores.length] = vc;
			}
			nr = valores.length;
		}
		//*********************************************
		// recebe matriz ou csv com 1a linha nome campos
		this.setVetObj = function(vet) {
			//nao implem
		}
		//*********************************************
		// recebe matriz ou csv com 1a linha nome campos
		//		* ver setTxt
		this.setMatriz = function(vet) {
			if (typeof(vet)=='string') {
				this.setTxt(vet);
				return;
			}
			//nome campos na linha 0
			for (var i=0;i<vet[0].length;i++) {
				var n = trimm(vet[0][i]);
				campos[n] = i;
				camposN[i] = n;
			}
			//dados na um em diante
			for (var i=1;i<vet.length;i++) {
				valores[valores.length] = troca(vet[i],'\\n','\n');
			}
			nr = valores.length;
		}
		//*********************************************
		// seta valor de um campo pelo nome 
		//		- add = para string, add mais texto
		this.set = function(Nome,Valor,add) {
			//se não existe, cria campo
			if (typeof(campos[Nome])=='undefined') {
				if (this.dev) {
					debJ('novo campo '+Nome+' pos='+camposN.length);
				}
				campos[Nome] = camposN.length;
				camposN[camposN.length] = Nome;
			}
			var pc = campos[Nome];
			//debJ(Nome+' rg='+ur+' pc='+pc+' valor='+Valor);
			
			//tipo valor
			if ( Valor && Valor.regs ) {
				try {
					//valor é objeto bancoDados
					if (nulo(valores[ur][pc])) {
						valores[ur][pc] = Valor;
					} else {
						if (typeof(valores[ur][pc])=='string') {
							var x = valores[ur][pc];
							valores[ur][pc] = new bancoDados(nome);
							valores[ur][pc].addReg();
							valores[ur][pc].set('',x);
						}						
						Valor.mergeTo(valores[ur][pc]);
					}
				} catch (e) {
					objNav(Valor);
					alert(erro(e)+' ==> Valor='+Valor+' ty='+typeof(Valor));
				}
			} else if ( add && !nulo(valores[ur][pc]) ) {
				//valor é string a add 
				valores[ur][pc] += ' '+trimm(''+Valor);
			} else {
				//valor qq type
				valores[ur][pc] = trimm(''+Valor);
			}
		}
		//*********************************************
		this.addReg = function(cod) {
			if (typeof(cod)=='undefined') {
				//registro auto numerado
				// 2020-04 ur++;
				ur = valores.length;
			} else {
				ur = cod;
			}
			//debJ('bd add Reg  ur='+ur+' '+erro());
			valores[ur] = Array();
		}
	}
	var bdTabela = bancoDados;
	//fim bdTabela
	//*******************************************
	// falta: favoritos, ferramentas ocr/texto,zoom
	//*******************************************
	// gerenciador arquivos
	//*******************************************
	function gerArqs(Nome,Parent,Url,ODest) {
		var doc = document;
		var eu = this;
		var nome = Nome;
		var oDest = ODest;
		var parent = Parent;
		var url = Url;
		var dir,vd,sortInv = 1,sortAnt = 1;
		var ped = new pedido();
		this.httpReq = carregaUrl;
		//lert('arqs');
		setTimeout(init,100);
		eu.ver = {};
		//*******************************************
		eu.ver.video = function(v) {
			var r = '';
			aeval(v,function(aq,k) {
				r += '<p><video src="'+url+dir+'/'+aq.nome+'" controls></video>'
					+'<br>'+aq.nome+'</p>'
				;
			});
			return r+'<h1>fim video</h1>';
		}
		//*******************************************
		this.sort = function(ord) {
			//e evento, clicou ?
			if (ord.type) {
				var o = getParentByTagName(targetEvent(ord),'th');
				//objNav(o);
				//v/ar o = o.tagName=='TD'?o:getParentByTagName(o,'td');
				ord = o.cellIndex;
				if (ord == 0) {
					return;
				} else if ( sortAnt == ord ) {
					sortInv *= -1;
					cookiePut('sortInv',sortInv);
				} else {
					cookiePut('sortAnt',ord);
				}
			}
			var inv = sortInv;
			var ui = ord+','+inv;
			//lert('inv='+ui);
			//guarda em location
			ped.putJ(nome+'.sort',ui);
			window.location = ped.atalhoJ();
			//ordena
			if (ord == 1) {
				vd.sort(function(a,b) { return inv*fSort(a.nome,b.nome); });
			} else if (ord == 2) {
				vd.sort(function(a,b) { return inv*fSort(a.data,b.data); });
			} else if (ord == 3) {
				vd.sort(function(a,b) { return inv*fSort(a.tam,b.tam); });
			}
			//lert('ord='+ord);
			ver();
			sortAnt = ord;
			//indica sort ATUAL
			var v = oDest.getElementsByTagName('th');
			for (var i=1;i<v.length;i++) {
				//lert(v[i]);
				var o = v[i].getElementsByTagName('span')[0];
				if (o) {
					o.innerHTML = '';
					if (i==ord) {
						o.className = 'sort'+(sortInv==1?'':'Inv');
					} else {
						o.className = '';
					}
				}
			}
		}
		//*******************************************
		function init() {
			//lert(document.cookie);
			var x = cookieGet('sortInv');
			sortInv = (typeof(x)=='number'?x:1);
			sortAnt = seVazio(cookieGet('sortAnt'),1);
			//lert('init gerarq');
			
			//verif dir...
			var dr = ped.getJ(nome);
			//lert(dr);
			if (typeof(dr)=='string') {
				eu.abre(dr);
			}
			//verif sort
			var dr1 = ped.getJ(nome+'.sort');
			if (dr1) {
				//lert(dr);
				sortInv = substrAt(dr1,',');
				sortAnt = leftAt(dr1,',');
			}
		}
		//*******************************************
		this.click = function(tr,ev) {
			if ( css(ev) ) {
				return;
			}
			var aq = new arq(tr);
			if (aq.dir=='true') {
				//dir
				this.abre(dir+'/'+aq.nome);
				return;
			} 	
			//download
			window.open(url+dir+'/'+aq.nome,'_blank');
		}
		//*******************************************
		function ver() {

			//ver....
			var tv = '';
			var tp = eu.tipoM.val();
			if ( tp!='' ) {
				var tf = eu.ver[tp];
				if (typeof(tf)!='function') {
					alert('ver_'+tp+' não é função conhecida..');
				} else {
					tv = tf(vd);
				}
			}
			
			

			//alert(op);
			var t = ''
				+'<div class="dirAtalhos">'
					+'<DIV class="filtro" href="">filtro</DIV>'
					+dirAtalhos(dir)
				+'</div>'
				+'<table class="dir">'
				+'<tr onclick="css(event)?void(0):'+nome+'.sort(event);">'
				+'<th class="op">'
				+'<th>nome<span class="sort">?</span>'
				+'<th>data<span class="sort">?</span>'
				+'<th>tam<span class="sort">?</span>'
				+'<tr><td colspan="4">'+tv
			;
			
			//lert(t);
			for (var i=0;i<vd.length;i++) {
				var aq = vd[i];
				var a = aq.nome;
				if (a.length>42 && a.substring(0,42).indexOf(' ')==-1) {
					a = a.substring(0,42)+'\n<br>'+a.substring(42);
				}
				t += '<tr class="'+(i%2==1?'par':'impar')+'"'
						+' onclick="'+nome+'.click(this,event);">'
					+'<td class="icone"><img src="'+_sis.dirImagens+'/gerArq/'+aq.icone()+'.png">'
					+'<td class="nome">'+a
					+'<td class="data">'+aq.data
					+'<td class="tam">'+format(aq.tam,0)
					+'<td class="dir">'+aq.dir
				;
			}
			oDest.innerHTML = t+'</table>';
			
			eu.tipoM.addCmd(oDest.getElementsByTagName('th')[0]);

		
		}
		//*******************************************
		function dirAtalhos(s) {
			var v = palavraA(s,'/');
			var r = '';//'<a href="javascript:void(0);" onclick="css(event)?void(0):'+nome+'.abre(\'\');">inicio</a>';
			var e = '';
			for (var i=0;i<v.length;i++) {
				e += (vazio(v[i])?'':'/')+v[i];
				r += '<DIV href="javascript:void(0);"'
					+' onclick="css(event)?void(0):'
					+nome+'.abre(\''+e+'\');">'+(i==0?'inicio':v[i])+'</DIV>'
				;
			}
			return r;
		}
		//*******************************************
		this.recebe = function(x,y,z) {
			//lert(z);
			vd = Array();
			z = palavraA(z,'\n');
			dir = z[0];
			for (var i=1;i<z.length;i++) {
				if (trimm(z[i])=='..fim..') {
					break;
				}
				var aq = new arq(palavraA('\t'+z[i],'\t'));
				vd[i-1] = aq;
			}
			this.sort(sortAnt);
			//monta();
		}
		//*******************************************
		this.abre = function(u) {
			oDest.innerHTML = '...';
			//co = new carregaUrl();
			var co = new this.httpReq();
			//lert(url+u+'&ms='+ms());
			ped.putJ(nome,u);
			window.location = ped.atalhoJ();
			co.abre(url+u+'&ms='+ms(),nome+'.recebe');
		}


		//*******************************************
		//*******************************************
		//versao dialogo-centrado
		this.tipoM = new (function(n) {
			var eu = this;
			var dest;
			var nome = n;
			var val = cookieGet(nome);
			var ops = arq();
			if (!ops[val]) {
				val = '';
			}
			var botaoCmd = '<div class="tipoM" style="background-image:url(/imagens/gerArq/'+(vazio(val)?'todos':val)+'.png);"'
				+' onclick="'+nome+'.click(this);">'+val+'</div>'
			;
			var op = '';
			aeval(ops,function(val,n) {
				op += '<DIV onclick="'+nome+'.click1(this);" value="'+n+'" title="mostrar apenas arquivos do tipo '+n+'" style="'
					+'background-image:url(/imagens/gerArq/'+(n==''?'todos':n)+'.png);'
					+'">'+n+'</DIV>'
				;
			});
			var menut = new dialogo(op,troca(nome,'.','_')+'tipoM1');
			//*******************************************
			this.val = function() {
				return val;
			}
			//*******************************************
			this.addCmd = function(o) {
				dest = o;
				dest.innerHTML = botaoCmd;
			}
			//*******************************************
			this.click1 = function(ob) {
				val = ob.getAttribute('value');
				//lert('tp='+ob+' '+v);
				dest.firstChild.style.cssText = 'background-image:url(/imagens/gerArq/'+(vazio(val)?'todos':val)+'.png);';
				ver();
				menut.fecha();
			}
			//*******************************************
			this.click = function(ob) {
				menut.ver();
			}
		})(nome+'.tipoM');


		//*******************************************
		//*******************************************
		function arq(Tr) {
			var tipos = new Array();
			tipos[''] = '-';
			tipos['img'] = '-bmp-gif-jpeg-jpg-pbm-pcx-png-pnm-ppm-psd-tif-tiff-xfc-xpm-';
			tipos['video'] = '-mp4-avi-flv-dump-';
			tipos['audio'] = '-mp3-ogg-wav-wma-';
			tipos['doc'] = '-abw-doc-docx-fodt-odt-ott-rtf-stw-sxw-uot-wri-';
			tipos['calc'] = '-csv-dbf-fods-gnumeric-ods-ots-slk-slt-stc-sxc-uos-xls-xlsx-';
			tipos['pdf'] = '-pdf-ps-';
			tipos['apres'] = '-fodp-odg-odp-otp-pot-potm-pps-ppsx-ppt-pptx-sti-sxd-uop-';
			tipos['vet'] = '-cdr-dxf-eps-odg-pdf-plt-ps-sk1-svg-svgz-wmf-';
			tipos['pac'] = '-7z-arj-rar-zip-';
			tipos['web'] = '-css-eml-htm-html-js-xhtml-';
			if (!Tr) {
				return tipos;
			}
			if ( ! Tr.tagName ) {
			} else if (Tr.tagName.toLowerCase()=='td') {
				Tr = Tr.parentNode;
			}
			var tr = Tr;
			this.nome = get(1);
			this.data = get(2);
			this.tam = 1*get(3);
			this.dir = get(4);
			this.ex = substrRat(this.nome,'.').toLowerCase();
			//*******************************************
			this.icone = function() {
				if (this.dir=='true') {
					return 'dir';
				}
				var r = 'outro';
				for (var i in tipos) {
					if (tipos[i].indexOf('-'+this.ex+'-')!=-1) {
						r = i;
						break;
					}
				}
				return r;
			}
			//--------------------------
			this.get = get;
			function get(i) {
				try {
				if ( Tr.tagName ) {
					var r = trimm(tr.childNodes.item(i).innerHTML);
					return troca(r,'\n<br>','');
				} else {
					return tr[i];
				}
				} catch (e) {
					objNav(tr);
					alert(i);
				}
			}
		}
	}
	//***************************************************
	//mapa google
	function mapaGoogl(mun,end) {
		//if (event && event.ctrlKey) {
		//	return;
		//}
		//ert(mun,end);
		end = leftRat(end,' -').toLowerCase();
		if (equals(end,'r ')) {
			end = 'rua '+substrAt(end,' ');
		} else if (equals(end,'pc ')) {
			end = 'praça '+substrAt(end,' ');
		} else if (equals(end,'av ')) {
			end = 'avenida '+substrAt(end,' ');
		} else if (equals(end,'ac ')) {
			end = 'acesso '+substrAt(end,' ');
		}
		if (end.indexOf('(')!=-1 && end.indexOf(')')!=-1) {
			end = trimm(leftAt(end,'('))+' '+trimm(substrAt(end,')'));
		}
		window.open('http://maps.google.com/maps?f=q&hl=pt-BR&geocode=&q='+encodeURIComponent(end+', '+mun),'_blank');
	}

	//*******************************************
	// falta em SP é 9 + 2
	// ver ddd por cidade.
	// como funciona a zona 51 conurbada ?
	function fone(n) {
		//lert('n344='+n);
		var ope='21', ddd='51';
		var n1 = '';
		for (var i=0;i<n.length;i++) {
			if (n.charAt(i)>='0' && n.charAt(i)<='9') {
				n1 += n.charAt(i);
			}
		}
		if (n1.length==8) {
		} else if (n1.length==10) {
			if (equals(n1,ddd)) {
				n1 = n1.substring(2);
			} else {
				n1 = '0'+ope+n1;
			}
		}
		//lert('5656 n='+n+' n1='+n1);
		window.open('tel:'+n1,'_blank');
	}
	//*******************************************
	function feval(max,func) {
		for (var i=0;i<max;i++) {
			func(i);
		}
	}

	//*******************************************
	// retorna string
	function aevalStr(arr,func,dl) {
		var nv = 0;
		var r = '';
		if (arr.length) {
			for (var i=0;i<arr.length;i++) {
				r += (dl && i!=0?dl:'')+func(arr[i],i);
			}
		} else {
			for (i in arr) {
				r += func(arr[i],i,nv++);
			}
		}
		return r;
	}
	//*******************************************
	function aeval(arr,func) {
		var nv = 0;
		if (arr.length) {
			for (var i=0;i<arr.length;i++) {
				func(arr[i],i);
			}
		} else {
			for (i in arr) {
				func(arr[i],i,nv++);
			}
		}
	}


	//################################
	function isEvent(ev) {
		return (''+ev).toLowerCase().indexOf('event')!=-1;
	}
	//################################
	//retorna data formatada tipo facebook
	function dataRecente(d) {
		if (typeof(d)=='object') {
			var t = d.UTC();
		} else {
			var t = 1*d;
		}
		var segs = (Date.now()-t)/1000;
		if (segs<3600) {
			return Math.floor(segs/60)+' minutos';
		} else if (segs/3600<24) {
			return Math.floor(segs/3600)+':'+strZero(segs%3600/60);
		}
		return  new Date(t).toLocaleString();

	}


	//################################
	//################################
	function strPesq(o) {
		// validar portugues pt 
		//  	/^[a-záàâãéèêíïóôõöúçñ ]+$/i
		//ou	/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
		
		//vetor acentos
		////áàâãéêíóôõúüñç
		var va = {'a' : 'á,à,â,ã'
			,'e' : 'é,ê'
			,'i' : 'í'
			,'o' : 'ó,ô,õ'
			,'u' : 'ú,ü'
			,'c' : 'ç'
		};
		for (var x in va) {
			//lert(x);
			//va[x] = troca(escape(va[x]),'%','\\u00');
			//lert(va[x]);
		}
		var a = trimm(trocaTudo(o,'  ',' '));
		//lert(a);
		var v = palavraA(a.toLowerCase(),' ');
		this.v = v;
		//if (referrer.search(new RegExp("Ral", "i")) == -1) { ...
		var vr = Array();
		var vri = Array();
		for (var i=0;i<v.length;i++) {
			vr[i] = new RegExp(rExpr(v[i]),'i');
			vri[i] = new RegExp(v[i],'i');
			//ok vr[i] = /d[iu]as/i;
			//vr[i] = /histo\u0301ria/i; //ok com acento?
			// ********* na realidade a acentuação fica a letra original + algo... Histo%C3%8C%C2%81ria
			//vr[i] = /historia/i; //ok so sem acento
			//lert('vr='+vr[i]);
		}
		//###################################
		this.valid = function() {
			var r=false;
			aeval(this.v,function(x) {if (x.length>2) r=true;});
			return r?NaN:"consulta inválida '"+a+"'";
		}
		//###################################
		function rExpr(t) {
			//áàâãéêíóôõúüñç
			var r = '';
			for (var i=0;i<t.length;i++) {
				var c = t.charAt(i);
				if ( va[c] ) {
					c = '['+c+','+va[c]+']';
				}
				r += c;
			}
			//lert(r);
			return r;
		}
		//###################################
		// negrita tx
		// todo - + de uma palavra, mudar a 1a q ocorre 1o
		this.negr = function(tx) {
			var p = 0;
			while ( 1 ) {
				var x=false;
				for (var i=0;i<v.length;i++) {
					var m = tx.substring(p).match(vr[i]);
					//var pn = tx.indexOf(eu.oPesq.v[i],p);
					var pn = m?p+m.index:-1;
					if (m && pn != -1) {
						tx = tx.substring(0,pn)
							+'<b class="negr">'
							+tx.substring(pn,pn+v[i].length)+'</b>'
							+tx.substring(pn+v[i].length)
						;
						p = pn+25+v[i].length;
						x = true;
					}
				}
				if (!x) {
					break;
				}
			}
			return tx;
		}
		//################################
		this.pesqi = function(s) {
			for (var i=0;i<v.length;i++) {
				if ( ! s.match(vri[i]) ) {
					return false;
				}
			}
			return true;
		}
		//################################
		this.pesqm = function(s) {
			var s1 = tiraAcentos(s).toLowerCase();
			for (var i=0;i<v.length;i++) {
				if ( s1.indexOf(v[i]) == -1 ) {
					return false;
				}
			}
			return true;
		}
		//################################
		this.pesq = function(s) {
			//var s = s1.toLowerCase();
			for (var i=0;i<v.length;i++) {
				//if (s.indexOf(v[i])==-1) {
				//if ( '!/'+v[i]+'/i'.test(s) ) {
				//if ( ! s.search(vr[i]) ) {
				// nao func if ( s.indexOf(vr[i]) == -1 ) {
				if ( ! s.match(vr[i]) ) {
					return false;
				}
			}
			//vr[0].exec(s);
			//alert(vr[0].lastIndex);
			//objNav(s.match(vr[0]));
			//alert(typeof(s.match(vr[0])));
			return true;
		}
	}


	//**************************//
	function seVazio(v,r) {
		if (vazio(v)) return r;
		return v;
	}
	//**************************//
	function inteiro(nm) {
		if ((''+nm).indexOf('.')==-1) return nm;
		//nm += 0.5;
		nm = ''+nm;
		return 1*(nm.substring(0,nm.indexOf('.')));
	}

	//**************************//
	function asc(c) {
		return c.charCodeAt(0);
	}
	//**************************//
	function decToHex(c) {
		if (c==256) return 'FF';
		while (c<0) c += 256;
		while (c>256) c -= 256;
		return ''+decToHex1(Math.floor(c / 16))+''+decToHex1(c % 16);
	}
	//**************************//
	function decToHex1(n) {
		return "0123456789ABCDEF".substring(n,n+1);
	}
	//*******************************//
	var _format_ = [];
	function format(v,d) {
		// cache of NumberFormat object
		if (! _format_[d] ) {
			_format_[d] = new Intl.NumberFormat(
				window.navigator.language
				, { useGrouping: true,maximumFractionDigits:d,minimumFractionDigits:d}
			);
		}
		return _format_[d].format(v);
	}
	//*******************************************
	// obj paineis que se escondem e aparecem onOver
	//*******************************************
	function painelOnOff(Obj,SobraH,SobraV,PosH,PosV) {
		var eu = this;
		var obj = Obj;
		var sobraV = SobraV,sobraH = SobraH;
		var posV = PosV, posH = PosH;
		var tx,ty,Esconde=false,visivel=true;
		setTimeout(init,200);
		//****************************************
		function init() {
			//chamado manual - inicializa
			tx = browse.getTX(obj);
			ty = browse.getTY(obj);
			obj.addEventListener('mouseover',onOff,true);
			obj.addEventListener('mouseout',onOff,true);
			setCss(obj,'z-index',500);
			esconde(true);
		}
		//****************************************
		function esconde(p) {
			if ( p || Esconde ) {
				//lert(posH+'-'+(tx-sobraH)+'px\n'+posV+'-'+(ty-sobraV)+'px');
				if (sobraH!=0) setCss(obj,posH,'-'+(tx-sobraH)+'px');
				if (sobraV!=0) setCss(obj,posV,'-'+(ty-sobraV)+'px');
				visivel = false;
				Esconde = false;
			}
		}
		//****************************************
		function onOff(ev) {
			//mostra ou esconde
			if ( ev.type == 'mouseover' ) {
				//mostra
				Esconde = false;
				if (sobraH!=0) setCss(obj,posH,'0px');
				if (sobraV!=0) setCss(obj,posV,'0px');
				return;
			}
			Esconde = true;
			setTimeout(esconde,1000);
		}
	}

	//**************************//
	function setClass(obj,nome) {
		classAddDel(ob,nome,true);
	}
	//**************************//
	function delClass(obj,nome) {
		classAddDel(ob,nome,false);
	}
	//**************************//
	function style(obj) {
		var v = {};
		aeval(palavraA(obj.style.cssText,';'),function(e,n) {
			v[trimm(leftAt(e,':'))] = trimm(substrAt(e,':'));
		});
		//************************
		this.set = function(k,V) {
			v[k] = V;
		}
		//************************
		this.get = function(k) {
			return v[k];
		}
		//************************
		this.text = function() {
			var r = '';
			aeval(v,function(v,k) {
				if (!vazio(v)) {
					r += k+':'+v+';';
				}
			});
			return r;
		}
	}
	//**************************//
	function setCss(obj,nomep,vlr) {
		var r = Array(obj,nomep,'');
		//parametro 1 = array?
		if (vazio(nomep)) {
			//lert('o='+obj);
			nomep = obj[1];
			vlr = obj[2];
			obj = obj[0];
		}
		try {
			var v = palavraA(obj.style.cssText,';');
			var ok = -1;
			for (var i=0;i<v.length;i++) {
				if (equals(trimm(v[i]),nomep+':')) {
					ok = i;
				}
			}
			if (ok==-1) {
				if (vazio(vlr)) {
					//nada
				} else {
					v[v.length] = nomep+':'+vlr;
				}
			} else {
				r[2] = substrAt(v[ok],':');
				if (false && vazio(vlr)) {
					v.slice(ok,ok+1);
				} else {
					v[ok] = nomep+':'+vlr;
				}
			}
			//lert(dPalavra(v,';')+';34342903');
			obj.style.cssText = dPalavra(v,';')+';';
		} catch (e) {
			alert('funcoes.js setCss '+e+' obj='+obj+' e='+erro(e));
		}
		return r;
	}
	
	//**************************//
	function dPalavra(v,del) {
		var r = '';
		if (v.length==0) {
			return;
		}
		for (var i=0;i<v.length;i++) {
			r += ';'+v[i];
		}
		return r.substring(1);
	}
	
	//**************************//
	function ref(doc) {
		return (doc?doc:document).referrer;
	}
		
	//**************************//
	function absoluteUrl(url,base) {
		if (vazio(base)) {
			base = window.location;
		}
		base=''+base;
		url=''+url;
		if (equals(url,'/')) {
			return url;
		}
		if (equals(url,'http://') || equals(url,'https://')) {
			return '/'+substrAt(substrAt(url,'//'),'/');
		}
		if (equals(base,'http://') || equals(base,'https://')) {
			base = '/'+substrAt(substrAt(base,'//'),'/');
		}
		if (base.indexOf('?')!=-1) {
			base = leftAt(base,'?');
		}
		base = leftRat(base,'/');
		url = trocaTudo(base+'/'+url,'//','/');
		url = troca(url,'/./','/');
		/*while (url.indexOf('..')==-1) {
		}
		*/
		return url;
	}	

	//***********************************************
	function alertErro(e) {
		alert(erro(e));
	}
	//***********************************************
	function nada() {}
	//***********************************************
	function alertXXX(tx) {
		var v = document.getElementsByTagName('script');
		objNav(v[0]);
		alert('foi');
	}
	//;setTimeout(alertXXX,100);


	//***********************************************
	function alertDev(tx) {
		if (Dev) {
			alert(tx);
		}
	}

	//***********************************************
	function css(ev) {
		if (!ev && browse.ie) {
			ev = event;
		}
		if (!ev) {
			return false;
		}
		return (ev.ctrlKey || ev.shiftKey);
	}


	//***********************************************
	function getId(obj,id,nome) {
		if (!nome) {
			nome = 'id';
		}
		var r = false;
		if (obj.getAttribute && obj.getAttribute (nome)==id) {
			r = obj;
		} else if (obj.childNodes && obj.childNodes.length>0) {
			for (var i=0;i<obj.childNodes.length;i++) {
				r = getId(obj.childNodes.item(i),id,nome);
				if (r) {
					break;
				}
			}
		}
		return r;
	}

	//**************************//
	function addEvento(elem,eve,fun,bool) {
		if (typeof elem.addEventListener != 'undefined' ) {
			elem.addEventListener(eve, fun, bool);
		} else if (typeof elem.attachEvent != 'undefined' ) {
			elem.attachEvent('on'+eve, fun);
		}
	}
	//**************************//
	var strToDate = strToData;
	function strToData(str) {
		if (!str) {
			//lert('erro strToData(), data invalida '+str);
			return new Date(); 
		}
		try {
			//lert('strToData: '+str);
			//falta hora?
			if (str.indexOf(' ')==-1) {
				var h = [0,0,0,0];
			} else {
				var h = palavraA(substrAt(str,' '),':');
				if (h[2].indexOf('.')!=-1) {
					h[3] = substrAt(h[2],'.');
					h[2] = leftAt(h[2],'.');
				} else {
					h[3] = '0';
				}
			}
			// d/m/y 
			if (str.indexOf('/')!=-1) {
				var d = palavraA(leftAt(str,' '),'/');
				return new Date(1*d[2],1*d[1]-1,1*d[0],1*h[0],1*h[1],1*h[2],1*h[3]);
			}
			// y-m-d 
			var d = palavraA(leftAt(str,' '),'-');
			var r = new Date(1*d[0],1*d[1]-1,1*d[2],1*h[0],1*h[1],1*h[2],1*h[3]);
			//lert('d='+d+' h='+h+' '+r);
			return r;
		} catch (e) {
			alert('erro strToData '+erro(e));
			return new Date();
		}
	}
	//**************************//
	var dateSql = dataSql;
	function dataSql(a) {
		//getDay = dia semana.
		var d = vazio(a)?new Date():a;
		//bjNav(a);
		//lert(a+' '+typeof(a)+' '+d);
		if (typeof(a)=='string') {
			d = strToData(a);
		} else if (typeof(a)=='number') {
			d = new Date(a);
		}
		return takeYear(d)+'-'+strZero(d.getMonth()+1,2)
		+'-'+strZero(d.getDate(),2)+' '
		+strZero(d.getHours(),2)+':'
		+strZero(d.getMinutes(),2)+':'+strZero(d.getSeconds(),2);
	}
	//**************************//
	function takeYear(theDate) {
		x = theDate.getYear();
		var y = x % 100;
		y += (y < 38) ? 2000 : 1900;
		return y;
	}
	//**************************//
	function strZero(nr,t) {
		return right('0000000000'+Math.floor(nr+0.5),t);
	}
	//************************************
	/* preciso armazenar objetos ligados a tags 
		até onde eu sei não podem ser armazenados 
		nas tags, então vamos de vetor
		q armazena {objJs,tag} e setda cod em JS
		e o atributo codTag em tag
	*/
	var _objTag = new Array();
	function objTag(ob,tg) {
		var c = ms();
		_objTag[c] = new Array(ob,tg);
		ob.cod = c;
		tg.setAttribute('codTag',c);
	}
	//************************************
	//executa scripts do objeto
	// para usar com ajax
	function scripts(ob) {
		var v = ob.getElementsByTagName('script');
		for (var i=0;i<v.length;i++) {
			debJ('eval js: '+v[i].textContent);
			with (document) {
				eval(v[i].textContent);
			}
		}
	}


	//**************************//
	function ms() {
		return (new Date()).getTime();
	}
	//********************
	//retira da url o host menos www
	function host(url) {
		tx = ''+url;
		var p = tx.indexOf('://');
		if (p!=-1) {
			tx = tx.substring(p+3);
		}
		if (tx.substring(0,4)=='www.') {
			tx = tx.substring(4);
		}
		p = tx.indexOf('/');
		if (p!=-1) {
			tx = tx.substring(0,p);
		}
		return trimm(''+tx);
	}
	//*********************************
	function domRemove(ob) {
		ob.parentNode.removeChild(ob);
	}
	//*********************************
	function carregaObj(url,id,id1) {
		//ert('url='+url+' id='+id+' id1='+id1);
		if (!url || !id) {
			alert('faltou url='+url+' id='+id);
		}
		var x = new carregaUrl();
		x.carregaObj(url,id,id1);
	}
	//*********************************
	var carregaUrlO = new Array();
	//*********************************
	function carregaUrl() {
		var eu = this;
		this.url = '';
		this.abre = abre;
		this.carregaObj = carregaObj;
		this.js = js;
		this.charSet = 'ISO-8859-1';
		var vHead = new Array();
		var xmlhttp=false;
		this.debug = false;
		xmlhttp = false;
		try {
			var tp = 0;
			if (typeof(XMLHttpRequest)=='object') {
				//safari 2015
				xmlhttp = new XMLHttpRequest();
				tp = 1;
			} else if (typeof(XMLHttpRequest)=='function') {
				xmlhttp = new XMLHttpRequest();
				tp = 2;
			} else {
				var b=true?"Microsoft.XMLHTTP":"Msxml2.XMLHTTP";
				xmlhttp = new ActiveXObject(b);
				tp = 3;
			}
			//lert(tp);
			//interdominios cookies...
			try {
				xmlhttp.withCredentials = true;
			} catch (e) {
			}
		} catch (e) {
			alert('erro criando obj AJAX obj='+xmlhttp+' er='+erro(e));
		}
		
		if (!xmlhttp) {
			alert('erro criando obj httpREQ tof='+typeof(XMLHttpRequest)+' ie='+browse.ie+' x='+xmlhttp);
		}
		this.httpReq = xmlhttp;
		//*********************************
		function deb(s,ob) {
			if (!eu.debug) {
				return;
			}
			if (ob) {
				objNav(ob);
			}
			alert(s);
		}
		//*********************************
		//executa os javaScript do obj
		function js(obj,tx) {
			var t = obj.getElementsByTagName('script');
			deb('vai js '+t.length+' '+tx);
			//ie ignora script em ajax...
			if (t.length==0 && tx.indexOf('<script>')!=-1) {
				var t = ''+tx;
				while (t.indexOf('<script>')!=-1) {
					var e = substrAtAt(t,'<script>','</script>');
					deb('vai js IE... '+e);
					eval(e);
					t = substrAt(t,'</script>');
				}
			}
			for (var i=0;i<t.length;i++) {
				try {
					eval(t[i].innerHTML);
				} catch (e) {
					alert('ajax erro: '+e+'\n em javaScript:\n '+troca(t[i].innerHTML,';',';\n'));
				}
			}
		}
		//*********************************
		function carregaObj(url,id,id1) {
			this.idObj = id;
			this.idObj1 = id1;
			this.abre(url);
		}
		
		//*********************************
		function abre(url,funcRet) {
			//eb(this.debug+' url='+url);
			this.funcRet = funcRet;
			this.url = url;
			this.method = 'GET';
			this.dados = null;
			if (this.form) {
				//url vazio
				this.url = vazio(this.url)?this.form.action:this.url;
				//lert(this.url+' a='+this.form.action);
			
				//monta string
				var t1 = '';
				for (var i=0;i<this.form.elements.length;i++) {
					var o = this.form.elements.item(i);
					//var v = troca(escape(trimm(o.value)),'+','%2B');
					var v = troca(encodeURIComponent(trimm(o.value)),'+','%2B');
					if (o.type=='checkbox') {
						v = o.checked?'on':'';
					}
					t1 += '&'+o.name+'='+v;
				}
				t1 = t1.substring(1); //+'&lixo=1';
				
				//GET ou POST
				if (this.form.method && this.form.method.toLowerCase()=='post') {
					this.method = 'post';
					this.dados = t1;
				} else {
					this.url += this.url.indexOf('?')==-1?'?'+t1:'&'+t1;
				}
				if (this.debug) {
					alert('ajax: m='+this.method+'\n url='+this.url+'\n'+troca(''+this.dados,'&','\n'));
				}
			}
			
			//monta PEDIDO
			//lert('a='+this.method+','+this.url+' '+url);
			this.httpReq.open(this.method,this.url,true);
			this.httpReq.withCredentials = true;
			//nao exoste this.httpReq.setDisableHeaderCheck(true);
			this.httpReq.onreadystatechange=recebe;
			this.httpReq.setRequestHeader('encoding',eu.charSet);
			//lert('charSet='+eu.charSet); 
			if (this.method=='post') {
				//this.httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				this.httpReq.setRequestHeader('Content-length', this.dados.length );
			}
			//application/x-www-form-urlencoded;charset=utf-8
			//lert('charSet='+eu.charSet);	
			this.httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset='+eu.charSet);
			if (browse.ie) {
				try {
					this.httpReq.setRequestHeader('Cookie', document.cookie);
				} catch (e) {
				}
				//lert(document.cookie);
			}
			if (this.cookie) {
				//lert('cook='+this.cookie);
				this.httpReq.setRequestHeader('Cookie', this.cookie);
			}
			
			//cab
			if (false) {
				for (var ci=0;ci<vHead.length;ci++) {
					this.httpReq.setRequestHeader(vHead[ci][0],vHead[ci][1]);
					alert(this.method+' set head='+vHead[ci][0]+' == '+vHead[ci][1]);
				}
			}

			//guarda EU
			eu = this;
			
			//envia PEDIDO
			//bjNav(this.httpReq);
			//lert('dad='+this.dados);
			this.httpReq.send(this.dados);
			return true;
		}
		//*********************************
		this.addHead = function(ch,v) {
			vHead[vHead.length] = new Array(ch,v);
		}
		//*********************************
		// recebe tela logon
		function fLogon(ob,b,c) {
			alert('logon:'+c);
			var d = new dialogo(leftRat('<tab'+substrAt(c,'<tab'),'</tab')+'</table>','logon');
			d.ver();
		}
		//*********************************
		// analiza e acerta atalhos
		function acertaAtalhos(ob) {
			//tem ação?
			var of = ob.firstElementChild;
			var acao = of.getAttribute('jxAcao');
			if ( acao == 'logon' ) {
				var x = new carregaUrl();
				x.abre(of.getAttribute('data-url'),fLogon);
			} else if ( acao ) {
				alert('acao='+acao);
				return;
			}
			//*********************************
			//acerta atalhos
			var v = ob.getElementsByTagName('a');
			for (var i=0;i<v.length;i++) {
				var o = v[i];
				var hr = substrAtAt(o.outerHTML,' href="','"');
				var u = o.href;
				if (hr.charAt(0)=='?') {
					//lert(o.href);
					u = leftAt(eu.url,'?')+'?'+substrAt(o.href,'?');
					//lert(u);
				}
				if (o.getAttribute('target')) {
					o.href = u;
				} else {
					var p = new pedido(u);
					p.set('obj',1);
					o.href="javascript:carregaObj('"+p.atalho()+"','"+eu.idObj+"')";
				}
			}
		}
		//*********************************
		function recebe() {
			//lert('recebe..');
			//ebJ(eu);
			var funcRet = eu.funcRet;
			var hR =  eu.httpReq;
			var fR = funcRet;
			var oId = eu.idObj; //coloca objeto num id
			var id1 = eu.idObj1; //pega os dados de outro id
			var th = eu;			
			var XX = hR.readyState;
			//eb('ajax recebe'+eu+' '+XX);
			if (XX==4) {
					var XR = hR.responseText;
					if (eu.debug) {
						objNav(eu);
						alert(hR.getAllResponseHeaders()+'\n\n h='+'xresp:'+XR);
					}
					//joga resultado em ID?
					if (oId) { //sim
						var oDest = (typeof(oId)=='object'?oId:browse.getId(oId));
						if (!oDest) {
							alert('nao encontrei id='+oId);
						}
						//pega result dentro de ID?
						//lert('oid='+oId+' '+oDest);
						if (vazio(id1)) { //nao
							// id destino é FUNC
							if (equals(oId,'&')) { //sim
								var id = substrAt(oId,'~');
								eval(leftAt(oId.substring(1),'~')+'(id,hR.responseText);');
							} else {
								//eb(' XX ajax recebe dest '+oDest+' '+hR.responseText);
								//bjNav(oDest);
								//lert('vai setar html'+hR.responseText);
								oDest.innerHTML = (hR.responseText);
								th.js(oDest,hR.responseText);
								setTimeout(function() {acertaAtalhos(oDest);},100);
								////////////////////////////////////////////
								//attacha evento para desviar o click
								// para acerto url destino, bem como carga nova...
								/*
								if ( carregaUrlO[oDest] ) { 
									oDest.removeEventListener('click', carregaUrlO[oDest].clickAtalho);
								}
								carregaUrlO[oDest] = eu;
								addEvento(oDest,'click',eu.clickAtalho);
								*/
							}
						} else { //pega result dentro de ID
							var o = document.createElement("div");
							oDest.innerHTML = hR.responseText;
							var o1 = browse.getId(id1,o);
							oDest.innerHTML = o1.innerHTML;
							th.js(oDest,hR.responseText);
						}
					} else if (funcRet) { //chama funcao ou addChild
						//lert('oid='+oId+' '+funcRet);
						if (typeof(funcRet)=='function') {
							funcRet(XX,th,XR);
						} else if (typeof(funcRet)=='object') {
							funcRet.innerHTML = XR;
						} else if (funcRet.indexOf('()')!=-1) {
							eval(troca(funcRet,'()','(XR)'));
						} else {
							eval(funcRet+'('+XX+',th,XR)');
						}
					}
			} else {
				//ebJ('xx='+XX);
			}
		}
	}

	//*********************************
	function valMail(o) {
		//objNav(o);
		var em = (o.type?o.value:o);
		//var em = o.value;
		em = tiraAcentos(em);
		if (em.indexOf('<')!=-1) {
			em = substrAt(em,'<');
		}
		if (em.indexOf('>')!=-1) {
			em = leftAt(em,'>');
		}
		while (em.indexOf('"')!=-1) {
			em = substrAt(em,'"');
		}
		em = trimm(troca(em,' ',''));
		if (em!=o.value) {
			o.value = em;
			//lert(em);
		}
		var v1 = palavraA(em,'@');
		if (em.length<8 || v1.length!=2 || v1[0].length<1 || v1[1].length<4 ) {
			return false;
		}
		
		//tem ponto?
		if (v1[1].indexOf('.')==-1) return false;
		
		if (!valEmailP(v1[0]) || !valEmailP(v1[1])) {
			return false;
		}
		return true;
	}
	//*******************************
	function getEmail(Texto) {
		var v = palavraA(trocaTudo(trocaChars(''+Texto,'<>,;:',' '),'  ',' '),' ');
		//ebJ('v='+v);
		var r = '';
		for (var i=0;i<v.length;i++) {
			if ( v[i].indexOf('@')!=-1 && valEmailP(v[i]) ) {
				r += ' '+trimm(v[i]);
			}
		}
		return r.substring(1);
	}
	//*******************************
	function valEmailP(s) {
		var i = s.length;
		return !('-@_.'.indexOf(s.substring(0,1))!=-1 || '-@_.'.indexOf(s.substring(i-1,i))!=-1);
	}
	//**************************//
	function capitalize(s) {
		var tb = '~de~e~do~em~dos~rs~no~na~da~das~';
		var a,v = palavraA(s,' '),r='';
		for (var i=0;i<v.length;i++) {
			if (!vazio(v[i])) {
				r +=( '(-'.indexOf(v[i].substring(0,1))!=-1
					?v[i].toUpperCase()
					:(tb.indexOf('~'+v[i].toLowerCase()+'~')==-1
							?v[i].substring(0,1).toUpperCase()+v[i].substring(1).toLowerCase()
							:v[i].toLowerCase())
				)+' ';
			}
		}
		return trimm(r);
	}
	//**************************//
	function tiraAcentos(s) {
		var acentos  = "áéíóúüàâêôãõñçÁÉÍÓÚÜÀÂÊÔÃÕÑÇäÄ";
		var acentost = "aeiouuaaeoaoncAEIOUUAAEOAONCaA";
		var p;
		for (var i=0;i<s.length;i++) {
			if ((p=acentos.indexOf(s.substring(i,i+1)))!=-1) {
				s = s.substring(0,i)+acentost.substring(p,p+1)+s.substring(i+1);
			}
		}
		return s;
	}
	//***********************************************
	function fSort(a,b,desc) {
		if (desc) {
			return (b>a?1:(b<a?-1:0));
		} else {
			return (a>b?1:(a<b?-1:0));
		}
	}

//*******************************//
//funções cookie
	//********************
	function cookieGet(nome,padrao) {
		var co = ' '+document.cookie+';';
		var i = co.indexOf(' '+nome+'=')+1;
		var f = co.indexOf(';',i+nome.length+1);
		if (i==-1 || f<=i) {
			return padrao;
		} else {
			return decodeURIComponent(co.substring(i+nome.length+1,f));
		}
	}
	//********************
	function cookiePut(nome,vlr,venceDias,domi) {
		if (venceDias!=0 && vazio(venceDias)) {
			venceDias = 120;
		}
		var v = new Date();
		v.setTime(v.getTime() + 1000*60*60*24*venceDias);
		v = v.toGMTString();
		if (venceDias<0) {
			v = "Thu, 01-Jan-1970 00:00:01 GMT";
		}
		var dc = nome + '=' + vlr
			+(venceDias==0?'' : ';expires=' + v)+';path=/'
			+(domi?';domain='+domi:'')
		;
		//debJ('dc1='+dc);
		document.cookie = dc;
	}
	var cookieSet = cookiePut;


	//******************************
	// objeto Pedido
	// retorna parametros conforme 
	// location e permite reatribuir
	// com fins de montar novo location
	//******************************
	function pedido(doc) {
		var eu = this;
		this.atalho = atalho;
		this.remove = remove;
		this.get = get;
		this.put = put;
		this.param = get;
		this.paramPut = put;
		this.set = put;
		this.paramToForm = paramToForm;
		this.refresh = refresh;
		this.getV = getV;
		this.url = ''; //host
		var url = ''; //parametros
		var urlJ;
	 
		//lert(typeof(doc));
		if (typeof(doc)=='undefined') {
			doc = window;
		}
		try {
			if (typeof(doc)=='string') {
				var url = doc;
				this.doc = window;
			} else {
				this.doc = doc;
				var url=''+doc.location;
			}
		} catch (e) {
			var url = '';
			//alertErro(e);
		}
		var param = new Array();
		var paramJ = new Array();;
		this.url = url;
		this.protocolo = leftAt(url,':');
		this.host = substrAtAt(url+'/','://','/'); 
		var p = url.indexOf('?');
		if (p!=-1) {
			this.url = url.substring(0,p);
			url = url.substring(p+1);
		} else if (url.indexOf('://')<10 && url.indexOf('://')!=-1) {
			//nao tem ? e tem http
			this.url = url;
			url = '';
		} else {
			url = url.substring(p+1);
		}
		setParam();
		//******************************	
		this.addParams =  function(strGet) {
			var uk = url;
			url = strGet;
			setParam();
			url = uk;
		}	
		//******************************	
		function setParam() {
			//tem parametros JS ? // sj 09/2015
			urlJ = '';
			if (url.indexOf('#')!=-1) {
				urlJ = substrAt(url,'#');
				url = leftAt(url,'#');
			} else if (eu.url.indexOf('#')!=-1) {
				urlJ = substrAt(eu.url,'#');
				eu.url = leftAt(eu.url,'#');
			}
			if (!vazio(urlJ)) {
				//lert(urlJ);
				var vj=palavraA(urlJ,'#');
				for (var i=0;i<vj.length;i++) {
					try {
						paramJ[leftAt(vj[i],'=')] = decodeURIComponent(substrAt(vj[i],'='));
					} catch (e) {
						paramJ[leftAt(vj[i],'=')] = (substrAt(vj[i],'='));
					}
				}
				//lert(vj+' p='+paramJ);
			}
			var v = palavraA(url,'&');
			var c;
			for (var i=0;i<v.length;i++) {
				c = palavraA(v[i]+'=','=');
				var np = c[0];
				if (vazio(np)) {
					//ignora
				} else if (!param[np] || vazio(param[np])) {
					param[np] = decodeURIComponent(troca(c[1],'+',' '));
				} else {
					if (typeof(param[np])=='string') {
						param[np] = new Array(param[np]);
					}
					param[np][param[np].length] = decodeURIComponent(troca(c[1],'+',' '));
					//lert(param[np]);
				}
			}
		}
		//******************************
		function getV() {
			return param;
		}
		//******************************
		this.formToParam = function(ob,strParam) {
			var alvo = getParentByTagName(ob,'form');
			//if (!alvo) return;
			for (var i=0;i<alvo.elements.length;i++) {
				if (alvo.elements[i].name) {
					//lert('i='+i+' ='+alvo.elements[i].name+"= v="+alvo.elements[i].value);
					put(alvo.elements[i].name,alvo.elements[i].value);
				}
			}
			if (strParam) {
				var v = strParam.split('&');
				for (var i=0;i<v.length;i++) {
					var v1 = v[i].split('=');
					if (v1.length==1) {
						param[v1[0]] = null;
					} else {
						param[v1[0]] = v1[1];
					}
				}
			}
		}
		//******************************
		function paramToForm(frm,duplica) {
			for(var prop in param) {
				if (param[prop]!=null) {
					if (duplica || !frm[prop]) {
						frm.appendChild(input(prop,param[prop]));
					} else {
						frm[prop].value = param[prop];
					}
				}
			}
		}
		//******************************
		this.host = function() {
			return substrAtAt(this.url,'://','/');
		}
		//******************************
		this.atalhoJ = function() {
			var r = '';
			for(var prop in paramJ) {
				if (paramJ[prop]==null) {
				} else if (typeof(paramJ[prop])!='object') {
					r += '#'+prop+'='+encodeURIComponent(paramJ[prop]);
				} else {
					for(var p in paramJ[prop]) {
						r += '#'+prop+'='+encodeURIComponent(paramJ[prop][p]);
					}
				}
			}
			//lert(troca(r,'&','\n')+' pg='+param['pg']);
			return r;
		}
		//******************************
		function atalho() {
			var r = '';
			for(var prop in param) {
				if (param[prop]==null) {
				} else if (typeof(param[prop])!='object') {
					//r += '&'+prop+'='+escape(param[prop]);
					r += '&'+prop+'='+encodeURIComponent(param[prop]);
				} else {
					for(var p in param[prop]) {
						//r += '&'+prop+'='+escape(param[prop][p]);
						r += '&'+prop+'='+encodeURIComponent(param[prop][p]);
					}
				}
			}
			return this.url
				+(r.length==0?'':'?'+r.substring(1))
				+eu.atalhoJ()
			;
		}
		//******************************
		function remove(ch) {
			param[ch] = null;
		}
		//******************************
		this.getNum = function(a,b) {
			var r = ''+param[a]; //.localToNumber();
			return isNaN(r)?b:1*r;
		}
		//******************************
		function get(a,b) {
			var r = param[a];
			if (vazio(r) && !nulo(b)) {
				return b;
			}
			return r;
		}
		//******************************
		this.getJ = function(a,b) {
			var r = paramJ[a];
			if (vazio(r) && !nulo(b)) {
				return b;
			}
			return r;
		}
		//******************************
		function refresh() {
			this.put('segs',ms());
			doc.location = this.atalho();
		}
		//******************************
		this.putNum = function (a,b) {
			//lert('set a='+a+' b='+b);
			param[a] = (''+b).localToNumber();
		}
		//******************************
		function put(a,b) {
			//lert('set a='+a+' b='+b);
			param[a] = b;
		}
		//******************************
		this.putJ = function(name,value) {
			//lert('set a='+a+' b='+b);
			paramJ[name] = value;
			if (this.updUrlJ) {
				//lert('atalhoJ'+this.atalhoJ());
				window.location = leftAt(''+window.location,'#')+this.atalhoJ();
			}
		}
		this.setJ = this.putJ;
	}

	//***********************************************************
	function hasClass(ob,estilo) {
		//alert('='+(' '+ob.className+' ').indexOf(' '+estilo+' '));
		return (' '+ob.className+' ').indexOf(' '+estilo+' ')!=-1;
	}
	//***********************************************************
	function estiloAddDel(ob,estilo,ligar1) {
		return classAddDel(ob,estilo,ligar1);
	}
	//***********************************************************
	function classOff(ob,estilo) {
		var vt = ob.className.split(' ');
		var r = '';
		aeval(vt,function(v) {
			if (v!=estilo) {
				r += ' '+v;
			}
		});
		ob.className = r.trimm();
	}
	function classOn(ob,estilo) {
		classAddDel(ob,estilo,true);
	}
	function classAddDel(ob,estilo,ligar1) {
		var d = ' '+ob.className+' ';
		var ligar = ligar1;
		if (nulo(ligar)) {
			//se não informou, inverte sit atual
			ligar = d.indexOf(' '+estilo+' ')==-1;
		}
		var r = ligar;
		if (ligar && d.indexOf(' '+estilo+' ')==-1) {
			d += estilo;
			r = true;
		} else if (!ligar && d.indexOf(' '+estilo+' ')!=-1) {
			d = troca(d,' '+estilo+' ',' ');
			//ebJ('deslig');
			r = false;
		}
		//ebJ(ob.name+' '+ligar1+' = '+ligar+' cl='+ob.className+' cln='+d+' ret='+r);
		d = trimm(d);
		if (ob.className!=d) {
			ob.className = d;
		}
		return r;
	}
	//**************************//
	function repl(str,nv) {
		var r = '';
		for (var i=0;i<nv;i++) {
			r += str;
		}
		return r;
	}
	//**********************
	function trocaTudo(g,a,b) {
		while (g.indexOf(a)!=-1) {
			g = troca(g,a,b);
		}
		return g;
	}
	//**********************
	function trocaChars(g,a,b) {
		for (var i=0;i<a.length;i++) {
			g = troca(g,a.substring(i,i+1),b);
		}
		return g;
	}
	//**********************
	function troca(g,a,b) {
		var i=0,p,ta,tb;
  
		ta = a.length;
		tb = b.length;
		
		try {
  
			while ( (p = g.indexOf(a,i)) > -1 )  {
				g = g.substring(0,p)+b+g.substring(p+ta);
				//,g.length
				i = p - ta + tb + 1;
			}
		} catch (e) {
			alert(erro(e));
		}
  
		return g;
	}

	//****************************************************
	//retorna 1o atributo de parente com nome obj
	function o(obj) {
		return getParentAttr(obj,'obj');
	}
	//****************************************************
	//retorna o filho n do objeto
	function filho(ob,n) {
		var r;
		try {
			r = ob.childNodes.item(n);
		} catch (e) {
		}
		return r;
	}
	//p = filho;
	//***************************************************
	// 1o filho cujo textContent não vazio
	function firstChild(obj) {
		for (var i=0;i<obj.childNodes.length;i++) {
			if ( !vazio(obj.childNodes.item(i).textContent) ) {
				return obj.childNodes.item(i);
			}
		}
	}		
	//***************************************************
	// retorna o parent que possui o attributo setado
	function getParentByClassName(o,cl) {
		var nomeAtr = 'className';
		//obj é evento?
		//lert(o.target+'&&'+o.type);
		//lert(o+' '+o.type);
		if (o && !o.tagName && o.type) { //&& o.target
			o = targetEvent(o);
		}
		var oa = o;
		while (o) {
			if (o.getAttribute && o.getAttribute(nomeAtr) && tst(o.getAttribute(nomeAtr)) ) {
				return o;
			} else if (tst(o[nomeAtr])) {
				return o;
			}
			o = o.parentNode;
		}
		return o;
		function tst(t) {
			//lert(t);
			return (' '+t+' ').indexOf(' '+cl+' ')!=-1;
		}
	}
	//***************************************************
	// retorna o parent que possui o attributo setado
	function getParentAttr(O,nomeAtr,limit) {
		var o = getParentNodeAttr(O,nomeAtr,limit);
		if ( !o ) {
		} else if (o.getAttribute && o.getAttribute(nomeAtr) && o.getAttribute(nomeAtr)!=null ) {
			return o.getAttribute(nomeAtr);
		} else if (o[nomeAtr]) {
			return o[nomeAtr];
		}
		var r;
		return r;
	}	
	//***************************************************
	// retorna o parent que possui o attributo setado
	var getParentByAttr = getParentNodeAttr;
	function getParentNodeAttr(o,nomeAtr,limit) {
		//obj é evento?
		if (o && o.target && o.type) {
			o = targetEvent(o);
		}
		var oa = o;
		while (o) {
			if (o.getAttribute && o.getAttribute(nomeAtr) && o.getAttribute(nomeAtr)!=null ) {
				return o;
			} else if (o[nomeAtr]) {
				return o;
			} else if (limit && o==limit) {
				return null;
			}
			o = o.parentNode;
		}
		return o;
	}

	//**************************//
	function html(a) {
		return troca(troca(a,'<','&lt;'),'>','&gt;');
	}
	//**************************//
	function objLen(o){
		var i=0;
		try {
			for(var prop in o) {
				i++;
			}
		} catch (e) {
			//lert(erro(e));
		}
		return i;
	}
	//**************************//
	function equals(strLonga,strCurta) {
		if (vazio(strCurta) || vazio(strLonga)) return false;
		if (strCurta.length>strLonga.length) return false;
		return (strLonga.substring(0,strCurta.length)==strCurta);
	}
	//**************************//
	function palavraA(tx,a,b) {
		var p=0,pn,t=a.length,pi=0,r = new Array();
		while ((pn=tx.indexOf(a,p))!=-1) {
			r[pi++] = tx.substring(p,pn);
			p = pn + t;
		}
		r[pi++] = tx.substring(p); //,g.length()

		//lert(b);
		if (nulo(b)) {
			return r;
		}
		for (var i=0;i<r.length;i++) {
			//lert(b.length+' '+r[i]);
			r[i] = palavraA(''+r[i],b);
			//lert(r[i].length);
		}
		return r;
	}
	//**************************//
	function leftAt(s,s1) {
		var p = s.indexOf(s1);
		if (p==-1) {
			return s;
		}
		return s.substring(0,p);
	}
	//*****************************************
	function substrRat(g,a) {
		var i = g.lastIndexOf(a);
		if (i<0) return g;
		return g.substring(i+1);
	}
	//*****************************************
	function leftRat(g,a) {
		var i = g.lastIndexOf(a);
		if (i<0) return g;
		return g.substring(0,i);
	}
	//*****************************************
	function substrAtAt(g,a,b) {
		return leftAt(substrAt(g,a),b);
	}
	//*****************************************
	function substrAt(g,a) {
		var i = g.indexOf(a);
		if (i<0) return g;
		return g.substring(i+a.length);
	}

	//**************************************
	function trimm(a,b) {
		var i,t;
		if (typeof(a)=='undefined') {
			return '';
		}
		if (typeof(b)=='undefined') {
			b = ' \n\r\t';
		}
		if (!a.substring) {
			alert(erro('trimm: not function substring: '+typeof(a)));
			return '';
		}
		//retira do inicio
		t = a.length-1;
		if (t<0) return a;
		i = 0;
		while (i<t & b.indexOf(a.substring(i,i+1))>-1) i++;
		if (i!=0) a = a.substring(i,t+1);
		//retira do fim
		t = a.length;
		if (t<1) return a;
		i = t-1;
		while (i>-1 && b.indexOf(a.substring(i,i+1))>-1) i--;
		if (i!=t-1) a = a.substring(0,i+1);
		return a;
	}
	//**************************//
	function right(s,t) {
		return s.substring(s.length-t,s.length);
	}

	//*********************************
	function targetEvent(ev) {
		if (ev.value && ev.tagName) {
			return ev;
		}
		var v = Array('target','srcElement','originalTarget','currentTarget',
		'explicitOriginalTarget','relatedTarget');
		//localiza obj destino
		for (var i=0;i<v.length;i++) {
			try {
				var o = ev[v[i]];
				if (o!=null) {
					return o;
				}
			} catch (e) {
			}
		}
		return null;
	}


	//***************************************************
	//
	function getElementsByClassName(doc,val) {
		if (doc.getElementsByClassName) {
			return doc.getElementsByClassName(val);
		}
		if (!val) {
			val = doc;
			doc = document;
		}
		return getElementsByAttr(doc
			,'class'+(browse.ie?'Name':'')
			,function(x){return (' '+x+' ').indexOf(' '+val+' ')!=-1;}
		);	
	}
	//***************************************************
	//
	function getElementsByAttr(obj,nome,val,arr) {
		if (nulo(arr)) {
			arr = new Array();
		}
		try {
			var v = obj.getAttribute(nome);
		} catch (e) {
		}
		if ( typeof(val)=='function' ? val(v)  : v && (nulo(val) || v==val) ) {
			//ebJ('achei...: '+obj.tagName+' '+v);
			arr[arr.length] = obj;
		}
		if (obj.childNodes && obj.childNodes.length>0) {
			for (var i=0;i<obj.childNodes.length;i++) {
				getElementsByAttr(obj.childNodes.item(i),nome,val,arr);
			}
		}
		return arr;
	}
	//***************************************************
	// retorna child atributo
	function getChildAttr(obj,nome) {
		var o = getChildByAttr(obj,nome);
		if (o) {
			return o.getAttribute(nome);
		}
		return null;
	}
	//***************************************************
	// retorna obj child que possua o atributo
	function getChildByAttr(obj,nome) {
		try {
			var v = obj.getAttribute(nome);
		} catch (e) {
		}
		if ( v  ) {
			return obj;
		}
		if (obj.childNodes && obj.childNodes.length>0) {
			for (var i=0;i<obj.childNodes.length;i++) {
				var o = getChildByAttr(obj.childNodes.item(i),nome);
				if (o) return o;
			}
		}
		return null;
	}
	//***************************************************
	function getProxByTagName(o,nome) {
		nome = nome.toUpperCase();
		//while ((o=o.parentNode) && o.tagName.toUpperCase()!=nome);
		while (o) {
			if (o.tagName && o.tagName.toUpperCase()==nome) {
				return o;
			}
			//procura nos filhos
			var v = o.getElementsByTagName(nome);
			if (v.length>0) {
				return v[0];
			}
			o = o.parentNode;
		}
		return o;
	}
	//***************************************************
	function getParentByTagName(o,nome,limit) {
		nome = nome.toUpperCase();
		//while ((o=o.parentNode) && o.tagName.toUpperCase()!=nome);
		while (o) {
			if (o.tagName && o.tagName.toUpperCase()==nome) {
				return o;
			} else if (limit && limit==o) {
				return null;
			}
			o = o.parentNode;
		}
		return o;
	}
	//*******************************//
	function vazio(a) {
		try {
			//if ((a==null || isNaN(a) || typeof(a)=='undefined')) {
			if (a==null || typeof(a)=='undefined') {
				return true;
			} else if (typeof(a)=='string') {
				return trimm(a)=='';
			} else if (typeof(a)=='number') {
				return isNaN(a);
			} else if (typeof(a)=='object') {
				return a == {};
			} else {
				return false;
			}
		} catch (e) {
			//lert('erro testando vazio(): '+erro(e)+' obj='+a);
			//objNav(e);
			return true;
		}
	}
	//*******************************//
	function nulo(a) {
		return ( typeof(a)=='undefined' || a==null );
	}

	//*******************************//
	function alertErro(e,s) {
		if(typeof(e)=='string') {
			var x=e;
			e=s;
			s=x;
		}
		alert('dev: "'+s+'" ERRO=<'+erro(e)+'>');
	}
	//*******************************//
	function erro(e) {
		//objNav(e);
		//http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Error
		if (typeof(e)=='string' || typeof(e)=='undefined') {
			//return (e+' (string)');
			e = new Error(''+e);
		}
		return 'Erro='
			+e.name
			+(browse.ie?' ('+e.number+')':'')
			+' '+e.message
			+' '+(browse.ie?' '+e.description:'')
			+(!browse.ie?(''+e.stack).replace('\n','\n\n'):'')
		;
		//return 'erro='+troca(''+e.stack,'@','\n');
	}

	//*********************************
	var _debJ = 0;
	//*********************************
	//texto e opcionalmente nome monitor
	function debJ(str,mon) {
		var jan = browse.getId('debJ');
		if (vazio(jan)) {
			//lert('criar div para debug J');
			var css = document.createElement('style');
			css.innerHTML = 'DIV.debJ {border: 4px double #C83800;overflow: auto;'
				+'padding: 5px 10px;position:fixed;'
				+'width: 500px;left: -490px;height: 300px;bottom: -290px;'
				+'background-color: #00A068;}'
				+'DIV.debJ:hover {left: 0; bottom: 0;}'
			;
			document.body.appendChild(css);
			var jan = document.createElement('div');
			jan.className = 'debJ';
			jan.id = 'debJ';
			//no caso de touch 
			jan.addEventListener('click',function(ev){var o=targetEvent(ev);setCSS(o,'left','0');setCSS(o,'bottom','0');},true);
			jan.innerHTML = '<div  class="debJMon"></div>';
			document.body.appendChild(jan);
		}
		if (!mon) {
			jan.innerHTML = ((''+str).indexOf('<')!=-2?'<p>'+(_debJ++)+' '+troca(html(str),'\n','<br>')+'</p>':str) 
				+'<hr>'+ jan.innerHTML;
			return;
		}
		//procura por monitor dentro da janela
		var monG = getElementsByClassName(jan,'debJMon')[0];
		var mon1 = getElementsByClassName(monG,'debJMon_Item'+mon)[0];
		// lert(mon+' g='+monG+' 1='+mon1);
		if (!mon1) {
			var mon1 = document.createElement('div');
			mon1.className = 'debJMon_Item debJMon_Item'+mon;
			mon1.title = mon;
			monG.appendChild(mon1);
		}
		mon1.innerHTML = str;
	}

	//funcoes DEBUG
	//**************************//
	function objNav(ob,jan) {
		if (typeof(jan)!='undefined') {
			//this.filtro = o;
			this.o = ob;
			this.jan = jan;
			//metodos
			this.mostra = mostra;
			this.filtrar = filtrar;
			this.pula = pula;
			this.mItem = mItem;
			this.item = item;
			//this.mostra();
		} else {
			init(ob);
		}
		//**************************//
		function mItem(prop,z) {
			var r='';
			var t = typeof(z);
			if (t=='function' && (''+z).length>40) {
				z = ''+z;
				z = z.substring(0,40)+'...(+'+z.length+')';
			}
			if (!this.tp[t]) {
				this.tp[t] = 0;
			}
			this.tp[t]++;
			if (!this.filtro || t==this.filtro) {
				r += '<tr><td><font size=2 color=darkgreen><b>'+t+'</b></font> '
				+'<a href=javascript:este.pula("'+prop+'");>'+prop+'</a>: '
				+'<font size=2>'+(t=='string' || t=='function'?html(''+z):z)
				;
			}
			if (t=='function' && ''+prop=='item') {
				//lert('item...');
				r += this.item();
			}
			return r;
		}
		//**************************//
		function item() {
			//lert('item');
			var r = '';
			for (var i=0;i<this.o.length;i++) {
				r += this.mItem('item_'+i+'',this.o.item(i));
			}
			return r;
		}
		//**************************//
		function pula(o) {
			var ds;
			if (o.substring(0,5)=='item_') {
				ds = this.o.item(1*o.substring(6));
			} else {
				ds = this.o[o];
			}
			objNav(ds);
		}
		//**************************//
		function init(o) {
			if (vazio(o)) {
				this.tit = 'objeto VAZIO...';
			} else {
				this.tit = (o.name?' '+o.name:'')
					+(o.tagName?' '+o.tagName:'')
					+' '+o
				;
			}
			var r = '<html><head><title>'
				+this.tit+' - objNav </title></head>'
			+'<script language="JavaScript" '
			+'src="/js/funcoes.js"></script>'
			+'<body><table border=1><tr><td>'
			+'<font size=3>Objeto: <font color=red>'+o
			+'<tr><td id=dad>'
			+'</table>'
			+'<scr'+''+'ipt>var este1;'
			+' function objNavInit() {'
			//+'  lert("teste o"+este);'
			+'  este.mostra();'
			//+'  este=new objNav();'
			//+'  //lert(objNav);'
			+' }'
			+' setTimeout("objNavInit();",1000);'
			+'</scr'+''+'ipt>'
			+'</body>'
			+'</html>'
			;
			//lert('objnav: ');
			//lert(objNav);
			//objA(window.document.objNav);
			var w = window.open('about:blank','_blank',
				'width=600,height=700,resizable=yes,scrollbars=yes,status=1'
			);
			//lert(window);
			try {
				w.document.write(r);
				//w.objNav = objNav;
				//objNavAlvo = o;
				//var zzz;
				w.este = new objNav(o,w);
			} catch (e) {
				alertErro(e);
			}
		}
		//**************************//
		function filtrar(f) {
			if (typeof(f)!='string') {
				alert('filtro por chave');
				return;
			}
			this.filtro = f;
			this.mostra();
		}
		//**************************//
		function mostra() {
			this.tp = new Array;
			var o = this.o;
			var filtro = this.filtro;
			var i=0,z;
			var r = '';
			for(var prop in o) {
				try {
					z = o[prop];
					//z = objNavR(prop);
					//z = eval('este.o.'+prop);
				} catch (e) {
					z = '?erro:'+e;
					//objA(o);
					//alertErro(e);
					//break;
				}
				r += this.mItem(prop,z);
				i++;
				if (i>200) break;
			}
			//mostra totais por tipo
			var r1 = '<tr><td colspan=2><b>'+i
			+' (limite 200) </b>';
			r1 += '(<b><a href=javascript:este.filtrar("");>'
			+'Todos</a></b>='+i+') ';
			for(var prop in this.tp) {
				var z = this.tp[prop];
				r1 += '(<b><a href=javascript:este.filtrar("'+prop+'");>'
				+prop+'</a></b>='+z+') ';
			}
			r1 += '<br><b>Chave</b>: '
			+'<input size=10 onChange=este.filtrar(this)>';
			r = '<table border=1>'+r1+r+'</table>FIM...';
			//var w = window.open('about:blank','_blank',
			// 'width=400,height=700,resizable=yes,scrollbars=yes,status=0'
			//);
			//w.document.write(r);
			var ds=browse.getId('dad',this.jan.document);
			ds.innerHTML = r;
   
			return r;
		}
	}
	//**************************//
	function objA(o,filtro) {
		var r = '';
		var i=0,tp=new Array(),z;
		for(var prop in o) {
			try {
				z = o[prop];
			} catch (e) {
				z = '?erro:'+e;
			}
			var t = typeof(z);
			if (!tp[t]) tp[t] = 0;
			tp[t]++;
			if (!filtro || t==filtro) {
				r += ''+t.substring(0,2)+': '
				+prop+' = '+z+'\n';
			}
			i++;
			if (i>200) break;
		}
		return r;
	}
	//**************************//
	function obj(o,filtro,lim) {
		lim = (lim?lim:200);
		var r = '<html><body><table border=1>';
		var i=0,tp=new Array(),z;
  
		for(var prop in o) {
			try {
				z = o[prop];
			} catch (e) {
				z = '?erro:'+e;
			}
			var t = typeof(z);
			if (!tp[t]) tp[t] = 0;
			tp[t]++;
			if (!filtro || t==filtro) {
				r += '<tr><td>'+t.substring(0,2)+': '
				+prop+'<td>'+(t=='string'?html(''+z):z);
			}
			i++;
			if (i>lim) break;
		}
		r += "<tr><td>Total (limite "+lim+")<td>"+i
		+'<tr><td><b>Tipos:</b><td>';
		for(var prop in tp) {
			var z = tp[prop];
			r += '(<b>'+prop+'</b>='+z+') ';
		}
		r += '</table>';
		var w = window.open('about:blank','_blank',
		'width=400,height=700,resizable=yes,scrollbars=yes,status=0'
		);
		w.document.write(r+'</body></html>');
  
		return r;
	}
	//fim func DEBUG

	//**************************//
	//**************************//
	var browse = new (function() {
		var eu = this;
		this.NS6 = false;
		this.NS4 = false;
		this.IE4 = false;

		var nav = navigator.userAgent.toLowerCase();
		this.mobile = nav.indexOf('mobile')!=-1;

		if (document.getElementById && !document.all) {
			this.NS6 = true;
			this.nav = "NS6";
		} else {
			if (document.layers) {
				this.NS4 = true;
				this.nav = "NS4";
			} else {
				if (document.all) {
					this.IE4 = true;
					this.nav = "IE4";
					this.IE6 = navigator.appVersion.indexOf('MSIE 6')!=-1
						|| navigator.appVersion.indexOf('MSIE 5')!=-1
					;
				}
			}
		}
		this.ie = this.IE4;
		setTimeout(function() {
			eu.ie6 = document.documentElement 
				&& 	( document.documentElement.clientWidth 
					|| document.documentElement.clientHeight)
			;}
		,0);
		//this.moz = this.IE6
		this.moz = navigator.userAgent.toLowerCase().indexOf("gecko")!=-1;
		this.fir = navigator.userAgent.toLowerCase().indexOf("firefox")!=-1
			|| navigator.userAgent.toLowerCase().indexOf("icewea")!=-1
		;
		this.win = navigator.userAgent.toLowerCase().indexOf("windows")!=-1;
		this.lin = navigator.userAgent.toLowerCase().indexOf("linux")!=-1;
	 
		var x = new Array("getId","mostra","esconde","getAbsX","getAbsY"
		,"setX","setY","getX","getY","getTX","getTY","getDocFrame"
		,"visivel","eventoX","eventoY","tamWinX","tamWinY","cssRules","setTX","setTY");
		for (var i=0;i<x.length;i++) {
			this[x[i]] = eval('obj_'+x[i]+this.nav);
		}
		//lert("obj criado"+this);
		//lert("obj criado"+this.getId);
	 
		//**************************//
		//campos uso geral
		//**************************//
		this.MostraEsconde = obj_MostraEsconde;

		//**************************
		this.isScrolledIntoView = function(elem) {
			 var docViewTop = $(window).scrollTop();
			 var docViewBottom = docViewTop + $(window).height();

			 var elemTop = $(elem).offset().top;
			 var elemBottom = elemTop + $(elem).height();

			 return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		}
		//**************************
		this.aceitaFoco = function(o) {
			try {
				var t = o.tagName.toLowerCase();
				if (t=='input' || t=='textarea' || t=='select') {
					return true;
				}
			} catch (e) {
			}
			return false;
		}
		//**************************
		function obj_tamWinYNS6(o) {
			if (vazio(o)) {
				o = window;
			}
			return o.outerHeight;
		}
		function obj_tamWinYIE4(o) {
			if (vazio(o)) {
				//lert('peg atual win');
				o = window;
			}
			if (this.ie6) {
				var r = o.document.documentElement.clientHeight;
				//lert('ie6='+this.ie6+' tam='+r+' '+);
				return r;
			} else {
				return o.screen.availHeight;
			}
		}
	 
		function obj_MostraEsconde(id) {
			var o = this.getId(id);
			if (this.visivel(o)) {
				this.esconde(o);
			} else {
				this.mostra(o);
			}
		}
		//**************************//
		function obj_cssRulesNS6(o) {
			return o.cssRules;
		}
		function obj_cssRulesIE4(o) {
			return o.rules;
		}
		//**************************//
		function obj_tamWinXNS6(o) {
			if (vazio(o)) {
				o = window;
			}
			return o.outerWidth;
		}
		function obj_tamWinXIE4(o) {
			if (vazio(o)) {
				o = window;
			}
			//lert(this.IE6==true+' '+document.documentElement.clientWidth);
			if (document.body.clientWidth) {
				return o.document.body.clientWidth;
			} else if (this.ie6) {
				return o.document.documentElement.clientWidth;
			} else {
				return o.screen.availWidth;
			}
			//return o.document.body.offsetWidth;
		}
		//**************************//
		function obj_eventoYNS6(o) {
			return o.layerY;
			//client retoran a pos sem scroll?
			//return o.clientY;
		}
		function obj_eventoYNS4(o) {
			return o.y;
		}
		function obj_eventoYIE4(o) {
			//return o.clientY;
			//lert('a');
			var e = targetEvent(o);
			return o.offsetY+browse.getAbsY(e);
			//return -1;
		}
		//**************************//
		function obj_eventoXNS6(o) {
			//lert(o.offsetWidth);
			return o.clientX;
			//return o.layerX;
		}
		function obj_eventoXNS4(o) {
			return o.x;
		}
		function obj_eventoXIE4(o) {
			//lert(o.offsetWidth);
			//return o.clientX+o.offsetX;
			//return o.screenX+o.offsetX;
			return o.clientX;
			//return -1;
		}
		//**************************//
		function obj_getTXNS6(o) {
			//lert(o.offsetWidth);
			try {
				return o.offsetWidth;
			} catch (e) {
				alert(erro(e));
			}
		}
		function obj_getTXNS4(o) {
			return -1;
		}
		function obj_getTXIE4(o) {
			//lert(o.offsetWidth);
			return o.offsetWidth;
		}
		//**************************//
		function obj_setTXNS6(o,v) {
			o.style.width = v;
		}
		function obj_setTXNS4(o,v) {
			return -1;
		}
		function obj_setTXIE4(o,v) {
			o.style.width = v;
		}
		//**************************//
		function obj_setTYNS6(o,v) {
			o.style.height = v;
		}
		function obj_setTYNS4(o,v) {
			return -1;
		}
		function obj_setTYIE4(o,v) {
			try {
				o.style.height = v;
			} catch (e) {
				alert(erro(e));
			}
		}
		//**************************//
		function obj_getTYNS6(o) {
			return o.offsetHeight;
		}
		function obj_getTYNS4(o) {
			return -1;
		}
		function obj_getTYIE4(o) {
			return o.offsetHeight;
		}
		//**************************//
		function obj_getIdNS6(id,ob) {
			if (typeof(ob)=='undefined') ob = document;
			if (!ob.getElementById) {
				return getId(ob,id);
			}
			return ob.getElementById(id);
		}
		function obj_getIdNS4(id) {
			var r = document.layers[id];
			return r;
		}
		function obj_getIdIE4(id,ob) {
			if (typeof(ob)=='undefined') ob = document;
			return ob.all[id];
		}
	 
		//**************************//
		function obj_getXNS6(o) {
			return o.style.left;
		}
		function obj_getXNS4(o) {
			return o.x;
		}
		function obj_getXIE4(o) {
			return o.style.pixelLeft;
		}
		//**************************//
		function obj_getYNS6(o) {
			return o.style.top;
		}
		function obj_getYNS4(o) {
			return o.y;
		}
		function obj_getYIE4(o) {
			return o.style.pixelTop;
		}
		//**************************//
		function obj_setXNS6(o,p) {
			if (!o.style) {
				objNav(o);
				alert(erro());
			}
			o.style.left = p+'px';
		}
		function obj_setXNS4(o,p) {
			o.x = p;
		}
		function obj_setXIE4(o,p) {
			try {
				o.style.pixelLeft = p;
			} catch (e) {
				objNav(o);
			}
			//+'px';
		}
		//**************************//
		function obj_setYNS6(o,p) {
			o.style.top = p+'px';
		}
		function obj_setYNS4(o,p) {
			o.y = p;
		}
		function obj_setYIE4(o,p) {
			o.style.pixelTop = p; 
			//+'px';
		}
		//**************************//
		function obj_visivelNS6(o) {
			return o.style.visibility == "visible";
		}
		function obj_visivelNS4(o) {
			return o.visibility == "show";
		}
		function obj_visivelIE4(o) {
			return o.style.visibility == "visible";
		}
		//**************************//
		function obj_mostraNS6(o,b) {
			//lert('o='+o.innerHTML);
			if (typeof(o)=='string') o = browse.getId(o);
			if (o.getAttribute('disp')) {
				o.style.display = 'block';
			} else {
				o.style.visibility = "visible";
				if (''+b=='undefined') o.style.display = '';
			}
		}
		function obj_mostraNS4(o) {
			if (typeof(o)=='string') o = browse.getId(o);
			o.visibility = "show";
		}
		function obj_mostraIE4(o,b) {
			if (typeof(o)=='string') o = browse.getId(o);
			o.style.visibility = "visible";
			if (''+b=='undefined') o.style.display = '';
		}
		//**************************//
		function obj_escondeNS6(o,b) {
			if (typeof(o)=='string') o = browse.getId(o);
			if (!o || !o.getAttribute) {
				alert(erro('obj_escondeNS6'));
				return;
			}
			if (o.getAttribute('disp')) {
				o.style.display = 'none';
			} else {
				o.style.visibility = "hidden";
				if (''+b=='undefined') o.style.display = 'none';
			}
		}
		function obj_escondeNS4(o,b) {
			if (typeof(o)=='string') o = browse.getId(o);
			o.visibility = "hide";
		}
		function obj_escondeIE4(o,b) {
			if (typeof(o)=='string') o = browse.getId(o);
			try {
				o.style.visibility = "hidden";
			} catch (e) {
			}
			try {
				if (''+b=='undefined') o.style.display = 'none';
			} catch (e) {
			}
		}
		//**************************//
		function obj_getAbsXNS6(o) {
			try {
				var a=o.offsetParent;
				if ((""+a).substring(0,4)=="[obj") {
					// & (""+a).indexOf("HTMLBodyElement")==-1) 
					//rr += "* "+a;
					return o.offsetLeft + obj_getAbsXNS6(a);
				} else {
					return o.offsetLeft;
				}
			} catch (e) {
				alertDev(erro(e));
			}
		}
		function obj_getAbsXNS4(o) {
			return o.x;
		}
		function obj_getAbsXIE4(o) {
			var a=o.offsetParent;
			if ((""+a).substring(0,4)=="[obj") {
				return o.offsetLeft + obj_getAbsXIE4(a);
			} else {
				return o.offsetLeft;
			}
		}
		//**************************//
		function obj_getDocFrameNS6(o) {
			return o.contentDocument;
		}
		//**************************//
		function obj_getDocFrameNS4(o) {
			alert("nao sei getDocFrameNS4");
			return o.contentDocument;
		}
		//**************************//
		function obj_getDocFrameIE4(o) {
			//lert("nao sei getDocFrameIE4"+obj(o.ownerDocument));
			return o.ownerDocument;
		}
		//**************************//
		function obj_getAbsYNS6(o) {
			var a=o.offsetParent;
			if ((""+a).substring(0,4)=="[obj") {
				return o.offsetTop + obj_getAbsYNS6(a);
			} else {
				return o.offsetTop;
			}
		}
		function obj_getAbsYNS4(o) {
			return o.y;
		}
		function obj_getAbsYIE4(o) {
			return obj_getAbsYNS6(o);
		}
	})();

}
