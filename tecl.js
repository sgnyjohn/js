var oTecladoN = new tecladoN();
//**********************************************************
function tecladoN() {
	var doc = document;
	this.aberto = false;
	var div,dest,aberto=false,campo,maxT=-1;
	var eu = this;
	setTimeout(init,200);
	//**********************************************************
	function init() {
		div = doc.createElement('div');
		div.className = (browse.ie?'':'escondidoD ')+'xdivTeclado divTecladoN';
		if (browse.ie) {
			//jan.style.display = 'none';
			div.style.position = 'absolute';
			div.style.visibility = 'hidden'; 
		} else {
			div.setAttribute('disp',1);
		}
		eu.calc = new calc('top.oTecladoN.calc',div,true);
		//div.innerHTML='<h1>TESTE</h1>';
		doc.body.appendChild(div);
		eu.jan = new menuPopUp('top.oTecladoN.jan',div);
		eu.jan.abaixo = false;
		eu.jan.acima = true;
		eu.calc.tec = eu;
	}
	//**********************************************************
	function fecha(cmp) {
		//alert('div='+div);
		//browse.esconde(div);
		eu.jan.fecha();
		aberto = false;
		if (!vazio(cmp) && cmp!=campo) {
			abre(cmp);
		}
	}
	//**********************************************************
	this.fim = function(r) {
		//lert(r+' cmp='+typeof(campo));
		dest.value = troca(troca(''+r,',',''),'.',',');
		fecha(campo);
		dest.focus();
	}	
	//**********************************************************
	this.abre = function(ob,cmp) {
		//pega objeto campo pra preencher no final
		if ( vazio(dest) ) {
			dest = getParentByTagName(ob,'form');
			if (dest) {
				dest = dest[cmp];
			}
		}
		if (aberto) {
			fecha(cmp);
			return;
		}
		campo = cmp;
		aberto = true;
		//alert('abre teclado '+cmp);
		//div = browse.getId("divTeclado");
		//browse.mostra(div);
		eu.jan.abre(ob);
	}
}


var oTeclado = new teclado();
//**********************************************************
function teclado() {
	this.abre = abre;
	this.clic = clic;
	this.aberto = false;
	var div,dest,aberto=false,campo,maxT=-1;
	loadCss('/estilos/acessorios.css');
	setTimeout(init);
	//**********************************************************
	function fecha(cmp) {
		//alert('div='+div);
		browse.esconde(div);
		aberto = false;
		if (!vazio(cmp) && cmp!=campo) {
			abre(cmp);
		}
	}
	//**********************************************************
	function abre(ob,cmp) {
		if (aberto) {
			fecha(cmp);
			return;
		}
		campo = cmp;
		aberto = true;
		//bjNav(div);alert('abre teclado '+div);
		//div = browse.getId("divTeclado");
		browse.mostra(div);
		//objNav(ob);
		dest = getParentByTagName(ob,'form');
		if (dest) {
			dest = dest[cmp];
		}
		if (!dest) {
			dest = document.__formul[cmp];
		}
		/*} catch (e) {
			alert(erro(e));
			dest = browse.getId(cmp);
		}
		*/
		//objNav(dest);
		dest.focus();
		maxT = -1;
		if (typeof(dest.maxLength)=='number') {
			maxT = dest.maxLength;
		}
		//objNav(dest);
		//alert(dest.valid);
		try {
			fD.selects(false);
		} catch (e) {
			//alert(''+e);
			//obj(e);
		}
		var x = browse.getAbsX(dest)+browse.getTX(dest);
		var y = browse.getAbsY(dest)-browse.getTY(div);
		//testa se vai ficar fora
		y = y<0?0:y;
		var tj = browse.tamWinX();
		//alert(tj);
		if (x+browse.getTX(div)>tj-20) {
			x =  tj-browse.getTX(div)-20;
		}
		browse.setX(div,x);
		browse.setY(div,y);		
	}
	//**********************************************************
	function clic(p) {
		var ds = dest.value;
	
		var v = palavraA(''+p,'.');
		var a = 0;
		if (v[0]>'9') {
			v[1] = 1*v[1]; ///2*4;
			a = (v[0]=='f'?te[v[1]+1]:te[v[1]]);
			//alert(p+', especial '+v[1]+'='+(v[0]=='f'?te[v[1]+2]:te[v[1]]));
			//return;
		} else {
			a = t[1*v[0]+(caps||shi?1:0)].substring(1*v[1],1+1*v[1]);
		}
	
		//aperta/desaperta botao
		if (!(a=='caps' && caps)) {
			var x = browse.getId('cmd'+p);
			x.className=troca(x.className,'teclC','teclC teclCApert');
			if (a=='caps') {
				caps = true;
				return;
			} else if (a=='sh' && !shi) {
				sho = x;
				shi = true;
				return;
			}
		}
		if (!(a=='caps' && !caps)) {
			setTimeout('var x=browse.getId("cmd'
				+p+'");x.className=troca(x.className," teclCApert","")',250);
			if (a=='caps') {
				caps = false;
				return;
			}
			if (shi==true) {
				sho.className = troca(sho.className," teclCApert","");
				if (a=='sh') {
					return;
				}
			}
		}
	
		if (a=='enter' || a=='tab') {
			//var r;
			//alert('fim='+ds);
			//res = true;
			//ds = ''+r;
			dest.focus();
			focusNext(dest);
			fecha();
		} else if (a=='caps') {
		} else if (a=='space') {
			ds += ' ';
		} else if (a=='clear') {
			ds = '';
		} else if (a=='<-') {
			var tm = ds.length;
			if (tm==0) return;
			var bb=ds.substring(tm-1,tm);
			//alert(bb+' '+bb.length);
			ds = ds.substring(0,tm-(bb==' '?2:1));
		} else {
			if (res) {
				ds = '';
			}
			ds += a;
			res = false;
		}
		if (maxT!=-1 && ds.length>maxT) {
			ds = ds.substring(0,maxT);
			alert('limite '+maxT);
		}
		if (ds.length==0) {
			//browse.getId('teclDisp').innerHTML = limpa;
			dest.value = '';
			dest.focus();
		} else {
			//acentos
			if (ds.length>1 && !vazio(ta[right(ds,2)])) {
				ds = ds.substring(ds,ds.length-2) + ta[right(ds,2)]; 
			}
			//browse.getId('teclDisp').innerHTML = troca(ds,' ','&nbsp;');
			dest.value = ds;
			dest.focus();
		}
		shi = false;
	}
	
	//definição teclado
	//*************************************************
	var ds = '',tnl=3;
	var limpa='&nbsp;';
	var res=false;
	var caps = false,shi=false,sho=0;
	var t= new Array(
									'\'1234567890-='
									,'"!@#$%¨&*()_+'
									,'qwertyuiop´['
									,'QWERTYUIOP`{'
									,'asdfghjklç~]'
									,'ASDFGHJKLÇ^}'
									,'\\zxcvbnm,.;/'
									,'|ZXCVBNM<>:?'
								);
	//teclas especiais - início e fim de cada linha + space       
	var te = new Array(
			'','<-'
			,'tab','enter'
			,'caps','enter'
			,'sh','sh'
			,'space'
		);
	var te = new Array(
			'','<-'
			,'tab','space'
			,'caps','space'
			,'sh','sh'
			,'enter'
		);
	//tabela de substituição acentuação pt_BR
	var a  = new Array(
				'áéíóúüàâêôãõñÁÉÍÓÚÜÀÂÊÔÃÕÑ'
			,'aeiouuaaeoaonAEIOUUAAEOAON'
			,'´´´´´¨`^^^~~~´´´´´¨`^^^~~~'
		);
	var ta = new Array();
	for (var i=0;i<a[0].length;i++) {
		ta[a[2].substring(i,i+1)+a[1].substring(i,i+1)] = a[0].substring(i,i+1);
	}
	
	var tbec=new Array();
	tbec[111] = '/';
	tbec[106] = '*';
	tbec[109] = '-';
	tbec[107] = '+';
	tbec[8] = '<';
	tbec[13] = '=';
	tbec[108] = ',';
	tbec[110] = ',';
	tbec[190] = ',';
	tbec[46] = 'C';
	for (var i=0;i<10;i++) {
		tbec[i+96] = '0123456789'.substring(i,i+1);
	}
	
	//monta tecl
	//*************************************************************************
	function init() {
		div = domObj({tag:'div',targ:document.body
			,id:'divTeclado'
			,class:'tecl'
			,style:'POSITION: absolute; VISIBILITY: hidden; TOP: 0px; LEFT: 0px;'
		});
		//on('<LINK REL="StyleSheet" HREF="/estilos/acessorios.css">');
		var ht = '<table id=tecl class=tecl cellspacing=0 cellspadding=0>';
		var e = new Array(0,8,10,6);
		var em = 11,ei=11,ef=11;
		var tmt = t[0].length*em+ei+ef;
		for (var i=0;i<t.length;i+=2) {
			//alert(t[i]);
			//fixa tamanho se primeira linha
			for (var x=0;i==0 && x<tmt;x+=1) {
				ht += ((x==0?'<tr>':'')+'<td class=teclEsp colspan=1>');
			}
			var pa = i/2;
			var ea = e[pa];
			ht += ('<tr>'+(ea==0?'':'<td class="teclC teclEspe"'
				+' onclick=oTeclado.clic("i.'+i+'");'
				+' id=cmdi.'+i
				+' colspan='+(ea+ei)+'>'+te[pa*2])
			);
			for (var x=0;x<t[i].length;x++) {
				var p = i+'.'+x;
				ht+= ('<td id=cmd'+p+' class="teclC"'
					+' colspan='+em
					+' rowspan=1'
					+' onclick=oTeclado.clic("'+p+'")>'
					+(t[i+1].substring(x,x+1).toLowerCase()!=t[i].substring(x,x+1)
							?'<span id=teclCE>'+t[i+1].substring(x,x+1)+'</span><br>'
								+t[i].substring(x,x+1)
							:t[i+1].substring(x,x+1)
						)
				);
			}
			ht += ((ea==em?'':'<td class="teclC teclEspe"'
				+' onclick=oTeclado.clic("f.'+i+'");'
				+' id=cmdf.'+i
				+' colspan='+(em-ea+ef)+'>'+te[pa*2+1]+'</tr>')
			);
		}
		ht += (
			'<tr><td id=cmda.8 onclick=oTeclado.clic("a.8"); colspan='+tmt+' class="teclC">enter'
			+'</table>'
			+'</div>'
		);
		div.innerHTML = ht;
		ht = '';
	}

}
	
