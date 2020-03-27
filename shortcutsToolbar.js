//tw divs sem attr
//		alert('tot div='+a.length);
//		alert(cd+' '+a[e].innerHTML);
javascript:
function init() {
	var bd=[];
	var bdN=0;
	var oi=document.createElement('div');oi.innerHTML = 'teste';
	oi.style.cssText = 'position:fixed;max-width:20%;z-index:111;top:0px;right:0px;font-size:120%;color:white;background-color:#008800;';
	document.body.insertBefore(oi, document.body.firstChild);
	function getCod(e) {
		var v = e.getElementsByTagName('a');
		var nr = 0;
		var r;
		for (var i=0;i<v.length;i++) {
			var p = v[i].getAttribute('href').indexOf('/status/');
			if (p!=-1) {
				r=v[i].getAttribute('href');
				nr++;
			}
		}
		if (nr>1) {
			if (false) alert('<a='+nr+' '+e.innerHTML);
			r = false;
		}
		return r;
	}
	function scan() {
		var a = document.getElementsByTagName('div');
		var e;
		var nc=0,nn=0;
		for (e=0;e<a.length;e++) {
			if ( a[e].getAttributeNames().length==0 ) {
				var cd = getCod(a[e]);
				if (cd) {
					nc++;
					if (! bd[cd] ) {
						nn++;
						bd[cd] = a[e];
					}
				}
			}
		}
		bdN += nn;
		if (nn>0 && false) alert('nc='+nc+' nN='+nn+' bd='+bdN);
		oi.innerHTML = 'nc='+nc+' nN='+nn+' bd='+bdN;
		setTimeout(scan,2000);
	}
	setTimeout(scan,100);
}
new init();
var ret;ret;



//inclui js se página permite
javascript:
var a = document.createElement('script');
a.src = 'https://dv.john.lar.art.br:8443/js/teste.js';
alert('aa='+document.getElementsByTagName('head'));
document.getElementsByTagName('head')[0].appendChild(a);
var ret;ret;



javascript:(function() {var x=[':src','script','img','iframe',':href','link'];
	try {
	var tx = 'location: '+window.location+'\n'
		+'referrer: '+document.referrer+'\n'
	;
	var vt=[];
	var at;
	for (var t1 in x) {
		var t = ''+x[t1];
		if (t.length<4) {
		} else if (t.substring(0,1)==':') {
			at = t.substring(1);
		} else {
			var o = document.getElementsByTagName(t);
			tx += t+' tm '+o.length+'\n';
			for (var i=0;i<o.length;i++) {
				var va = o[i].getAttribute(at);
				if (va) {
					var p1 = va.indexOf('://');
					if (p1!=-1) {
						tx += t+' = '+va+'\n';
						va = va.substring(p1+3);
						va = va.substring(0,(va+'/').indexOf('/'));
						vt[va] = 1;
					}
				}
			}			
		}
	}
	var t='';
	var n=0;
	for (var i in vt) { t += '\n'+i;n++;}
	alert(n+'\n'+t+'\n\ntx='+tx);
	} catch (e) {
		alert(e);
	}
	var xx;return xx;
})();
	

//traduzir... a2017-08
// bloqueio 1 - noscript.forbidMixedFrames - security.mixed_content.block_active_content
//		iframe na pagina atual não aceita (solução, proxy "falsificando" página do site ?
// bloqueio 2 - Load denied by X-Frame-Options: https://translate.google.com.br/?text=09/08/2017+
//		liberando bloqueio 1 ocorre o segundo. aumenta o poder dos SITES x navegador,
//			ou navegador web se torna mais obediente aos sites.
//		" Some websites have a server setting that will not allow other websites to "frame" their content. "
javascript:var t=(
	(window.getSelection&&window.getSelection())
		||(document.getSelection&&document.getSelection())
		||(document.selection&&document.selection.createRange&&document.selection.createRange().text));
	var e=(document.charset||document.characterSet);
	e = 'https://ufrgs.br/';
	e = 'https://localhost/';
	e = 'https://google.com/';
	if(t!='') {
		e = 'http://translate.google.com.br/translate_t?text='+escape(t)+'&hl=pt_BR&langpair=auto|pt&tbb=1&ie='+e;
	} else {
		e = 'http://translate.google.com.br/translate?u='+escape(location.href)+'&hl=pt_BR&langpair=auto|pt&tbb=1&ie='+e;
	};
	var op = 'toolbar=no,width=850,height=600,scrollbars=yes';
	if (true) {
		window.open(e,'_blank',op);
	} else {
		var d = document.getElementById("_t_trd");
		alert('doc='+d);
		if (!d) {
			d = document.createElement('iframe');
			d.id = "_t_trd";
			d.style.cssText = 'z-index:500;position:absolute;width:30%;height:300px';
			document.body.insertBefore(d,document.body.firstElementChild);
		};
		d.src = e;
	};
	var aa;
	aa;

//lista todas ref externas ://
javascript:
var dom=function(t) {
	try {
		var pr = t.substring(0,t.indexOf(':'));
		t = t.substring(t.indexOf(':')+3);
		var v=t.split('.');
		var u=v[v.length-1];
		var r='';
		var mx=v.length-('-com-net-org-eu-'.indexOf('-'+u+'-')==-1?3:2);
		var mx=(mx<0?0:mx);
		for (var i=mx;i<v.length;i++) {
			r += '.'+v[i];
		}
		return r+'<td>'+pr;
	} catch (e) {
		return t;
	}
};
var estat=new Array();
var varreAttr=function(o) {
	if (!o.attributes) {
		return;
	}
	for (var i=0;i<o.attributes.length;i++) {
		var o1=o.attributes.item(i);
		var t=''+o1.value;
		var p=t.indexOf('://');
		if (p!=-1 && p<7) {
			t=t.substring(0,(t+'/').indexOf('/',p+3));
			t=dom(t)+'<td>'+o.tagName+'<td>'+o1.name;
			if (estat[t]) {
				estat[t]++;
			} else {
				estat[t]=1;
			}
		}
	};
};
var tObj=0;
var varreDoc=function(o) {
	if (!o.childNodes) {
		return;
	}
	for (var i=0;i<o.childNodes.length;i++) {
		var o1 = o.childNodes.item(i);
		tObj++;
		varreAttr(o1);
		varreDoc(o1);
	};
};
varreDoc(document);
var t = '<style>table.td {border:2px solid;padding:10px;}</style>'
	+'<table border=1>'
	+'<tr><td colspan=5><h1>referencias a outros sites</h1>'
	+'<tr><td colspan=5>referer: '+document.referrer
;
for (var x in estat) {
	if (x.indexOf('>A<')==-1) {
		t += '<tr><td>'+x+'<td>'+estat[x]+'\n';
	}
}
t+='<tr><td colspan=5>--';
for (var x in estat) {
	if (x.indexOf('>A<')!=-1) {
		t += '<tr><td>'+x+'<td>'+estat[x]+'\n';
	}
}
t += '</table>';
var o = document.createElement('div');
o.innerHTML = t;
document.body.insertBefore(o,document.body.firstChild);
alert(tObj+' '+t);
var ret;ret;


//mata atributo
javascript:
var f1=function(n) {
	var v = document.body.getElementsByTagName(n);
	alert(n+' '+v.length);
	while (v.length>0) {
		v[0].parentNode.removeChild(v[0]);
	};
};
f1('script');
f1('link');f1('style');
document.body.innerHTML = '<hr>'+document.body.innerHTML;
var ret;ret;


//mata scripts e css
javascript:
var f1=function(n) {
	var v = document.body.getElementsByTagName(n);
	alert(n+' '+v.length);
	while (v.length>0) {
		v[0].parentNode.removeChild(v[0]);
	};
};
f1('script');
f1('link');f1('style');
document.body.innerHTML = '<hr>'+document.body.innerHTML;
var ret;ret;


//dialogo com texto puro II
javascript:
var v = (document.body.textContent+'').split('\n');
x='';
la=' ';
for (var i=0;i<v.length;i++) {
	var l = v[i].trim();
	if ( la == '' && l == '') {
	} else {
		x += '\n<br>'+l;
	}
	la = l;
}
document.body.innerHTML = x;
var ret;ret;

//dialogo com texto puro
javascript:
var x = document.body.textContent;
x = x.replace(new RegExp('\n', 'g'),"\n<br>");
document.body.innerHTML = x;
var ret;ret;



//captura linhas tab conforme id
// transferido para o greasemonkey
javascript:
var lid='ctl00_ContentPlaceHolder';
t=0;tx='';		
var v=document.getElementsByTagName('tr');		
for (var i=0;i<v.length;i++) {		
	var e=v[i];	
	if (e.id.substring(0,lid.length)==lid) {
		var v1 = e.getElementsByTagName('td');
		for (var c=0;c<v1.length;c++) {	
			tx += v1[c].textContent+'\t';
		}
		tx += '\n';
		t++;
	}	
}		
var a='** envia pra site a informacao...';
var f = document.createElement('form');
f.method = 'post'; 
f.target='_trad'+(new Date()).getTime(); 
f.action = 'https://localhost/capDados/?lid='+lid; 
var to = document.createElement('textarea'); 
to.value = tx; to.name = 'tx'; 
f.appendChild(to); 
var op = 'toolbar=yes,width=850,height=600,scrollbars=yes';
var j = window.open('about:blank',f.target,op); 
document.body.appendChild(f); 
f.submit();

var a='****proxima pag'; 		
var pr=document.getElementById('ctl00_ContentPlaceHolder_lkbProxima');
pr=''+pr.href;
pr=pr.substring(pr.indexOf(':')+1);
setTimeout(function() {j.close();eval(pr);},1000);
var sdfsd;sdfsd;


//mostra iframe s src
javascript:
var x = document.getElementsByTagName('iframe');
var t = x.length+'\n\n';
for (var i=0;i<x.length;i++) {
	t += i+' '+x[i].src+'\n\n';
}
alert(t);
var tt;
tt

//altert na referencia do doc
javascript:alert(document.referrer);

javascript:alert(opener);

//muda formularios de POST para GET 
javascript:
var x = document.getElementsByTagName('form');
for (var i=0;i<x.length;i++) {
	alert(i+' method='+x[i].method);
	x[i].method = 'GET';
}
var tt;
tt

javascript:var t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var e=(document.charset||document.characterSet);if(t!='') {e = 'http://translate.google.com.br/translate_t?text='+t+'&hl=pt_BR&langpair=auto|pt&tbb=1&ie='+e;} else {e = 'http://translate.google.com.br/translate?u='+escape(location.href)+'&hl=pt_BR&langpair=auto|pt&tbb=1&ie='+e;};var op = 'toolbar=no,width=850,height=600,scrollbars=yes';window.open(e,'_blank',op);var aa;aa;

//2012-04
javascript: var t=( (window.getSelection&&window.getSelection()) ||(document.getSelection&&document.getSelection()) ||(document.selection&&document.selection.createRange&&document.selection.createRange().text)); var e=(document.charset||document.characterSet); var op = 'toolbar=yes,width=850,height=600,scrollbars=yes'; op=''; 
if(t!='') {
	var f = document.createElement('form');
	f.method = 'post'; 
	f.target='_trad'+(new Date()).getTime(); 
	f.action = 'http://translate.google.com.br/translate_t?hl=pt_BR&langpair=auto|pt&tbb=1&ie='+e; 
	var to = document.createElement('textarea'); 
	to.value = t; to.name = 'text'; 
	f.appendChild(to); 
	var j = window.open('about:blank',f.target,op); 
	document.body.appendChild(f); 
	f.submit(); 
} else {
	 e = 'http://translate.google.com/translate?u='+escape(location.href)+'&hl=pt_BR&langpair=auto|pt&tbb=1&ie='+e;
	 window.open(e,'_blank',''); 
};
var aa; aa;

//embutir js
javascript:	var e = document.createElement("script");
	e.src='http://localhost/js/obj.js';
	document.body.appendChild(e);
	var aa;aa;
	

//inclui obj pra procurar flash
javascript:var e = document.createElement("script");e.src='http://localhost/js/obj.js';	document.body.appendChild(e);var aa;aa;
