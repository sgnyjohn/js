/*
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


//********************************************
// svg graph line
//********************************************
function graphLine(V,Op) {
	if (!V.length) {
		Op = V;
		V = Op.data;
	}
	var vt = V;
	var op;
	var doc = document;
	var ty = 9000;
	var tx = 16000;
	var mx=[],mi=[],df=[];
	var lnEv;
	var ctr,ctrD,svg;
	var labelLine = true;
	init(Op);
	//***************************
	function mousemove(ev) {
		//mEv = ev;
		if (ctr) {
			if (ctr==ev.target) return;
			//outro objeto, volta cor original e termina
			ctr.style['stroke-opacity'] = 1;
			ctrD.hide();			
		}
		//criar novo objeto
		ctr = ev.target;
		var ta='';
		if (!ctrD) ctrD = new contextDiv({html:'legenda'});
		var ln = 1*ctr.getAttribute('grafline');
		if (ctr.getAttribute('class')=='yScale') {
			//alert('scale');
			var t = op.yScale[ln].label;
		} else if (ln<1) {
			return;
		} else {
			var p = ctr.getBoundingClientRect();
			//(i/(vt.length-1)*tx)
			var d = Math.floor((ev.x-p.left)/((p.right-p.left)/vt.length)+0.5);
			var t = (op.labelData[ln]
				? op.labelData[ln](vt[d],d)
				: op.label[0]+': <b>'+vt[d][0]+'</b><br><br>'
					+op.label[ln]+': <b>'+vt[d][ln]+'</b>'
				//+'<br><br>'+p.left+' '+p.right+'<br>'+ev.x+' x '+ev.y
				)
			;
		}
		if (t!=ta) {
			ctrD.text(t);
			ta = t;
			ctrD.show(ev);
		}
		var nv=0;
		setTimeout(faz);
		function faz() {
			//mesmo objeto?
			if (ctr==ev.target) {
				nv++;
				ctr.style['stroke-opacity'] = (nv%2==1?0.4:1);
				setTimeout(faz,250);
			}
		}
	}
	//***************************
	function eixos() {
		//lert('mx='+mx+' mi='+mi);
		//var ln = 'fill="none" stroke="rgb(0,69,134)" stroke-width="10"';
		var tx=16000;
		var ty=9000;
		var x=0,y=400;
		//moldura 1
		var r = replacePos("<rect class='moldura' width='@' height='@' />",[tx,ty]);
		//titulos
		if (op.title) {
			if (typeof(op.title)=='string') op.title = [op.title];
			for (var i=0;i<op.title.length;i++) {
				r += replacePos("<text class='head@' x='@' y='@' text-anchor='middle'>@</text>"
					,[i,tx/2,y,op.title[i]]
				);
				y += 300;
			}
		}
		//lh='';
		//moldura 2
		r += "<svg  x='300' y='"+y+"' width='15400' height='"+(ty-y-400)+"'>"
				+"<rect class='moldura' fill='none'  x='0' y='0' width='100%' height='100%' />"
				+"<svg  x='200' y='150' width='15000' height='7600'>"
		;
		//novos limites 
		ty = 7600;
		tx = 15000;
		//scale y
		for (var c=0;c<op.yScale.length;c++) {
			var vl = op.yScale[c].y;
			if (vl>=mx[0] || vl<=mi[0]) continue;
			var pf = ((mx[0]-vl-(df[0]-df[1]))/df[0]*ty);
			var pf = ((mx[0]-vl)/df[0]*ty);
			var lh='<polyline grafline='+c+' style="stroke:#000000;" class="yScale"'
				+' points="'
						+		 (0/(vt.length-1)*tx)					+','+pf
						+' '+(vt.length/(vt.length-1)*tx)	+','+pf
				+'"/>'
			;
			r += lh;
		}
		//lert(mx[0]+' lh='+lh);
		//linhas - para cada coluna dados, uma linha
		for (var c=1;c<vt[0].length;c++) {
			var ca = op.scales?c:0;
			var ln = '';
			//adiciona todos os pontos da linha cujos dados estão na coluna
			for (var i=0;i<vt.length;i++) {
				var d = (df[ca]-df[c])/2;
				var d = 0;
				if (true) {
					//ln += ' '+(tx-i/(vt.length-1)*tx)+','+(ty-(mx[ca]*1.05-vt[i][c]-d)/df[ca]*ty );
					ln += ' '+(i/(vt.length-1)*tx)+','+((mx[ca]-vt[i][c]-d)/df[ca]*ty);
				} else {
					ln += ' '+(tx-i/(vt.length-1)*tx)+','+((vt[i][c]-mi[ca])/df[ca]*ty);
				}
			}
			//lert(c+' '+op.color[c-1]+' '+ln);
			r += '<polyline grafline='+c+' style="stroke:'+op.color[c-1]
				+';" class="line" points="'+ln.substring(1)+'"/>'
			;
		}
		r += "</svg>"
			//+'<text id=tx x=14200 y=7400 width=100 fill=red stroke=blue height=100>legenda</text>'
			+"</svg>"
		;
		//lert(r);
		return r;
	}
	//***************************
	function cab() {
		return '<svg  style="width:100%;" viewBox="0 0 16000 9000"><style>'+st()+'</style>';
	}
	//***************************
	function st() {
		return '<![CDATA['
			+'text{font:normal 120px Verdana, Helvetica, Arial, sans-serif}'
			+'text.head0{font-weight:bold;font-size:350px}'
			+'text.head1{font-weight:bold;font-size:250px}'
			+'text.head2{font-weight:bold;font-size:170px}'
			+'path,polyline{fill:none;stroke:#0004f0;stroke-width:50;}'
			+'.line{fill:none;stroke-width:50;xstroke-dasharray:50 50 100 50;}'
			+'.yScale{fill:none;stroke-width:20;}'
			+'.moldura{fill:none;stroke:#f04000;stroke-width:20;}'
			+op.style
			+']]>'
		;
	}
	//***************************
	function rodap() {
		return '</svg>';
	}
	//***************************
	this.toDom = function() {
		// https://willianjusten.com.br/manipulando-svg-com-js/
		// container, tags svg não aceita eventos, 
		svg = domObj({svg:1,tag:'svg'
			,style:(op.width=='100%'
				?'max-height:80%;max-width:95%;height:auto;width:auto;' //chrome svg
				:'width:'+op.width)
			+';'
			,viewBox:'0 0 16000 9000',targ:op.dst
			,ev_mousemove: mousemove
		});

		var s = domObj({tag:'style','':st(),targ:svg});

		svg.innerHTML += eixos();

		
		return svg;
	}
	//***************************
	this.toHtml = function () {
		return cab()+eixos()+rodap();
	}
	//***************************
	function init(Op) {
		op  = mergeOptions({height:'320px',width:'100%'
			,labelX:true //show label x axis
			,scales:false //scale for serie
			,color: ['#f00000','#00ff00','#0000ff','#00ffff','#ff00ff','#ffff00']
			,label:[]
			,labelData:[]
			,style:''
			,mxInit: -999999
			,miInit: 999999
			,yScale: []
		},Op);
		//calcula mx,mi por série e geral;
		aeval(vt,function(v,i) {
			for (var c=1;c<v.length;c++) {
				mx[0]=Math.max(mx[0]?mx[0]:op.mxInit,v[c]);
				mi[0]=Math.min(mi[0]?mi[0]:op.miInit,v[c]);
							
				mx[c]=Math.max(mx[c]?mx[c]:op.mxInit,v[c]);
				mi[c]=Math.min(mi[c]?mi[c]:op.miInit,v[c]);

			}
		});
		//alert(typeof(op.min));
		//personal min
		if (typeof(op.min)=='number') {
			mi[0] = op.min;
		} else if (typeof(op.min)=='object') {
			aeval(op.min,function(v,i) {mi[i+1] = v;});
		}
		//personal max
		if (typeof(op.max)=='number') {
			mx[0] = op.max;
		} else if (typeof(op.max)=='object') {
			aeval(op.max,function(v,i) {mx[i+1] = v;});
		}
		//dif
		aeval(mi,function(v,i){ df[i] = (mx[i]-mi[i])*1.1; });
		
		if (op.dst) {
			setTimeout(this.toDom);
		}


	}
}


//****************************************************
// words
function word() {
	var v = {};
	//acumula palavra 
	this.inc = function(tx) {
	}
}

//****************************************************
// contador sonegometro,incentivometro
function contador(className) {
	var eu = this;
	var cl = className;
	var ds;
	var doc;
	this.vin = 0; //valor inicio
	this.din = new Date(2020,0,1,0,0,0); //data valor inicio
	this.vfi = 000031491940070.0; //valor fim
	this.dfi = new Date(2020,0,10,17,4,0); //data valor fim
	var incr;
	var vla,vlaa; //str valor atual
	this.ti = 2000; //incrementa a cada ms
	var tmo;
	this.nd = 15; //numero digitos
	this.br = '               ';
	//this.br = '000000000000000';
	var aa = 0;
	this.css = ''
		+'DIV.conta TD {font-size: 2em;}'
		+' DIV.conta TD.dig {background-color: #ffffff; font-weight: bold; padding: 8px 9px 0px;}'
		+' DIV.conta TABLE {border-collapse: separate;border-spacing: 7px;margin: 30px auto;}'
		//+' DIV.conta TD.digp {color: #ffffff;}'
		+' DIV.conta TD.digp {animation: .5s shake infinite alternate;}'
		+' @keyframes shake {0% { transform: skewX(-15deg); } 5% { transform: skewX(15deg); } 10% { transform: skewX(-15deg); } 15% { transform: skewX(15deg); } 20% { transform: skewX(0deg); } 100% { transform: skewX(0deg); } }'
	;
	var vd = [];//digitos td
	//setTimeout(init,10);
	//************************************************
	function str() {
		vlaa = vla;
		vla = right(eu.br+Math.floor(
			((new Date()).getTime()-eu.din)*incr
		),15);
	}
	//************************************************
	function inc() {
		aa--;
		if (aa<0) {
			aa = eu.nd-1;
			str();
		}
		c = vla.substring(aa,aa+1);
		classOff(vd[aa],'digp');
		vd[aa].innerHTML = c==' '?'&nbsp;':c;
		if (aa>0 && vla.substring(0,aa)!=vlaa.substring(0,aa) ) {
			classOn(vd[aa-1],'digp');
		}
		setTimeout(inc,tmo);
	}
	//************************************************
	this.start = function() {
		if (typeof(cl)=='string') {
			doc = document;
			ds = doc.getElementsByClassName(cl)[0];
		} else {
			ds = cl;
			cl = leftAt(ds.className+' ',' ');
			doc = domDoc(ds);
		}
		if (!ds) {
			alert('error class '+cl+' not found');
			return;
		}
		incr = (eu.vfi-eu.vin)/(eu.dfi-eu.din);
		tmo = eu.ti/eu.nd;
		var irmao = getIrmao(ds,true);
		if (irmao && irmao.tagName=='STYLE') {
			//objNav(irmao);alert('irmao='+irmao);
			irmao.innerText = troca(eu.css,'.conta ','.'+cl+' ');
		}
		setTimeout(init,10);
	}
	//************************************************
	function init() {
		var tr = domObj({tag:'tr',className:'contador'
			,targ:domObj({tag:'table',targ:ds})
		});
		str();
		for (var i=0;i<eu.nd;i++) {
			var c =  vla.substring(i,i+1);
			vd[i] = domObj({tag:'td'
				,innerHTML:c==' '?'&nbsp;':c
				,class:'dig'
				,targ:tr}
			);
			//lert(vd[i].className);
			if (i%3==0) {
				domObj({tag:'td',innerHTML:(eu.nd-i<4?',':'.'),targ:tr});
			}
		}
		setTimeout(inc,tmo);
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
//**************************//
// objeto calendMes
//**************************//
function calendMes(nome,nomeLocTex,nomeLocHoje) {
	this.fSize1 = 1;
	this.fSize2 = 2;
	//nome da var que armazena este objeto
	//objeto para atribuir innerHTML
	this.nome = nome;
	this.obj = browse.getId(nomeLocTex);
	if (!this.obj) {
		alert('id='+nomeLocTex+' nao achei.');
	}
	this.objH = browse.getId(nomeLocHoje);
	this.mDia = 1000*60*60*24;
 
	this.monta = calendMes_Monta;
	this.iMes = calendMes_iMes;
	this.iAno = calendMes_iAno;
	this.iDia = calendMes_iDia;
	this.clickP = calendMes_Click;
	this.dataF = calendMes_dataF;
	this.feriado = calendMes_Feriado;
	this.set = calendMes_Set;
	this.cha = calendMes_Char;
	this.horas = calendMes_horas;
 
	this.corH = '"#07FFFF"';
 
	this.hVerao = new Array();
 
	this.fer = Array();
	this.fer[1.0] = 'Ano Novo';
	this.fer[21.03] = 'Tiradentes';
	this.fer[1.04] = 'Trabalho';
	this.fer[7.08] = 'Independência';
	this.fer[12.09] = 'Criança';
	this.fer[2.10] = 'Finados';
	this.fer[15.10] = 'República';
	this.fer[25.11] = 'Natal';
 
	this.set(this.dataF(new Date()));
	//**************************//
	function calendMes_Char(d) {
		var r='';
		for (var i=0;i<d.length;i++) {
			r += '<br>'+d.substring(i,i+1);
		}
		return r.substring(4);
	}
	//**************************//
	function calendMes_Set(d) {
		var v;
		d = trimm(d);
		if (d.indexOf(' ')!=-1) {
			d = leftAt(d,' ');
		}
		if (d.indexOf("/")!=-1) {
			v = palavraA(d,"/");
			this.ano = v[2]*1;
			this.mes = v[1]-1;
			this.dia = v[0]*1;
		} else {
			v = palavraA(d,"-");
			this.ano = v[0]*1;
			this.mes = v[1]-1;
			this.dia = v[2]*1;
		}
		if (this.ano==0) {
			//this.monta();
			return;
		}
		this.data = new Date(this.ano,this.mes,this.dia);
		//lert('data='+this.data+' par='+d);
  
		//seta data na aba
		if (objLen(this.objH)!=0) {
			var x = this.cha(tb_diaSemana[this.data.getDay()].toUpperCase())
			+'<br><br>&nbsp;&nbsp;'+this.data.getDate()
			+'<br><br>'+this.cha(tb_nomeMes[this.data.getMonth()]
			.toUpperCase().substring(0,3));
			this.objH.innerHTML = '<p align=right><font size=1><b>'+x+'</font></p>';
		}
		this.monta();
	}
	//**************************//
	function calendMes_Feriado(d) {
		var a = this.fer[d.getDate()+d.getMonth()/100];
		if (typeof(a)!='undefined') {
			return a;
		}
		return false;
	}
	//**************************//
	function calendMes_dataF(d,del) {
		if (typeof(del)=='undefined') {
			del='-';
		}
		var r;
		if (del=='-') {
			r = takeYear(d)+'-'+strZero(d.getMonth()+1,2)
				+'-'+strZero(d.getDate(),2);
		} else {
			r = strZero(d.getDate(),2)
				+'/'+strZero(d.getMonth()+1,2)+'/'+takeYear(d);
		}
		return r;
	}
	//**************************//
	function calendMes_Click(d) {
		if (typeof(this.click)=='undefined') {
			alert('Sete '+this.nome+'.click com a função que '
			+'recebera a data clicada neste formato '+d);
			return;
		}
		//eval(this.click+'(\''+d+'\')');
		this.click(d);
	}
	//**************************//
	function calendMes_horas(d0,d1) {
		return (
		new Date(takeYear(d1),d1.getMonth(),d1.getDate()).getTime()-
		new Date(takeYear(d0),d0.getMonth(),d0.getDate()).getTime()
		)/1000/60/60;
	}
	//**************************//
	function calendMes_iDia(d) {
		var h = d.getHours();
		if (h!=0 && h<12) {
			d = new Date(d.getTime()+(h>12?24-h:-h)*60*60*1000);
		}
		d = new Date(d.getTime()+this.mDia);
		h = d.getHours();
		if (h>12) {
			d = new Date(d.getTime()+(h>12?24-h:-h)*60*60*1000);
		}
		if (h!=0) {
			this.hVerao[this.dataF(d)]=h<12?'Inicio':'Fim';
		}
		return d;
	}
	//**************************//
	function calendMes_iAno(n) {
		this.ano += n;
		this.monta();
	}
	//**************************//
	function calendMes_iMes(n) {
		if (n>0) {
			this.mes++;
			if (this.mes>11) {
				this.ano++;
				this.mes=0;
			}
		} else {
			this.mes--;
			if (this.mes<0) {
				this.ano--;
				this.mes=11;
			}
		}
		this.monta();
	}
	//**************************//
	function calendMes_Monta() {
		//lert('monta'+this.obj.id);
		var d = new Date(this.ano,this.mes,1);
		//mes ant
		var m1 = new Date(d.getTime()-1000*60*60*24);
		m1 = takeYear(m1)+strZero(m1.getMonth()+1,2);
		//mes prox
		var m2 = new Date(d.getTime()+45000*60*60*24);
		m2 = takeYear(m2)+strZero(m2.getMonth()+1,2);
  
		//var x = new Array('Dom','Seg','Ter','Qua','Qui','Sex','Sab');
		//var ma=' style="cursor: pointer;"><font color=blue>---\></font>';
		//var me=' style="cursor: pointer;"><font color=blue>\<---</font>';
		var me=' style="cursor: pointer;"><img src='+_sis.dirImagens+'/tr.gif>';
		var ma=' style="cursor: pointer;"><img src='+_sis.dirImagens+'/av.gif>';
		var r= '<table class=calend CELLSPACING=0 CELLPADDING=0 align=center border=1>'
		+'<tr><td colspan=7 align=center><font size='+this.fSize1+'>'
		+'<a onClick="'+this.nome+'.iMes(-1);" '+m1+me+'</a> '
		+tb_nomeMes[this.mes]
		+' <a onClick="'+this.nome+'.iMes(01);" '+m2+ma+'</a>'
		+'&nbsp;&nbsp;'
		//+'<td colspan=3>'
		+'<a onClick="'+this.nome+'.iAno(-1);" '+me+'</a> '
		+'<b>'+this.ano+'</b> '
		+'<a onClick="'+this.nome+'.iAno(01);" '+ma+'</a>'
		+'<tr>';
		for (var i=0;i<7;i++) {
			r += '<th align=center><font size='+this.fSize1+'>'+tb_diaSemana[i];
		}
		var dy=0;
		r += '<tr>';
		while (d.getDay()!=dy) {
			r += '<td>&nbsp;';
			dy++;
		}
		var fer='',hoje=new Date();
		//lert(hoje.getYear());
		hoje=(new Date(hoje.getYear()+1900,
		hoje.getMonth(),hoje.getDate())).getTime();
		//lert(hoje);
		while (this.mes==d.getMonth()) {
			dy = this.feriado(d);
			if (dy) {
				fer += '<b>'+d.getDate()+'</b> '+dy+'<br>';
			}
			r += '<td onClick='+this.nome+'.clickP(\''+this.dataF(d)+'\'); '
			+(this.dataF(this.data)==this.dataF(d)?' bgcolor='+this.corH:'')
			+' align=right style="cursor: pointer;"><b><font '
			+(d.getDay()==0 || dy?' color=red ':'')
			+(d.getTime()==hoje?' color=blue ':'')
			+' size='+this.fSize1+'>'
			+(d.getDay()==0 && dy?'<u>':'')+d.getDate();
			da = d;
			d = this.iDia(d);
			if (this.horas(da,d)!=24) {
				fer += '<b>'+d.getDate()
				+'</b> Dia com '+this.horas(da,d)+' horas<br>';
			}
			if (d.getDay()==0) {
				r += '<tr>';
			}
		}
		while (d.getDay()!=0) {
			r += '<td>&nbsp;';
			d = this.iDia(d);
		}
		if (fer.length>0) r += '<tr><td colspan=7><font size='+this.fSize1+'>'+fer;
		this.obj.innerHTML = r+'</table>';
	}
}


//******************************
//para entrada de data
//******************************
function browseData(nomeDiv,nomeTex,nomeH) {
	this.ver = ms();
	this.nomeTex = nomeTex;
	if (vazio(nomeTex)) {
		/*/nomeDiv = 'browseDataO'+ms();
		this.div = document.createElement('DIV');
		this.div.style.cssText = 'POSITION: absolute; VISIBILITY: hidden;';
		this.div.innerHTML = '<table id=cld bgcolor=#f0f0f0 border=0><tr><td id=browseDataT>'
			+'<td onClick='+nomeDiv+'.fecha() align=center id=browseDataH bgcolor=yellow valign=middle>C<Br>A<Br>L</table>'
		;
		this.div.id = nomeDiv;
		document.body.appendChild(this.div);
		*/
		this.nomeTex = 'browseDataT';
		this.nomeH = 'browseDataH';
	} else {
		this.nomeTex = nomeTex;
		this.nomeH = nomeH;
		this.div = browse.getId(nomeDiv);
	}
	var este = this;
	setTimeout(init,100);
	//******************************
	function init() {
		if (!este.div) {
			//nomeDiv = 'browseDataO'+ms();
			este.div = document.createElement('DIV');
			este.div.style.cssText = 'POSITION: absolute; VISIBILITY: hidden;';
			este.div.innerHTML = '<table id=cld bgcolor=#f0f0f0 border=0><tr><td id=browseDataT>'
				+'<td onClick='+nomeDiv+'.fecha() align=center id=browseDataH bgcolor=yellow valign=middle>C<Br>A<Br>L</table>'
			;
			este.div.id = nomeDiv;
			document.body.appendChild(este.div);
		}
		este.cal = new calendMes(nomeDiv,este.nomeTex,este.nomeH);
		//lert('criou div cal'+erro('tt'));
		for(var prop in este.cal) {
			este[prop] = este.cal[prop];
		}
		este.aberto = false;
		este.modo = 0;
	 
		este.abre = browseData_Abre;
		este.abre1 = browseData_Abre1;
		este.abre2 = browseData_Abre2;
		este.fecha = browseData_Fecha;
		este.clickP = browseData_clickP;
	}
	//******************************
	function browseData_clickP(d) {
		//dest();
		if (typeof(this.cmp)=='function') {
			este.cmp(d);
			return;
		}
		//lert('ddd='+d);
		//lert('ver='+this.ver+'dest='+this.dest+' this='+this+' este='+este.dest);
		var v = palavraA(d,"-");
		this.dest.value = v[2]+"/"+v[1]+"/"+v[0];
		this.fecha();
	}
	//******************************
	function browseData_Fecha() {
		if (this.modo==0) {
			browse.esconde(this.div);
		} else {
			this.obj.innerHTML = '';
		}
		this.aberto=false;
		try {
			fD.selects(true);
		} catch (e) {
		}
	}
	//******************************
	function dest1(ob,cmp) {
		if (este.dest) {
			//return;
		}
		este.dest = getParentByTagName(ob,'form');
		//lert(este.dest+' cmp='+cmp+' este.dest[cmp]='+este.dest[cmp]);
		if (este.dest) {
			este.dest = este.dest[cmp];
		} else if (document.__formul) {
			este.dest = document.__formul[cmp];
		}
		if (este.dest) {
			if (este.dest.value.length>0) {
				este.cal.set(este.dest.value);
			}
		} else {
			este.dest = ob;
		}
		//lert('setou - ver='+este.ver+'dest='+este.dest+' this='+this+' este='+este.dest);
	}
	//******************************
	function browseData_Abre(ob,cmp) {
		if (this.aberto) {
			this.fecha();
			if ( this.cmp == cmp ) {
				return;
			}
		}
		this.cmp = cmp;
		this.aberto = true;

		dest1(ob,cmp);

		browse.mostra(this.div);
		try {
			fD.selects(false);
		} catch (e) {
			//lert(''+e);
			//obj(e);
		}
		var x = browse.getAbsX(this.dest)+browse.getTX(this.dest);
		var y = browse.getAbsY(this.dest)-browse.getTY(this.div);
		//testa se vai ficar fora
		y = y<0?0:y;
		var tj = browse.tamWinX();
		if (x+browse.getTX(this.div)>tj) {
			x =  tj-browse.getTX(this.div);
		}
		browse.setX(this.div,x);
		browse.setY(this.div,y);
		//lert('x='+x+'y='+y+' '+obj+' '+this.dest);
	}
	//******************************
	function browseData_Abre1(Ob) {
		alert('abre1=...');
		this.dest = document.__formul[Ob];
		var o = new winDep(top,'');
		o.centrada = false;
		o.w=100;o.h=100;
		o.debug = true;
		o.scr = 'no';
		if (!o.abre()) {
			return;
		}
		var ob = browse.getId("browseDataO");
		//obj(ob);
		o.on('<html><body TOPMARGIN=0 LEFTMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0>'
		+''+ob.innerHTML+''
		+'</body></html>'
		);
		var ob = browse.getId('cld',o.obj.document);
		//obj(this.cal.obj);
		this.obj = browse.getId(this.nomeTex,o.obj.document);
		//obj(this.cal.obj);
		o.obj.browseDataO = this;
		//obj(ob,'number');
		//lert('w='+ob.offsetWidth+' h='+ob.offsetHeight);
		//o.obj.resizeTo(ob.offsetWidth+50,ob.offsetHeight+40);
		o.obj.resizeTo(ob.offsetWidth+20,
		ob.offsetHeight+10+(browse.ie?50:0));
		//ob.width = '100%';
		o.obj.focus();
	}
	//******************************
	function browseData_Abre2(sOb) {
		if (this.aberto) {
			this.fecha();
			if (this.abertoN==sOb) {
				return;
			}
		}
		this.aberto = true;
		this.abertoN = sOb;
		alert('abre2');
		this.dest = document.__formul[sOb];
		var ob = browse.getId('browseDataO');
		var dd = browse.getId(sOb+'_');
		//dd.innerHTML = browse.getId('browseDataT').innerHTML;
		//browse.esconde(dd);
		//var ob = browse.getId('cld',o.obj.document);
		this.obj = dd;
		this.monta();
		this.modo = 1;
	}
}


//******************************
//para entrada de data
//******************************
var browseDataO=false;


	//*********************************
	function ValDataW(o,op) {
		var v,h=new Date;
		//ebj('o='+o+' op='+op);
		v = troca(trimm(o.value),' ','/');
		if (v.length==0) {
			return true;
		}
		if (!ValChar(v,'0123456789/')) {
			return ('ERRO, formato da data é: dd/mm/aaaa,\n use somente números e "/"');
		}
		v = palavraA(v,'/');
		if (typeof(v[1])=='undefined') { 
			v[1] = h.getMonth()+1;
		}
		if (typeof(v[2])=='undefined') {
				v[2] = h.getFullYear();
		}
		if (v[2]/1<20) { 
			v[2] = '20'+strZero(v[2],2);
		}
		if ((v[2]/1)<100) { 
			v[2] = '19'+strZero(v[2],2);
		}
		h1 = new Date(v[2]-0,v[1]-1,v[0]/1);
		o.value=strZero(h1.getDate(),2)+'/'
			+strZero(h1.getMonth()+1,2)+'/'+h1.getFullYear();
		return true;
		//*********************************
		function ValChar(a,tb) {
			var i;
			for (i=0;i<a.length;i++) if (tb.indexOf(a.substring(i,i+1))<0) return false;
				return true;
		}		
	}

	// controle de subRelatórios
	function subItem(spa,id) {
		var d = browse.getId(id,getParentByTagName(spa,'table'));
		//alert(spa.parentNode.parentNode+' '+d);
		var img = spa.getElementsByTagName('img')[0];
		//objNav(img);
		//var v = d.style.position!='absolute';
		var v = img.src.indexOf('aberto')!=-1;
		if (v) {
			img.src = '/imagens/fechado.gif';
			//spa.innerHTML = '<img class=abre src=\"/imagens/fechado.gif\">';
			d.style.position='absolute';
			browse.esconde(d);
		} else {
			img.src = '/imagens/aberto.gif';
			//spa.innerHTML = '<img class=abre src=\"/imagens/aberto.gif\">';
			d.style.position='static';
			browse.mostra(d);
		}
		setarPrefs(id+'='+(v?'0':'1'));
	}

	//***********************************************
	//entrada de dados html
	function campoHtml(nomec,valorc,win) {
		var nome = nomec;
		var valor = valorc;
		var oIf = null,oIfD,oIfDoc;
		var oTx = null;
		var oCm = null;
		//var formato = 'grafico';
		//var htm = false;
		var win = nulo(win)?window:win;
		var parent = win;
		//lert(parent);
		var doc = win.document;
		var vContext;
		var modoTxt = 'txt';
		
		//modos
		var modo,modoA=false;
		this.modos = new Array(
			new Array('Grafico','html','g')
			,new Array('Texto','txt','t')
			,new Array('Html','chtml','t')
		);
		
		//métodos externos
		this.mostra = mostra;
		this.carrega = carrega;
		this.limpa = limpa;
		this.html = htmlC;
		this.setHtml = setHtml;
		this.cmd = cmd;
		this.sel = sel;
		this.loop = loop;
		this.tag = tag;
		this.clas = clas;
		this.format = format;
		this.arquivo = arquivo;
		this.get = get;
		this.getVal = getVal;
		this.setModo = setModo;
		this.init = init;
		this.mostraFerramentas = true;
		
		//posui entrada alternativa txt?
		//this.txt = false;
		//var formatoTxt = false;
		var mPop,obContext;
		var oDiv = '';
		
		var este = this;
		var eu = this;
		var dialogoAberto = false;
		var cmdAnt;
		//****************************************************
		//abre dialogo
		function dialog(ev,ht) {
			var ed = 'editor_dialogo';
			var c = browse.getId(ed);
			//se não existe div dialogo cria
			if (vazio(c)) {
				c = document.createElement('DIV');
				c.id = ed;
				c.className = c.id;
				c.style.cssText = 'z-index:-500;';
				document.body.appendChild(c);
			}
			//se 2 é string, preenche
			if (vazio(ev) || typeof(ht)=='string') {
				if (dialogoAberto) {
					c.innerHTML = '';
					c.style.cssText = '';
					browse.esconde(c);
					dialogoAberto = false;
					return;
				}
				//se ht for vazio, so fecha e retorna
				if (vazio(ev)) {
					return;
				}
				c.innerHTML = ht;
			}
			//mostra dialogo
			var x = 'position:absolute;';
			browse.mostra(c);
			var o = targetEvent(ev);
			x += 'top:'+(browse.getAbsY(o)+browse.getTY(o))+'px;';
			x += 'left:'+browse.getAbsX(o)+'px;';
			c.style.cssText = x;
			dialogoAberto = true;
		}
		//***********************************************
		this.paleta = function (ev) {
			//controle eventos
			if (!vazio(ev)) {
				var cor = targetEvent(ev);
				if (ev.type=='mouseover') {
					var o = getParentByTagName(cor,'table');
					o = getElementsByClassName(o,'exemplo')[0];
					o.style.cssText = cor.style.cssText;
					return;
				} else if (ev.type=='click') {
					dialog();
					//lert(cor.style.cssText);
					cmd(null,substrAtAt(cor.style.cssText,':',';'));
					return;
				}
				objNav(ev);
				return;
			}
			//monta html paleta
			var v = palavraA('Red~IndianRed@205@92@92~LightCoral@240@128@128~Salmon@250@128@114~DarkSalmon@233@150@122~LightSalmon@255@160@122~Crimson@220@20@60~Red@255@0@0~FireBrick@178@34@34~DarkRed@139@0@0~Pink~Pink@255@192@203~LightPink@255@182@193~HotPink@255@105@180~DeepPink@255@20@147~MediumVioletRed@199@21@133~PaleVioletRed@219@112@147~Orange~LightSalmon@255@160@122~Coral@255@127@80~Tomato@255@99@71~OrangeRed@255@69@0~DarkOrange@255@140@0~Orange@255@165@0~Yellow~Gold@255@215@0~Yellow@255@255@0~LightYellow@255@255@224~LemonChiffon@255@250@205~LightGoldenrodYellow@250@250@210~PapayaWhip@255@239@213~Moccasin@255@228@181~PeachPuff@255@218@185~PaleGoldenrod@238@232@170~Khaki@240@230@140~DarkKhaki@189@183@107~Purple~Lavender@230@230@250~Thistle@216@191@216~Plum@221@160@221~Violet@238@130@238~Orchid@218@112@214~Fuchsia@255@0@255~Magenta@255@0@255~MediumOrchid@186@85@211~MediumPurple@147@112@219~Amethyst@153@102@204~BlueViolet@138@43@226~DarkViolet@148@0@211~DarkOrchid@153@50@204~DarkMagenta@139@0@139~Purple@128@0@128~Indigo@75@0@130~SlateBlue@106@90@205~DarkSlateBlue@72@61@139~MediumSlateBlue@123@104@238~Green~GreenYellow@173@255@47~Chartreuse@127@255@0~LawnGreen@124@252@0~Lime@0@255@0~LimeGreen@50@205@50~PaleGreen@152@251@152~LightGreen@144@238@144~MediumSpringGreen@0@250@154~SpringGreen@0@255@127~MediumSeaGreen@60@179@113~SeaGreen@46@139@87~ForestGreen@34@139@34~Green@0@128@0~DarkGreen@0@100@0~YellowGreen@154@205@50~OliveDrab@107@142@35~Olive@128@128@0~DarkOliveGreen@85@107@47~MediumAquamarine@102@205@170~DarkSeaGreen@143@188@143~LightSeaGreen@32@178@170~DarkCyan@0@139@139~Teal@0@128@128~Blue/Cyan~Aqua@0@255@255~Cyan@0@255@255~LightCyan@224@255@255~PaleTurquoise@175@238@238~Aquamarine@127@255@212~Turquoise@64@224@208~MediumTurquoise@72@209@204~DarkTurquoise@0@206@209~CadetBlue@95@158@160~SteelBlue@70@130@180~LightSteelBlue@176@196@222~PowderBlue@176@224@230~LightBlue@173@216@230~SkyBlue@135@206@235~LightSkyBlue@135@206@250~DeepSkyBlue@0@191@255~DodgerBlue@30@144@255~CornflowerBlue@100@149@237~MediumSlateBlue@123@104@238~RoyalBlue@65@105@225~Blue@0@0@255~MediumBlue@0@0@205~DarkBlue@0@0@139~Navy@0@0@128~MidnightBlue@25@25@112~Brown~Cornsilk@255@248@220~BlanchedAlmond@255@235@205~Bisque@255@228@196~NavajoWhite@255@222@173~Wheat@245@222@179~BurlyWood@222@184@135~Tan@210@180@140~RosyBrown@188@143@143~SandyBrown@244@164@96~Goldenrod@218@165@32~DarkGoldenrod@184@134@11~Peru@205@133@63~Chocolate@210@105@30~SaddleBrown@139@69@19~Sienna@160@82@45~Brown@165@42@42~Maroon@128@0@0~White~White@255@255@255~Snow@255@250@250~Honeydew@240@255@240~MintCream@245@255@250~Azure@240@255@255~AliceBlue@240@248@255~GhostWhite@248@248@255~WhiteSmoke@245@245@245~Seashell@255@245@238~Beige@245@245@220~OldLace@253@245@230~FloralWhite@255@250@240~Ivory@255@255@240~AntiqueWhite@250@235@215~Linen@250@240@230~LavenderBlush@255@240@245~MistyRose@255@228@225~Gray~Gainsboro@220@220@220~LightGrey@211@211@211~Silver@192@192@192~DarkGray@169@169@169~Gray@128@128@128~DimGray@105@105@105~LightSlateGray@119@136@153~SlateGray@112@128@144~DarkSlateGray@47@79@79~Black@0@0@0','~','@');
			var r = '<table class="paletaCores"><tr><td class="exemplo">&nbsp;<tr><td>';
			var g = '?';
			for (var i=0;i<v.length;i++) {
				var l = v[i];
				if (l.length==1) {
					//r += '<tr><td>';//+l[0]+'<td>';
					g = l[0];
				} else {
					var c = l[1]+','+l[2]+','+l[3];
					r += '<div title="'+l[0]+' '+c+'"'
						+' style="background-color:rgb('+c+');"'
						+' onmouseover="'+nome+'.paleta(event);"'
						+' onclick="'+nome+'.paleta(event);"'
						+'>&nbsp;</div>'
					;
				}
			}
			return r+'</table>';
		}
		//***********************************************
		function setHtml(sHtml) {
			oIf.contentWindow.document.body.innerHTML = sHtml;
		}
		//***********************************************
		function init() {
			//objNav(window);
			oDiv = browse.getId(nome+'Div');
			if (vazio(oDiv)) {
				alert('campoHtml.init(): '+nome+'Div id não enconrado...');
				return;
			}
			oDiv.className += ' editorHtml';
			
			//add barra ferramentas
			oIfD = doc.createElement('div');
			oIfD.className = 'divFerram';
			if (browse.getId(nome+'Ferram')) {
				browse.getId(nome+'Ferram').appendChild(oIfD);
			} else {
				oDiv.appendChild(oIfD);
			}
			eu.oIfD = oIfD;
			
			//add iframe
			oIf = doc.createElement('iframe');
			//oIf.src = leftAt(''+window.location,'?');
			oIf.src = 'javascript:{}';
			oIf.className = 'cHtml';
			oIf.style.cssText = 'z-index:-500;';
			oDiv.appendChild(oIf);
			oIfDoc = oIf.contentWindow.document;
			if (oIfDoc.open) {
				oIfDoc.open();
				oIfDoc.close();
			}		
			
			//add textarea
			oTx = doc.createElement('textarea');
			oTx.className = 'cHtml';
			oDiv.appendChild(oTx);
			
			eu.mostra();
		}
		//***********************************************
		//popup limpa
		function arquivo(o,ev) {
			//lert(o.innerHTML+' '+pos);
			if (mPop && mPop.aberto) {
				mPop.fecha();
				return;
			}
			mPop = new menuPopUp(nome+'Pop','titulo ?');
			browse.getId(nome+'Pop').innerHTML = ''
				+'<p onclick="javascript:'+nome+'.limpa();"'
					+'>Apagar Tudo</p>'
				+'<p onclick="javascript:'+nome+'.html();"'
					+'>'+(!htm?'Ver código HTML':'Visualização Normal')+'</p>'
			;
			mPop.abre(o,null,ev);
		}
		//***********************************************
		//popup Formato
		function format(o,ev) {
			if (mPop && mPop.aberto) {
				mPop.fecha();
				return;
			}
			mPop = new menuPopUp(nome+'Ferram','titulo ?');
			mPop.abre(o,null,ev);
		}
		//***********************************************
		function clas(o,pos,ev) {
			if (typeof(pos)=='string') {
				mPop.fecha();
				vContext[o][2].className = pos;
				obContext = null;
				return;
			}
		
			if (mPop && mPop.aberto) {
				mPop.fecha();
				return;
			}
			
			//monta lista estilos cfrme tag.
			var st = oIf.contentWindow.document.styleSheets, r=new Array();
			for (var i=0;i<st.length;i++) {
				//objNav(st[i]);
				for (var x=0;x<st[i].cssRules.length;x++) {
					var s = st[i].cssRules[x];
					var v = palavraA(trocaTudo(
						troca(s.selectorText,',',' '),'  ',' '),' ');
					for (var y=0;y<v.length;y++) {
						var t = leftAt(v[i],'.').toLowerCase();
						if (v[i].indexOf('.')==-1) {
						} else if (true && t!='' && t!=vContext[pos][0].toLowerCase()) {
						} else {
							t = substrAt(v[i],'.')+' '+t;
							if (ascan(r,t)==-1) {
								r[r.length] = t;
							}
						}
					}
				}
			}
			r.sort(function(a,b){return fSort(a.toLowerCase(),b.toLowerCase())});
			var rs = '<table><tr><td>'
				+'<p onclick='+nome+'.clas('+pos+',"");>(vazio)</p>'
			;
			for (var i=0;i<r.length;i++) {
				if ((i+1)%Math.floor((r.length+1)/2+0.99999)==0) {
					rs += '<td>';
				}
				rs += '<p onclick='+nome+'.clas('
					+pos+',"'+leftAt(r[i],' ')+'");>'+r[i]+'</p>'
				;
			}
			rs += '</table>';
			
			mPop = new menuPopUp(nome+'Pop','titulo ?');
			browse.getId(nome+'Pop').innerHTML = rs;
			mPop.abre(o,null,ev);
		}
		//***********************************************
		function tag(o,pos,ev) {
			if (typeof(pos)=='string') {
				mPop.fecha();
				//lert('mudou para: '+pos);
				oIf.contentWindow.document.execCommand('formatblock', false, pos);
				obContext = null;
				return;
			}
			//lert(o.innerHTML+' '+pos);
			if (mPop && mPop.aberto) {
				mPop.fecha();
				return;
			}
			mPop = new menuPopUp(nome+'Pop','titulo ?');
			browse.getId(nome+'Pop').innerHTML = ''
				+'<p onclick='+nome+'.tag(this,"p");>Parágrafo</p>'
				+'<p onclick='+nome+'.tag(this,"h1");>Título 1</p>'
				+'<p onclick='+nome+'.tag(this,"h2");>Título 2</p>'
				+'<p onclick='+nome+'.tag(this,"h3");>Título 3</p>'
				+'<p onclick='+nome+'.tag(this,"div");>Divisão</p>'
				+'<p onclick='+nome+'.tag(this,"li");>Lista</p>'
				+'<p onclick='+nome+'.tag(this,"li");>Lista Numerada</p>'
			;
			mPop.abre(o,null,ev);
		}
		//***********************************************
		function loop() {
			if (context()) {
				var va = browse.getId(''+nome+'Estilo');
				if (vazio(va)) {
					return;
				}
				va = va.innerHTML;
				var vn = '';
				var pos=0;
				for (var i=0;i<vContext.length;i++) {
					vn = '<span onclick='+nome
							+'.tag(this,'+pos+',event); class=cHtmlTag>'
							+vContext[i][0]+'</span>.'
						+'<span class=cHtmlClass onclick='
							+nome+'.clas(this,'+pos+',event);>'
							+vContext[i][1]+'</span>'
						+' '+vn
					;
					pos++;
				}
				if (va!=vn) {
					browse.getId(''+nome+'Estilo').innerHTML = vn;
				} else {
					//lert('igual e obj #');
				}
			}
			setTimeout(''+nome+'.loop()',1500);
		}
		//***********************************************
		function context() {
			try {
				if (modo[2]!='g') return false;
				var sel;
				if (browse.ie) {
					return false;
					/*if (oIf.contentWindow.document.selection.type!="None") {
						sel = oIf.contentWindow.document.selection; 
						//.createRange();
						objNav(sel);
						alert('context tt');
					}
					*/
				} else {
					sel = oIf.contentWindow.getSelection();
				}
				if (vazio(sel)) {
					//provável modo txt
					return false;
				}
				var o = sel.focusNode;
				//.parentNode;
				if (obContext!=null && obContext==o) {
					return false;
				}
				obContext = o;
				vContext = new Array();
				while (!vazio(o) && (!o.tagName || o.tagName.toLowerCase()!='html')) {
					if (!vazio(o.tagName)) {
						vContext[vContext.length] = new Array(
							o.tagName
							,(vazio(o.className)?'?':o.className)
							,o
						)
					}
					o = o.parentNode;
				}
			} catch (e) {
				alert('ERRO contex(): '+e.description);
			}
			return true;
		}
		//***********************************************
		function sel(ob) {
			var sel = oIf.contentWindow.getSelection();
			//lert(sel.focusNode.parentNode.tagName);
			//objNav(sel);
      //var range = sel.getRangeAt(0);
			//lert(range);

			var pos = ob.selectedIndex;
			if (pos!=0) {
				var tag=ob.options[pos].value;
				var cmd = ob.getAttribute('id');
				//tag = 'h1 class="teste"';
				//lert(tag+' '+cmd);
				oIf.contentWindow.document.execCommand(cmd, false, tag);
			}
			oIf.contentWindow.focus();
		}
		//***********************************************
		function cmd(ev,Par) {
			var o = targetEvent(ev);
			var c,par;
			if (ev==null) {
				c = cmdAnt;
				par = Par;
			} else {
				c = leftAt(substrRat(o.src,'/'),'.');//RAT .substring(1);
				cmdAnt = c;
			}
			//pedir parametro
			if (ev==null) {
				//NÃO pedir parametro
				//lert('setar '+c+' par='+par);
			} else if (c=='createlink') {
				p = 'http://www.sf.net';
				alert('xx35235='+c+'='+p);
			} else if (c=='forecolor') {
				dialog(ev,this.paleta());
				//lert(c+'='+p);
			}
			try {
				oIf.contentWindow.document.execCommand(c, false, par);
			} catch (e) {
				objNav(oIf.contentWindow.document);
				alert('ERRO em cmd='+c+"\n"+e+"\n\n"+erro(e)+'\n\nolf='+oIf.contentWindow.document);
			}
			oIf.contentWindow.focus();
		}
		//***********************************************
		function ferramentas() {
			if (!eval(nome+'.mostraFerramentas')) {
				return '';
			}
			/*lert('bb1');
				"cut=Recortar"
				,"copy=Copiar"
				,"paste=Colar"
			*/
			var op = new Array(
				"undo=Desfaz"
				,"redo=Refaz"
				,"bold=Negrito"
				,"italic=Itálico"
				,"underline=Sublinhado"
				,"forecolor=Cor da Fonte"
				,"hilitecolor=Cor do Fundo"
				,"justifyleft=Alinha a Esquerda"
				,"justifycenter=Alinha no Centro"
				,"justifyright=Alinha a Direita"
				,"insertorderedlist=Numerar" 
				,"insertunorderedlist=Tópicos" 
				,"outdent=Aumenta margem Esquerda"
				,"indent=Diminui margem Esquerda"
				,"createlink=Cria Link" 
				,"createimage=Insere Imagem" 
				,"createtable=Insere Tabela"
			);
			var r = '<table class=cHtmlFerram id='+nome+'Ferram><tr>';
			//modos
			r += '<td><select onchange='+nome+'.setModo(this);>';
			for (var i=0;i<este.modos.length;i++) {
				r += '<option '+(modo[1]==este.modos[i][1]?'selected':'')+' value='+i+'>'+este.modos[i][0];
			}
			r += '</select></td>';
			if (modo[2]!='g') {
				var op='&lt;b&gt;<b>negrito</b>&lt;/b&gt;'
					+'- &lt;i&gt;<i>italico</i>&lt;/i&gt;'
					+'- &lt;a href="http://www.teste.com/"&gt;<s>atalho</s>&lt;/a&gt;'
				;
				return r+'<td>'+op;
			}
			//ferramentas
			for (var i=0;i<op.length;i++) {
				r += '<td><img src="/imagens/edit/'+leftAt(op[i],'=')+'.gif"'
					+' alt="'+substrAt(op[i],'=')+'"'
					+' title="'+substrAt(op[i],'=')+'"'
					+' onclick="'+nome+'.cmd(event);"'
					+'></td>'
				;
			}
			r += ''
				+(false?
					+'<tr><td>'
					+'<table class=cHtmlEstilo><tr>'
						+'<td class=cHtmlPrin>'
						+'<span onclick="javascript:'+nome+'.arquivo(this,event);"'
								+' title="Arquivo" alt="Arquivo">+</span>'
						+'<span onclick="javascript:'+nome+'.format(this,event);"'
							+' title="Formatar" alt="Formatar">Formatar</span>'
						+'</span>'
						+'<td  id='
							+nome+'Estilo><h1>Estilo</h1>'
						+'</table>'
					:'')
				+'</table>'
			;
			return r; 
			//+op.length;
		}
		//***********************************************
		function htmlC() {
			mPop.fecha();
			var v = oIf.contentWindow.document.body.innerHTML;
			if (htm) {
				v =  troca(troca(v,'&lt;','<'),'&gt;','>');
				htm = false;
			} else {
				v = html(v);
				htm = true;
			}
			oIf.contentWindow.document.body.innerHTML = v;
		}
		//***********************************************
		function limpa() {
			mPop.fecha();
			oIf.contentWindow.document.body.innerHTML = '';
		}
		//***********************************************
		//testa se txt
		function txt(ht) {
			if (trimm(ht)=='' || trimm(ht)=='<pre></pre>') {
				return '';
			}
			if (ht.indexOf('<')==-1) {
				return '<pre>'+troca(ht,'&nbsp;',' ')+'</pre>';
			}
			var a = delTag(troca(troca(ht,'\r',''),'\n',' '),'<br','>','\r\n');
			//lert(a);
			if (a.indexOf('<')==-1 && a.indexOf('&nbsp;&nbsp;&nbsp;&nbsp')!=-1) {
				a = '<pre>'+troca(a,'&nbsp;',' ')+'</pre>';
				//lert(a);
				return a;
			}
			return ht;
		}
		//***********************************************
		//deleta tags
		function delTag(ht,ini,fim,tr) {
			if (typeof(tr)=='undefined') {
				tr = '';
			}
			var ht1 = ht.toLowerCase();
			var p,nv=0;
			//lert('loop fim='+fim+' para inicio='+ini+'\n'+ht);
			while ((p=ht1.indexOf(ini))!=-1) {
				if (nv++>1000) {
					alert('loop fim='+fim+' para inicio='+ini);
					return ht;
				}
				var p1 = ht1.indexOf(fim,p+ini.length);
				if (p1 == -1) {
					alert('não achei fim='+fim+' para inicio='+ini);
					return ht;
				}
				ht = ht.substring(0,p)+tr+ht.substring(p1+fim.length);
				ht1 = ht.toLowerCase();
			}
			return ht;
		}
		//***********************************************
		//retorna o valor
		function getVal() {
			return get();
		}
		//***********************************************
		//retorna o valor
		function get() {
			var ht;
			if (modo[2]=='t') {
				ht = oTx.value;
			} else {
				ht = oIf.contentWindow.document.body.innerHTML;
				ht = delTag(ht,'<head','</head>');
				ht = delTag(ht,'<title','</title>');
				ht = delTag(ht,'<script','</script>');
				ht = delTag(ht,'<style','</style>');
				ht = delTag(ht,'<meta','>');
				ht = delTag(ht,'<base','>');
				ht = delTag(ht,'<link','>');
				ht = delTag(ht,'_base_href="','"');
				ht = delTag(ht,'<body','>');
				ht = delTag(ht,'</body','>');
				ht = delTag(ht,'<html','>');
				ht = delTag(ht,'</html','>');
				ht = troca(ht,"\t",' ');
				ht = troca(ht,"\r",'');
				ht = trimm(ht);
				ht = txt(ht);
			}
			return (vazio(modo[1])?'':'{'+modo[1]+'}')+ht;
		}
		//***********************************************
		//pega do iframe e coloca no campo hidden
		function carrega() {
			ht = get();
			//lert('carrega'+oCm.name+'   =='+ht);
			if (oCm) {
				oCm.value = ht;
			} else {
				alert('não achei o campo pra preencher...');
			}
		}
		//***********************************************
		function setModo(Modo,vlr) {
			//ebJ('type modo='+typeof(Modo)+' '+Modo+' vlr='+vlr);
			//ebJ('setModo angt='+this.txt+' novo='+Modo+' vlr='+vlr);
			var va = nulo(vlr)?get():vlr;

			if (typeof(Modo)=='object' && Modo.tagName ) {
				if (modo[2]=='g' && '-chtml-'.indexOf(+'-'+this.modos[Modo.value][1]+'-')==-1) {
					if (!confirm('perder formatacao?')) {
						return false;
					}
				}
				modo = this.modos[Modo.value];
				//lert(modo);
				//return;
			} else {
				var m = '?',x='';
				for (var i=0;i<este.modos.length;i++) {
					x += ','+este.modos[i][1];
					if (este.modos[i][1]==Modo) {
						m = Modo;
						modo = este.modos[i];
						break;
					}
				}
				if (m=='?') {
					alert('Setar modo "'+Modo+'" é inválido...'+x);
					return;
				}
			}
		
			modoA = modo;
		
			//formato = modo;
			//formatoTxt = modo!='grafico';
			if (modo[2]=='g') {
				browse.esconde(oTx);
				if (vlr) {
					oIf.contentWindow.document.body.innerHTML = este.valCSS+vlr;
				} if (modoA[1]=='' && (modo[1]=='html' || modo[1]=='chtml')) {
					oIf.contentWindow.document.body.innerHTML = este.valCSS+
						'<p>'+troca(troca(va,'\r',''),'\n','</p>\n<p>')+'</p>'
					;
				} else if (modoA[1]=='chtml' && modo[1]=='html') {
					oIf.contentWindow.document.body.innerHTML = este.valCSS+oTx.value;
				}
				browse.mostra(oIf);
			} else {
				browse.esconde(oIf);
				if (modo[1]=='' && (modoA[1]=='chtml' || modoA[1]=='html')) {
					oTx.value = htmlTxt(oIf.contentWindow.document.body);
				} else if (modoA[1]=='html' && modo[1]=='chtml') {
					oTx.value = delTag(
						delTag(oIf.contentWindow.document.body.innerHTML,'<link','>')
						,'<base','>'
					);
				} else if (modoA[1]=='' && modo[1]=='chtml') {
					oTx.value = '<p>'+troca(troca(va,'\r',''),'\n','</p>\n<p>')+'</p>';
				} else if (false && vazio(oTx.value) 
					&& !vazio(oIfDoc.body.innerHTML)
					&& confirm('Copiar do HTML?')) {
					oTx.value = oIfDoc.body.innerHTML;
				} else {
					oTx.value = vlr;
				}
				browse.mostra(oTx);
			}
			oIfD.innerHTML = ferramentas();
			//lert(oIfD.innerHTML);
			return;
		}
		//***********************************************
		//retorna valor e seta editável o iframe
		function mostra() {
			//define o modo conforme o valor
			var modosPrim = new Array();
			modo = false;
			if (equals(valor,'{')) {
				var m = equals(valor,'{')?substrAtAt(valor,'{','}'):'';
				for (var i=0;i<este.modos.length;i++) {
					//lert(este.modos[i][2]);
					modosPrim[este.modos[i][2]] = este.modos[i][1];
					if (este.modos[i][1]==m) {
						valor = substrAt(valor,'}');
						modo = este.modos[i];
					}
				}
				if (!modo) {
					alert('não achei modo='+m+' para '+valor);
					modo = este.modos[0];

				}
			} else {
				modo = este.modos[0];
			}
			//ebJ('modo sel='+modo);
		
			//procura o CAMPO escondido no FORM...
			oCm = browse.getId(nome+'InH');
			if (vazio(oCm)) {
				try {
					oCm = document.__formul['_'+nome+'_'];
				} catch (e) {
					//lert('não encontrei cmp '+'_'+nome+'_');
				}
			}
			
			//tornar editável
			try {
				oIf.contentWindow.document.designMode = 'on';
			} catch (e) {
				if (confirm('ERRO tornando editável...\n\nTentar novamente em 2 segundos? ')) {
					//ebJ('e='+e);
					setTimeout(nome+'.mostra();',2000);
					return;
				}
				alert('cancelado...');
				return;
			}
			
			try {
				oIf.contentWindow.document.execCommand("useCSS", false, true);
			} catch (e) {
				//bjNav(e);
				if (!browse.ie) {
					debJ('err useCSS='+erro(e));
				}
			}
			
			//poe body e stylesets
			if (true || modo[2]=='g') {
				//lert('poe body e stylesets');
				var bs = leftRat(leftRat(''+win.location,'?')+'?','/');
				//carrega os CSS
				var cs = '';
				var st = win.document.styleSheets;
				for (var i=0;i<st.length;i++) {
					//objNav(st[i]);
					if (right(st[i].href,4).toLowerCase()=='.css') {
						cs += '<LINK REL="StyleSheet" HREF="'
							+st[i].href+'">';
					}
				}
				//lert(st.length+' = '+cs+' l='+win.document.location+'\n bs='+bs);
				este.valCSS = '<BASE href="'+bs+'/">'+cs;
			}
			
			//troca modos p/compatib firefox3 entrar em edicao
			//lert(modo);
			if (modo[2]=='g') { 
				//oIfDoc.open();
				var modoK = modo,vv=valor;
				setModo('html',valor);
				modo = modoK,valor=vv;
				//alert('editor html experimental...');
			}
			//lert(valor);
			setModo(modo[1],valor);
			//setTimeout(setModo,1000);
			
			//vigia
			loop();

			if (typeof(fD)=='object') {
				debJ('setando evento form var javascript');
				fD.onSubmit[fD.onSubmit.length] = ''+nome+'.carrega();';
			}
			
			//resize("tabPag");

			return;
		}
	}
	//*******************************
	// fim campoHTML
	//*******************************

//****************************************************
function daClasse(ob,nomeClasse) {
	if (ob && ob.className && nomeClasse) {
		return (' '+ob.className+' ').indexOf(' '+trimm(nomeClasse)+' ')!=-1;
	}
	return false;
}
//****************************************************
function objClone(ob,doc) {
	var tn = ob.tagName;
	if (typeof(tn)!='string') {
		return;
	}
	var r = doc.createElement(ob.tagName);
	//atributos
	for (var i=0;ob.attributes && i<ob.attributes.length;i++) {
		try {
			var n = ob.attributes.item(i).nodeName;
			var v = ob.getAttribute(n); //trimm
			r.setAttribute(n,v);
			/*if (n=='href') {
				//lert('href='+v);
				lert('='+r.attributes.item(i).textContent+'-');
			}
			*/
		} catch (e) {
			//lert(n+' '+i+' '+erro(e));
		}
	}
	//filhos
	if (ob.childNodes.length==0) {
		r.innerHTML = ob.innerHTML;
	} else {
		for (var i=0;i<ob.childNodes.length;i++) {
			try {
				var o = objClone(ob.childNodes.item(i),doc);
				if (o) {
					r.appendChild(o);
				} else if (ob.innerHTML) {
					r.innerHTML = ob.innerHTML;
					break;
				}
			} catch (e) {}
		}
	}
	return r;
}
//***********************************************
function objLimpa(o) {
	while (o.childNodes.length!=0) {
		o.removeChild(o.firstChild);
	}
}
//****************************************************
function tabela(Doc,dest,classe) {
	var doc = Doc;
	var t = doc.createElement('table');
	this.tab = t;
	if (typeof(classe)=='string') {
		t.className = classe;
	} else {
		t.border = '1';
	}
	if (dest) {
		dest.appendChild(t);
	}
	//lert('add on dest='+dest);
	var ur;
	var v = new Array();
	this.addRow = addRow;
	this.addCol = addCol;
	//****************************************************
	this.get = function() {
		return t;
	}
	//****************************************************
	function addCol(tx,classe) {
		var c = doc.createElement('td');
		if (tx.tagName) {
			c.appendChild(tx);
		} else {
			c.innerHTML = tx;
		}
		if (!ur) {
			ur = addRow();
		}
		ur.appendChild(c);
		if (classe) {
			c.className = classe;
		}
		return c;
	}
	//****************************************************
	function addRow(p1,p2,p3,p4,p5,p6,p7,p8) {
		ur = doc.createElement('tr');
		if (typeof(p1)!='undefined') addCol(p1);
		if (typeof(p2)!='undefined') addCol(p2);
		if (typeof(p3)!='undefined') addCol(p3);
		if (typeof(p4)!='undefined') addCol(p4);
		if (typeof(p5)!='undefined') addCol(p5);
		if (typeof(p6)!='undefined') addCol(p6);
		if (typeof(p7)!='undefined') addCol(p7);
		if (typeof(p8)!='undefined') addCol(p8);
		t.appendChild(ur);
		return ur;
	}
}

//****************************************************
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
	/****************************************************
	this.getVetorPerc = function() {
		var r = {};
		for (c in v) {
			r[c] = v[c]/vt*100.0;
		}
		return r;
	}*/	
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
	function toHtml() {
		var v1 = getMatriz();
		v1.sort(function(a,b){return fSort(b[1],a[1])});
		var r = '<table border=1>';
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
	}
}
//***********************************************
function htmlTxt(obj) {
	var nl='\n',r = '';
	var t = obj.tagName?obj.tagName.toLowerCase():'?';
	if (obj.childNodes.length==0) { //''+obj=='[object Text]')
		//nodeValue:
		if (browse.ie) {
			r = trimm(obj.innerText?obj.innerText:obj.nodeValue);
		} else {
			r = trimm(obj.textContent);
		}
	} else {
		if (obj.childNodes && obj.childNodes.length>0) {
			for (var i=0;i<obj.childNodes.length;i++) {
				r += htmlTxt(obj.childNodes.item(i));
			}
		}
	}
	if (t=='br' || t=='hr' || (obj.tagName && !vazio(r) && '~p~tr~li~ul~'.indexOf(t)!=-1) ) {
		r += '\n';
	}
	/*if (debA%500==0) {
		//objNav(obj);
		lert('t='+t+' r='+r+' o='+obj.childNodes.length+'='+typeof(obj)+'='+obj);
	}
	debA++;
	*/
	//lert(typeof(obj)+' '+obj);
	return r;
}

//***********************************************
//retorna uma table no formato MATRIZ
// nroCol = filtra so linhas com >= nro col
function getTabela(obj,nroCol) {
	if (typeof(obj)=='string') {
		var aa = document.createElement('div');
		aa.innerHTML = obj;
		obj = aa;
	}
	var r = new Array();
	var v = obj.getElementsByTagName('tr');
	for (var l=0;l<v.length;l++) {
		var v1 = v[l].getElementsByTagName('td');
		if (!nroCol || v1.length>=nroCol) {
			var l1 = r.length;
			r[l1] = new Array();
			for (var c=0;c<v1.length;c++) {
				r[l1][c] = htmlTxt(v1[c]);
			}
		}
	}
	return r;
}

//**************************//
// menu POPUP
//**************************//
var menuPopUpAberto = false;
//**************************//
function menuPopUp(nome,tit,vOp,ops,est) {
	var st = 'POSITION: absolute; VISIBILITY: hidden; TOP: 0px; LEFT: 0px;';
	var oM = null;
	//ultimo modelo
	if (typeof(nome)=='object') {
		oM = nome;
		tit='??';
		if (vazio(oM.getAttribute('style'))) {
			oM.style.cssText = st;
		}
		nome='?';
	}
	//compatibilidade jscsseditor
	if (typeof(tit)=='object') {
		oM = tit;
		oM.setAttribute('disp',1);
		tit='';
	}
	this.aberto = false;
	if (''+ops=='undefined') {
		ops = '';
	}
	this.evento = true;
	this.posEsq = 0;
	this.incX = 0;
	this.incY = 0;
	this.ops = ops;
	this.nome = nome;
	this.tit = tit;
	this.fecha = menuPopUp_fecha;
	this.abre = menuPopUp_abre;
	this.click = menuPopUp_click;
	this.click1 = menuPopUp_click1;
	this.vat = new Array;
	this.obj = oM; //para acesso externo
	if (typeof(est)=='undefined') {
		est = 'menPop';
	}
	if (""+vOp=="undefined") {
		return;
	}
	//cria divisão conforme array
	document.write(
	'<DIV ID="'+this.nome+'" class='+est
	+' STYLE="'+st+'">'
	+'<table class='+est+'>');
	var i = 'onclick='+this.nome+'.fecha(event);>';
	if (ops.indexOf('/nnova')==-1) {
		document.write('<tr><td class='+est+'Tit '+i+this.tit
		+'<td class='+est+'Fecha '+i
		+'x');
	} else {
		document.write('<tr><td class='+est+'Tit '+i+this.tit);
	}
	for (var i=0;i<vOp.length;i++) {
		var op = vOp[i];
		var ps,url;
		if ((ps=op.indexOf("~~"))!=-1) {
			this.vat[i] = op.substring(ps+2);
			url = substrAt(op,'~~');
			op = op.substring(0,ps);
		} else {
			this.vat[i] = op;
		}
		if (op=='-') {
			document.write('<tr><td class='+est+'Sp>');
		} else {
			var oc = ' onClick=javascript:'+this.nome+'.click('+i;
			document.write('<tr><td class='+est+oc+',false,event)>'
				+'&nbsp;<a href="'
					+(!vazio(url) && url.indexOf('{cod}')==-1
						?url
						:'javascript:'+this.nome+'.click('+i+',false,event);'
					)+'" class='+est+'>'+op+'</a>'
				+(ops.indexOf('/nnova')==-1?
				'<td class='+est+'N '+oc+',true,event)>'
				+'<a class='+est+'N>+</a>'
				:'')
			);
		}
	}
	document.write('</table></DIV>');
	//**************************//
	function menuPopUp_click(pos,nova,event) {
		if (event.ctrlKey) return;
		this.fecha();
		//lert('pos='+pos+' param='+this.param+" nova="+nova);
		var a = this.vat[pos],i;
		//lert('1='+a);
		if ((i=a.indexOf("{cod}"))!=-1) {
			a = a.substring(a,i)+this.param+a.substring(i+5);
		} else if (a.substring(0,11)=='javascript:') {
			//lert("eval="+a);
			eval(a);
			return;
		} else {
			a += this.param;
		}
		this.click1(a,nova);
	}
	//**************************//
	function menuPopUp_click1(a,nova) {
		//lert(a);
		if (nova) {
			window.open(a,"_blank");
		} else {
			window.location = a;
		}
	}
	//**************************//
	function menuPopUp_fecha(ev) {
		//objNav(ev);
		//lert(0);
		//ebJ(trace());
		if (typeof(ev)!='undefined' && ev.ctrlKey) {
			return;
		}
		menuPopUpAberto = false;
		this.aberto = false;
		browse.esconde(oM,false);
	}
	//**************************//
	// apre próximo ao 'ob' parametro clicl 'pr'
	function menuPopUp_abre(ob,pr,ev) {
		if (this.aberto) {
			this.fecha();
			return;
		}
		if (isEvent(ob)) {
			ev = ob;
			ob = targetEvent(ev);
			//lert(ob+' '+oM);
		}
		if (typeof(pr)=='object') {
			ev = pr;
			pr = '';
		}
		if (vazio(oM)) {
			oM = browse.getId(this.nome);
		}
		menuPopUpAberto = true;
		this.aberto = true;
		this.param = pr;
		//var o = browse.getId(this.nome);
		//objNav(o);
		var tx = browse.getTX(ob);
		var x,y;
		x = browse.getAbsX(ob)+((tx==-1)?30:tx);
		if (this.posEsq!=0) {
			x -= browse.getTX(oM)+tx-30;
		}
		y = browse.getAbsY(ob)+browse.getTY(ob);
		
		browse.mostra(oM,false);
		
		//abaixo - campo de listar possíveis conteúdos
		if (this.abaixo) {
			x = browse.getAbsX(ob);
			//browse.setTX(oM,browse.getTX(ob));
			//y = browse.getAbsY(ob);
			this.incX = 0;
			this.incY = 0;
			//lert('x='+x+' y='+y);
		}
		
		//tem evento
		if (!vazio(ev) && this.evento) {
			var xx = browse.eventoX(ev);
			if (xx!=-1) x = xx;
			xx = browse.eventoY(ev);
			if (xx!=-1) y = xx;
		}
		
		if (this.centrado) {
			//lert(browse.getTX(ob));
			x -= browse.getTX(oM)/2+browse.getTX(ob)/2;
		}
		if (this.acima) {
			//bjNav(oM);
			//lert(oM+' acima-='+browse.getTY(oM));
			y -= browse.getTY(oM);
		}
		if (this.esquerda) {
			browse.mostra(oM,false);
			//lert('esq='+browse.getTX(oM)+' '+browse.getTX(ob));
			//objNav(oM);
			x -= browse.getTX(oM)+(this.esquerda==2?browse.getTX(ob):0);
			//return;
		}
		if (this.posE) {
			x -= this.posE + browse.getTX(oM);
		}
		if (this.posS) {
			y -= this.posS + browse.getTY(oM);
		}
		//lert(oM);
		//lert('x='+x+' y='+y+' this.incX='+this.incX+' this.incY='+this.incY);
		browse.setX(oM,x+this.incX);
		browse.setY(oM,y+this.incY);
		browse.mostra(oM,false);
		//lert('mostrou');
	}
}



	//*******************************//
	function resize(sObj,minX,minY) {
		//lert('resize='+sObj);
		if (nulo(sObj)) {
			var ob = window.document.body;
			//objNav(ob);
		} else {
			var ob = browse.getId(sObj);
		}
		if (vazio(ob)) {
			//lert('er sObj='+sObj+' '+erro('teste'));
			return false;
		}
		var tX=ob.offsetWidth;
		var tY=ob.offsetHeight; 
		if (vazio(minX)) {
			tX += 80;
			tY += 80+(browse.ie?0:0)
		}
		
		//limita ao tam janela raiz...
		var jr = janRaiz();
		//objNav(jr);
		var mX = browse.tamWinX(jr);
		tX = tX>mX?mX:tX;
		var mY = browse.tamWinY(jr);
		//lert(mY);
		tY = tY>mY?mY:tY;
		
		//tam minimo linux: 423 x 208 e win 419x264
		if (vazio(minX)) minX = 420;
		if (vazio(minY)) minY = 210;
		//lert('x='+tX+' '+minX+' y='+tY+' '+minY+' '+jr.location);
		if (tX<minX) tX = minX;
		if (tY<minY) tY = minY;
		
		try {
			//lert('semOK x='+tX+' y='+tY);
			top.resizeTo(tX,tY);
		} catch (e) {
			alert('ERRO: resize win='+e);
		}
	}


	//*******************************
	function ascan(arr,vlr) {
		for (prop in arr) {
			if (arr[prop]==vlr) {
				return prop;
			}
		}
		return -1;
	}
	

	//*********************************
	function janRaiz() {
		if (vazio(top.opener)) {
			return top;
		}
		return top.opener.janRaiz();
	}
	//*********************************
	function janLocObj(nome) {
		var x;
		try {
			x = eval(nome);
		} catch (e) {
		}
		if (typeof(x)!='undefined') {
			return x;
		}
		if (vazio(top.opener)) {
			return null;
		}
		return top.opener.janLocObj(nome);
	}


//*******************************//
//controle de eventos
var acoesEvento = new Array(); 
regAcaoEvento('load','aAtalhos()');
var parente,objPai;
var obj_obj;
//imagePopUp.load();



//*******************************//
//*******************************//
//*******************************//
// CONTROLE DE JANELAS POPUP..
// TIPOS DE JANELA: 
// 0 - FECHA SÓ SE FECHAR A PRINCIPAL
// 1 - FECHA SE O FOCO VOLTAR A PRINCIPAL
// 2 - OBRIGA O FOCO NA SECUNDARIA (DIÁLOGO);
// 3 - TOTALMENTE INDEPENDENTE
//*******************************//
//*******************************//
//*******************************//
	function objParente() {
		return obj_obj;
	}
 
	//*******************************//
	function regAcaoEvento(acao,funct) {
		if (!acoesEvento[acao] || vazio(acoesEvento[acao])) {
			acoesEvento[acao] = new Array();
		}
		acoesEvento[acao][acoesEvento[acao].length] = funct;
	}
	//*******************************//
	function evento(s,ev) {
		//opção em js
		//if (window.addEventListener) window.addEventListener("load",func,false);
		//else if (window.attachEvent) window.attachEvent("onload",func);   
		//for (var f = 0; (formnode = document.getElementsByTagName('form').item(f)); f++) {
		//executa acoes registradas
		//lert(s+' '+ev);
		if (acoesEvento[s] && !vazio(acoesEvento[s])) {
			for (prop in acoesEvento[s]) {
				//lert(acoesEvento[s][prop]);
				var x = acoesEvento[s][prop];
				if (x.indexOf('(')==-1) {
					x += '()';
				}
				eval(x);
			}
		}
  
		if (s=='resize') {
		}
		if (s=='load') {
			
			//bjNav(opener);
			//lert('l='+(window==opener_()));
			
			domExpland(document);
			if (objLen(opener)!=0) {
				parente = opener;
				objPai = opener.objParente();
			}
			//objLen(opener);
			if (!vazio(objPai) && !vazio(objPai.onLoad)) {
				eval(objPai.onLoad);
			}
		}
		if (s=='close') {
			if (!vazio(objPai) && objPai.pulaClose) {
				objPai.pulaClose = false;
				return;
			}
			//fecha todas as janelas dependentes
			for (i=0;i<wDep.length;i++) {
				if (wDep[i]!=0) {
					wDep[i].close();
					wDep[i] = 0;
				}
			}
			//informa a superior
			if (parente && !vazio(objPai)) {
				//lert('informa sup');
				parente.dRegistraWin(objPai.janPos);
			}
		}
		if (s=='focus') {
			//fecha janelas tipo 1 
			for (var i=0;i<wDep.length;i++) {
				if (wDep[i]!=0 && wTip[i]==1) {
					wDep[i].close();
					wDep[i] = 0;
				} else if (wDep[i]!=0 && wTip[i]==2) {
					try {
						wDep[i].focus();
					} catch(e) {
						//lert('Erro: '+e);
					}
				}
			}
		}
		if (s=='focusOut') {
			if (!vazio(objPai) && objPai.tipo==2) {
				//window.focus();
				//lert("tipo janela=1");
				//fecha somente se o foco volta para a mãe...
				//parente.dRegistraWin(janPos);
				//window.close();
			}
		}
	}
	//*******************************//
	function alertErro(e) {
		alert(erro(e));
	}
	//*******************************//
	function trace(a) {
		return troca(erro(new Error('trace '+a)),'\n\n','<hr>');
	}
	//*******************************//
	function centra(ob,noOb) {
		var xy = centraCoo(ob,noOb);
		//lert(xy);
		if (xy && xy.length>1) {
			if (vazio(ob)) {
				ob = top;
			}
			ob.moveTo(xy[0],xy[1]);
		}
	}
	//*******************************//
	function centraCoo(ob,noOb) {
		//if (!cli.centra) return;
		if (typeof(ob)=='undefined') {
			ob = top;
			noOb = janRaiz();
		} else if (typeof(noOb)=='undefined') {
			noOb = ob;
			ob = top;
		}
		if (browse.ie) {
			try {
				var pX = noOb.screenLeft+noOb.document.body.offsetWidth/2
				-ob.document.body.offsetWidth/2;
				var pY = noOb.screenTop+noOb.document.body.offsetHeight/2
				-ob.document.body.offsetHeight/2;
				return new Array(pX,pY);
			} catch (e) {
				alert('erro='+e);
			}
		} else {
			var pX = noOb.screenX+noOb.outerWidth/2-ob.outerWidth/2;
			var pY = noOb.screenY+noOb.outerHeight/2-ob.outerHeight/2;
			return new Array(pX,pY);
		}
		return new Array();
	}
 
	//*******************************
	function centraDiv(dv,win) {
		if (vazio(win)) {
			win = window;
		}
		var pX,pY;
		if (browse.ie) {
			pX = win.screenLeft+win.document.body.offsetWidth/2
				-browse.getTX(dv)/2;
			pY = win.screenTop+win.document.body.offsetHeight/2
				-browse.getTY(dv)/2;
		} else {
			//pX = win.screenX+win.outerWidth/2-browse.getTX(dv)/2;
			pX = win.outerWidth/2-browse.getTX(dv)/2;
			//pY = win.screenY+win.outerHeight/2-browse.getTY(dv)/2;
			pY = win.outerHeight/2-browse.getTY(dv)/2;
		}
		dv.style.position = 'fixed';
		dv.style.top = pY+'px';
		dv.style.left = pX+'px';
		//browse.setX(dv,pX);
		//browse.setY(dv,pY);
		//dv.offsetTop = pY;
		//dv.offsetLeft = pX;
		//objNav(dv);
		//lert(pX+'-'+pY+' pa='+dv.style.left+','+dv.style.top);
	}



	//********************************
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

//*******************************//
// janelas dependentes
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


//fim CTRLE JAN DEPENDENTES
