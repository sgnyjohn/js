/* 
	.querySelectorAll()
	.closest()
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

***

 [ O big data dispõe somente de uma forma muito primitiva de conhecimento,
	a saber, a correlação: acontece A, então ocorre B. Não há 
	nenhuma compreensão. A Inteligência Artificial não pensa.
	A Inteligência Artificial não sente medo.
	
	Byung-Chul Han

	https://brasil.elpais.com/cultura/2021-10-09/byung-chul-han-o-celular-e-um-instrumento-de-dominacao-age-como-um-rosario.html
 ]

*/



//if (true) {
	//***********************************************
	// add style id 
	
	var fSort = Lib.fSort;

	var contextDiv = Dom.dialog;

	var isEvent = Dom.isEvent;

	var addStyleId = Dom.addStyleId;

	var strZero = Lib.strZero;

	//**************************//
	var strToData = Tempo.fromStr;
	var strToDate = strToData;

	var aeval = Lib.aeval;

	//**************************//
	var ms = Tempo.ms;

	var styleSet = Dom.styleSet;
	var setCss = styleSet;

	var objNav = Deb.nav;
	var alertErro = Lib.alertErro;


	//**************************//
	var dateSql = Tempo.dataSort;
	var dataSql = Tempo.dataSort;


	//**************************//
	var objText = Obj.toText;
	//**************************//
	var textObj = Obj.fromText;

	//***********************************************
	var getElementIndex = Dom.getElementIndex;

	//***********************************************
	var mergeOptions = Lib.optionsMerge;
	var mergeOptionsM = Lib.optionsMergeM;

	var domObj = Dom.obj;

	//***************************************************
	// retorna o valor do attributo na tag ou parent
	var getParentAttr = Dom.getParentAttr;
	//***************************************************
	// retorna o parent que possui o attributo 
	var getParentByAttr		= Dom.getParentByAttr;
	var getParentNodeAttr	= Dom.getParentByAttr;



	var browse = {};	
	var _c = console.log;
	var planetas = '☿ Mercúrio	♀ Vênus	⊕ Terra	♂ Marte	♃ Júpiter	♄ Saturno	♅ Urano	♆ Netuno';


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
		var param = {};
		var paramJ = {};
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
		this.getHash = () => {
			return param;
		}
		this.getV = this.getHash;
		//******************************
		this.getHashJ = () => {
			return paramJ;
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
						//frm.appendChild(input(prop,param[prop]));
						alert('migra adv... func input não existe');
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



	//***********************************************
	// escape
	function escape1(val) {
		return encodeURIComponent(val);
	}
	//***********************************************
	function Uri(uri) {
		var vs = 'prot :// user : pass @ serv : port / path'.split(' ');
		//prot
		this.prot = "imaps";
		var p = uri.indexOf("://");
		if (p!=-1) {
			this.prot = uri.substring(0,p);
			uri = uri.substring(p+3);
		}
		// serv e user
		p = uri.lastIndexOf("@");
		this.serv = uri.substring(p+1);
		this.user = uri.substring(0,p);
		//path
		this.path = "";
		p = this.serv.indexOf("/");
		if (p!=-1) {
			this.path = this.serv.substring(p);
			this.serv = this.serv.substring(0,p+1);
		}
		//port
		this.port = 143;
		p = this.serv.indexOf(":");
		if (p!=-1) {
			this.port = 1*this.serv.substring(p+1);
			this.serv = this.serv.substring(0,p);
		}
		//pass
		this.pass = "";
		p = this.user.indexOf(":");
		if (p!=-1) {
			this.pass = this.user.substring(p+1);
			this.user = this.user.substring(0,p);
		}
		//decod params
		aeval(vs,(v,n) => {
			if (n%2==0&&n!=0) this[v] = decodeURIComponent(this[v]);
		});
		//===
		this.getUri = () => {
			var r = this.prot;
			aeval(vs,(v,n) => {
				if (n%2==0&&n!=0&&!vazio(this[v])) 
					r += vs[n-1]+encodeURIComponent(this[v])
				;
			});
			return r;
		}
	}
	
	//***********************************************
	// object or json - return prop path del by .
	function getObjPath(obj,path) {
		if (!Lib.isStr(path)) {
			//pode pedir para somar vários caminhos.
			var objR = [];
			aeval(path,(ph)=>{
				var o = getObjPath(obj,ph);
				debJ('ph='+ph+' obj='+o);
				if (typeof(o)!='undefined') aeval(o,(oo)=>{objR[objR.length]=oo});
			});
			debJ(path+' ret tm='+objR.length);
			return objR;
		} else {
			var v = path.split('.');
			for (var i=0;typeof(obj)!='undefined'&&i<v.length;i++) {
				obj = obj[v[i]];
				if (typeof(obj)=='undefined') deb('erro path i='+i+' '+path,obj);
			}
			return obj;			
		}
	
	}
	//***********************************************
	// object or json - return props and parent
	function getByProp(obj,propName) {
		var r = {};
		function a(obj,propName,r) {
			for (k in obj) {
				if (k==propName) {
					r[r.length] = {o:obj[k],p:obj};
				} else if (typeof(obj[k])=='object') {
					getByProp(obj[k],propName,r);
				}
			}
		}
		return a(obj,propName,r);
	}
	//***********************************************
	function isDom(o) {
		return o && o.tagName;
	}
	//***********************************************
	function tempo(dif) {
		//dif = dif/1000;
		var ar = (x)=>{return Math.floor(x+0.5)};
		var sg = ar(dif%60);dif = dif/60;
		var mi = ar(dif%60);dif = dif/60;
		var hr = ar(dif%24);
		var di = ar(dif/24);
		return (di>0?di+"d ":"")
			+(hr>0?hr+"h ":"")
			+(mi>0?mi+"m ":"")
			+sg+"s "
		;
	}
	//***********************************************
	function asearch(obj,prp,vl) {
		for (var i=0;i<obj.length;i++) {
			//debJ(prp+'='+v[prp]+'='+vl+'=>'+(v[prp]==vl));
			if (obj[i][prp] == vl) return obj[i];
		}
	}
	//***********************************************
	//recriando o jquery ?
	function q(str) {
		var vDom;
		if (typeof(str)=='string') {
			vDom = document.querySelectorAll(str);
		} else if ( typeof(str.length)!='undefined' && str.length>0 ) {
			//array
			//lert(str.length);
			vDom = str;
		} else {
			vDom = [str];
		}
		//lert(str+' '+vDom);
		return new obj(vDom);
		//dom to obj
		function obj(VDom) {
			//ebJ('ob '+str+' '+VDom.length);
			var vDom = VDom;
			//******************************************
			// executa func 
			this.eval = function(fun) {
				for (var i=0;i<vDom.length;i++) {
					fun(vDom[i],i);
				}
			}			
			//******************************************
			// retorna txt.
			this.txt = function() {
				function domTxt(dom) {
					var tn = dom.tagName?dom.tagName.toUpperCase():'';
					var dl=' ';
					if (tn=='P'||tn=='TABLE'||tn=='TBODY'||tn.charAt(0)=='H') {
						dl='\n';
					} else if (tn=='TR') {
						dl='\t';
					}
					var r = '';
					if (dom.childNodes&&dom.childNodes.length>0) {
						for (var i=0;i<dom.childNodes.length;i++) {
							r += dl+domTxt(dom.childNodes.item(i));
						}
						//lert('tn='+tn+' '+r);
						return r.substring(dl.length);
					}
					return dom.textContent;
				}
				var r = '';
				aeval(vDom,(dom)=>{
					r += '\n'+domTxt(dom);
				});
				return r.substring(1);
			}
			//******************************************
			// add event
			this.event = function(str,fun,bole) {
				aeval(vDom,(dom)=>{
					//lert(str+' '+dom);
					dom.addEventListener(str,fun,bole);
				});				
				return vDom.length;
			}
			//******************************************
			//******************************************
			// add dom, obj ou html
			this.add = function(oh) {
				if (!Lib.isDom(oh))
					oh = domObj(oh);
				aeval(vDom,(dom)=>{
					r = dom.appendChild(oh);
				});
				return oh;
			}
			//******************************************
			// set html
			this.h = function(html) {
				var r = '';
				aeval(vDom,(dom)=>{
					if (Lib.isStr(html)) dom.innerHTML = html
					else r += dom.innerHTML+'\n\n';
				});
				return html?html:r;
			}
			//******************************************
			// seta prp{} com seus vlrs
			// ou seta no estiloStr prp op{} e seus valores
			// ou setaStr prp com opStr
			this.css = function(prp,op) {
				var stn;
				if (typeof(prp)=='string') {
					if (typeof(op)=='object') {
						//setar em tagName=style
						stn = prp;
						prp = op;
					} else {
						//transf em obj
						var r = {};
						r[prp] = op;
						prp = r;
					}
				}
				if (stn) {
					//tag style
					aeval(vDom,(dom)=>{
						var ob1 = new oObj(dom.innerHTML,'}','{');
						ob = new oObj(ob1.get(stn));
						for (ch in prp) {
							//ebJ(str+' '+dom+' '+ch+'='+prp[ch]);
							ob.set(ch,prp[ch]);
						}
						//ebJ(str+' '+dom+' '+ob.text());
						ob1.set(stn,ob.text());
						dom.innerHTML = ob1.text();
					});
				} else {
					//attributos style
					aeval(vDom,(dom)=>{
						var ob = new oObj(dom.style.cssText);
						for (ch in prp) {
							//ebJ(str+' '+dom+' '+ch+'='+prp[ch]);
							ob.set(ch,prp[ch]);
						}
						//lert(str+' '+dom+' '+ob.text());
						dom.style.cssText = ob.text();
					});
				}
			}
		}
		//texto <==> obj
		function oObj(tx,Dl1,Dl2) {
			var dl1 = Dl1?Dl1:';';
			var dl2 = Dl2?Dl2:':';
			var obj = {};
			aeval(tx.split(dl1),(x)=>{
				var p = x.indexOf(dl2);
				obj[ trimm(x.substring(0,p)) ] = trimm(x.substring(p+1));
			});
			// set prp
			this.set = (p,v) => {
				obj[p] = v;
			}
			// obj => text
			this.text = () => {
				var r = '';
				for (ch in obj) {
					if (!vazio(ch)) r += ch+dl2+' '+obj[ch]+dl1;
				}
				return r;
			}
		}
	}



	//////////////////////
	// lixo, permissa errada, o 
	// correto é q há 2 maneiras de acentuar em utf8,
	// além do normal há os acentos postecipados (que "embutem" backspace)
	/*function isoToUtf(str) {
		//poe em obj html e pega innerhtml
		var r = domObj({tag:'p','':str}).innerHTML;
		var t = '';
		aeval(r,(a)=>{t+=decToHex(a.charCodeAt(0))+'='+a+' ';})
		debJ('isoToUtf: '+str
			+'\n'+t
		);
		alert('debj t='+t);
		return r;
		function getHash() {
			var ch = 'isoToUtfHash';
			var gl = global(ch);
			if ( gl[ch] ) {
				return gl[ch];
			}
			var toBin=(c)=>{
				var v = c.split(' ');
				var r = '';
				aeval(v,(x)=>{
					r += String.fromCharCode(hexToDec(x));
				});
				return trimm(r);
			}
			//tab conv copy from html
			var vUtf=toBin('61 3A E1 E2 E3 E0 0A 65 3A E9 EA 0A 69 3A ED 0A 6F 3A F3 F4 F5 0A 75 3A FA FC 0A 63 3A E7 0A 41 3A C1 C2 C3 C0 0A 45 3A C9 CA 0A 49 3A CD 0A 4F 3A D3 D4 D5 0A 55 3A DA DC 0A 43 3A C7 0A');
			//tabela conv arquivo disco = web?
			var vUtf=toBin('61 3a c3 a1 c3 a2 c3 a3 c3 a0 0a 65 3a c3 a9 c3 aa 0a 69 3a c3 ad 0a 6f 3a c3 b3 c3 b4 c3 b5 0a 75 3a c3 ba c3 bc 0a 63 3a c3 a7 0a 41 3a c3 81 c3 82 c3 83 c3 80 0a 45 3a c3 89 c3 8a 0a 49 3a c3 8d 0a 4f 3a c3 93 c3 94 c3 95 0a 55 3a c3 9a c3 9c 0a 43 3a c3 87 0a').split('\n');
			//iso
			var vIso=toBin('61 3a e1 e2 e3 e0 0a 65 3a e9 ea 0a 69 3a ed 0a 6f 3a f3 f4 f5 0a 75 3a fa fc 0a 63 3a e7 0a 41 3a c1 c2 c3 c0 0a 45 3a c9 ca 0a 49 3a cd 0a 4f 3a d3 d4 d5 0a 55 3a da dc 0a 43 3a c7 0a').split('\n');
			if (vUtf.length!=vIso.length) {
				alert('ERRO 1 isotoutf '+vUtf.length+' '+vIso.length);
				return;
			}
			r = {};
			for (var i=0;i<vUtf.length;i++) {
				var tu=vUtf[i];
				var ti=vIso[i];
				var semAcento = leftAt(tu,':');
				if (semAcento != leftAt(ti,':')) {
					alert('ERRO 2 isotoutf '+semAcento+' != '+leftAt(ti,':'));
					return;
				}
				if ( (tu.length-2)/(ti.length-2) != 2 ) {
					alert('ERRO 3 isotoutf '+((tu.length-2)/(ti.length-2))+' != 2 ti='+ti+' tu='+tu);
					return;
				}
				for (var c=2;c<tu.length;c+=2) {
					deb(i+' '+c+' add '+ti.substring(c/2+1,c/2+2)+'=>'+tu.substring(c,c+2));
					r[ti.substring(c/2+1,c/2+2)] = tu.substring(c,c+2);
				}
			}
			//lert('hash ok '+r);
			gl[ch] = r;
			return r;
		}
		var r = '';
		var h = getHash();
		for (var i=0;i<str.length;i++) {
			var c = str.charAt(i);
			r += h[c]?h[c]:c;
		}
		//lert('fim '+str.length+' => '+r.length);
		return r;
	}
	*/


	//################################
	// return index for prop
	function index(obj,prop) {
		if (typeof(obj)!='object') return false;
		var r = {};
		for (k in obj) {
			var k1 = obj[k][prop];
			if (typeof(k1)!='undefined') r[k1] = obj[k];
		}
		return r;
	}
	//################################
	// clone object
	function clone(obj) {
		if (typeof(obj)!='object') return obj;
		var r = {};
		for (k in obj) {
			r[k] = clone(obj[k]);
		}
		return r;
	}


	//################################
	// make links search
	function linkSearch() {
		var ds;
		var vl = [];
		setTimeout(()=>{
			//seek for container
			var v = document.querySelectorAll('a');
			aeval(v,(x,i)=>{
				var t = getParentAttr(x,'title');
				vl[vl.length] =  [x.outerHTML
					,x.textContent
						+(x.getAttribute('title')
							?' '+x.getAttribute('title')
							:''
						)
						+' '+t
				];
			});
			var c = document.querySelector('.linkSearch');
			if (!c) {
				//add top body
				c = domObj({tag:'div',class:'linkSearch'});
				document.body.insertBefore(c,document.body.firstChild);
			}
			//c.innerHTML = '🔎<input>🔎';
			domObj({tag:'span',targ:c,'':'🔎'});
			domObj({tag:'input',targ:c
				,ev_keyup:(ev)=>{
					var r = '...';
					if (ev.target.value.length>=2) {
						r = '';
						var p = new strPesq(ev.target.value);
						aeval(vl,(x)=>{
							if (p.pesq(x[1])) {
								r += x[0]+'<br>';
							}
						});
					}
					ds.innerHTML = r;
				}
			});
			domObj({tag:'span',targ:c,'':'🔎'});
			ds = domObj({tag:'p',targ:c,'':'...'});
		});
	}
	
	//################################
	//strip tags
	function stripTags( str ) {
		return str.replace(/(<([^>]+)>)/ig,"");
	}
	
	//################################
	//é visible
	function isVisible( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	}
	


	//################################
	//################################
	// falta resolver utf-8... 
	//		1 input meleca html aceita colar utf8 e o digitado resulta em iso-8859-1
	//		2 o regexpr ignore acentuação funciona apenas com iso, não utf
	// ao inves de usar "" para literais, usar _ no lugar do space
	/** @constructor */
	function strPesq(o) {
		// validar portugues pt 
		//  	/^[a-záàâãéèêíïóôõöúçñ ]+$/i
		//ou	/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
		
		//vetor acentos
		////áàâãéêíóôõúüñç
		var va = {
			 'a' : 'áàâã'
			,'e' : 'éê'
			,'i' : 'í'
			,'o' : 'óôõ'
			,'u' : 'úü'
			,'c' : 'ç'
		};
		var vex = ',.,+,*,?,^,$,(,),[,],{,},\.,'; //aceita |,
		var vr,vrNot,tx;
		init();
		this.ajuda='espaço - um E outro'
			+'\n| - um OU outro'
			+'\n^ - prefixo palavra inteira'
			+'\n~ - prefixo para indical palavra iniciando em '
			+'\n_ - substitui espaços em literais'
		;		
		//################################
		// palavra inteira ia /(^|\s)ia(\s|$)/
		this.pesq = function(s) {
			//var s = s1.toLowerCase();
			for (var i=0;i<vr.length;i++) {
				if ( vrNot[i] == vr[i].test(s) ) {
					return false;
				}
			}
			return true;
		}
		function init() {
			var a = trimm(o);
			// o ou é embutido dentro da expressao
			a = trocaTudo(a,'  ',' ');
			a = trocaTudo(a,'| ','|');
			a = trocaTudo(a,' |','|');
			//lert(a);
			tx = a.toLowerCase();
			var v = a.toLowerCase().split(' ');
			this.v = v;
			//if (referrer.search(new RegExp("Ral", "i")) == -1) { ...
			vr = Array();
			vrNot = Array();
			for (var i=0;i<v.length;i++) {
				v[i] = trimm(v[i]);
				vrNot[i] = v[i].charAt(0)=='-'; //negativo, não?
				if (vrNot[i]) v[i] = v[i].substring(1);
				if (v[i].charAt(0)=='~') {
					// prefixo palavra
					vr[i] = new RegExp('([!-\/]|^|\\s)'+v[i].substring(1),'i');
				} else if (v[i].charAt(0)=='^') {
					//palavra
					vr[i] = new RegExp('([!-\/]|^|\\s)'+v[i].substring(1)+'(\\s|$|[!-\/])','i');
				} else {
					vr[i] = new RegExp(rExpr(v[i]),'i');
				}
			}
		}
		//###################################
		this.txt = function() {
			return tx;
		}
		//###################################
		this.valid = function() {
			var r=false;
			aeval(this.v,function(x) {if (x.length>2) r=true;});
			return r?NaN:"consulta inválida '"+a+"'";
		}
		//###################################
		function rExpr(t) {
			//expressão regular acentuação pt-br
			//áàâãéêíóôõúüñç
			//deb('==> ('+t+')');
			t = t.replaceAll('_',' ');
			var ca='',r = '';
			for (var i=0;i<t.length;i++) {
				var c = t.charAt(i);
				if (vex.indexOf(c)!=-1 && ca!='\\') {
					//deb('foi');
					r += '\\'+c;
				} else if ( va[c] ) {
					r += '['+c+va[c]+']';
				} else {
					r += c;
				}
				ca = c;
			}
			deb(t+'==>('+r+') tm='+t.length);
			//dfsd=sdf;
			return r;
		}
		//###################################
		this.pesqMark = function(tx) {
			//lert('nerg tx='+vr.length);
			var r = tx;
			for (var i=0;i<vr.length;i++) {
				r = '';
				//objNav(v);
				//alert(typeof(v)+' tam='+v.length+' v='+v);
				//onsole.log(i+' '+vr[i]);
				while (tx.length>0) {
					var v = tx.match(vr[i]);
					if (!v || v.length==0) {
						r = r+tx;
						break;
					} else {
						r += tx.substring(0,v.index)
							+'<b>'+v[0]+'</b>'
						;
						tx = tx.substring(v.index+v[0].length);
					}
				}
				tx = r;
			}
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
		/*/################################
		this.pesqi = function(s) {
			for (var i=0;i<v.length;i++) {
				if ( ! s.match(vri[i]) ) {
					return false;
				}
			}
			return true;
		}*/
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
	}
	//fim strPesq

	/**************************
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
	*/


	//**********************************************
	function clickCancel(ev) {
		return !vazio(window.getSelection().toString()) //seleção
			|| ev.ctrlKey //cssEdit
			|| ev.button>1 //so 0 e 1 (central)
		;
	}
	
	//**********************************************
	// separa dir, nome, ext
	function arq(path) {
		var eu = this;
		eu.path = path;
		(()=>{
			var p = path.lastIndexOf('/');
			if (p==-1) {
				eu.dir = '';
				eu.nom = path;
			} else {
				eu.dir = path.substring(0,p);
				eu.nom = path.substring(p+1);
			}
			p = eu.nom.lastIndexOf('.');
			if (p==-1) {
				eu.ext='';
				eu.nomb = eu.nom;
			} else {
				eu.nomb = eu.nom.substring(0,p);
				eu.ext = eu.nom.substring(p+1);
			}
		})();
	}
	var Arq = arq;
	//**********************************************
	// carrega script e init objeto com param
	function require(url,param,callb) {
	}

	//**********************************************
	// load stylesheet
	function loadCss(url,funcLoad) {
		var cache = global('loadCss');
		if (cache[url]) return; //loaded
		var st = domObj({tag:'link'
			,targ:document.getElementsByTagName('head')[0]
			,rel: 'stylesheet'
			,type: 'text/css'
			,href: url
			,media:'all'
		});
		st.addEventListener('load',funcLoad);
	}

	//**********************************************
	// load script path default or not
	function loadScript(s,funcLoad) {
		if (s.charAt('0')!='/') s = '/js/'+s;
		var cache = global('loadScript');
		if (cache[s]) return; //loaded
		var scr = document.createElement('script');
		scr.addEventListener('load',funcLoad);
		scr.src = s;
		document.body.appendChild(scr);
	}
	//**********************************************
	// return object global or new default
	var _global = {};
	function global(s,df) {
		if (typeof(_global[s])=='undefined') {
			_global[s] = typeof(df)!='undefined'?df:{};
		}
		return _global[s];
	}

	//**********************************************
	//**********************************************
	//developer
	var alertDev = deb;
	var dev = true;
	try {
		dev = (''+window.location).indexOf('/dv.')!=-1
				|| (''+window.location).indexOf('_debug=1')!=-1
		;
	} catch (e) {}
	if (dev) {
		dev = ()=>{return true;};
	} else {
		dev = ()=>{return false;};
	}
	function deb(a,ob) {
		if (!dev()) return;
		if (Lib.isObj(a)) {
			console.log(a);
			return;
		}
		if (typeof(ob)=='object') {
			setTimeout(()=>{objNav(ob);},100);
			if (confirm(a)) {
				alert(erro());
				return;
			}
		}
		var trac = (isNumber(ob)?ob:0);
		//pega src e nro linha
		var f = (new Error('erroDebug')).stack.split('\n')[1+trac]+'';
		//não repetir trace
		var ve = global('_vDeb',{});
		(ve[f]?f='':ve[f]=1);
		//não repete trace.
		console.log(dataSql()+'\t'+a+'\t==>>'+f);
	}
	function htmlDecode(input) {
	  var doc = new DOMParser().parseFromString(input, "text/html");
	  return doc.documentElement.textContent;
	}	
	//medir tempo tarefas cronometro
	function Cron(Nome) {
		var nome = Nome;
		var dec = (a)=>{return format(a,3)};
		//no chromium/chrome faz diferença: 1 casa a mais
		//var ms = ()=>{return (new Date()).getTime()};
		var ms = ()=>{return window.performance.now()};
		var e = [];
		this.ret = function() {
			return e;
		}
		this.txt = function(reset) {
			var r = nome+'\n';
			var t = 0;
			for (var i=0;i<e.length;i++) {
				var tm = (i==e.length-1?ms():e[i+1][1])-e[i][1];
				//eb('tm='+tm+' '+e);
				r += e[i][0]//+'\t'+dataSql(e[i][1])
					+'\t'+dec(tm)
					+'\n'
				;
				t += tm;
			}
			if (reset!==false) e = [];
			return r+'\ntotal: '+dec(t);
		}
		this.ev = function(str) {
			e[e.length] = [str,ms()];
		}
	}

	//**********************************************
	//**********************************************

	//se celular touch transforma title em box
	function domTitleMobile(ds) {
		if (browse.mobile) {
			setTimeout(function(ev) {
				//procura todos dom com attribute title
				var v = ds.querySelectorAll('[title]');
				//lert('title'+v.length);
				aeval(v,function(x){
					domObj({tag:'sup'
						,targ:x
						,class:'inf'
						,'':'🛈'
						,style:'padding:1px 3px;cursor:pointer;'
						,ev_click: function(ev) {
							alert(x.title);
						}
					});
				});
			});
		}
	}
	
	//eval 
	function calcRpn(Tx) {
		var tx = Tx.trim()+' ';
		var nr = '';
		var vt = [],vtv = [];
		var r = 0;
		var pDec='.';
		var Const = {
			e:'Constante de Euler e base dos logaritmos naturais, aproximadamente 2.718.'
			,ln2:'Logaritmo natural de 2, aproximadamente 0.693.'
			,ln10:'Logaritmo natural de 10, aproximadamente 2.303.'
			,log2e:'Logaritmo de E na base 2, aproximadamente 1.443.'
			,log10e:'Logaritmo de E na base 10, aproximadamente 0.434.'
			,pi:'Relação entre a circunferência de um círculo e o seu diâmetro, aproximadamente 3.14159.'
			,sqrt1_2:'Raiz quadrada de 1/2; Equivale a 1 dividido pela raiz quadrada de 2, aproximadamente 0.707.'
			,sqrt2:'Raiz quadrada de 2, aproximadamente 1.414. '
			,random:[()=>{return Math.random();},'Retorna um número pseudo-aleatório entre 0 e 1.']
		};
		var Func = {
			'i':(a)=>{return 1/a;}
			,'!':(a)=>{var r=a;while (a-- > 1) r *= a;return r;}
			,abs:'Retorna o módulo, ou valor absoluto, de um número (|x||x|).'
			,acos:'Retorna o arco-coseno de um número (arccosx\arccos{x}).'
			,acosh:'Retorna o arco-coseno hiperbólico de um número.'
			,asin:'Retorna o arco-seno de um número (arcsinx\arcsin{x}).'
			,asinh:'Retorna o arco-seno hiperbólico de um número.'
			,atan:'Retorna o arco-tangente de um número (arctanx\arctan{x}).'
			,atanh:'Retorna o arco-tangente hiperbólico de um número (arctanx\arctan{x}).'
			,cbrt:'Retorna a raiz cúbica de um número (x3\root{3}{x}).'
			,ceil:'Retorna o menor inteiro que é maior ou igual a um número.'
			,cos:'Retorna o coseno de um número (cosx\cos{x}).'
			,cosh:'Retorna o coseno hiperbólico de um número .'
			,exp:'Retorna exe^x, onde x é o argumento, e ee é a constante de Euler (2.718...), a base do logaritmo natural.'
			,expm1:'Retorna ex-1e^x-1.'
			,floor:'Retorna o maior inteiro que é menor ou igual a um número.'
			,fround:'Retorna a mais próxima representação de ponto flutuante de precisão-única de um número.'
			,imul:'Retorna o resultado de uma multiplicação de inteiro de 32-bit.'
			,log:'Retorna o logaritmo natural (logex\log_ex ou lnx\ln{x}) de um número.'
			,log1p:'Retorna o logaritmo natural de 1 + x (loge(1+x)\log_e(1+x) ou ln(1+x)\ln(1+x)) de um número.'
			,log10:'Retorna o logaritmo de x na base 10 (log10x\log_{10}x).'
			,log2:'Retorna o logaritmo de x na base 2 (log2x\log_2 x).'
			,round:'Retorna o valor arrendodado de x, para o valor inteiro mais próximo.'
			,sign:'Retorna o sinal de x, indicando se é positivo, negativo ou zero.'
			,sin:'Retorna o seno de um número (sinx\sin x).'
			,sinh:'Retorna o seno hiperbólico de um número (sinhx\sinh x).'
			,sqrt:'Retorna a raiz quadrada positiva de um número (x\sqrt x).'
			,tan:'Retorna a tangente de um número (tanx\tan x).'
			,tanh:'Retorna a tangente hiperbólica de um número (tanhx\tanh x).'
			,trunc:'Retorna a parte inteira de x, removendo quaisquer dígitos fracionários. '
		};
		var Oper = {
			'-':(a,b)=>{return a-b;}
			,'+':(a,b)=>{return a+b;}
			,'*':(a,b)=>{return a*b;}
			,'/':(a,b)=>{return a/b;}
			,'%':[(a,b)=>{return a%b;},'Retorna o módulo, o resto da divisão de x por y']
			,'^':[(a,b)=>{return Math.pow(a,b);},'Retorna a base x elevada à potência y do expoente, ou seja, x^y.']
			,'~':[(a,b)=>{return Math.pow(a,1/b);},'Retorna a raiz y de x']
			,pow:'Retorna a base x elevada à potência y do expoente, ou seja, xyx^y.'
			,atan2:'Retorna o arco-tangente do quociente de seus argumentos.'
			,hypot:'Retorna a raiz quadrada da soma dos quadrados dos argumentos (x2+y2+…\sqrt{x^2 + y^2 + \dots}).'
			,max:'Retorna o maior dentre os parâmetros recebidos.'
			,min:'Retorna o menor dentre os parâmetros recebidos.'
			,'?':'ajuda'
		};
		//aceitará vetores ?
		var OperV = {
			hypot:'Retorna a raiz quadrada da soma dos quadrados dos ELEMENTOS (x2+y2+…\sqrt{x^2 + y^2 + \dots}).'
			,max:'Retorna o maior dentre os ELEMENTOS recebidos.'
			,min:'Retorna o menor dentre os ELEMENTOS recebidos.'
		}
		//financeira
		var MemFin = {
			vp:'valor presente'
			,vf:'valor futuro'
			,n:'periodos'
			,i:'taxa'
			,pmt:'pagamento'
		}
		
		//num
		var empil = (nr) => {
			//lert('vt('+vt+') nr='+nr+' '+erro());
			if (vazio(nr)) {
				return false;
			} else if (isNumber(nr)) {
				//lert('é num '+nr);
				vt[vt.length] = 1*nr;
			} else if (nr.charAt(0)=='[') {
				try {
					var r;
					eval('r='+nr);
					//lert('r='+r);
					vtv[vtv.length] = r;
				} catch (e) {
					alert(nr+' invalid array');
				}
			} else {
				c = nr.toLowerCase();
				//constantes
				if (Const[c]) {
					var r = Const[c];
					if (typeof(r)=='string') {
						empil(Math[c.toUpperCase()]);
					} else if (typeof(r)=='object') {
						empil(r[0]());
					} else {
						empil(r());	
					}
				} else if (Func[c]) {
					//lert('func='+c);
					if (vt.length==0) {
						alert('função '+c+', faltou valor');
					} else {
						var r = Func[c];
						if (typeof(r)=='string') {
							empil(Math[c](desempil()));
						} else if (typeof(r)=='object') {
							empil(r[0](desempil()));
						} else {
							empil(r(desempil()));	
						}
					}
				} else if ( Oper[c] ) {
					oper(c);
				} else if ( MemFin[c] ) {
					var r = MemFin[c];
					if (typeof(r)=='string') {
						r = [x=>{},r,0];
						MemFin[c] = r;
					}
					if (vt.length!=0) {
						//armazena valor
						r[2] = desempil();
						return true;
					}
					//calculo financeira
					// http://www2.unemat.br/eugenio/serie_de_pagamentos.html
					alert('calculo financeiro não implantado');
					// 
					return false;
				} else {
					alert('ignorando ('+nr+')');
					return false;
				}
			}
			return true;
		}
		//
		var oper = (c) => {
			//ajuda ?
			if (c=='?') {
				var v = {'Operadores':Oper,'Funções':Func,'Valores':Const,'Vetores [a,b,c...]':OperV,'Financeiras':MemFin};
				var t = '<h1>ajuda</h1>';
				aeval(v,(o,c) => {
					t += '<h2>'+c+'</h2>';
					aeval(o,(o,c) => {
						t += '<p><b style="padding:5px 8px;border-radius:3px;color:white;background:#000000;">'+c+'</b> '
						+(typeof(o)=='object'?o[1]+' <code>'+o[0]+'</code>':o)
					+'</p>';
					});
				});
				var a = new contextDiv({
					html:t
					,click:ev=>{a.hide();}
				});
				setTimeout(ev=>{a.center()});
				return;
			}
			//oper vetor?
			if ('hypot,max,min'.indexOf(c)!=-1 && vtv.length!=0) {
				var a = vtv[vtv.length-1];
				vtv.splice(vtv.length-1,1);
				empil(Math[c].apply(null,a));
			} else if (vt.length<2) {
				alert('operação '+c+', faltou valor');
				return false;
			} else {
				var v = desempil();
				var r = Oper[c];
				if (typeof(r)=='string') {
					empil(Math[c](desempil(),v));
				} else if (typeof(r)=='object') {
					empil(r[0](desempil(),v));
				} else {
					empil(r(desempil(),v));	
				}
			}
			return true;			
		}
		//
		var desempil = () => {
			if (vt.length!=0) {
				var r = vt[vt.length-1];
				vt.splice(vt.length-1,1);
				return r;
			}
		}
		//principal
		for (var i=0;i<tx.length;i++) {
			var c = tx.charAt(i).toLowerCase();
			//lert(i+' '+c+' '+vt.length);
			if ( c==' ' ) {
				empil(nr);
				nr='';
			} else if (isNumber(nr)&&c!=pDec&&(c<'0'||c>'9')) {
				empil(nr);
				nr = c;
			} else if (Oper[c]) {
				if (nr.length!=0) {
					empil(nr);
					nr='';
				}
				oper(c);
			} else {
				nr += c;
			}
		}
		return vt[vt.length-1];
	}

	/* substituir por window.devicePixelRatio
	//***********************************************
	function dpi() {
		var eu = this;
		var o = window._div_dpi;
		if (!o) {
			o = {}
			window._div_dpi = o;
			o.dv = domObj({tag:'div'
				,style:'height:1in;left:-100%;position:absolute;'
						+'top:-100%;width:1in;'
				,targ:document.body
				,'':'&nbsp;'
			});
		}
		setTimeout(init);
		function init() {
			o.w = o.dv.offsetWidth;
			o.h = o.dv.offsetHeight;
			if (o.w==0||o.h==0) {
				document.body.appendChild(o.dv);
				setTimeout(init,100);
			}
		}
		this.w = () => {return o.w;};
		this.h = () => {return o.h;};
	}
	*/
	//***********************************************
	function domPos(dom) {
		return getElementIndex(dom);
	}	
	//***********************************************
	function isNumber(str) {
		if (typeof(str)=='number') {
			return true;
		} else if (typeof(str)=='string') {
			return str.length!=0 && !isNaN(1*str);
		}
		return false;
	}
	
	//***********************************************
	function xhr(Url,Func) {
		if (this==window) {
			new xhr(Url,Func);
			return;
		}
		var url = Url;
		var func = Func;
		var c = new carregaUrl();
		setTimeout(open);
		//*******************************************
		function open() {
			c.abre(url,end);
		}
		//*******************************************
		function end(n,b,tx) {
			var x = document.createElement('div');
			x.innerHTML = trimm(tx);
			var r = [];
			for (var i=0;i<x.childNodes.length;i++) {
				var o = x.childNodes.item(i);
				if (!o.className) {
					//alert(o+' dom object without className!\n\n'+o.innerHTML);
				} else if (o.className=='xhrAction') {
					if (o.innerHTML=='logon') {
						alert('DEFAULT: xhrAction '+o.innerHTML);
					} else if (o.innerHTML == 'compil') {
						alert('DEFAULT: xhrAction '+o.innerHTML);
					} else {
						alert('ERROR: xhrAction '+o.innerHTML+' not avaiable');
					}
				} else {
					r[r.length] = o;
				}
			}
			x.innerHTML = '';
			//lert("vai "+func+" == "+r);
			func(r);
			return r;
		}
	}

	//**********************************************
	function getSelectionText() {
		/*	window.getSelection().toString()
			and of course a special treatment for ie:
			document.selection.createRange().htmlText
		*/
		var text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	}




	//***********************************************
	/** x@constructor */
	// param obj ou text+obj
	/*function domObj(p,oo) {
		return Dom.obj(p,oo);
	}*/
	
	//***********************************************
	function Url(s) {
		var eu = this;
		var urlO = trimm(s);//''+(new URL(s));
		init();
		//*******************************************
		function init() {
			var u = urlO;
			var p = u.indexOf('://');
			if (p==-1 || p>10) {
				var urlA = new Url(''+window.location);
				//só protocol e host
				u = urlA.protocol+'://'+urlA.host
					+(urlA.portDefault==urlA.port?'':':'+urlA.port)
					+(urlO.charAt(0)=='/'?'':urlA.dir)
					+urlO
				;
			}
			var v=palavraA(u,'/');
			//http://fsdfs/ 3
			eu.protocol = leftAt(v[0],':');
			eu.portDefault = (eu.protocol=='http'?80:(eu.protocol=='https'?443:-1));
			eu.host = v[2];
			if (eu.host.indexOf(':')!=-1) {
				eu.port = 1*substrAt(eu.host,':');
				eu.host = leftAt(eu.host,':');
			} else {
				eu.port = eu.portDefault;
			}
			//assume-se que está num dir...
			eu.dir = '/'+substrAt(substrAt(''+window.location,'://'),'/');
			eu.arg = '';
			if (eu.dir.indexOf('?')!=-1) {
				eu.arg = substrAt(eu.dir,'?');
				eu.dir = leftAt(eu.dir,'?');
			}
			eu.arq = '';
			if (eu.dir.charAt(eu.dir.length)!='/') {
				eu.arq = substrRat(eu.dir,'/');
				eu.dir = leftRat(eu.dir,'/');
			}
		}
	}

	//***********************************************
	function replacePos(str,arr) {
		var v = str.split('@');
		if (arr.length!=v.length-1) {
			alert('replacePos: tamanho array incompatível com substituições');
			return;
		}
		var r = v[0];
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
		var h = {};
		if (im) {
			oDm.innerHTML = '<img style="display: block;margin:0 auto;" src="/imagens/loading.gif">';
		} else {
			var to;
			inc();
		}
		//o mesmo obj para estat e contadores
		// chave, sum
		this.txt = function(ch,n) {
			var r = '',t=0;
			for (var k in h) {
				r += k+' * '+h[k]+'\n';
				t += h[k];
			}
			return r+'\n*TOT * '+t;
		}
		//o mesmo obj para estat e contadores
		// chave, sum
		this.inc = function(k,n) {
			if (typeof(n)!='number') n = 1;
			if (h[k]) {
				h[k] += n;
			} else {
				h[k] = n;
			}
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
	// tabs 
	function tabs(Op) {
		var op = mergeOptions({id:'tabs'},Op);
		var vt = []; //vetor objetos
		var cnt;//destiny of objects
		var idx = {};
		var objAtivo=0;
		var lin; //linha menu 
		/************************
		// chrome width 100%
		//  https://stackoverflow.com/questions/56391300/svg-does-not-scale-correctly-in-chrome
		function clickAj(ev) {
			for (var i=0;i<cnt.childNodes.length;i++) {
				var o = cnt.childNodes.item(i);
				alert(o.style.cssText);
				if (o.style.cssText) {
					o.style.cssText += ' ';
				}
			}
		}
		*/
		//************************
		function click(ev) {
			cnt.innerHTML = '';
			//lert('oa='+objAtivo +'-'+ vt.length);
			if (ev) {
				//lert(ev.target.value+' e='+ev.target.getAttribute('value'))
				classOff(lin.childNodes.item(objAtivo),op.id+'A');
				objAtivo = 1*ev.target.getAttribute('value');
				classOn(ev.target,op.id+'A');
				if (op.ped) op.ped.putJ(op.id,objAtivo);
			} else if (vt.length<=objAtivo) { //active invalid
				objAtivo = 0;
			}
			//lert('oa='+objAtivo);
			var o = vt[objAtivo].obj;
			//lert('ev='+ev.target.value+' o='+o);
			aeval(o.length?o:[o],(a,i) => {
				try {
					if (typeof(a)=='function') {
						a(cnt);
					} else { 
						cnt.appendChild(a);
					}
				} catch (e) {
					alert('erro add obj tab '+e+' '+i+'='+a);
				}
			});
			//setTimeout(clickAj,200);
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
				TABLE.### TD.###:hover {filter: invert(30%);}
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
			if (op.tab) objAtivo = 1*op.tab;
			//zero = false, mesmo string?
			if (op.ped&&isNumber(op.ped.getJ(op.id)))
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
	
	/*function opener_() {
		alert('opener');
		try {
			var r = opener;
		} catch (e) {
		}
		return r;
	}*/

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
	// usado em covid
	// falta / toDo = aguardar as tarefas executadas apos a carga de cada uma
	//		- opção para serem seriais ? bx,ex;bx,ex... ou bx,bx,.. várais possibilidades
	function loader(op) {
		var eu = this;
		//default op
		mergeOptions({timeout:30,msegs:200,withCredentials:true,nvEnd:0},op);
		var i=0;
		while (op[i]) {
			op[i] = mergeOptions({timeout:op.timeout},op[i]);
			i++;
		}
		if (i==0) {
			eu.error = 'no task XMLHttpRequest informed {0:{},...}'
			end(true);
			return;
		}
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
		function end() {
			//sim sem erro, verifica se
			//		há callback executando
			if (!eu.error) {
				var i=0;
				var t = '';
				while (op[i]) {
					t += '  '+i+'='+op[i].timeEnd;
					if (!op[i].timeEnd) {
						op.nvEnd++;
						if (op.nvEnd%5==0) {
							debJ('loader aguardando callback '+i);
						}
						setTimeout(end,200);
						return;
					}
					i++;
				}
				//lert('ldar='+t);
			}
			this.end = true;
			this.timeEnd = ms();
			
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
				oReq.onload = ret; //()=>{ret(pos);};
				oReq.open("get", op[pos].url, true);
				oReq.send();
				op[pos].timeBegin = ms();
			} else if (op[pos].timeEnd) {
				pos++;
				if (!op[pos] || eu.error) {
					end(true);
					return;
				}
			} else if (op[pos].timeout*1000<ms()-op[pos].timeBegin) {
				eu.error = 'timeout step '+pos+' '+(ms()-op[pos].timeBegin)/1000;
				//lert(pos.url+' '+eu.error);
				end(true);
				return;
			}
			setTimeout(next,op.msegs);
		}
		//**************************
		function ret() {
			//ebJ('fim '+pos);
			if (this.readyState != 4) {
				return;
			} else if (this.status!=200) {
				eu.error = 'httpStatus: '+this.status
					+'\readyState: '+this.readyState
					+'\nurl: '+op[this.pos].url
				;
				op[pos].timeEnd = ms();
				end();	
				return;			
			}
			//
			op[pos].callback(this.responseText,op[pos].url);
			op[pos].timeEnd = ms();
		}
	} //loader

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
			var dec = this.dec;
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
	function objDebug(o,Op) {
		var op = mergeOptions({lim:200,filt:function(){return true;}},Op);
		var doc = op.doc?op.doc:domDoc(o);
		var z,e,i=0;
		if ('~object~array~'.indexOf('~'+typeof(o)+'~')!=-1) {
			//*********************
			if (!op._vo) {
				op._vo = {};
				op._nv = 0;
			} else if (op._vo[o]) {
				return domObj({tag:'span','':'duplo='+typeof(op._vo[o])+'='+op._vo[o]});
			} else if (op._nv>6) {
				return domObj({tag:'span','':'muitos níveis='+typeof(o)+'='+o});
			}
			//evitar loop redundancia referencia objetos (chrome)
			op._vo[o] = o;
			op._nv++;
			//***********
			var r = doc.createElement('table');
			r.border=1;
			for(var prop in o) {
				try {
					z = o[prop];
				} catch (e) {
					z = '?erro:'+erro(e);
				}
				
				var l = domObj({tag:'tr',targ:r});
				domObj({'':typeof(z)+': <b>'+prop+'</b>',tag:'td',targ:l});
				try {
					domObj({tag:'td',targ:l}).appendChild(objDebug(z,op));
					op._nv--;
				} catch (e) {
					domObj({tag:'td',targ:l}).appendChild(
						domObj({tag:'span','':'ERRO '+e+'='+typeof(o)+'='+o})
					);
				}

				i++;
				if (i>op.lim) break;
			}
			return r;
		} else {
			return domObj({tag:'span','':''+o});
		}
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
	/** @constructor */
	function tabelaSort(id,Ord) {
		var eu = this;
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
		init();
		//*****************************************
		function init() {
			var rows = obj.getElementsByTagName('tr');
			if (rows.length<3) return;
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
			var ob = targetEvent(ev);
			if (!ob) {
				return;
			}
			obj = getParentByTagName(ob,'table');
			//running sort?
			if ( runSort !== false ) {
				alertDev('ja rodando');
				return;
			}
			//sinaliza ordenando.
			runSort = new running(ob);
			
			var col = 1*ob.getAttribute('pos');
			eu.sort(col);
		}
		this.sort = function(col) {
			//lert('sort');
			//lert(''+vOrd[col].col.innerHTML);
			oOrd = vOrd[col];
			var ob = oOrd.col.querySelector('sup');
			oOrd.oClick = ob;
			
			try {
				run(oOrd);
			} catch (e) {
				alertDev('erro '+erro(e));
			}
		}
		//*****************************************
		function runEnd() {
			//para animação running
			//lertDev('fim\n'+runSort);//.txt());
			runSort.end();
			runSort = false;
			//desmarca ordem por outras colunas
			aeval(vOrd,function(x){x.dom.innerHTML=vImg.substring(0,1);});
			oOrd.oClick.innerHTML = vImg.substring(oOrd.ord+1,oOrd.ord+2)			
		}
		//*****************************************
		function runT() {
			function getArr(row) {
				var r = [];
				for (var i=0;i<row.childNodes.length;i++) {
					var c = row.childNodes.item(i);
					r[i] = [c.innerHTML,c.getAttribute('title')];
				}
				//lert(r.length+' '+r);
				return r;
			}
			var vs = [];
			var tb = obj.getElementsByTagName('tr');
			for (var l=1;l<tb.length;l++) {
				if (tb[l].childNodes.length<=oOrd.pos) {
					break;
				}
				var v2 = val(oOrd.pos,tb[l]);
				vs[l-1] = [v2,getArr(tb[l])];
			}
			//sort
			vs.sort( (a,b) => {
				return fSort(a[0],b[0],oOrd.ord==0);
			});
			for (var l=0;l<vs.length;l++) {
				for (var i=0;i<tb[l+1].childNodes.length;i++) {
					tb[l+1].childNodes.item(i).innerHTML = vs[l][1][i][0];
					tb[l+1].childNodes.item(i).setAttribute('title',vs[l][1][i][1]);
				}
			}
			runEnd();
		}
		//*****************************************
		function run() {
			//verify field type of column
			if (!oOrd.func) {
				oOrd.func = sNum;
				var rows = obj.getElementsByTagName('tr');
				for (var i=1;i<rows.length;i++) {
					var x = rows[i].childNodes.item(oOrd.pos);
					if (!x) {
						break;//alertDev('ln='+i+' ord='+oOrd.pos+' '+x+'\n'+rows[i].innerHTML);
					} else if ( x.textContent!='NaN' && isNaN(x.textContent.localToNumber()) ) {
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
			//setTimeout(runTask,100);
			setTimeout(runT,100);
		}
		/*****************************************
		// sort task - Bubble sort.
		// toDo - Quicksort
		function runTask() {
			runSort.inc('task');
			//lert('runTask');
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
					runSort.inc('swap');
					cont = true;
				}
			}
			if (!cont) {
				runEnd();
			} else {
				setTimeout(runTask,22);
			} 
		}
		*/
	} //fim tabelaSort
	
	//***********************************************
	//monta  banco de dados estilo tabela com estrutura 'fixa', mas
	//		permite campo others cujo conteúdo será v[nomeCampo]=valor
	// pode preencher a partir de: 
	//		1 - objeto dom table - setTable
	//		2 - txt csv - addMatriz ou vetor 1a linha cab
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
		this.campos = campos;
		//vetor campos index posição
		var camposN = Array(); //[n]=nome
		//var valor;this.valor = valor;
		var valores = Array(); //valores string
		this.valores = valores;
		//var valoresProp = Array(); //propriedade dos valores
		//o q colocar em campo indefinido
		var Nulo = '';
		this.dev = false;
		this.dlRow = '\n';
		this.dlCol = '\t';
		var fileHead;
		var idx = {};
		if (typeof(window)!='undefined') {
			//var fs;
		}
		//*********************************************
		// get com index - cria index 
		this.getObjByKey = function(key,vlr) {
			var ix = idx[key];
			if (!ix) {
				ix = this.index(key,true);
				idx[key] = ix;
			}
			var rg = ix[vlr];
			//lert('rg='+rg+' '+Lib.isNum(rg));
			if (Lib.isNum(rg)) return this.getObj(rg);
			return {};
		}
		//*********************************************
		// cria objeto hash do registro
		this.getObj = function(rg) {
			rg = Lib.isNum(rg) ? rg : ur;
			var r = {};
			for (var i=0;i<camposN.length;i++) {
				//var v = this.get(camposN[i]);
				r[camposN[i]] = valores[rg][i];
			}
			return r;
		}	
		//*********************************************
		// CARREGA csv FROM url
		this.csvLoad = function(url) {
			(new carregaUrl()).abre(url
				,(a,b,tx) => {
					if (b.httpReq.status!=200) {
						eu.sErro = 'bd.csvLoad() erro='+b.httpReq.status+' '+url;
						deb(eu.sErro);
					} else {
						eu.addTxt(tx);
					}
				}
			);
		}
		//*********************************************
		// retorna tex do bd
		this.csv = function() {
			var tx = eu.csvCab();
			eu.top();
			while (eu.next()) {
				tx += eu.csvLn()+'\n';
			}
			return tx;
		}
		//*********************************************
		// salva regs to csv
		this.csvSave = function(op) {
			if (!this.updated) {
				alert('csv file '+file+' not updated');
				return;
			}
			if (!op) op = {};
			//url?
			if (op.url) {
				var c = new carregaUrl();
				c.post(op.url,'tex='+this.csv()
					,(a,b,tx) => {
						if (b.httpReq.status!=200) {
							var er = 'bd.csvSave(url) erro='+b.httpReq.status+' '+op.url;
							alert(er);
							eu.sErro = er;
						} else if (!vazio(tx)) {
							alert(tx);
						}
					}
				);				
				return;
			}
			var file = this.csvName;
			if (op.file) file = op.file;
			var adt = file+'.new';
			var adb = file+'.bak';
			var nv = 0;
			var tbf = 128000;
			var eu = this;
			if (fs.existsSync(adt)) fs.rm(adt,(er)=>{if (er) console.log(er);});
			function faz() {
				while (eu.next()) {
					nv++;
					var tx = eu.csvLn()+'\n';
					tm += tx.length;
					ad.write(tx);
					if (tm>tbf) {
						console.log(file+' gravar...'+tm+' '+nv);
						tm = 0;
						break;
					}
					//monit
					if (op.sync && (nv % op.sync)==1 ) {
						console.log(file+' monit '+nv);
					}
				}
				if (!eu.eof()) {
					setTimeout(faz);
				} else {
					console.log('fim gravando '+file+' nr='+nv)
					ad.close();
					if (fs.existsSync(adb)) fs.rm(adb,(er)=>{if (er) console.log(er);});
					fs.rename(file,adb,(er)=>{if (er) console.log(er);});
					fs.rename(adt,file,(er)=>{if (er) console.log(er);});
					console.log('fim 2 gravando '+file+' nr='+nv)
				}
			}
			var ad = fs.createWriteStream(adt,{flags:'as'});
			ad.write(this.csvCab()+'\n');
			this.top();
			var tm = 0;
			faz();
			return nr;
		}
		//*********************************************
		// adiciona regs from csv
		this.csvAdd = function(file) {
			if (!this.csvName) this.csvName = file;
			this.addTxt(fs.readFileSync(file)+'');
		}
		//*********************************************
		// retorna string linha cab txt
		this.csvLn = function() {
			var r = '';
			for (var i=0;i<camposN.length;i++) {
				r += (i==0?'':this.dlCol)+valores[ur][i];
			}
			return r;
		}
		//*********************************************
		// retorna string linha cab txt
		this.csvCab = function() {
			//lert('0='+camposN[0]);
			var r = '';
			for (var i=0;i<camposN.length;i++) {
				r += this.dlCol+camposN[i];
			}
			return r.substring(this.dlCol.length);
		}
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
				if (!op.cond || op.cond(this)) {
					op.func(this);
				}
			}
		}
		//*********************************************
		// pivot calc like
		this.pivot = function(Ds) {
			var bd = this;
			//lert('regs='+bd.count()+' '+[1,2,3,4]);
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
				var t = doc.createElement('table');ds.appendChild(t);

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
			if (typeof(arr)=='object') {
				var r = [];
				aeval(arr,function(v,i) {r[i]=eu.get(v)});
				return r;
			}
			return eu.getRow();
		}
		//*********************************************
		// get row
		this.getRow = function(r) {
			return valores[typeof(r)=='number'?r:ur];
		}
		this.getMatriz = function() {
			return valores;
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
					alert(erro('index: error, duplicate value of key'
						+'\ncampo('+nomeCampo+')'
						+'\nval('+vc+')'
						+'\n\reg('+ur+' ('+valores[ur]+'))'
					));
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
			return troca(troca(''+camposN[field],'_',' '),'+',' +');
		}		
		//*********************************************
		// gera objetos html 
		// 	targ = target dom destino
		//	limit = limita nro regs
		//	values = substitui dados originais por este vetor compatível
		//	fields: = (name,i) => {}
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
			var tb = doc.createElement('table');
			tb.className = this.className
				?this.className:'bdToDom'+(op.class?' '+op.class
				:''
			);
			tb.border=1;
			// head
			var l = doc.createElement('tr');l.className='head';tb.appendChild(l);
			for (var i=0;i<camposN.length;i++) {
				//alguns campos?
				if (!op.fields || op.fields(camposN[i],i) ) {
					var c = doc.createElement('th');
					c.innerHTML = eu.showHeader(i);
					l.appendChild(c);
				}
			}
			// data
			var r;
			// all rows
			for (r=0;r<vlr.length && (!op.limit||r<op.limit);r++) {
				l = doc.createElement('tr');tb.appendChild(l);
				// all cols
				try {
					for (var i=0;i<vlr[r].length;i++) {
						//alguns campos?
						if (!op.fields || op.fields(camposN[i],i) ) {
							var c = doc.createElement('td');
							c.innerHTML = eu.showField(vlr[r],i);//troca(vlr[r][i],'\n','<br>');
							l.appendChild(c);
						}
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
				c.innerHTML = '<h1>stop limit '+limit+' / '+format(vlr.length,0)+'</h1>';
				l.appendChild(c);
			}
			//adiciona ao dst
			if (dst) dst.appendChild(tb);
			//permite ordenar colunas
			new tabelaSort(tb);
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
						var Nom = campos[nom]; 
						if (isNaN(Nom)) {
							alert('bd.sort: field name '+nom+' not exists!');
							return false;
						}
					}
					ar[i] = [1*Nom
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
				for (var k in ar) {
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
		this.length = function() {
			return valores.length;
		}
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
			if (typeof r == 'number') {
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
		this.eof = function() {
			return ur >= valores.length;
		}
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
			return this.struct(true);
		}
		//*********************************************
		this.struct = function(txt) {
			var e = new estat('struct table '+nome);
			for (var r=0;r<valores.length;r++) {
				for (var c=0;c<camposN.length;c++) {
					if ( valores[r][c] ) {
						e.inc(camposN[c],1);
					}
				}
			}
			if (txt) return e.toTxt()+'\n n='+camposN.length+' ('+camposN+')\n'+e;

			var v = e.getVetor();
			var r = '<table border=1>'
				+'<tr><td>n<td>name<td>nv'
			;
			for (var c=0;c<camposN.length;c++) {
				var n = camposN[c];
				r += '<tr><td>'+c+'<td>'+n+'<td>'+v[n];
			}
			return r+'</table>';
		}
		//*********************************************
		// recebe txt 1a linha campos* e add regs
		// 		se 1a linha = ':' assume cabeçalho arquivo no padrão eml
		//		separado do nome de campos e bloco dados por linha vazia
		//		cabeçalho arquivo pode conter campo 'delimiter' this.dlCol
		this.addTxt = function(tx,op) {
			if (vazio(tx)) return;
			if (typeof(op)=='function') 
				op = {filter:op};
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
			this.addMatriz(x,op);
		}
		//*********************************************
		// GET valor de um campo pelo nome, ret padrão, se number mov ponteiro mv ou reg nro
		this.getDate = function(Nome,pdr,mv) {
			return strToDate(this.get(Nome,pdr,mv));
		}
		//*********************************************
		// GET valor de um campo pelo nome, ret padrão, se number mov ponteiro mv ou reg nro
		this.getNum = function(Nome,pdr,mv) {
			var r = 1*this.get(Nome,pdr,mv);
			if (isNaN(r)) return 0;
			return r;
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
				eu.addReg(vc);
			}
		}
		//*********************************************
		// recebe matriz ou csv com 1a linha nome campos
		this.setVetObj = function(vet) {
			//nao implem
		}
		//*********************************************
		// recebe matriz ou csv com 1a linha nome campos
		//		* ver addTxt
		this.addMatriz = function(vet,op) {
			if (!op) op = {};

			if (typeof(vet)=='string') {
				this.addTxt(vet,op);
				return;
			}
			//compara estruturas
			
			if (camposN.length!=0) {
				var er='';
				aeval(camposN,(a,i) => {
					if (i<vet[0].length && a!=vet[0][i].trim()) {
						er += '\n'+i+':'+a+'!='+vet[0][i]+':';
					}
				});
				if (er.length!=0) {
					alert('ERRO addTxt, struct db different '+er
						+'\n\n'+erro()
					);
					return false;
				}
			}
			
			//nome campos na linha 0
			for (var i=0;i<vet[0].length;i++) {
				var n = trimm(vet[0][i]);
				campos[n] = i;
				camposN[i] = n;
			}
			//dados na um em diante
			for (var i=1;i<vet.length;i++) {
				if (!op.filter || op.filter(vet[i])) {
					//seta ultimo reg
					//ur = valores.length;
					//valores[ur] = troca(vet[i],'\\n','\n');
					//lert(typeof(vet[i])+' '+vet[i]+' '+valores);
					eu.addReg(vet[i]); // ??? troca(vet[i],'\\n','\n')
					if (op.onAddReg) op.onAddReg(vet[i]);
				}
			}
		}
		//*********************************************
		// seta valor de um campo pelo nome 
		//		- add = para string, add mais texto
		this.set = function(Nome,Valor,add) {
			this.updated = true;
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
					alertDev(erro(e)+' ==> Valor='+Valor+' ty='+typeof(Valor),Valor);
				}
			} else if ( add && !nulo(valores[ur][pc]) ) {
				//valor é string a += add 
				valores[ur][pc] += ' '+trimm(''+Valor);
			} else if (Lib.isNum(Valor)) {
				valores[ur][pc] = Valor;
			} else {
				//valor qq type
				valores[ur][pc] = trimm(''+Valor);
			}
		}
		//*********************************************
		this.addReg = function(arrORcod) {
			this.updated = true;
			if (typeof(arrORcod)=='object') {
				ur = valores.length;
				valores[ur] = arrORcod;
				//atualiza key
				if (eu.key) {
					eu.key();
				}
				return;
			} else if (typeof(arrORcod)=='undefined') {
				//registro auto numerado
				// 2020-04 ur++;
				ur = valores.length;
			} else {
				ur = arrORcod;
			}
			//debJ('bd add Reg  ur='+ur+' '+erro());
			valores[ur] = Array();
		}
	}
	var bdTabela = bancoDados;
	//fim bdTabela
	
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
	function feval(ini,max,func) {
		if (!func) {
			func = max;
			max = ini;
			ini = 0;
		} else {
			//antigo for next.
			max += 1;
		}
		for (var i=ini;i<max;i++) {
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
			//minutos
			return Math.floor(segs/60);
		} else if (segs/3600<24) {
			//horas e minutos
			return Math.floor(segs/3600)+':'+strZero(segs%3600/60,2);
		}
		return  new Date(t).toLocaleString();

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
	function hexDEnc(str) {
		if (str.indexOf('%')==-1) 
			return str;
		var r = '';
		for (var i=0;i<str.length;i++) {
			if (str.charAt(i)=='%'&&i<str.length-2) {
				var v = hexToDec(str.substring(i+1,i+3));
				if (v==-1) {
					r += str.charAt(i);
				} else {
					r += String.fromCharCode(v);
					i += 2;
				}
			} else {
				r += str.charAt(i);
			}
		}
		return r;
	}
	//**************************//
	function hexEnc(str,sDelims) {
		if (!sDelims)
			return hexDEnc(str);
		var r = '';
		for (var i=0;i<str.length;i++) {
			if (sDelims.indexOf(str.charAt(i))!=-1) {
				r += '%'+ascToHex(str.charAt(i));
			} else {
				r += str.charAt(i);
			}
		}
		return r;
	}	
	//**************************//
	function asc(c) {
		return c.charCodeAt(0);
	}
	//**************************//
	function hexToDec(c) {
		return parseInt(c,16);	
		/*var c = trimm(c).toUpperCase();
		var t = c.length;
		var r = 0;
		for (var i=0;i<t;i++) {
			var v = "0123456789ABCDEF".indexOf(c.substring(i,i+1));
			if (v==-1) return v;
			r += v*Math.pow(16,(t-i-1));
		}
		return r;
		*/
	}
	//**************************//
	function ascToHex(c) {
		return decToHex(c.charCodeAt(0));
	}
	//**************************//
	function decToHex(c) {
		while (c<0) c += 256;
		while (c>256) c -= 256;
		let r = c.toString(16).toUpperCase();
		return (r.length<2?'0'+r:r);
		/*if (c==256) return 'FF';
		while (c<0) c += 256;
		while (c>256) c -= 256;
		return ''+decToHex1(Math.floor(c / 16))+''+decToHex1(c % 16);
		*/
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
		classAddDel(obj,nome,true);
	}
	//**************************//
	function delClass(obj,nome) {
		classAddDel(obj,nome,false);
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
		this.text = function(o) {
			var r = '';
			aeval(v,function(v,k) {
				if (!vazio(v)) {
					r += k+':'+v+';';
				}
			});
			if (o && o.style) {
				o.style.cssText = r;
			}
			return r;
		}
	}
	
	//**************************//
	function dPalavra(v,del) {
		var r = '';
		if (v.length==0) {
			return;
		}
		for (var i=0;i<v.length;i++) {
			r += del+v[i];
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
	function nada() {}
	//***********************************************
	function css(ev) {
		/*if (!ev && browse.ie) {
			ev = event;
		}*/
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
	//?
	function takeYear(theDate) {
		return theData.getFullYear();
		/*var x = theDate.getYear();
		var y = x % 100;
		y += (y < 38) ? 2000 : 1900;
		return y;
		*/
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
			//with (document) {
				eval(v[i].textContent);
			//}
		}
	}


	//********************
	//retira da url o host menos www
	function host(url) {
		var tx = ''+url;
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
	/** @constructor */
	function carregaUrl() {
		var eu = this;
		this.url = '';
		this.abre = abre;
		this.carregaObj = carregaObj;
		this.js = js;
		this.charSet = 'utf-8';//'ISO-8859-1';
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
		this.post = function(url,data,func) {
				this.funcRet = func;
				var xhr = this.httpReq;//new XMLHttpRequest();
				xhr.open("POST", url, true);

				// Envia a informação do cabeçalho junto com a requisição.
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				xhr.onreadystatechange = recebe;
				xhr.send(data);
		}
		//*********************************
		function deb(s,ob) {
			if (eu.debug) window.deb(s,ob);
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
			
			/* /cab
				for (var ci=0;ci<vHead.length;ci++) {
					this.httpReq.setRequestHeader(vHead[ci][0],vHead[ci][1]);
					alert(this.method+' set head='+vHead[ci][0]+' == '+vHead[ci][1]);
				}
			*/

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
							//funcRet(XX,eu.httpReq,XR);
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
	var acentos  = "áéíóúüàâêôãõñçÁÉÍÓÚÜÀÂÊÔÃÕÑÇäÄ";
	var acentost = "aeiouuaaeoaoncAEIOUUAAEOAONCaA";
	//**************************//
	function tiraAcentos(s) {
		var p;
		for (var i=0;i<s.length;i++) {
			if ((p=acentos.indexOf(s.substring(i,i+1)))!=-1) {
				s = s.substring(0,i)+acentost.substring(p,p+1)+s.substring(i+1);
			}
		}
		return s;
	}

//*******************************//
//funções cookie
	//********************
	function cookieGet(nome,padrao) {
		var co = ' '+document.cookie+';';
		//lert('cook='+co);
		var i = co.indexOf(' '+nome+'=');
		//lert(nome+' '+i);
		var f = co.indexOf(';',i+nome.length+1);
		if (i==-1 || f<=i) {
			cookiePut(nome,padrao);
			return padrao;
		} else {
			var r = co.substring(i+nome.length+2,f);
			//lert('ret='+r+' '+co);
			if (typeof(padrao)=='number') {
				//conv para number
				return isNumber(r)?1*r:padrao;
			}
			return decodeURIComponent(r);
		}
	}
	//********************
	function cookiePut(nome,vlr,venceDias,domi) {
		//lert(document.cookie);
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
			+'; SameSite=None; Secure'
		;
		//debJ('dc1='+dc);
		//;var r = cookieGet(nome)==vlr;
		document.cookie = dc;
		/*if (cookieGet(nome)!=vlr) {
			alert('cookiePut: falhou setar cookie...'
				+document.cookie.length-magnet:?dn=084%20Okr%C4%99t.mp3&xl=3592254&xt=urn:sha1:ZTTSZZLUKCRAD2CVLR6CKEY5LG64EFK7&xs=http://213.134.179.70:6346/uri-res/N2R%3Furn:sha1:ZTTSZZLUKCRAD2CVLR6CKEY5LG64EFK7
			);
		return r;
		*/
	}
	var cookieSet = cookiePut;

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
		ob.className = trimm(r);
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
		if (typeof(a)=='object') {
			if (typeof(b)=='string') {
				aeval(a,function(v){
					g = troca(g,v,b);
				});
				return g;
			} else if (typeof(b)=='object') {
				aeval(a,function(v,i){
					g = troca(g,v,b[i]);
				});
				return g;
			}
		}
			
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
		if (isEvent(o)) o = o.target;
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

	var targetEvent = Dom.getTarget;

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
	var getParentByTagName = Dom.getParentByTagName;
	//*******************************//
	function vazio(a) {
		try {
			//if ((a==null || isNaN(a) || typeof(a)=='undefined')) {
			if (a==null || typeof(a)=='undefined') {
				return true;
			} else if (typeof(a)=='string') {
				return trimm(a)=='';
			} else if (typeof(a)=='number') {
				return isNaN(a) || !isFinite(a);
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
	var erro = Lib.erro;

	//*********************************
	var _debJ = 0;
	//*********************************
	//texto e opcionalmente nome monitor
	function debJ(str,mon) {
		if (!dev()) return;
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
			jan.addEventListener('click',function(ev){
				var o=targetEvent(ev);setCss(o,'left','0');
				setCss(o,'bottom','0');}
			,true);
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
	/*
	/***************************
	function objNav(ob,jan) {
		var limite=800;
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
		//**************************
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
		//**************************
		function item() {
			//lert('item');
			var r = '';
			for (var i=0;i<this.o.length;i++) {
				r += this.mItem('item_'+i+'',this.o.item(i));
			}
			return r;
		}
		//**************************
		function pula(o) {
			var ds;
			if (o.substring(0,5)=='item_') {
				ds = this.o.item(1*o.substring(6));
			} else {
				ds = this.o[o];
			}
			objNav(ds);
		}
		//**************************
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
			setTimeout(()=>{
				try {
					w.document.write(r);
					//w.objNav = objNav;
					//objNavAlvo = o;
					//var zzz;
					w.este = new objNav(o,w);
				} catch (e) {
					alertErro(e);
				}
			},1000);
		}
		//**************************
		function filtrar(f) {
			if (typeof(f)!='string') {
				alert('filtro por chave');
				return;
			}
			this.filtro = f;
			this.mostra();
		}
		//**************************
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
				if (i>limite) break;
			}
			//mostra totais por tipo
			var r1 = '<tr><td colspan=2><b>'+i
			+' (limite '+limite+') </b>';
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
	*/
	
	//**************************
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
if (typeof(window) == 'object') window['browse'] = (typeof(document)=='object'?new (function() {
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

	var f = _funcoes();
	var x = new Array("getId","mostra","esconde","getAbsX","getAbsY"
	,"setX","setY","getX","getY","getTX","getTY","getDocFrame"
	,"visivel","eventoX","eventoY","tamWinX","tamWinY","cssRules","setTX","setTY");
	for (var i=0;i<x.length;i++) {
		if (!f[x[i]+this.nav]) deb('browse.init: method not exists: '+x[i]+this.nav);
		this[x[i]] = f[x[i]+this.nav];//xval('obj_'+x[i]+this.nav);
	}
	//lert("obj criado"+this);
	//lert("obj criado"+this.getId);

	this.setBodyClassDevice = () => {
		var c = (window.devicePixelRatio<1.5?'desktop':'mobile');
		classOn(document.body,c);
	}
 
	//**************************//
	//campos uso geral
	//**************************//
	this.MostraEsconde = obj_MostraEsconde;
	//**************************
	/*this.isScrolledIntoView = function(elem) {
		 var docViewTop = $(window).scrollTop();
		 var docViewBottom = docViewTop + $(window).height();

		 var elemTop = $(elem).offset().top;
		 var elemBottom = elemTop + $(elem).height();

		 return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}*/
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
	function obj_MostraEsconde(id) {
		var o = this.getId(id);
		if (this.visivel(o)) {
			this.esconde(o);
		} else {
			this.mostra(o);
		}
	}
	//**************************
	function _funcoes() {
		return {
			cssRulesNS6: (o) => {
				return o.cssRules;
			}
			,cssRulesIE4: (o) => {
				return o.rules;
			}
			,tamWinXNS6: (o) => {
				if (vazio(o)) {
					o = window;
				}
				return o.outerWidth;
			}
			,tamWinXIE4: (o) => {
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
			,eventoYNS6: (o) => {
				return o.layerY;
			}
			,eventoYNS4: (o) => {
				return o.y;
			}
			,eventoYIE4: (o) => {
				//return o.clientY;
				//lert('a');
				var e = targetEvent(o);
				return o.offsetY+browse.getAbsY(e);
				//return -1;
			}
			,eventoXNS6: (o) => {
				//lert(o.offsetWidth);
				return o.clientX;
				//return o.layerX;
			}
			,eventoXNS4: (o) => {
				return o.x;
			}
			,eventoXIE4: (o) => {
				//lert(o.offsetWidth);
				//return o.clientX+o.offsetX;
				//return o.screenX+o.offsetX;
				return o.clientX;
				//return -1;
			}
			,getTXNS6: (o) => {
				//lert(o.offsetWidth);
				try {
					return o.offsetWidth;
				} catch (e) {
					alert(erro(e));
				}
			}
			,getTXNS4: (o) => {
				return -1;
			}
			,getTXIE4(o) {
					//lert(o.offsetWidth);
					return o.offsetWidth;
				}
			,setTXNS6: (o,v) => {
				o.style.width = v;
			}
			,setTXNS4: (o,v) => {
				return -1;
			}
			,setTXIE4: (o,v) => {
				o.style.width = v;
			}
			,setTYNS6: (o,v) => {
				o.style.height = v;
			}
			,setTYNS4: (o,v) => {
				return -1;
			}
			,setTYIE4: (o,v) => {
				try {
					o.style.height = v;
				} catch (e) {
					alert(erro(e));
				}
			}
			,getTYNS6: (o) => {
				return o.offsetHeight;
			}
			,getTYNS4: (o) => {
				return -1;
			}
			,getTYIE4: (o) => {
				return o.offsetHeight;
			}
			,getIdNS6: (id,ob) => {
				if (typeof(ob)=='undefined') ob = document;
				if (!ob.getElementById) {
					return getId(ob,id);
				}
				return ob.getElementById(id);
			}
			,getIdNS4: (id) => {
				var r = document.layers[id];
				return r;
			}
			,getIdIE4: (id,ob) => {
				if (typeof(ob)=='undefined') ob = document;
				return ob.all[id];
			}
			,getXNS6: (o) => {
				return o.style.left;
			}
			,getXNS4: (o) => {
				return o.x;
			}
			,getXIE4: (o) => {
				return o.style.pixelLeft;
			}
			,getYNS6: (o) => {
				return o.style.top;
			}
			,getYNS4: (o) => {
				return o.y;
			}
			,getYIE4: (o) => {
				return o.style.pixelTop;
			}
			,setXNS6: (o,p) => {
				if (!o.style) {
					objNav(o);
					alert(erro());
				}
				o.style.left = p+'px';
			}
			,setXNS4: (o,p) => {
				o.x = p;
			}
			,setXIE4: (o,p) => {
				try {
					o.style.pixelLeft = p;
				} catch (e) {
					objNav(o);
				}
				//+'px';
			}
			,setYNS6: (o,p) => {
				o.style.top = p+'px';
			}
			,setYNS4: (o,p) => {
				o.y = p;
			}
			,setYIE4: (o,p) => {
				o.style.pixelTop = p; 
			}
			,visivelNS6: (o) => {
				return o.style.visibility == "visible";
			}
			,visivelNS4: (o) => {
				return o.visibility == "show";
			}
			,visivelIE4: (o) => {
				return o.style.visibility == "visible";
			}
			,mostraNS6: (o,b) => {
				//lert('o='+o.innerHTML);
				if (typeof(o)=='string') o = browse.getId(o);
				if (o.getAttribute('disp')) {
					o.style.display = 'block';
				} else {
					o.style.visibility = "visible";
					if (''+b=='undefined') o.style.display = '';
				}
			}
			,mostraNS4: (o) => {
				if (typeof(o)=='string') o = browse.getId(o);
				o.visibility = "show";
			}
			,mostraIE4: (o,b) => {
				if (typeof(o)=='string') o = browse.getId(o);
				o.style.visibility = "visible";
				if (''+b=='undefined') o.style.display = '';
			}
			,escondeNS6: (o,b) => {
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
			,escondeNS4: (o,b) => {
				if (typeof(o)=='string') o = browse.getId(o);
				o.visibility = "hide";
			}
			,escondeIE4: (o,b) => {
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
			,getAbsXNS6: (o) => {
				try {
					var a=o.offsetParent;
					if ((""+a).substring(0,4)=="[obj") {
						// & (""+a).indexOf("HTMLBodyElement")==-1) 
						//rr += "* "+a;
						return o.offsetLeft + browse.getAbsX(a);//obj_getAbsXNS6(a);
					} else {
						return o.offsetLeft;
					}
				} catch (e) {
					alertDev(erro(e));
				}
			}
			,getAbsXNS4: (o) => {
				return o.x;
			}
			,getAbsXIE4: (o) => {
				var a=o.offsetParent;
				if ((""+a).substring(0,4)=="[obj") {
					return o.offsetLeft + browse.getAbsX(a); //obj_getAbsXIE4(a);
				} else {
					return o.offsetLeft;
				}
			}
			,getDocFrameNS6: (o) => {
				return o.contentDocument;
			}
			,getDocFrameNS4: (o) => {
				alert("nao sei getDocFrameNS4");
				return o.contentDocument;
			}
			,getDocFrameIE4: (o) => {
				//lert("nao sei getDocFrameIE4"+obj(o.ownerDocument));
				return o.ownerDocument;
			}
			,getAbsYNS6: (o) => {
				var a=o.offsetParent;
				if ((""+a).substring(0,4)=="[obj") {
					return o.offsetTop + browse.getAbsX(a); //obj_getAbsYNS6(a);
				} else {
					return o.offsetTop;
				}
			}
			,getAbsYNS4: (o) => {
				return o.y;
			}
			,getAbsYIE4: (o) => {
				return browse.getAbsToDo(o);//obj_getAbsYNS6(o);
			}
			,tamWinYNS6: (o) => {
				if (vazio(o)) {
					o = window;
				}
				return o.outerHeight;
			}
			,tamWinYIE4: (o) => {
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
			
		};
	}
	

})():false);


//****************************************************
/** @constructor */
function estat(Nome) {
	var eu=this;
	var nome = Nome;
	var v = {};
	this.inc = inc;
	this.inc1 = inc1;
	this.toHtml = toHtml;
	this.toTxt = toTxt;
	this.getMatriz = getMatriz;
	var vt = 0;
	this.length=0; //total geral
	//****************************************************
	this.getObj = function(ch,vl) { return v;	}	
	//****************************************************
	this.max = function(ch,vl) {
		var va = typeof(v[ch])=='undefined'?-999999999999:v[ch];
		va = Math.max(vl,va);
		v[ch] = va;
		return va;
	}
	//****************************************************
	this.min = function(ch,vl) {
		var va = typeof(v[ch])=='undefined'?999999999999:v[ch];
		va = Math.min(vl,va);
		v[ch] = va;
		return va;
	}
	//****************************************************
	this.toGraphBar = function(Op) {
		var Horiz = (''+Op.type).indexOf('co')==-1; //if not column is bar
		var ord = (''+Op.sort).indexOf('va')!=-1; //if not value is label
		var desc = (''+Op.sort).indexOf('asc')==-1; //if not asc is desc
		var v1 = getMatriz();
		//ordena descendente
		if (ord) {
			//ordena valor
			v1.sort(function(a,b){return fSort(a[1],b[1],desc)});
		} else {
			//ordena chave
			v1.sort(function(a,b){return fSort(a[0],b[0],desc)});
		}
		//calcula total
		var t = 0; aeval(v1,function(v,i) { t+=v[1]; });
		//label
		var lb = [];
		//calcula
		for(var i=0;i<v1.length;i++) {
			var rs = Math.floor(v1[i][1]/t*1000+0.5)/10;
			if (Horiz) {
				lb[i] = '<b>'+v1[i][1]+'</b>&nbsp;'
					+format(rs,1)+'%'
				;
			} else {
				v1[i][0] += '<br><b>'+v1[i][1]+'</b>'
					+'<br>'+format(rs,1)+'%'
				;
			}
		}		
		//grafico
		Op.title = nome;
		if (Horiz) {
			Op['label'] = lb;
			return (new graphBarH(v1,Op)).getHtml();
		}
		return (new graphBar(v1,Op)).getHtml();
	}	
	//****************************************************
	this.getVetor = function() {
		return v;
	}	
	//****************************************************
	function getMatriz() {
		var v1 = new Array(),i=0;
		for(var prop in v) {
			v1[i++] = new Array(prop,v[prop],v[prop]/vt*100);
		}
		v1.sort(function(a,b){return fSort(a[0],b[0])});
		return v1;
	}
	//****************************************************
	this.toOptions = function() {
		var r = '';
		var v1 = getMatriz();
		v1.sort(function(a,b){return fSort(a[0],b[0])});
		for(var i=0;i<v1.length;i++) {
			r += '<option>'+v1[i][0]+' ('+format(v1[i][1],0)+')';
		}
		return r;
	}
	//****************************************************
	this.moda = function() {
		var mx=-99999,ch;
		for(var prop in v) {
			if (mx<v[prop]) {
				mx = v[prop];
				ch = prop;
			}
		}
		return ch;
	}
	//****************************************************
	function toTxt() {
		var v1 = getMatriz();
		var r = 'palavras: '+v1.length+' ocorrencias: '+vt+'\n';
		v1.sort(function(a,b){return fSort(b[1],a[1])});
		for(var i=0;i<v1.length;i++) {
			r += v1[i][0]+'\t'+format(v1[i][1],0)+'\t'+format(v1[i][1]/vt*100,2)+'\n';
		}
		return r;
	}
	//****************************************************
	function toHtml(sort) {
		sort = isNumber(sort)?sort:1;
		var v1 = getMatriz();
		v1.sort(function(a,b){return fSort(b[sort],a[sort])});
		var r = '<table class="estat" border=1>'
			+'<tr><th>'+nome+'<th>vl'
		;
		for(var i=0;i<v1.length;i++) {
			r += '<tr><td>'+v1[i][0]+'<td>'+format(v1[i][1],0);
		}
		return r+'</table>';
	}
	//****************************************************
	function inc1(ch) {
		inc(ch,1);
	}
	//****************************************************
	function inc(ch,vl) {
		vt += vl;
		eu.length++;
		if (!v[ch]) {
			v[ch]=vl;
		} else {
			v[ch]+=vl;
		}
		return v[ch];
	}
}

//****************************************************
// grafico barras horizontais
// matriz [[rotulo,valor],...]
function graphBarH(mat,Op) {
	var v1 = mat;
	//calcula mx,mi;
	var mx = -9999,mi=9999;aeval(v1,function(v,i) {
		mx=Math.max(mx,v[1]);
		mi=Math.min(mi,v[1]);
	});
	//dif 
	var df = mx-mi;
	df = Math.ceil(mx+df*0.1)-Math.floor(mi-df*0.1);
	// opcões padrão
	var op={height:'320px',width:'100px'};
	for (var i in Op) {
		op[i] = Op[i];
	}
	//*******************************
	this.getHtml = function() {
		var r = '<table class="graphBarH"'
			+(op.title?' title="'+op.title+'"':'')
			+' xborder=1 style="width:'+op['width']+';">'
		;
		if (op.title) {
			r += '<tr><th colspan=2>'+op.title;
		}
		//linha
		for(var i=0;i<v1.length;i++) {
			var rs = (v1[i][1]-mi)/df*100;
			var rs = (v1[i][1])/mx*100;
			//label
			var lb = op['label']?op['label'][i]:v1[i][1];
			//linha
			r += (i!=0?'<tr class="space"><td><td style="font-size:5%;">':'')+'<tr>';
			//label
			r += '<td style="xtext-align:right;">'+v1[i][0];
			//barra h
			r += '<td class="barH" title="'+htmlToTxt(lb)+'"'
				+' style="text-align:center;width:100%;'
				+'background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAA1JREFUCFtj+MLA8B8ABNQB9EPwtFAAAAAASUVORK5CYII=);'
				+'background-size:'+rs+'% 100%;'
				+'background-position:left;'
				+'background-repeat: repeat-y;'
				+'">'+lb
			;
		}

		return r+'</table>';
	}
}

//****************************************************
// objeto grafico barra vertical
// matriz [[rotulo,valor],...]
function graphBar(mat,Op) {
	var v1 = mat;
	//calcula mx,mi por série e geral;
	var mx=[],mi=[],df=[];
	aeval(v1,function(v,i) {
		for (var c=1;c<v.length;c++) {
			mx[0]=Math.max(mx[0]?mx[0]:-99999,v[c]);
			mi[0]=Math.min(mi[0]?mi[0]:999999,v[c]);
			df[0]=(mx[0]-mi[0])*1.02;
						
			mx[c]=Math.max(mx[c]?mx[c]:-99999,v[c]);
			mi[c]=Math.min(mi[c]?mi[c]:999999,v[c]);
			//var d = mx[c]-mi[c];
			//df[c]=Math.ceil(mx[c]+d*0.1)-Math.floor(mi[c]-d*0.1);
			df[c]=(mx[c]-mi[c])*1.02;
		}
	});
	this.color = ['f00','0f0','00f','0ff','f0f','ff0'];
	//dif 
	//var df = mx-mi;
	//df = Math.ceil(mx+df*0.1)-Math.floor(mi-df*0.1);
	// opcões padrão
	var op={height:'320px',width:'100%'
		,label:true //show label x axis
		,scales:false //scale for serie
		,min:20 //bar size % if min value
	};
	for (var i in Op) {
		op[i] = Op[i];
	}
	//*******************************
	this.toDom = function(dst) {
		var r = domObj({tag:'table',class:'graphBar'
			,style:'width:'+op.width+';'
				+'border-collapse:collapse;'
				+'border-spacing:0;'
			,targ:dst 
		});
		this.scalePorSerie = false;
		var l = domObj({targ:r,tag:'tr',style:'height:'+op.height+';'});
		var pxE = 100/(v1.length*(v1[0].length-1))*0.1;
		var pxG = 100/(v1.length*(v1[0].length-1))*0.8;
		//linha
		for(var i=0;i<v1.length;i++) {
			//var rs = (v1[i][1]-mi)/df*100;
			//lert(v1[i]);
			for (var c=1;c<v1[i].length;c++) {
				//var rs = v1[i][c]/mx[op.scales?c:0]*100;
				var ca = op.scales?c:0;
				//lert('('+v1[i][c]+'-'+mi[ca]+')/'+df[ca]+'*(100-'+op.min+')+'+op.min);
				var rs = (v1[i][c]-mi[ca])/df[ca]*(100-op.min)+op.min;
				domObj({targ:l,tag:'td',class:'br'
					,style:'width:'+pxE+'%;'
				});
				var d = domObj({targ:l,tag:'td',class:'bar'
					,title:v1[i][c]+'\n\n'+htmlToTxt(v1[i][0])
					,style:'vertical-align: bottom;width:'+pxG+'%;'
				
				});
				domObj({tag:'rect'
					,fill:'#'+this.color[c-1]
					,width:'100%',height:'100%'
					,targ:domObj({targ:d,tag:'svg'
						,width:'100%',height:rs+'%'
						,xmlns:'http://www.w3.org/2000/svg'
					})
				});
			}
		}
		//label
		l = domObj({tag:'tr',targ:r});
		for(var i=0;i<v1.length;i++) {
			//domObj({targ:l,tag:'td',style:'width:'+(100/v1.length*0.1)+'%;'
			//	,colspan:(v1[0].length-1)
			//});
			domObj({targ:l,tag:'td'
				,style:'text-align:center;'
				,'':op.label?'<p style="margin:0 3px;background-color:#eaeaea;">'+v1[i][0]+'</p>':''
				,colspan:((v1[0].length-1)*2)
			});
		}

		//reatribui srv para ajuste 
		setTimeout(function(x) {
			var v = r.getElementsByTagName('svg');
			//lert('v='+v.length);
			for (var i=0;i<v.length;i++) {
				//lert(v[i].parentNode.innerHTML);
				v[i].parentNode.innerHTML += ' ';
			}
		},100);

		return r;
	}
	//*******************************
	this.getHtml = function() {
		var r = '<table class="graphBar" xborder=1 style="width:'+op.width+';">'
			+'<tr style="height:'+op.height+';">'
		;
		//linha
		for(var i=0;i<v1.length;i++) {
			var rs = (v1[i][1]-mi[0])/df[0]*100;
			//var rs = (v1[i][1])/mx[0]*100;
			var is = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAA1JREFUCFtj+MLA8B8ABNQB9EPwtFAAAAAASUVORK5CYII=';
			r += '<td class="br" style="width:'+(100/v1.length*0.1)+'%;">'
				+'<td class="bar" title="'+v1[i][1]+'\n\n'+htmlToTxt(v1[i][0])+'"'
				+' style="width:'+(100/v1.length*0.7)+'%;'
				+'background-image:url('+is+');'
				+'background-size:100% '+rs+'%;'
				+'background-position:bottom;'
				+'background-repeat: repeat-x;'
				+'">'
				//+'<img src=\"'+is+'\">'				
			;
		}
		//label
		r += '<tr>';
		for(var i=0;i<v1.length;i++) {
			r += '<td style="width:'+(100/v1.length*0.1)+'%;">'
				+'<td '
				+' style="width:'+(100/v1.length*0.9)+'%;text-align:center;'
				+'" >'
				+(op.label?v1[i][0]:'')
			;
		}

		return r+'</table>';
	}
}

//*******************************//
// janelas dependentes para jsCSSEditor
//*******************************//
var wDep = new Array;
	//*******************************//
	function existeWin(url) {
		for(var prop in wDep) {
			if (prop == url) {
				var o = wDep[prop];
				//bjNav(o.obj);
				//lert(o.obj.focus);
				return !o.fechada && !o.obj.closed;
			}
		}
		return false;
	}
	//*******************************//
	function dRegistraWin(url) {
		alert('dreg='+url);
		for(var prop in wDep) {
			if (prop == url) {
				wDep[prop].fechada = true;
				wDep[prop].obj.close();
				return true;
			}
		}
		return false;
	}
	//*******************************//
	function registraWin(obj) {
		wDep[obj.url] = obj;
	}


	//********************************
	// abre janela navegador de dialogo
	//********************************
	function winDep(jan,url) {
		this.debug=false;
		this.jan = jan;
		this.url = url;
		this.tipo = 0;
		this.cascata = false;
		this.nome = '_blank';
		this.obj = null;
		this.pulaClose = false;
		this.janPos = -1;
		this.frame=false;
		this.centrada = true;
		this.scr = 'yes';
		this.stat = 'yes';
		this.fechada = false;
		//scroll
  
		this.w = 400;
		this.h = 400;
  
		this.abre = winDep_abre;
		this.centra = winDep_centra;
		this.on = winDep_on;
		this.fCascata = fCascata;
		this.html = html;
		//********************************
		function html(txH) {
			this.obj.innerHTML = txH;
		}
		//********************************
		function winDep_on(s) {
			if (this.frame) {
				//lert('não sei gravar em frame...');
				var d = browse.getId('frm',this.obj.document);
				//objNav(d);
				d.contentWindow.document.write(s);
			} else {
				this.obj.document.write(s);
			}
		}
		//********************************
		function winDep_centra() {
			if (browse.ie) {
				this.pX = this.jan.screenLeft+this.jan.document.body.offsetWidth/2
				-this.w/2;
				this.pY = this.jan.screenTop+this.jan.document.body.offsetHeight/2
				-this.h/2;
			} else {
				this.pX = this.jan.screenX+this.jan.outerWidth/2-this.w/2;
				this.pY = this.jan.screenY+this.jan.outerHeight/2-this.h/2;
			}
		}
		//********************************
		function fCascata() {
			if (browse.ie) {
				this.pX = this.jan.screenLeft+20;
				this.pY = this.jan.screenTop+30;
			} else {
				this.pX = this.jan.screenX+20;
				this.pY = this.jan.screenY+30;
			}
		}
		//********************************
		function winDep_abre() {
			if (existeWin(this.url)) {
				alert('url existe='+url);
				return false;
			}
			if (this.centrada) {
				this.centra();
			}
			if (this.cascata) {
				this.fCascata();
			}
			//lert('x='+this.pX+' y='+this.pY);
			var d=(this.debug?"yes":"no");
			var t='width='+this.w+',height='+this.h
			+(this.pX?',screenX='+this.pX+',screenY='+this.pY:'')
			+',resizable=yes,scrollbars='+this.scr+','
			+'toolbar='+d+',menubar='+d+',status='+this.stat;
			//+'toolbar='+d+',menubar='+d+',status='+d;
			//ebJ(t);
			if (this.frame) {
				//lert('a');
				this.obj = window.open('about:blank',this.nome,t);
			} else {
				this.obj = window.open(this.url,this.nome,t);
			}
			//lert('ab');
			try {
				this.obj.focus();
				if (this.tipo!=3) {
					registraWin(this);
				}
				if (typeof(this.frame)=='number') {
					//lert('fur='+this.url);
					this.obj.document.write(
						'<html><frameset rows="'+this.frame+',*" border=0 framespacing=0  frameborder=0>'
						+'<frame id=frm2 src="'+this.url2+'" scrolling=no>'
						+'<frame id=frm src="'+this.url+'">'
						+'</frameset></html>'
					);
				} else if (this.frame) {
					this.obj.document.write(
						'<html><frameset rows=100% border=1 framespacing=1 frameborder=0>'
						+'<frame id=frm src="'+this.url+'"></frameset>'
						+'</html>'
					);
				}
			} catch(e) {
			}
			return true;
		}
	}


//}
