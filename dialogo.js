/*
Copyright (c) 2009 Signey John

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
//****************************************************
/** @constructor */
function dialogo(Conteudo,Classe) {
	var eu = this;
	var conteudo = Conteudo;
	//lert('cont='+conteudo);
	var classe = Classe?Classe:'dialogo';
	this.botaoFecha = '<td class="'+classe+'FechaEs">&nbsp;'
			+'<td class="'+classe+'Fecha">f<br>e<br>c<br>h<br>a<br>r'
	;
	eu['ver'] = ver;
	eu.mostra = ver;
	eu.fecha = fecha;
	var jan,jan1,fDoc;
	var aberto = false;
	var opa;
	//this.ver = ver;
	var jpos = 'position:'+(browse.IE6?'absolute;':'fixed;');
	//lert('jpos='+jpos);
	var ftex;
	var contVolta = false; //volta conteudo local original
	//OPCOES
	eu.limiteW = 0.80; //%
	eu.limiteH = 0.80; //%
	eu.overflow = true;
	eu.opat = 100; //tempo milisegs mudança opacidade fundo
	eu.opaIni = 0.2; //inicio opacidade
	eu.opaFim = 0.6; //fim opacidade
	eu.opaInc = 0.2; //inc opacidade
	eu.opaMostra = true; //mostra apos ciclo opacidade
	eu.tipoTexto = false;
	eu.tipoTextoPad = 20; //pad/moldura tela text
	eu.tipoImg = false; //colocar url da imagem
	eu.tipoImgPad = 40; //pad/moldura tela imagem
	eu.imgCarregando = 300; //tempo minimo carregando
	//eu.limH = 0.95; //uso da tela na vertical = heigth
	eu.tipoImgCtrl = false;
	//'<div class="'+classe+'Ctrl" style="float:right;" onclick=o(this).fecha()>X</div>';
	//****************************************************
	//seta html do dialogo
	this.setHtml = function(html) {
		jan.innerHTML = html;
	}
	//****************************************************
	//posiciona no 1o input, select, textarea..
	function foco(obj) {
		if (browse.aceitaFoco(obj)) {
			obj.focus();
			return true;
		}
		for (var i=0;i<obj.childNodes.length;i++) {
			if (foco(obj.childNodes.item(i))) {
				return true;
			}
		}
		return false;
	}
	//****************************************************
	function fecha(o,cd,ev) {
		if (css(o)) {
			return;
		}
		aberto = false;
		if (contVolta) {
			contVolta.appendChild(conteudo);
		}
		browse.esconde(jan);
		if (eu.onFecha) {
			eu.onFecha(jan,eu);
		}
		//esconde mascara preta
		setTimeout(function() {ver(-1);},eu.opat);
	}
	//****************************************************
	function imgOk() {
		var w  = eu.img.width;
		var h = eu.img.height;
		if (browse.ie && (w<1 || h<1)) {
			setTimeout(imgOk,100);
			return;
		}
		//lert('img ok...'+eu.tipoImg+' w'+w+' h'+h);
		jan.innerHTML = '';
		if (eu.tipoImgCtrl) {
			jan.innerHTML = eu.tipoImgCtrl;
		} else {
			jan.style.cssText += 'cursor:pointer;cursor:hand;';
			jan.onclick = fecha;
		}
		estiloAddDel(jan,classe+'Ok',true);
		//limita tam img?
		var px = fDoc.documentElement.clientWidth;
		var py = fDoc.documentElement.clientHeight;
		var dt = Math.min(px/(w+eu.tipoImgPad*4),py/(h+eu.tipoImgPad*4));
		if (dt<1) {
			w = w * dt;
			h = h * dt;
			eu.img.width = w;
			eu.img.height = h;
		}
		//debJ('w='+w+' h='+h+' dt='+dt+' p='+eu.tipoImgPad+' ty='+browse.getTY(jan));
		jan.appendChild(eu.img);
		browse.setTX(jan,w+eu.tipoImgPad*2);
		browse.setTY(jan,h+eu.tipoImgPad*2);
		eu.centraliza();
	}
	//****************************************************
	this.centraliza = function() {
		//lert('vai centro');
		//var tm = fDoc.documentElement.clientHeight*eu.limiteH;
		var tamA = 0;
		var otam=(typeof(conteudo)=='object'?conteudo:jan);
		var tm = fDoc.defaultView.innerHeight*eu.limiteH;
		if ( eu.limiteH>0 && browse.getTY(otam)-tm > 3 ) {
			if (eu.tipoTexto) {
				//ftex.style.height = (tm-eu.tipoTextoPad*2)+'px';
				setCss(ftex,'height',(tm-eu.tipoTextoPad*2)+'px');
			}
			//jan.style.height = tm+'px';
			setCss(otam,'height',tm+'px');
			tamA = 1;
			
		}
		var tm = fDoc.defaultView.innerWidth*eu.limiteW;
		if ( eu.limiteW>0 && browse.getTX(otam)-tm > 3 ) {
			setCss(otam,'width',tm+'px');
			tamA = 1;
		}
		
		if (tamA!=0) {
			if (eu.overflow && otam.style.cssText.indexOf('overflow')==-1) {
				setCss(jan,'overflow-y','scroll');
			}
			//objNav(otam);
			//alert('deu resize...css='+otam.style.cssText+' '+browse.getTX(otam));
			//setTimeout(eu.centraliza,50);
			//return;
		}

		//centraliza
		//var px = fDoc.documentElement.clientWidth/2-browse.getTX(jan)/2;
		//var py = fDoc.documentElement.clientHeight/2-browse.getTY(jan)/2;
		//2017 / set
		var px = fDoc.defaultView.innerWidth/2-browse.getTX(jan)/2;
		var py = fDoc.defaultView.innerHeight/2-browse.getTY(jan)/2;
		
		//ownerDocument.defaultView number innerWidth: 1366 number innerHeight: 636 outerHeight: 739
		//bjNav(fDoc);
		//lert('tamy='+browse.getTY(jan)+' '+fDoc.documentElement.clientHeight);
		if (jpos.indexOf('fixed')==-1) {
			alert('1vai centro');
			px += fDoc.documentElement.scrollLeft;
			py += fDoc.documentElement.scrollTop;
		}
		browse.setX(jan,px);
		browse.setY(jan,py);
		
		//tipo img
		if (eu.tipoImg && !eu.img) {
			eu.img = new Image();
			eu.img.src = eu.tipoImg;
			if (!browse.ie) {
				eu.img.onload = imgOk;
			} else {
				setTimeout(imgOk,eu.imgCarregando);
			}
		}
	}
	//****************************************************
	function frameText() {
		var tb = fDoc.createElement('div');
		//lert('aa'+tb);
		tb.innerHTML = '<table><tr><td><div class="'+classe+'Conteudo">'+'</div>'
			+eu.botaoFecha
			+'</table>'
		;
		tb = tb.firstChild;
		//lert('aa');
		jan.appendChild(tb);
		//fechar
		if (!tb.getElementsByTagName) {
			alert(tb+' '+tb.getElementsByTagName);
		}
		var r = tb.getElementsByTagName('td')[2];
		if ( r ) {
			r.onclick = fecha;
		}
		var r = tb.getElementsByTagName('div')[0];
		//lert(r);
		return r;
		//volta
	
		/*
		var tb = fDoc.createElement('table');
		var tbr = fDoc.createElement('tr');tb.appendChild(tbr);
		var tbc = fDoc.createElement('td');tbr.appendChild(tbc);
		var tbd = fDoc.createElement('div');tbc.appendChild(tbd);
		tbc.className = classe+'Conteudo';
		//muda destino dos dados
		var tbc = fDoc.createElement('td');tbr.appendChild(tbc);
		tbc.onclick = function() {ver('');};
		tbc.className = classe+'Fecha';
		tbc.innerHTML = 'f<br>e<br>c<br>h<br>a<br>r';
		jan.appendChild(tb);
		return tbd;
		*/
	}
	//****************************************************
	function ver(o,cd,ev) {
		if (typeof(o)=='string' || (aberto && o!= -1) ) {
			//FECHA
			fecha();
			return;
		} else if (o==-1) {
			//passos opacit qto ABRE/FECHA
			opa = opa==-1&&aberto?eu.opaIni:opa;
			//debJ(ms()+' opa='+opa+' aberto='+aberto);
			opa += (aberto?eu.opaInc:-eu.opaInc);
			var ops = (opa>=eu.opaFim?eu.opaFim:(opa==0?eu.opaIni:opa));
			if (jan1 && jan1.style) {
				if (browse.ie) {
					jan1.style.filter = 'Alpha(opacity='+(ops*100)+')'
				} else {
					jan1.style.opacity = ops;
				}
			}
			//terminou?
			if ( (!aberto && opa>eu.opaIni) || (aberto && opa<eu.opaFim) ) {
				//não + um ciclo
				setTimeout(function() {ver(-1);},eu.opat);
			} else if (opa<=eu.opaIni) {
				//terminou, esconde tudo
				browse.esconde(jan1);
			} else {
				//terminou e mostra jan princ
				if (eu.opaMostra) {
					browse.mostra(jan);
					eu.centraliza();
				}
			}
			return;
		}
		aberto = true;
		fDoc = document;
		jan = browse.getId(classe,fDoc);
		//obj já adicionado
		if (vazio(jan)) {
			//lert('criar jan...');
			//add obj dialogo
			//2 jan de conteudo..
			jan = fDoc.createElement("div");
			//jan.addEventListener('click',fecha);
			jan.style.cssText = jpos+"z-index:101;";
			jan.className = (classe=='dialogo'?'':'dialogo ')+classe;
			jan.classe = classe;
			jan.id = classe;
			jan.obj = eu;
			//jan.style.cssText = 'z-index: -2;';
			fDoc.body.appendChild(jan);
			browse.esconde(jan);
		}
		jan1 = browse.getId(classe+'Fundo',fDoc);
		if (vazio(jan1)) {
			//cria os elementos para o dialogo
			//1 jan de fundo toda tela
			jan1 = fDoc.createElement("div");
			jan1.className = classe+'Fundo';
			jan1.id = classe+'Fundo';
			jan1.onclick = fecha;
			jan1.style.cssText = jpos+'background-color:#000000;'
				+'opacity:0.1;filter:Alpha(opacity:10);'
				+'+z-index:100;'
			;
			fDoc.body.appendChild(jan1);
			browse.esconde(jan1);
		}
		opa = -1;
		//setTimeout(nome+'.ver(-1);',opat);
		jan.innerHTML = '';jan.style.width='';jan.style.height='';
		eu.img = false;
		//var cont recebe os dados
		ftex = eu.tipoTexto?frameText():jan;
		//preenche cont
		//lert('cont '+conteudo);
		if (typeof(conteudo)=='string') {
			ftex.innerHTML = conteudo;
			//lert(conteudo);
			if (conteudo.indexOf('<fecha/>')!=-1) {
				var f = document.createElement('input');
				f.type='button';f.value='fechar';
				f.onclick=fecha;
				//lert(f);
				ftex.appendChild(f);
			}
		} else if (typeof(conteudo)=='function') {
			conteudo(ftex);
		} else { //assume q é objeto
			//ftex.innerHTML = conteudo.innerHTML;
			//guarda nodo onde está o conteudo pra voltar
			contVolta = conteudo.parentNode;
			ftex.appendChild(conteudo);
			//ftex = conteudo;
			//jan = ftex;
		}
		
		//posiciona DIVs
		var o1 = jan.getElementsByTagName('div');
		if (!o1 || !o1[0] || !o1[0].getAttribute || o1[0].getAttribute('cont')!='js') {
			browse.mostra(jan1);
			//ie6
			if (jpos.indexOf('fixed')==-1) {
				jan1.style.cssText += ';top:'+fDoc.documentElement.scrollTop+'px'
					+';left:'+fDoc.documentElement.scrollLeft+'px'
				;
				//lert(fDoc.documentElement.scrollTop+' '+jan1.style.cssText);
			} else {
				browse.setX(jan1,0);
				browse.setY(jan1,0);
			}
			browse.setTX(jan1,fDoc.documentElement.clientWidth+'px');
			browse.setTY(jan1,fDoc.documentElement.clientHeight+'px');
			
			//jan 1 mostra e apos centraliza
			if (!eu.opaMostra) {
				browse.mostra(jan);
				//lert('centr');
				eu.centraliza();
			}
		} else {
			jan.innerHTML = '';
			browse.esconde(jan);
		}
		
		//foco
		setTimeout(function() {foco(jan);},eu.opat*4);
		
		//vai mostrando...
		setTimeout(function() {ver(-1);},eu.opat);
		
	}
}
