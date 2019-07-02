//************************************************************88
function calc(Nome) {
	var nome = Nome;
	setTimeout(calc,200); 
	var ht = '';
	var tec; // teclado
	var ds = '',tnl=3;
	var limpa='&nbsp;<br>&nbsp;<br>&nbsp;';
	var res=false;
	this.teclaP = teclaP;
	//**********************************************************
	function teclaP(eve) {
	 var ev = clone(eve);
	 //objNav(ev);
	 //which: 
	 var i = t.indexOf(String.fromCharCode(ev.keyCode));
	 if (i==-1 && !vazio(tbec[ev.keyCode])) {
	  i = t.indexOf(tbec[ev.keyCode]);
	 }
	 if (i!=-1) {
	  clic(i);
	 } else {
	  //alert('cC='+ev.charCode+' kC='+ev.keyCode+'='
	  // +String.fromCharCode(ev.keyCode));
	  var e = ''+ev.keyCode;
	  for (i=0;i<e.length;i++) {
		clic(t.indexOf(e.substring(i,i+1)));
	  }
	  clic(t.indexOf('+'));
	  //objNav(ev);
	 }
	}
	//**********************************************************
	this.clic = function(p) {
	 browse.getId('cmd'+p).style.border='2pt inset #dddddd';
	 setTimeout('browse.getId("cmd'
	  +p+'").style.border="2pt outset #dddddd"',250);
	 k = tec[p];
	 var a = k.nome;
	 if (a=='=') {
	  var r;
	  try {
		r = eval(troca(ds,',','.'));
	  } catch (e) {
		alert('ERRO: '+e);
		return;
	  }
	  res = true;
	  ds = ''+r;
	 } else if (a=='c' || a=='C') {
	  ds = '';
	 } else if (a=='<') {
	  var tm = ds.length;
	  if (tm==0) return;
	  var bb=ds.substring(tm-1,tm);
	  //alert(bb+' '+bb.length);
	  ds = ds.substring(0,tm-(bb==' '?2:1));
	 } else {
	  var tp = k.estilo;
	  if (tp=='s') {
		ds += a+' ';
	  } else {
		if (res) {
		 ds = '';
		}
		ds += a;
	  }
	  res = false;
	 }
	 if (ds.length==0) {
	  browse.getId('calcDisp').innerHTML = limpa;
	 } else {
	  var v = palavraA(trimm(ds),' '),m = '',nl=0;
	  for (var i=v.length-1;i>=0 && nl<tnl;i--) {
		nl++;
		m = v[i]+(m==''?'':'<br>')+m;
	  }
	  while (nl<tnl) {
		m = '<br>'+m;
		nl++;
	  }
	  browse.getId('calcDisp').innerHTML = troca(m,'.',',');
	 }
	}

	//**********************************************************
	//cria objeto
	function calc() {
		
	
		/*var t= '????C/*-789+456<123=0,';
		//alert(t[10]);
		var cs='1111111111111111111121';
		var rs='1111111111111111111211';
		var cl='ttttcsssnnnsnnncnnnenn';
		r = '';
		for (var i=0;i<t.length;i++) {
		 r += "tec[tec.length]=new tecla('"+t[i]+"',"+cs[i]+","+rs[i]+",'"+cl[i]+"');<br>";
		}
		on(r);
		*/
		
		tec = new Array();
		/*tec[tec.length]=new tecla('x2',1,1,'t');
		tec[tec.length]=new tecla('r2',1,1,'t');
		tec[tec.length]=new tecla('x^',1,1,'t');
		tec[tec.length]=new tecla('1/x',1,1,'t');
		*/
		tec[tec.length]=new tecla('C',1,1,'c');
		tec[tec.length]=new tecla('/',1,1,'s');
		tec[tec.length]=new tecla('*',1,1,'s');
		tec[tec.length]=new tecla('-',1,1,'s');
		tec[tec.length]=new tecla('7',1,1,'n');
		tec[tec.length]=new tecla('8',1,1,'n');
		tec[tec.length]=new tecla('9',1,1,'n');
		tec[tec.length]=new tecla('+',1,1,'s');
		tec[tec.length]=new tecla('4',1,1,'n');
		tec[tec.length]=new tecla('5',1,1,'n');
		tec[tec.length]=new tecla('6',1,1,'n');
		tec[tec.length]=new tecla('<',1,1,'c');
		tec[tec.length]=new tecla('1',1,1,'n');
		tec[tec.length]=new tecla('2',1,1,'n');
		tec[tec.length]=new tecla('3',1,1,'n');
		tec[tec.length]=new tecla('=',1,2,'e');
		tec[tec.length]=new tecla('0',2,1,'n');
		tec[tec.length]=new tecla(',',1,1,'n');
		
		//teclado numerico
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
		
		//monta calc
		on('<center><table class=calc id=calc>'
		 +'<tr><td colspan=4>'
		 +'<table class=calc width=100%><tr><td class=calcDisp id=calcDisp>'
		 +limpa+'</table>'
		);
		for (var i=0;i<tec.length;i++) {
		 if (i%4==0) on('<tr>');
		 var t = tec[i];
		 on('<td id=cmd'+i+' class=calcC'+t.estilo
		  +' width=25% colspan='+t.colspan
		  +' rowspan='+t.rowspan
		  +' onclick='+nome+'.clic('+i+')>'
		  +t.nome
		 );
		}
		on(
		 //'<tr><td colspan=4>+'
		 '</table>'
		 +'</center>'
		);


		
		//setTimeout('resize("calc");',200);
		//lert('fim='+ht);
		document.body.innerHTML = ht;
	}
	
	//**************************************
	function tecla(nome,colspan,rowspan,estilo) {
		this.nome = nome;
		this.colspan = colspan;
		this.rowspan = rowspan;
		this.estilo = estilo;
	}
	
	//**************************************
	function on(s) {
		ht += s;
	}
	
}
