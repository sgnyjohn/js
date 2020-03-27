/* 
Copyright (c) 2019 Signey John

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


//**************************
function webSearch(idDest) {
	var iDs = idDest;
	var doc = document;
	var eu = this;
	var pg,ei=false,op,ops;
	this.deb = deb;
	var ped,loc,ds,dsf,frm,tex,qu,qt;
	var iq = 0; //inicio query ms()
	var br = {};
	(new carregaUrl()).abre('?op=engines',init);
	
	//*****************************************
	function vigia(e) {
		if (iq!=0) {
			ds.innerHTML = '&nbsp;&nbsp;<span class=q>'+format((ms()-iq)/1000,0)+'</span>, '+qt;
		} else if ( ''+window.location != loc ) {
			loc = ''+window.location;
			ped = new pedido();
			var q = ped.getJ('q');
			var e = ped.getJ('e');
			//lert('q='+q+' e='+e+'\n'+loc);
			if (q) {
				eu.mais(q,e);
			}
		}
		setTimeout(vigia,1000);
	}
	//*****************************************
	function clicouContext(e) {
		var o = targetEvent(e);
		if (o.tagName=='A') {
			var u=o.getAttribute('hr');
			var p=(new pedido(u)).get('q');
			o.setAttribute('href',p);
		}
	}	
	//*****************************************
	function clicou(e) {
		//bjNav(e);alert('clicou');
		e.stopPropagation();
		var o = targetEvent(e);
		var o1 = getParentByTagName(o,'a');
		//lert(o1+' '+o.tagName);
		if (!o1) {
		} else if (o1.tagName=='A') {
			var p = new pedido(o1.getAttribute('hr'));
			var ur = p.get('q');
			if (false && vazio(ur) && op=='google' ) {
				objNav(o1)
				alert('ir='+ur);
			} else if (vazio(ur) ) {
				window.open(o1.getAttribute('hr'));
			} else {
				window.open(ur);
			}
			return false;
		}
	}
	//*****************************************
	function trataAtalhos(o) {
		var v = o.getElementsByTagName('a');
		for (var i=0;i<v.length;i++) {
			var a = v[i].getAttribute('href');
			//lert('a='+a);
			//id da sessão
			var pd = new pedido(a);
			if (!ei) {
				ei = pd.get('ved');
				if (ei) {
					//lert(ei+' '+a);
				}
			}
			//retira param do googl
			var p = a.indexOf('?sa=X');
			p = (p==-1?a.indexOf('&sa=X'):p);
			if (p!=-1) {
				a = a.substring(0,p);
			}			
			v[i].setAttribute('hr',a);
			v[i].setAttribute('href','javascript:nada();');
			//add paragrafo com atalho completo
			var t = doc.createElement('p');
			t.innerHTML = a;//pd?pd.get('q'):a;
			var p = v[i];
			if (p.nextElementSibling) {
				p.parentNode.insertBefore(t,p.nextElementSibling);
			} else {
				p.parentNode.appendChild(t);
			}			
		}
	}
	//*****************************************
	function gid(t,ob) {
		var r = browse.getId(t,ob);
		if (!r) {
			r = getElementsByClassName(ob,t)[0];
		}
		if (!r) {
			r = {};
		}
		return r;
	}
	//*****************************************
	// resultado google
	function respGoogle(tr,ob) {
		//xpd
		deb('<pre>'+html(troca(tr,'>','>\n'))+'</pre>');
		var v1 = ob.getElementsByTagName('style');
		var cl;
		for (var i=0;i<v1.length;i++) {
			if (equals(trimm(v1[i].innerHTML),'.')) {
				cl = substrAtAt(v1[i].innerHTML,'.','{');
				break;
			}
		}
		var rs = ob.getElementsByClassName('xpd');
		rs = (rs.length==0?ob.getElementsByClassName(cl):rs);
		//lert('tr='+rs.length+' cl='+cl+'\n st='+'');
		aeval(rs,function(e,i){
			ds.appendChild(e);
		});

		trataAtalhos(ds);

	}	
	//*****************************************
	// recebe codigo html por ajax.
	function resp(n,x,t) {
	
		//lert('resp='+t);
		// em ops está vetor da configuração do provedor da busca.
		iq = 0;
		//lert(ops+' ==> resp='+leftAt(t,'<br>'));
		var d = document.createElement('div');
		// ids resultStats e rcnt/ires
		var tr = t;//troca(t,'http://','?url=');
		//tr = troca(tr,'https://','?urls=');
		d.innerHTML = tr;
		
		//google novo
		if (op=='google') {
			respGoogle(tr,d);
			return;
		}
		
		
		var tf = '';
		var x = gid(ops[6],d);
		if (!x || !x.getElementsByTagName) {
			deb('<pre>'+html(troca(t,'>','>\n'))+'</pre>');
			alert('erro obj retorno ...'+ops[6]);
			//domObj({tag:'textarea',innerHTML:troca(html(t),'>','>\n'),targ:d});
			//ds.appendChild(d);
			return;
		}
		var x1 = gid(ops[5],d);
		var x2 = gid('obs',d);
		if (!x1 || !x1.getElementsByTagName) {
			objNav(x1);
			alert("aaa");
			deb('<pre>'
				+'x1='+x1+'\n\n'
				+'x2='+x2+'\n\n'
				+troca(html(t),'>','>\n')+'</pre>'
			);
			return;
		}
		trataAtalhos(x1);
		//lert('ds='+ds+' x1='+x1+' res='+x1.innerHTML);
		ds.innerHTML = qt
			+'<h2>'+x.innerHTML+'</h2>'
			+'<div style="padding:7px;">'+x1.innerHTML+'</div>'
			+'<div style="border:2px solid;padding:10px;">'+x2.innerHTML+'</div>'
			+'<p onclick="javascript:ob.mais();">mais</p>'
		;
	}
	//*****************************************
	this.mais = function(q,e) {
		// chamado pela URL ou FORM ?
		if (q) {
			var v = q;
			if ( ! br[e] ) {
				op = 'google'
			} else {
				op = e;
			}
			ops = br[op];
			//lert('op='+op+' ops='+ops+' '+br);
		} else {
			//clicou botão - a alteracao location dispara a pesquisa...
			var v = tex.value; //frm.q.value;
			window.location = '#e='+op+'#q='+escape(v);
			return;
		}
		var p = new carregaUrl();
		//p.charSet = 'UxTF-8';
		qu = v;
		qt = 'engine: <span class=q>'+op+'</span>'
			+' query: <span class=q>'+qu+'</span>'
		;
		var u = '?op=search&q='+escape(v)+'&eng='+op+'&pg='+pg+'&ei='+ei;
		//browse.getId('q').value = v;
		tex.value = v;
		//lert(v+' '+browse.getId('q').value);
		//lert(' vai ped '+u);
		p.abre(u,resp);
		iq = ms();
		pg++;
	}
	//*****************************************
	function pesq(e) {
		var o = targetEvent(e);
		op = o.value;
		ops = br[op];
		//lert('ops='+ops);
		pg = 0;
		ei = false;
		//lert(op);
		eu.mais();
	}
	//*****************************************
	function deb(t) {
		var d = browse.getId('deb');
		if (!d) {
			alert('falta id=deb \n\n'+t);
			return;
		}
		d.innerHTML += '<div class=debIt>'+t+'</div>';
	}
	//*****************************************
	function init(a,b,tx) {
		//lert('tx='+tx);
		var v = trimm(tx).split('\n');
		for (var i=0;i<v.length;i++) {
			var a = v[i].split('\t');
			//guarda a partir da pos 1
			br[a[0]] = substrAt(v[i],'\t').split('\t');
		}
		dsf = browse.getId(iDs);
		//domObj({tag:'h1',innerHTML:'teste',targ:dsf});
		frm = domObj({tag:'form',targ:dsf});
		//lert(dsf);
		//comandos input
		tex = domObj({tag:'input',name:'q',size:40,targ:domObj({tag:'p',innerHTML: ' 🔎 ',targ:frm})});
		//buscadores
		for (var i in br) {
			var o = domObj({tag:'input',type:'button',value:i,targ:frm});
			addEvento(o,'click',pesq);
		}
		//destino
		ds = doc.createElement('div');
		dsf.appendChild(ds);
		ds.addEventListener('click',clicou,false);
		ds.addEventListener('contextmenu',clicouContext,false);
		setTimeout(vigia,1000);
		//debug
		domObj({tag:'div',id:'deb',targ:dsf});
	}
}


