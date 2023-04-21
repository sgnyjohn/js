/*
	signey jun/2018 mai/2019 mai/2020 

	// dom objects not work.
	* 
	* @sgnyjohn abr/2023 Eml
	
*/

const Eml = {
	hexConv: (cp) => {
		var td = new TextDecoder(cp);
		this.conv = (h) => {
			var h1 = new Uint8Array(h.length/2);
			for (var i=0;i<h.length;i+=2) {
				h1[i/2] = parseInt(h.substring(i,i+2),16);
			}
			return td.decode(h1);
		}
		return this;
	}
	,decodQ:(cp,s)=> {
		//https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
		var cv = Eml.hexConv(cp);
		var r='',b='';
		for (var i=0;i<s.length;i++) {
			if (s.charAt(i)=='=') {
				b += s.substring(i+1,i+3);
				i += 2;
			} else {
				if (b!='') {
					r += cv.conv(b);
					b = '';
				}
				r += s.charAt(i)=='_'?' ':s.charAt(i);
			}
		}
		return r;
	}
	,decode: (s)=> {
		var p = 0;
		var i,f;
		while ( (i=s.indexOf('=?',p))!=-1 ) {
			i += 2;
			f = s.indexOf('?',i);
			var cp = s.substring(i,f).toLowerCase();
			var cm = s.substring(f+1,f+2).toLowerCase();
			/*cpEst.inc(cp+' '+cm,1);*/
			f += s.charAt(f+2)=='?'?3:2;
			p = s.indexOf('?=',f);
			//lert(cp+' '+cm+'\n\n'+s.substring(f,p));
			if (cm=='q') {
				var t = Eml.decodQ(cp,s.substring(f,p));
				s = s.substring(0,i-2)
					+t
					+s.substring(p+2)
				;
				p = i-2+t.length;
			} else if (cm=='b') { //base 64
				if (cp=='utf-8') {
					var t = decodeURIComponent(escape(window.atob(s.substring(f,p))));
				} else {
					var t = (window.atob(s.substring(f,p)));
				}
				s = s.substring(0,i-2)
					+t
					+s.substring(p+2)
				;
				p = i-2+t.length;				
			} else {
				p = i;
			}
		}
		return s;
	}
};


const Dom = {
	aguarde: (o,tx)=>{
		o.innerHTML = '<p class="domAguarde">'
			+'aguarde...'
			+(tx?'<br><br><b>'+tx+'</b>':'')
		+'</p>';
	}
	//***********************************************
	// add style id prefixo classe
	, addStyleId: (cssText,id,prefix)=>{
		var v = document.querySelectorAll('style#'+id);
		if (v.length!=0) return false;
		//
		if (prefix) {
			let f = Dom.folhaEstilo(cssText);
			cssText = f.txt(prefix.trim());
		}
		//
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
	, folhaEstilo: (tx)=>{
		let eu = this;
		let hV = []; //estilos
		init(tx);
		var lf = '\n';
		//**************************************************
		// compact = 1 classe por linha
		this.txt = (prefix)=>{
			let r = '';
			for (let i=0;i<hV.length;i++) {
				let e = hV[i][0]
					+' {'+objText(hV[i][1])+'}'
				;
				let prf = '';
				if (prefix&&!e.equals(prefix)) {
					prf = prefix+' ';
				}
				r += prf+e+lf+lf;
			}
			return r;			
		}
		//*********************************************
		function init(tx) {
			//usar dom mesmo.
			var ne = document.createElement('style');
			ne.innerHTML = tx;
			document.body.appendChild(ne);
			for (let i=0;i<ne.sheet.cssRules.length;i++) {
				let s = ne.sheet.cssRules.item(i);
				//alert('ss='+s.cssText);
				hV.push([
					s.cssText.leftAt('{').trim()
					,textObj(s.cssText.substrAtAt('{','}'))
				]);
			}
			domRemove(ne);
			//lert('hv='+hV);
		}
		return this;
	} //fim folhaEstilo
	//***********************************************
	/** x@constructor */
	// param obj ou text+obj
	, obj: (p,oo)=> {
		var ret;
		if (typeof(p)=='string' && p.charAt(0)=='<') {
			ret = domObj({tag:'div','':p}).firstChild;
			if (oo) oo.appendChild(ret);
			return ret;
		}
		p.doc=(p.doc?p.doc:document);
		p.tag=(p.tag?p.tag:'p');
		if (ret) {
		} else if (p.svg) {
			var uSvg = 'http://www.w3.org/2000/svg';
			//uSvg = 'org.w3c.dom.svg';
			ret=p.doc.createElementNS(uSvg,p.tag);
		} else {
			if (p.tag.charAt(0)=='<') {
				ret = domObj({tag:'div','':trimm(p.tag)}).firstChild;
			} else {
				ret=p.doc.createElement(p.tag);
			}
		}
		//onsole.log(p);
		for (var i in p) {
			//onsole.log(i);
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
			//lert('dfsf='+i+' '+ret.outerHTML);
		}
		if (p['targ']) {
			p['targ'].appendChild(ret);
		}
		return ret;
	}
};

const Lib = {
	isFunction: (o)=>{return typeof(o)=='function'}
	,isFunc: (o)=>{return typeof(o)=='function'}
	,isDom: (o)=>{return o && o.tagName;}
	,isStr: (o)=>{return typeof(o)=='string';}
	,isUnd: (o)=>{return typeof(o)=='undefined';}
	,isObj: (o)=>{return typeof(o)=='object';}
	,isNum: (str)=> {
		if (typeof(str)=='number') {
			return true;
		} else if (typeof(str)=='string') {
			return str.length!=0 && !isNaN(1*str);
		}
		return false;
	}
	,dateSql: (a,semHora)=>{
		var d = vazio(a)?new Date():a;
		if (typeof(a)=='string') {
			d = strToData(a);
		} else if (typeof(a)=='number') {
			d = new Date(a);
		}
		return takeYear(d)+'-'+strZero(d.getMonth()+1,2)
			+'-'+strZero(d.getDate(),2)
			+(semHora?'':' '+strZero(d.getHours(),2)+':'
				+strZero(d.getMinutes(),2)+':'+strZero(d.getSeconds(),2)
			)
		;		
	}
	,erro: (e)=>{
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
	}
};

/*
 * todos os objetos terão propriedade tipo "funcion"
 * 	e meus codigos podem dar problema... estat ja deu.
 * 	pois uso muito "for (k in obj)" ...
 * 
if (!Object.prototype.getElements) 
	Object.prototype.getElements = (Func,_arr) => {
		function a(obj,func,arr) {
			aeval(obj,(v,k)=>{
				if (func(v,k)) {
					arr.push(v);
				}
				if (typeof(v)=='object') {
					a(v,func,arr);
				}
			});
			return arr;
		}
		return a(this,Func,_arr?_arr:[]);
	}
;
*/

var Obj = {
	// recebe js obj/json aplica a func
	//   passando vlr e ch e add em array
	//	 se func retorna verdadeiro.
	getElements: (Obj,Func,_arr) => {
		function a(obj,func,arr) {
			aeval(obj,(v,k)=>{
				if (func(v,k)) {
					arr.push(v);
				}
				if (typeof(v)=='object') {
					a(v,func,arr);
				}
			});
			return arr;
		}
		return a(Obj,Func,_arr?_arr:[]);
	}
};

if (!Date.prototype.getYearWeek) Date.prototype.getYearWeek = function(){
	/* semana comunic começa na sexta.
	 * dom 0 5
	 * seg 1 4 
	 * ter 2 3
	 * qua 3 2
	 * qui 4 1
	 * sex 5 0
	 * sab 6 -1
	*/
	var y = this.getFullYear();
	var d0 = new Date(y, 0, 1);
	//calcula a data que começa a semana 1 do ano.
	d0.setTime(d0.getTime()+(d0.getDay()==6?6:5-d0.getDay())*24*3600000);
	//d0.setTime(d0.getTime()+((8-d0.getDay())%7)*24*3600000);
	//caso dt < d0 retorna semana do ultimo dia do ano anterior
	if (this.getTime()<d0.getTime()) return (new Date(y-1, 11, 31)).getYearWeek();
  return y+'s'+strZero(Math.floor((this-d0)/7/24/3600000)+1,2);
};

if (!Number.prototype.format) {
	// cache of NumberFormat object
	Number.prototype._format_ = {};
	Number.prototype.format = function(dec) {
		if (! Number.prototype._format_[dec] ) {
			Number.prototype._format_[dec] = new Intl.NumberFormat(
				window.navigator.language
				, { useGrouping: true,maximumFractionDigits:dec,minimumFractionDigits:dec}
			);
			//bjNav(Number.prototype._format_);
			//lert('tm for='+Number.prototype._format_.length+' '+Number.prototype._format_);
		}
		return Number.prototype._format_[dec].format(this);
	}
}

//Date
if (!Date.prototype.getDayStr) {
	//0 para Domingo
	//window.navigator.language
	Date.prototype.wd = {
		'pt':['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado']
		,'en':['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
	};
	Date.prototype.getDayStr = function() {
		var r = this.wd[window.navigator.language];
		if (!r) r = this.wd[window.navigator.language.leftAt('-')];
		if (!r) r = this.wd['en'];
		if (r) return r[this.getDay()];
	}
	Date.prototype.getDayStr3 = function(p) {
		var r = this.getDayStr();
		if (r) return r.substring(0,3);
	}
}

//Strings

if(!String.prototype.sliceQ) { 
	String.prototype.sliceQ = function(a) {
		//The parenthesis in the regex creates a captured group within the quotes
		var myRegexp = /[^\s"]+|"([^"]*)"/gi;
		var myString = 'single words "fixed string of words"';
		var myArray = [];

		do {
				//Each call to exec returns the next regex match as an array
				var match = myRegexp.exec(myString);
				if (match != null)
				{
						//Index 1 in the array is the captured group if it exists
						//Index 0 is the matched text, which we use if no captured group exists
						myArray.push(match[1] ? match[1] : match[0]);
				}
		} while (match != null);
		return myArray;
	}
}

if(!String.prototype.count) { 
	String.prototype.count = function(a) {
		var r = 0;
		var p = 0;
		while ( (p=this.indexOf(a,p))!=-1) {
			r++;
			p = p+a.length;
		}
		return r;
	}
}

if(!String.prototype.removeAtAt) { 
	String.prototype.removeAtAt = function(a,b) {
		var r = this;
		var p = 0;
		while ( (p=r.indexOf(a,p))!=-1) {
			var p1 = r.indexOf(b,p);
			if (p1==-1) break;
			r = r.substring(0,p)
					+r.substring(p1+b.length)
			;
			p += a.length;
		}
		return r;
	}
}

if(!String.prototype.replaceAll){ 
	String.prototype.replaceAll = function(a,b) {
		if (a==b) return this;
		var r = this;
		var p = 0;
		while ( (p=r.indexOf(a,p))!=-1) {
			r = r.replace(a,b);
			p = p+b.length;
		}
		return r;
	}
	String.prototype.replaceAll1 = function(a,b) {
		return this.replace(new RegExp(a,'g'),b);
	}	
}
if(!String.prototype.localToNumber){ 
	String.prototype.localToNumber = function() {
		if (!String.prototype._value_dec) {
			var a = (2324423.3).format(1);
			String.prototype._value_dec = a.substring(a.length-2,a.length-1);
			String.prototype._value_mil = String.prototype._value_dec=='.'?',':'.';
			//lert('dec='+String.prototype._value_dec+' mil='+String.prototype._value_mil);
		}
		try {
			var r = this.replaceAll(String.prototype._value_mil,'');
			if (String.prototype._value_dec != '.') {
				r = r.replace(String.prototype._value_dec,'.');
			}
			if (isNaN(r)) {
				return Number.NaN;
			} else {
				return 1*r;
			}
		} catch (e) {
			//lert(erro(e));
			return Number.NaN;
		}
	}
}
if(!String.prototype.trimm){  
  String.prototype.trimm = function(b){  
    var i,t,a=this;
		if (typeof(a)=='undefined') {
			return '';
		}
		if (typeof(b)=='undefined') {
			b = ' \n\r\t';
		}
		if (!a.substring) {
			alert(erro('trimm: param not substring function '+a));
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
  };  
}
if(!String.prototype.right){
	String.prototype.right = function(n) {
		return this.substring(this.length-n,this.length);
	} 
}
if(!String.prototype.trim){  
  String.prototype.trim = function(){  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}
if(!String.prototype.equals){  
	String.prototype.equals = function(a){  
		var t = a.length;
		if (this.length<t) return false;
		return this.substring(0,t)==a;  
	};  
}
if(!String.prototype.leftAt){  
	String.prototype.leftAt = function(s1){  
		var p = this.indexOf(s1);
		if (p==-1) return this;
		return this.substring(0,p);
	}
}
if(!String.prototype.substrRat){  
	String.prototype.substrRat = function(a){  
		var i = this.lastIndexOf(a);
		if (i<0) return this;
		return this.substring(i+1);
	}
}
if(!String.prototype.leftRat){  
	String.prototype.leftRat = function(a){  
		var i = this.lastIndexOf(a);
		if (i<0) return this;
		return this.substring(0,i);
	}
}
if(!String.prototype.substrAtAt){  
	String.prototype.substrAtAt = function(a,b){  
		return this.substrAt(a).leftAt(b);
	}
}
if(!String.prototype.substrAt){  
	String.prototype.substrAt = function(a){  
		var i = this.indexOf(a);
		if (i<0) return '';
		return this.substring(i+a.length);
	}
}
/* signey 30/mai/2019
bytes  Bits  First 	 Last     Byte 1 	 Byte 2   Byte 3 	 Byte 4
1      7     U+0000  U+007F   0xxxxxxx 
2      11    U+0080  U+07FF   110xxxxx 10xxxxxx 
3      16    U+0800  U+FFFF   1110xxxx 10xxxxxx 10xxxxxx 
4      21    U+10000 U+10FFFF 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
talvez resolva isto encodeCodePoint: https://github.com/mathiasbynens/utf8.js/blob/master/utf8.js
*/
String.prototype.lengthUtf = function(){  
	var r = 0;
	for (var i=0;i<this.length;i++) {
		i += String.fromCodePoint(this.codePointAt(i)).length-1;
		r++;		
	}
	return r;
}
String.prototype.charAtUtf = function(nr) {
	var r = 0;
	for (var i=0;i<this.length;i++) {
		if (nr==r) {
			return String.fromCodePoint(this.codePointAt(i));
		}
		i += String.fromCodePoint(this.codePointAt(i)).length-1;
		r++;		
	}
	return '?';
}  
/*String.prototype.charAtUtf = function(nr) {  
	var r = 0;
	var ii = 0;
	for (var i=0;i<this.length;i++) {
		//var n = this.charCodeAt(i);
		var n = this.codePointAt(i);
		if ( (n & 0xFFFFFF80) == 0 ) {
			ii = 0;
		} else if ( (n & 0xFFFFF800) == 0 ) {
			ii = 0;
		} else if ( (n & 0xFFFF0000) == 0 ) {
			ii = 1;
		} else if ( (n & 0xFFE00000) == 0 ) {
			ii = 1;
		} else {
			alert('erro, e função não testada ... '+n);
		}
		//onsole.log('i='+i+' ii='+ii);
		if (nr==r) {
			return String.fromCodePoint(n);
		}
		i += ii;
		r++;
	}
	return '?';
}
*/
if(!String.prototype.hexVal){  
	String.prototype.hexVal = function(){  
		var a = ''+this;
		var r = 0;
		while (a.length>0) {
			r += '0123456789ABCDEF'.indexOf(a.substring(0,1))*Math.pow(16,a.length-1);
			//lert('a='+a+' r='+r);
			a = a.substring(1);
		}
		return r;
	}
}
//*************************************
var dom = {
	new: function(tg,html,attrs,ob) {
		//alert('co='+typeof(document));
		var p = dom.newElement(tg,ob);
		//se input
		if (dom.input(tg)) {
			p.value = html;
		} else {
			p.innerHTML = html;
		}
		for (var i in attrs) {
			//evento?
			if (typeof(attrs[i])=='function') {
				p.addEventListener(i,attrs[i]);
			} else {
				p.setAttribute(i,attrs[i]);
			}
		}
		if (ob) {
			ob.appendChild(p);
		}
		return p;
	}
	,newElement: function(tg,doc) {
		if (typeof(doc)=='object') {
			while (doc && (''+doc).indexOf('HTMLDocument')==-1) doc = doc.parentNode;
		} else {
			doc = document;
		}
		return doc.createElement(tg);
	}
	,input:function(tag) {
		if (typeof(tag)=='object') tag = tag.tagName;
		return '-input-select-option-textarea-'.indexOf('-'+tag+'-')!=-1;
	}
};

