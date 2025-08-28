/*
	signey jun/2018 mai/2019 mai/2020 
	// dom objects not work.
	* 
	* @sgnyjohn abr/2023 Eml
	* @sgnyjohn abr/2024 ?
*/

//if (true) {

	var IMG = {
		ini:{}
		,espera:''
		,b3:()=>{
			let src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+milIqInYQcchQneyiIrrVKhShQqgVWnUwufQPmjQkKS6OgmvBwZ/FqoOLs64OroIg+APi7OCk6CIlfpcUWsR4x3EP733vy913gNCoMM3qigOabpvpZELM5lbFnleEaA4giFmZWcacJKXgO77uEeD7XYxn+df9OfrUvMWAgEgcZ4ZpE28QT2/aBud94ggrySrxOfG4SRckfuS64vEb56LLAs+MmJn0PHGEWCx2sNLBrGRqxFPEUVXTKV/Ieqxy3uKsVWqsdU/+wnBeX1nmOq0RJLGIJUgQoaCGMiqwEaNdJ8VCms4TPv5h1y+RSyFXGYwcC6hCg+z6wf/gd2+twuSElxROAN0vjvMxCvTsAs2643wfO07zBAg+A1d6219tADOfpNfbWvQI6N8GLq7bmrIHXO4AQ0+GbMquFKQlFArA+xl9Uw4YvAVCa17fWuc4fQAy1KvUDXBwCIwVKXvd5929nX37t6bVvx+P3nKyeDrdEgAAAAZiS0dEADUANQA15JFv0QAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+gKChEMCkJKpN8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACUklEQVRYw+2WPWgUQRiGn7m7+HNCNBJFmQuCjaIQCNqlEiFiEbQQCwkWliJYOEQEwTJIBkQQQVQ0IlYGNFaHCRZiI4KgIqIW/mTBdB5yuWju9rOZvWw2a3J7cU9BX9jim92deeb7m4F/XaplK2mzO6PUcV+kBFzEsx8Aci1afB0w4YtMAR3AXqB7DkCbq0BX5Lc7ePZWgkX2AycjozWgH/gBHAbWAOeA9cEHgQf2xQA8TbjPgpsnCqDw7DRQRJsbwM7w3OEQzAJHAHH2m4QAD4BDIfsSsMF5ZxdwBpgAVgAH4gB8YBTPSlNx9uwXYDQUkvN1AHgNdAKX3QaH4wDmqW3LYH626q9cYtmvDQF7toI2e4BtwExQAYsCKLgCDCwx9QtVMIMyaYsNQEhcWDPLLLBuEcbQpq/ZCTIJutU4UHTPQ1dauKS6gDbZZgAaakQqo6R9de5g6e1QuT5WMMdEuO7MHcBW4F0qHoiTCM8jQxtT8wBAeaZaQJtpZ3YCQ6HXFaV4JWkB+L4of/HGdF8mbSm1JGxAvWjTkV4SKhDhnuvtgXpc4gF0KcUpgbMpAShpz+cGwlWANpuB90DeJWUfTQAsJwRT7gALlF4fEBG+Varb0aYCkM2qVbWaHAXWhj77nCIASkSe1Q/52oKCm3fCtboKvgMn8OyT3+oBX2Q8kvVxegncxbMfm6X/JUD10/AIMJL2fTXDH1bYA23AY7QJ7Jt49lqCW3E/cDo8kgRAOW/0ht49SriZTZH/g3tmQwA9MY2knBDgNjC2oDw9W+O//mb9BAxMsz+GbYAtAAAAAElFTkSuQmCC';
			return '<img src="'+src+'"/>'
		}
		,googleFin:()=>{
			let src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACNElEQVR4AWOgBIyC////M5quDLMzWxESCsMmq0L9fDencdHFAaarQitMVgT/R8emK0OO0cUBQIvW4XDAH6paNOqAUQf83ctS8mcv6ypkDBKjiwP+72Gx/b2H5T827LnK+yDNHfBnL1soLgf4r/Y4SXsH7GMLG+EO2M8WTq4D5IrfakmXvgrFhuniAJWGt3zSxS+PSxW/+I+OMSx65Wra9trZ9NcrZ9P/CGz2/GuDXCO5DoA5AmjhfYIOgFmOjt+F6x5EtvTPHtaZQPwInwNMVoYchpkrVfqyhKgQgFqI6YBQ3aNwB+xjawSXDcf4hP7sYdkCcQCm5Q6rQnlA6mRKX5bBLKTcAXvZmtEbI+6rfQtAwQ0P+hUhhxCWv6pAt1S65OV5UJog3QH72FqREtUeYCpOQNQHYXYmK0KeAh1ywG1nLDdITLrkVSW65UB952QaPgrBEibRDnjjZ1yJkqIRvllg3PAf3PSyWhcrhrD8RTVGkJe8PAuyHDlhEuUAYMJshGkAWngM0+AXV0F5HWYGUE0tZny/PCNX8UGQYH7H8LmLeTM2n2NxxFdQlAB9WU+G5QiAarlZC7rlJOOSF6cVGt4LgMwhyQGgAgmr5Yi4nyFd/OIRPsuB6eAUzHLSHOBi3o7PcpmSlw0geVCCAlqyBavlxS9OKpW/42cgFbx2NuskZDl6OQCM91Ig/o3k8xNgy8kFhC3HBFLlL61AUQLSB85e5AJc1ads+Ut3fHpgUUKu5aMAALwE5ooB9hj6AAAAAElFTkSuQmCC';
			return '<img src="'+src+'"/>'
		}
	}

	var DB = {
		ini:{}
		//create indexedDB not async
		//localStorage não, IndexedDB sim.
		// https://developer.mozilla.org/pt-BR/docs/Web/API/IndexedDB_API
		// https://hacks.mozilla.org/2010/06/comparing-indexeddb-and-webdatabase/
		//		o exemplo acima tem vários erros
		// https://youtu.be/1zGYDeKmIAA?si=GC_5gEpRkrHN0ytA&t=1215
		// 
		,DB:class {
			db;
			add(tb,o) {
				//let ch = o[?];
				let tr = this.db.transaction([tb],'readwrite');
				let t = tr.objectStore(tb);
				return t.add(o);
			}
			async addORput(tb,o) {
				let tr = this.db.transaction([tb],'readwrite');
				let t = tr.objectStore(tb);
				let ch = o[t.keyPath];
				let rqr = this.get(tb,ch);
				rqr.onsuccess = () => {
					if (rqr.result) {
						this.put(tb,o);
					} else {
						this.add(tb,o);
					}
				}
				//nada retorna pois faz dois pedidos
			}
			get(tb,ch) {
				let tr = this.db.transaction([tb],'readonly');
				let t = tr.objectStore(tb);
				let r = t.get(ch);
				return r;
			}
			put(tb,o) {
				let tr = this.db.transaction([tb],'readwrite');
				let t = tr.objectStore(tb);
				return t.put(o);
			}
			async open(version) {
				let rq = window.indexedDB.open(this.name,version);
				rq.onsuccess = () => {
					this.db = rq.result;
				}
				rq.onupgradeneeded = () => {
					/* define what data items the objectStore will contain
						objectStore.createIndex("hours", "hours", { unique: false });
						objectStore.createIndex("minutes", "minutes", { unique: false });
						objectStore.createIndex("day", "day", { unique: false });
						objectStore.createIndex("month", "month", { unique: false });
						objectStore.createIndex("year", "year", { unique: false });
						objectStore.createIndex("notified", "notified", { unique: false });
					*/
					let db = rq.result;
					this.db = db;
					//Deb.log('DB.DB criar tabelas '+eu.tabs);
					for (var i=0;i<this.tabs.length;i++) {
						let v = this.tabs[i];
						if (!db.objectStoreNames.contains(v[0])) { //se não existe cria tabela.
							db.createObjectStore(v[0],{keyPath:v[1]})
						}
					}
				}
			}
			static deleteDB(name) {
				//Deb.log('DB.DB.deleteDB '+name);
				return window.indexedDB.deleteDatabase(name);
			}
			constructor(name,tabs) {
				this.tabs = tabs;
				this.name = name;
			}
		}
		,sortObj: (obj,func)=>{
			let v = [];
			aeval(obj,(o)=>{v.push(o)});
			return v.sort(func);
		}
		,tabelaSort: function(id,Ord) {
			//***********************************************
			//ADD cmd para ordenar a tabela conforme colunas.
			// p1 é objeto dom table ou id de table
			// p2 vetor strings para cada coluna com as possíveis ordens 'ad','d','da',''
			/** @constructor */
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
					alertDev('erro '+Lib.erro(e));
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
					return Lib.fSort(a[0],b[0],oOrd.ord==0);
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
		} //fim tabelaSort
		,estat: function(Op) {
			if (Lib.isStr(Op)) Op = {nome:Op};
			this.op = Object.assign(
				{nome:'?'}
				,Op
			);
			//this.op.total = false;
			//this.op = Op;
			var eu=this;
			var nome = this.op.nome;
			var v = {};
			this.inc = inc;
			this.inc1 = inc1;
			this.toHtml = toHtml;
			this.toTxt = toTxt;
			this.getMatriz = getMatriz;
			this.decimal = 0; 
			var vt = 0;
			this.length=0; //total geral
			addStyle();
			function addStyle() {
				Dom.addStyleId(
					'TABLE._estat { border:2px double; }'
					+'TABLE._estat TH,TABLE._estat TD { border-bottom:1px solid; padding:5px 2px; } '
					+'TABLE._estat TD { text-align:right; } '
					+'TABLE._estat TR.cab TH { text-align:right; } '
					,'_estat'
				);
			}
			if (!this.op.trCross) this.op.trCross = (mt,dsTab) => {
				for (var x=0;x<mt.length;x++) {
					rw = Dom.obj('<tr>',dsTab);
					Dom.obj({tag:'th',targ:rw,'':mt[x][0]});
					for (var y=1;y<mt[x].length;y++) {
						Dom.obj({tag:'td',targ:rw,'':(mt[x][y]!='-'
							?mt[x][y].format(this.decimal)
							:mt[x][y]
							)
						});
					}
				}
			}
			this.toDomCross = function(delimit,Sort) {
				var sort = Lib.isNum(Sort)?Sort:1;
				let c = new DB.estat('cols');
				let r = new DB.estat('rows');
				for (ch in v) {
					let x = ch.split(delimit);
					c.inc1(x[0]); 
					r.inc1(x[1]); 
				}
				c = c.getMatriz();
				r = r.getMatriz();
				let tb = Dom.obj('<table class="_estat">');
				//cabec
				var rw = Dom.obj('<tr>',tb);
				Dom.obj({tag:'th',targ:rw,'':nome});
				Dom.obj({tag:'th',targ:rw,'':'tot'});
				for (var y=0;y<c.length;y++) {
					Dom.obj({tag:'th',targ:rw,'':c[y][0]});
				}
				//cria uma matriz
				var mt=[];
				for (var x=0;x<r.length;x++) {
					rw=[r[x][0],0];
					mt.push(rw);
					for (var y=0;y<c.length;y++) {
						let vl = v[ c[y][0] + delimit + r[x][0] ];
						if (!Lib.isUnd(vl)) {
							rw.push(vl);
							rw[1] += vl;
						} else {
							rw.push('-');
						}
					}
				}
				mt.sort((a,b)=>{return Lib.fSort(b[sort],a[sort],sort==0);});
				this.op.trCross(mt,tb);
				return tb;
			}
			this.toDom = function(sort) {
				return Dom.obj({tag:'div','':this.toHtml(sort)}).firstChild;
			}
			this.get = (ch)=>{
				return v[ch];
			}
			//****************************************************
			this.getObj = function() { return v;	}	
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
					v1.sort(function(a,b){return Lib.fSort(a[1],b[1],desc)});
				} else {
					//ordena chave
					v1.sort(function(a,b){return Lib.fSort(a[0],b[0],desc)});
				}
				//calcula total
				//var t = 0; aeval(v1,function(v,i) { t+=v[1]; });
				//label
				var lb = [];
				//calcula
				for(var i=0;i<v1.length;i++) {
					//var rs = Math.floor(v1[i][1]/t*1000+0.5)/10;
					if (Horiz) {
						lb[i] = '<b>'+v1[i][1]+'</b>&nbsp;'
							+v1[i][2].format(2)+'%'
						;
					} else {
						//legenda ?
						v1[i][0] += '<br><b>'+v1[i][1]+'</b>'
							+'<br>'+v1[i][2].format(2)+'%'
							//+'<br>'+format(rs,1)+'%'
						;
					}
				}
				// mostrar percentual no grafico
				if (Op.porPerc) 
					aeval(v1,(l)=>{l[1]=l[2]});
				//grafico
				Op.title = nome;
				if (Horiz) {
					Op['label'] = lb;
					return (new graphBarH(v1,Op)).getHtml();
				}
				return (new graphBar(v1,Op)).getHtml();
			}	
			//****************************************************
			this.getVetor = function() {return v;}
			this.percent = (ch)=>{
				return v[ch]/vt*100;
			}	
			//****************************************************
			function getMatriz() {
				var v1 = new Array(),i=0;
				/*if (eu.op.total) {
					if (eu.op.total===true) eu.op.total = '* total';
					v[eu.op.total] = vt;
				}
				*/
				for(var prop in v) {
					v1[i++] = new Array(prop,v[prop],eu.percent(prop));
				}
				v1.sort(function(a,b){return Lib.fSort(a[0],b[0])});
				return v1;
			}
			this.getMatriz = () => {
				return getMatriz();
			}
			//****************************************************
			this.toOptions = function() {
				var r = '';
				var v1 = getMatriz();
				v1.sort(function(a,b){return Lib.fSort(a[0],b[0])});
				for(var i=0;i<v1.length;i++) {
					r += '<option value="'+v1[i][0]+'">'
						+v1[i][0]+' ('+v1[i][1].format(this.decimal)+')'
					;
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
				v1.sort(function(a,b){return Lib.fSort(b[1],a[1])});
				for(var i=0;i<v1.length;i++) {
					r += v1[i][0]
						+'\t'+v1[i][1].format(this.decimal)
						+'\t'+v1[i][2].format(2)
						+'\n'
					;
				}
				return r;
			}
			//****************************************************
			if (!this.op.tr) this.op.tr = (v) => {
				return '<tr>'
					+'<td>'+v[0]+'</td>'
					+'<td>'+v[1].format(this.decimal)+'</td>'
					+'<td title="'+v[2]+'">'+v[2].format(2)+'</td>'
					+'</tr>'
				;
			}
			this.th = (t) => {
				return '<tr><th>'+nome+' ('+t.format(0)+')'+'<th>vl<th>%';
			}
			//****************************************************
			function toHtml(Sort) {
				let sort = Lib.isNum(Sort)?Sort:1;
				//eb.log('sort '+Sort+' = '+sort);
				var v1 = getMatriz();
				v1.sort(function(a,b){return Lib.fSort(a[sort],b[sort],sort>0)});
				var r = '<table class="_estat">'
					+eu.th(v1.length)
				;
				for(var i=0;i<v1.length;i++) {
					r += this.op.tr(v1[i]);
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

	};

	var Lib = {
		ini:{}
		,loader:function(op) { /* load multiplas urls e após exec */
			var eu = this;
			//default
			mergeOptions({timeout:30000,msegs:200,withCredentials:true,nTask:5,nTent:2,nvEnd:0},op);
			for (var i=0;op[i];i++) {
				op[i] = mergeOptions({timeout:op.timeout,nTent:op.nTent,nTentEx:0},op[i]);
			}
			if (i==0) {
				eu.error = 'no task XMLHttpRequest informed {0:{},...}'
				end(true);
				return;
			}
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
				if (op.callback) {
					op.callback(eu);
				}
			}
			//**************************
			function next() {
				var nAt = 0;
				var t = Tempo.ms();
				for (var p=0;op[p];p++) {
					var trf = op[p];
					if (!trf.timeBegin) { //não iniciou ainda ou timeout
						if (nAt>=op.nTask) break;
						nAt++;
						trf.nTentEx++;
						var oReq = newOReq();
						oReq.timeout = trf.timeout;
						oReq.pos = p;
						oReq.onload = (ev) => {
							var rq = ev.target;
							//onsole.log(ev,rq);
							//lert('pos='+rq.pos);
							if (rq.readyState != 4) {
								return;
							} else if (rq.status!=200) {
								eu.error = 'httpStatus: '+rq.status
									+'\readyState: '+rq.readyState
									+'\nurl: '+op[rq.pos].url
								;
								op[rq.pos].timeEnd = Tempo.ms();
							} else {
								op[rq.pos].callback(rq.responseText,op[rq.pos].url);
								op[rq.pos].timeEnd = Tempo.ms();
							}
						}
						oReq.ontimeout = (ev)=>{
							var rq = ev.target;
							var ob = op[rq.pos];
							if (ob.nTentEx<ob.nTent) {
								//tentar novamente...
								ob.timeBegin = 0;
							} else {
								alert('Lib.loader: timeout nv('+ob.nTentEx+') x='+ob.url);
							}
						}
						oReq.open("get", trf.url, true);
						oReq.send();
						trf.oReq = oReq;
						trf.timeBegin = Tempo.ms();
					} else if ( !trf.timeEnd ) { //testa timeout
						nAt++;
					}
				}
				if (nAt==0) {
					end();
				} else {
					setTimeout(next,op.msegs);
				}
			}
		} //fim load
		//antigo strPesq
		,searchStr: function(Str) {
			var eu = this;
			//################################
			// falta resolver utf-8... 
			//		1 input meleca html aceita colar utf8 e o digitado resulta em iso-8859-1
			//		2 o regexpr ignore acentuação funciona apenas com iso, não utf
			// ao inves de usar "" para literais, usar _ no lugar do space
			/** @constructor */
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
			var vr,tx=''; //vrNot,
			init(Str);
			this.getStr = ()=>{return tx;};
			this.ajuda = (tit)=>{
				return (tit?tit+'\n\n':'')+'espaço - um E outro'
					+'\n| - um OU outro'
					+'\n- - negação'
					+'\n^ - prefixo palavra inteira'
					+'\n~ - prefixo para indical palavra iniciando em '
					+'\n_ - substitui espaços em literais'
				;		
			}
			//################################
			// se algum verdadeiro... OR
			function pesqUm(vEx,s) {
				for (let o=0;o<vEx.length;o++) {
					// [0] not? - [1] expr
					if ( vEx[o][0] != vEx[o][1].test(s) ) {
						return true;
					}
				}
				return false;				
			}
			//################################
			// se todos verdadeiros... AND
			this.pesq = function(s) {
				if (tx=='') return true;
				for (let e=0;e<vr.length;e++) {
					if (!pesqUm(vr[e],s)) {
						return false;
					}
				}
				return true;				
			}

			// palavra inteira ia /(^|\s)ia(\s|$)/
			function initUm(str) {
				var r = [false,false];
				str = str.trimm();
				r[0] = str.charAt(0)=='-'; //negativo, não?
				if (r[0]) str = str.substring(1);
				if (str.charAt(0)=='~') {
					// prefixo palavra
					r[1] = new RegExp('([!-\/]|^|\\s)'+str.substring(1),'i');
				} else if (str.charAt(0)=='^') {
					//palavra
					r[1] = new RegExp('([!-\/:;]|^|\\s)'+str.substring(1)+'(\\s|$|[!-\/:;])','i');
				} else {
					r[1] = new RegExp(rExpr(str),'i');
				}
				return r;
			}
			function init(o) {
				var a = o?o.trimm():'';
				// o ou é embutido dentro da expressao
				a = a.toLowerCase()
					.replaceAll('  ',' ')
					.replaceAll('| ','|')
					.replaceAll(' |','|')
				;
				//mudou?
				if (tx==a) {
					return false;
				}
				tx = a;
				var v = tx.split(' ');
				this.v = v;
				//if (referrer.search(new RegExp("Ral", "i")) == -1) { ...
				vr = Array();
				//vrNot = Array();
				for (let e=0;e<v.length;e++) {
					vr[e] = [];
					Lib.aeval(v[e].split('|'),(el)=>{
						vr[e].push(initUm(el));
					});
				}
				//lert('cond='+o+' '+vr);
				return true;
			}
			this.init = init;
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
				//eb(t+'==>('+r+') tm='+t.length);
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
			this.pesqm = function(s) {
				var s1 = tiraAcentos(s).toLowerCase();
				for (var i=0;i<v.length;i++) {
					if ( s1.indexOf(v[i]) == -1 ) {
						return false;
					}
				}
				return true;
			}
		}	//fim strPesq
		,isMobile: ()=>{
			return navigator.userAgent.toLowerCase().indexOf('mobile')!=-1;
		}
		,fSort: (a,b,desc)=>{
			if (desc) {
				return (b>a?1:(b<a?-1:0));
			} else {
				return (a>b?1:(a<b?-1:0));
			}
		}
		,pedido:class {
			url;
			urlB;
			urlP;
			urlJ;
			param = {};
			paramJ = {};
			//******************************	
			atalho() {
				let r = '';
				for (let k in this.param) {
					//lert('k('+k.length+')'); 
					r += '&'+k+'='+encodeURIComponent(this.param[k]); 
				}
				let r1 = '';
				for (let k in this.paramJ) {
					r1 += '#'+k+'='+encodeURIComponent(this.paramJ[k]); 
				}
				return this.urlB
					+(r==''?r:'?'+r.substring(1))
					+r1
				;
			}
			//******************************	
			setJ(ch,valor) {
				paramJ[ch] = valor;
				return this;
			}
			//******************************	
			getJ(ch,defaul) {
				if (paramJ[ch]) return paramJ[ch];
				return defaul;
			}
			//******************************	
			set(ch,valor) {
				param[ch] = valor;
				return this;
			}
			//******************************	
			get(ch,defaul) {
				if (param[ch]) return param[ch];
				return defaul;
			}
			//******************************	
			init1() {
				// #s
				var vj=this.urlJ.split0('#');
				for (var i=0;i<vj.length;i++) {
					try {
						this.paramJ[vj[i].leftAt('=')] = decodeURIComponent(vj[i].substrAt('='));
					} catch (e) {
						this.paramJ[vj[i].leftAt('=')] = (vj[i].substrAt('='));
					}
				}
				// &?
				var v = this.urlP.split0('&');
				for (var i=0;i<v.length;i++) {
					let np = v[i].leftAt('=');
					let vl = v[i].substrAt('=');
					if (Lib.vazio(np)) {
						//ignora
					} else {
						this.param[np] = decodeURIComponent(vl.replaceAll('+',' '));
					}
				}
			}
			init(doc) {
				if (typeof(doc)=='undefined') {
					doc = document;
				}
				this.doc = doc;
				if (typeof(doc)=='string') {
					this.url = doc;
				} else {
					this.url = ''+doc.location;
				}
				this.protocolo = this.url.leftAt(':');
				this.host = (this.url+'/').substrAtAt('://','/'); 
				//parametros
				var p = this.url.indexOf('?');
				if (p!=-1) {
					this.urlB = this.url.substring(0,p);
					this.urlP = this.url.substring(p+1);
				} else {
					this.urlB = this.url;
					this.urlP = '';
				}
				//parametros Internos JS
				var p = this.urlP.indexOf('#');
				if (p!=-1) {
					this.urlJ = this.urlP.substring(p+1);
					this.urlP = this.urlP.substring(0,p);
				} else if (this.urlP==''&&(p=this.urlB.indexOf('#'))!=-1) {
					//não há '?' ?
					this.urlJ = this.urlB.substring(p+1);
					this.urlB = this.urlB.substring(0,p);
				} else {
					//this.urlP = this.urlP;
					this.urlJ = '';
				}
				this.init1();
			}
			constructor(doc) {
				this.init(doc);
			}
		}
		,load: (url,func) => {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = (a) => {
				//lert(a);
				if (xhr.readyState === XMLHttpRequest.DONE) {
					func(xhr.responseText,xhr.status==200,xhr);
				}
			}
			//se ? executa classe servidor
			xhr.open("GET", url.charAt(0)=='?' ? urlE(app,url) : url , true);
			xhr.send(null);
		}
		,aguarde: (fuLogic,fu) => {
			//fica em timeout até 1a func retornar algo
			// usado para dar delay a resposta clicks
			//lert('Lib.aguarde');
			let t = 50;
			let f = ()=>{
				if (fuLogic()) {
					fu();
				} else {
					setTimeout(f,t);
				}
			}
			setTimeout(f,t);
		}
		,strZero: (nr,t) => {
			return ('0000000000'+Math.floor(nr+0.5)).right(t);
		}
		,sortEl:(a,b,desc)=>{
			if (desc) {
				return (b>a?1:(b<a?-1:0));
			} else {
				return (a>b?1:(a<b?-1:0));
			}			
		}
		,aeval:	(arr,func)=>{
			var nv = 0;
			if (typeof(arr)=='undefined') {
				return;
			} else if (typeof(arr.length)=='number') {
				for (var i=0;i<arr.length;i++) {
					func(arr[i],i);
				}
			} else if (false && typeof(arr.forEach)=='function') {
				alert('fore');
				arr.forEach((v,i)=>{
					func(v,i);
				});
			} else {
				for (i in arr) {
					func(arr[i],i,nv++);
				}
			}
		}
		,alertErro: (e)=>{
			alert(Lib.erro(e));
		}
		,vazio:(a)=>{
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
				//lert('erro testando vazio(): '+Lib.erro(e)+' obj='+a);
				//objNav(e);
				return true;
			}		
		}
		// mescla objeto opcoes 
		,optionsMergetM: (padrao,r)=>{
			Lib.optionsMerge(padrao,r);
			for (k in padrao) {
				if (Lib.isStr(padrao[k])&&padrao[k].charAt(0)=='&'&&r[k]==padrao[k]) {
					// o default é o mesmo que outro k 
					r[k] = r[padrao[k].substring(1)];
				}
			}
			return r;
		}
		// mescla objeto opcoes com obj opcoes padrao
		,optionsMerge: (opDefault,op)=>{
			if (typeof(op)!='object') {
				return opDefault;
			}
			Lib.aeval(opDefault,(x,k)=>{
				typeof(op[k])=='undefined'?op[k]=opDefault[k]:false;
			});
			return op;
		}
		,isFunction: (o)=>{return typeof(o)=='function'}
		,isArr: (o)=>{return Lib.isObj(o)&&typeof(o.length)=='number'}
		,isFunc: (o)=>{return typeof(o)=='function'}
		,isFun: (o)=>{return typeof(o)=='function'}
		,isBol: (o)=>{return typeof(o)=='boolean'}
		,isDom: (o)=>{return o && o.tagName;}
		,isStr: (o)=>{return typeof(o)=='string';}
		,isUnd: (o)=>{return typeof(o)=='undefined';}
		,isObj: (o)=>{return typeof(o)=='object';}
		,isNum: (str)=> {
			if (typeof(str)!='number') {
				str = (''+str).trimm();
				if (str=='') return false;
				str = 1*str;
			}
			return !isNaN(str);
		}
		,if: (a,b)=>{return a?a:b;}
		,dateSql: (a,semHora)=>{
			var d = Lib.vazio(a)?new Date():a;
			if (typeof(a)=='string') {
				d = strToData(a);
			} else if (typeof(a)=='number') {
				d = new Date(a);
			}
			return Lib.strZero(d.getFullYear(),4)+'-'+Lib.strZero(d.getMonth()+1,2)
				+'-'+Lib.strZero(d.getDate(),2)
				+(semHora?'':' '+Lib.strZero(d.getHours(),2)+':'
					+Lib.strZero(d.getMinutes(),2)+':'+Lib.strZero(d.getSeconds(),2)
				)
			;		
		}
		,erro: (e)=>{
			if (typeof(e)=='string' || typeof(e)=='undefined') {
				e = new Error(''+e);
			}
			try {
				return ''//'Erro:('
					+'\nnome: '+e.name
					+'\nmessage: '+e.message
					+'\n\nstack: ====== \n'+(''+e.stack).replaceAll(
							(window.location+'').leftAtAt('://','/')
							,'h '
						)
					+')'
				;
			} catch (e) {
				alert('ERRO em erro '+e+'\n\n'+e.stack);
			}
		}
	};

	class Tempo {
		static Dia = 24*60*60000;
		static msDias(dias) {
			return Tempo.Dia*dias;
		}
		static semana(dt) {
			//começa no dom, procura primeiro dom do ano
			let d = new Date(dt.getFullYear(),0,1);
			if (d.getDay()!=0) {
				d.setTime(d.getTime()+(7-d.getDay())*Tempo.Dia);
			}
			if (dt<d) {
				//retorna o numero semana do ultimo dia ano anterior
				return Tempo.semana(new Date(dt.getFullYear()-1,11,31));
			}
			return (dt.getFullYear())
				+'@'+Lib.strZero( 1 + Math.floor((dt.getTime()-d.getTime())/Tempo.Dia/7),2)
			;
			
		}
		static tempo(msDif) {
			//dif = dif/1000;
			var ar = (x)=>{return Math.floor(x+0.5)};
			var sg = ar(msDif%60);msDif = Math.floor(msDif/60);
			var mi = ar(msDif%60);msDif = Math.floor(msDif/60);
			var hr = ar(msDif%24);
			var di = ar(msDif/24);
			return (di>0?di+"d ":"")
				+(hr>0?hr+"h ":"")
				+(mi>0?mi+"m ":"")
				+sg+"s "
			;
		}		
		static fromStr(str) {
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
					//var h = palavraA(substrAt(str,' ')+':0:0:0',':');
					var h = (str.substrAt(' ')+':0:0:0').split(':');
					if (h[2].indexOf('.')!=-1) {
						h[3] = substrAt(h[2],'.');
						h[2] = leftAt(h[2],'.');
					} else {
						h[3] = '0';
					}
				}
				// d/m/y 
				if (str.indexOf('/')!=-1) {
					//var d = palavraA(leftAt(str,' '),'/');
					var d = str.leftAt(' ').split('/');
					return new Date(1*d[2],1*d[1]-1,1*d[0],1*h[0],1*h[1],1*h[2],1*h[3]);
				}
				// y-m-d 
				//var d = palavraA(leftAt(str,' '),'-');
				var d = str.leftAt(' ').split('-');
				var r = new Date(1*d[0],1*d[1]-1,1*d[2],1*h[0],1*h[1],1*h[2],1*h[3]);
				//lert('d='+d+' h='+h+' '+r);
				return r;
			} catch (e) {
				alert('erro strToData '+Lib.erro(e));
				return new Date();
			}
		}
		static ms(datA) {
			if (Lib.isStr(datA)) {
				return Tempo.fromStr(datA).getTime();
			} else if (datA) {
				return datA.getTime();
			} else {
				return (new Date()).getTime();
			}
		}
		static recente(d) {
			return Tempo.dataSort(d);
		}
		static éHoje() {
		}
		static dataSortR(tempo,semHora) {
			//fuso d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
			//getDay = dia semana.
			var d = Lib.vazio(tempo)?new Date():tempo;
			if (typeof(tempo)=='string') {
				d = Tempo.fromStr(tempo);
			} else if (typeof(tempo)=='number') {
				d = new Date(tempo);
			}
			return Lib.strZero(d.getFullYear(),4)+Lib.strZero(d.getMonth()+1,2)
				+Lib.strZero(d.getDate(),2)
				+(semHora?'':Lib.strZero(d.getHours(),2)
					+Lib.strZero(d.getMinutes(),2)+Lib.strZero(d.getSeconds(),2)
			);
		}
		static dataSort(tempo,semHora) {
			//fuso d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
			//getDay = dia semana.
			var d = Lib.vazio(tempo)?new Date():tempo;
			if (typeof(tempo)=='string') {
				d = Tempo.fromStr(tempo);
			} else if (typeof(tempo)=='number') {
				d = new Date(tempo);
			}
			return Lib.strZero(d.getFullYear(),4)+'-'+Lib.strZero(d.getMonth()+1,2)
				+'-'+Lib.strZero(d.getDate(),2)
				+(semHora?'':' '+Lib.strZero(d.getHours(),2)+':'
					+Lib.strZero(d.getMinutes(),2)+':'+Lib.strZero(d.getSeconds(),2)
			);
		}
	}


	//debug
	const Deb = {
		ini:{}
		,dev: ()=>{
			return (''+window.location).indexOf('/dv.')!=-1
					|| (''+window.location).indexOf('_debug=1')!=-1
			;
		}
		,_logJ: 0
		,logJ: (str,mon) => {
			//texto e opcionalmente nome monitor
			if (!Deb.dev()) return;
			var jan = document.getElementById('debJ');
			if (Lib.vazio(jan)) {
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
				jan.innerHTML = (
					(''+str).indexOf('<')!=-2
						?'<p>'+(Deb._lobJ++)+' '+Conv.fromHtml(str).replaceAll('\n','<br>')+'</p>'
						:str
					) 
					+'<hr>'+ jan.innerHTML;
				return;
			}
			//procura por monitor dentro da janela
			var monG = Dom.getElementsByClassName(jan,'debJMon')[0];
			var mon1 = Dom.getElementsByClassName(monG,'debJMon_Item'+mon)[0];
			// lert(mon+' g='+monG+' 1='+mon1);
			if (!mon1) {
				var mon1 = document.createElement('div');
				mon1.className = 'debJMon_Item debJMon_Item'+mon;
				mon1.title = mon;
				monG.appendChild(mon1);
			}
			mon1.innerHTML = str;
		}

		,log: function(){
			if (arguments.length==1) {
				console.log(arguments[0]);
			} else {
				console.log(arguments);
			}
		}
		,nav: (ob,jan)=>{ //antigo objNav
			if (typeof(this)=='undefined') {
				new Deb.nav(ob,jan);
				return this;
			}
			//lert(this);
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
					+'<font size=2>'+(t=='string' || t=='function'?Conv.fromHtml(''+z):z)
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
				new Deb.nav(ds);
			}
			//**************************
			function init(o) {
				if (Lib.vazio(o)) {
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
				+'src="/js/func.js"></script>'
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
						w.este = new Deb.nav(o,w);
					} catch (e) {
						Lib.alertErro(e);
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
				var ds=document.getElementById('dad');if (!ds) ds = this.jan.document;
				ds.innerHTML = r;
		 
				return r;
			}
			return this;
		}
	}

	class Conv {
		//https://codereview.stackexchange.com/questions/181017/decoder-for-content-transfer-encoding-and-quoted-printable
		static fromquoted_printable1(str) {
			let t = str.length;
			let r = '';
			for (let i=0;i<t;i++) {
				if (str.charAt(i)=='=') {
					if (i+1<t&&str.charAt(i+1)=='\n') {
						//ignora = no fim da linha e
						i++;
					} else if (i+1<t&&str.charAt(i+1)=='\r') {
						//ignora = no fim da linha e
						i += 2;
					} else if (i+2<t) {
						r += String.fromCharCode(parseInt(str.substring(i+1,i+3),16));
						i += 2;
					}
				} else {
					r += str.charAt(i);
				}
			}
			try {
				return decodeURIComponent(escape(r));
			} catch (e) {
				try {
					return decodeURIComponent((r));
				} catch (e1) {
					deb('erro fromquoted_printable '+e);
					return r;
				}
			}
		}
		static fromquoted_printable(str,charSet) {
			//toDo o %u ->> %uD83D%uDE04
			var cv = Eml.hexConv(charSet);
			let t = str.length;
			let r = '';
			for (let i=0;i<t;i++) {
				if (str.charAt(i)=='=') {
					if (i+1<t&&str.charAt(i+1)=='\n') {
						//ignora = no fim da linha e
						i++;
					} else if (i+1<t&&str.charAt(i+1)=='\r') {
						//ignora = no fim da linha e
						i += 2;
					} else if (i+2<t) {
						r += cv.conv(str.substring(i+1,i+3));
						i += 2;
					}
				} else {
					r += str.charAt(i);
				}
			}
			return r;
		}
		/*static fromquoted_printable(str) {
			str = str
				.replaceAll('=\n','')
				.replaceAll('=\r','')
				.replaceAll('%','%25')
				.replaceAll('=','%')
			;
			alert('q '+str);
			try {
				return decodeURI(str);
			} catch (e) {
				alert('erro str '+str);
			}
		}*/
		static fromHtml(str) {
		 return str.replace(/&/g, "&amp;")
					 .replace(/</g, "&lt;")
					 .replace(/>/g, "&gt;")
					 .replace(/"/g, "&quot;")
					 .replace(/'/g, "&#39;")
			;
		}
		static toHtml(str) {
		 return str.replace(/&lt;/g,'<')
					 .replace(/&gt;/g,'>')
					 .replace(/&quot;/g,'"')
					 .replace(/&#39;/g,"'")
					 .replace(/&amp;/g,'&')
			;
		}
		static toBase64(str) {
			return window.btoa(unescape(encodeURIComponent(str)));
		}
		static fromBase64(str) {
			try {
				var s = window.atob(str);
				s = escape(s);
				return decodeURIComponent(s);
			} catch (e) {
				alert('erro fromBase64:'+e+'\n\n'+str);
			}
			
		}
	}

	const Eml = {
		ini:{}
		//addEventListener("contextmenu",
		,convContentTxtT:(tx,enc,charset)=>{
			var fr = document.createElement('iframe');
			// data:[<media type>][;charset=<character set>][;base64],<data>
			fr.src = "data:text/plain;charset="+charset+";"+enc+","+tx;
			deb(fr);
			return fr;
		}
		,convContentTxt:(tx,enc,charset)=>{
			if (enc=='base64') {
				tx = Conv.fromBase64(tx);
			} else if (enc=='7bit') {
			} else if (enc=='8bit') {
				// ha utf-8 com sequs Ã§Ã£ 
				try { //produÃ§Ã£o
					//eb('8bit '+charset);
					var td = new TextDecoder(charset.toUpperCase());
					function str2ab(str) {
							var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
							var bufView = new Int32Array(buf);//new Uint16Array(buf);
							for (var i=0, strLen=str.length; i < strLen; i++) {
								bufView[i] = str.charCodeAt(i);
							}
							return buf;
					}				
					if (td) tx = td.decode(str2ab(tx));
				} catch (e) {
					alert('8bit df='+Lib.erro(e));
				}
			} else if (enc=='quoted-printable') {
				var r = Conv.fromquoted_printable1(tx);
				if (r.indexOf('Ã£')!=-1||r.indexOf('Ã§')!=-1) {
					deb('convContentTxt Ã£ -- ');
					r = Conv.fromquoted_printable(tx);
				}
				return r;
			}
			return tx;
		}
		,convContent:(tx,enc,charset)=>{
			// https://en.wikipedia.org/wiki/Data_URI_scheme#Syntax
			// data:[<media type>][;charset=<character set>][;base64],<data>
			
			/*var d = new DOMParser();
			d.parseFromString('text/html;charset='+charset+';'+enc+','+tx,'text/html');
			if (d) return d.documentElement.outerHTML;
			*/
			
			if (enc=='base64') {
				tx = Conv.fromBase64(tx);
			} else if (enc=='7bit') {
			} else if (enc=='8bit') {
			} else if (enc=='quoted-printable') {
				//var ct = textObj
				tx = Conv.fromquoted_printable1(tx);
				/*if (r.indexOf('Ã£')!=-1||r.indexOf('Ã§')!=-1) {
					r = Conv.fromquoted_printable1(tx);
				}
				tx = r;
				*/
				//tx = decodeURI(escape(tx.replaceAll('=','%')));
				//tx = decodeQuotedPrintable(tx);
			}
			return tx;
		}
		,htmlSanitize:class {
			//tabela de Url key url
			static oU = {};
			//tabela de Url key cod
			static vU = [];
			static codToUrl(cod) {
				return this.vU[cod]
					?this.vU[cod][0]
					:false
				;
			}
			static urlToCod(url) {
				var v = this.oU[url];
				if (!v) {
					//url,cod,nvHtml,nvClick
					v = [url,this.vU.length,0,0];
					this.vU.push(v);
					this.oU[url] = v;
				}
				v[2]++;
				return v[1];
			}
			static eu() {
				//retorna classe
				return this;
			}
			static click(ev,doc) {
				// chamada atraves do iframe msg.html 
				//clicou no doc eml do iframe...
				if (Dom.clickCancel(ev)) return;
				ev.preventDefault();
				//dialogo
				//var ob = [];	
				var dg = new Dom.dialog({class:'contextUrl'
					,click: (ev) => {
						//alert('clicou.. ev');
						if (Dom.clickCancel(ev)) return;
						//TODOS
						if (ev.target.getAttribute('name')=='all') {
							//limpa linhas
							dg.dom.innerHTML = '';
							addLinhas(doc.querySelectorAll('[_url]'));
							dg.hide();
							setTimeout(()=>{dg.center();},100);
							return;
						}
						dg.destroy();
					}
				});
				dg.dom.innerHTML = '<table class="url">';
				//
				var addLinhas = (v)=>{
					domObj({tag:'tr',targ:dg.dom,
						'':'<td colspan=3>'
							+'<input name="all" type="button" value="list todos">'
							+'<input type="button" value="fechar">'
					});
					aeval(v,(o)=>{
						let at = o.getAttribute('_url').split('~');
						Lib.aeval(at,(v)=> {
							let cod = o.getAttribute(v).substring(1);
							let url = Eml.htmlSanitize.codToUrl(cod);
							/*ob.push([v
								,cod
								,url
							]);*/
							domObj({tag:'tr',targ:dg.dom//,cod:ob.length
								,'':'<td>'+o.tagName+'.'+v
									+'<td title="codigo: '+cod+'">'+url
									+'<td><input type="button" value="ver">'
								,ev_click: (ev) => {
									if (Dom.clickCancel(ev)) return;
									if (ev.target.value=='ver')
										if (confirm('abrir URL \n\n'+url)) 
											o.setAttribute(v,url);
								}
							});
						});
					});
				};	
				// mostra TODOS ou CLICK
				let o = ev.target;
				let v = [];
				while (o) {
					if (o.getAttribute 
						&& o.getAttribute('_url') ) {
						//add linha
						v[v.length] = o;
					}
					o = o.parentNode;
				}
				addLinhas(v);
				dg.center();
				//lert(o.tagName+'.'+at+'\n\n'+r);
				//console.log(ev.target);
			}
			static LIXOeventsDom(dom) {
				//lert('ini san events '+dom);
				// html sanit foi carregado no dom
				// procura em toda estrutura dom e cria eventos click
				function fu(o) {
					/*
					 * attr com url são substit por cods e seus
					 * nomes listados no attr '_url' separados por ~
					 * 
						get attr names list with url
					*/
					let at = o.getAttribute?o.getAttribute('_url'):false;
					/*melhor click no doc... if (at) {
						Dom.stylePropOnOff(o,'mouse:pointer;');
					}*/
					//nada fazer aqui?
					/*if (o.tagName=='STYLE') {
						o.innerHTML = eu.sanForce(o.innerHTML+'');
					}*/
					//recursivo
					let f = o.childNodes;
					if (f&&f.length) {
						for (var i=0;i<f.length;i++) {
							fu(f.item(i));
						}
					} else if (o.innerHTML) {
						//nada fazer aqui?
						//o.innerHTML = eu.sanForce(s);
					}
				}
				fu(dom);
			}
			// usar? https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
			// 2023-05-01 ff em dev, chrome desde o 105 (agora 112), android não, o esr é 102.
			// W3C => https://wicg.github.io/sanitizer-api/#sanitizer-api
			// 		testsuite - https://wpt.fyi/results/sanitizer-api
			// https://wpt.fyi/interop-2023
			// substitui o atr por _atr com codigo da url
			// o DOMParser não processa partes <!--[if mso | IE]> q são destinadas
			//		a outro navegador
			// 		<v:fill origin="0.5, 0" position="0.5, 0" src="https://ae01.mlicdn.com/kf/H119729f115ef4e32a1f5b6501c20b50cb/1200x576.png" type="tile" size="100%,100%" />
			// falta tag style inline <div style="background:url(https://ae01.mlicdn.com/kf/H119729f115ef4e32a1f5b6501c20b50cb/1200x576.png) center top / 100% 100% repeat;background-position:center top;background-repeat:repeat;background-size:100% 100%;margin:0px auto;max-width:600px;">
			// ideal seria procurar links nos textos finais tb
			// 2023-5 achei eml que o codigo não pega o  de um "a" e não possui if
			sao(h) {
				return h.indexOf('://')==-1
					&& h.search(new RegExp("<script", "i"))==-1
				;
			}
			sanForce(s) {
				return s.replaceAll('http://','ptth_//x')
					.replaceAll('https://','sptth_//x')
					.replaceAll('url(','lru(')
				;
			}
			htmlSao() {
				//varre obj do DOMParser a procura de refs externas
				//  monta bd na mem com urls substituidas
				//	toDo -> embutir js com urls para usu ter acesso a links e imagens
				function fu(eu,o) {
					if (o.hasAttributes && o.hasAttributes()) {
						for (const a of o.attributes) {
							if (',innerHTML,outerHTML,textContent,'.indexOf(a.name)==-1) {
								var t = ''+a.value;
								var p = t.indexOf('://');
								if (p>-1&&p<10) {
									//varios attr na tag podem ter ref 
									let va = o.getAttribute('_url');
									o.setAttribute('_url',(va?va+'~':'')+a.name);
									var c = Eml.htmlSanitize.urlToCod(t);
									//regrava attr
									o.setAttribute(a.name,'#'+c);
									//o.removeAttribute(a.name);
									//o.setAttribute('_'+a.name,''+c);
								} else if (p>-1&&a.name.toUpperCase()=='STYLE') {
									Deb.log('STYLE:'+a.value);
									a.value = eu.sanForce(a.value);
									Deb.log('STYLE san:'+eu.sanForce(a.value));
								}
							}
						}
					} else {
						//
					}
					//há ref no css?
					if (o.tagName=='STYLE') {
						//Deb.log('STYLE:'+a.value);
						o.innerHTML = eu.sanForce(o.innerHTML+'');
						//Deb.log('STYLE san:'+eu.sanForce(a.value));
					}
					//recursivo
					let f = o.childNodes;
					if (f&&f.length) {
						for (var i=0;i<f.length;i++) {
							fu(eu,f.item(i));
						}
					} else if (o.innerHTML) {
						//sanit innerHTML
						o.innerHTML = eu.sanForce(s);
					}
				}
				fu(this,this.d);
				//tem body, isola apenas este conteúdo
				var b = this.d.documentElement.getElementsByTagName('body');
				deb('B O D Y length='+b.length);
				var r;
				if (b.length==0) {
					r = this.d.documentElement.outerHTML;
				} else if (b.length==1) {
					r = b[0].innerHTML;
				} else {
					r = '<h1>mais de um body  '+b.length+'</h1>'
						+'<pre>'+Conv.fromHtml(this.d.documentElement.outerHTML)+'</pre>'
					;
				}
				return r;
			}
			estat() {
				var eee = new estat('links no html');
				var fu=(o)=>{
					if (o.hasAttributes && o.hasAttributes()) {
						for (const a of o.attributes) {
							if (',innerHTML,outerHTML,'.indexOf(a.name)==-1) {
								var t = ''+a.value;
								var p = t.indexOf('://');
								if (p>-1&&p<10) {
									eee.inc1(o.tagName
										+' '+a.name
										+' '+t.substring(0,p)
									);
								}
							}
						}
					}
					//recursivo
					o = o.childNodes;
					if (o&&o.length) for (var i=0;i<o.length;i++) {
						fu(o.item(i));
					}
				}
				fu(this.d);
				return eee;		
			}
			constructor(parent,html) {
				this.h = html;
				this.parent = parent;
				this.d = (new DOMParser()).parseFromString(this.h,'text/html');
			}
		}	
		,hexConv: (cp) => {
			var td;
			try {
				td = new TextDecoder(cp.toUpperCase());
			} catch (e) {
				//lert('charset '+cp+' invalido?');
			}
			this.conv = (h) => {
				if (td) {
					var h1 = new Uint8Array(h.length/2);
					for (var i=0;i<h.length;i+=2) {
						h1[i/2] = parseInt(h.substring(i,i+2),16);
					}
					return td.decode(h1);
				} else {
					var r = '';
					for (var i=0;i<h.length;i+=2) {
						r += String.fromCharCode(parseInt(h.substring(i,i+2),16));
					}
					return r;
				}
			}
			//func constructor deve retornar this
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
				//=?UTF-8?B?8J+TtyBDYXNzaWEgU2lsdmEg?=;=?UTF-8?B?cHVibGljb3UgcmVjZW50?=;=?UTF-8?B?ZW1lbnRlIHVtYSBub3Zh?=;=?UTF-8?B?IGZvdG8=?=
				f += s.charAt(f+2)=='?'?3:2;
				p = s.indexOf('?=',f);
				//lert(cp+' '+cm+'\n\n'+s.substring(f,p));
				if (cm=='q') {
					var t = Eml.decodQ(cp,s.substring(f,p));
					s = s.substring(0,i-2)
						+t
						+s.substring(p+2+(s.charAt(p+2)==';'?1:0))
					;
					p = i-2+t.length;
				} else if (cm=='b') { //base 64
					if (cp=='utf-8') {
						var t = window.atob(s.substring(f,p));
						t = escape(t);
						/*try {
						t = decodeURIComponent(t);
						} catch (e) {
							deb('er=='+t+' '+s.substring(f,p));
						}*/
					} else {
						var t = window.atob(s.substring(f,p));
					}
					s = s.substring(0,i-2)
						+t
						+s.substring(p+2+(s.charAt(p+2)==';'?1:0)) //as x's ou sempre há o ; ?
					;
					p = i-2+t.length;				
				} else {
					p = i;
				}
			}
			try {
				s = decodeURIComponent(s);
			} catch (e) {
			}
			return s;
		}
	};

	const Dom = {
		ini:{}
		, espera: (destino)=> {
			let r='<img src=imagens/espera.gif>';
			if (destino) {
				destino.appendChild(Dom.obj(r));
			} else {
				return r;
			}
		}
		, getDPI: ()=>{
			// 2023-09 retorna sempre 96x96 inclusive em celular.
			//    no firefox e base chrome 
			if (Dom.getDPI__) {
				if (Lib.isObj(Dom.getDPI__)) {
					let x = Dom.getDPI__.clientWidth+'x'+Dom.getDPI__.clientHeight;
					Dom.getDPI__ = x;
				}
				return Dom.getDPI__;
			}
			Dom.getDPI__=Dom.obj('<div style="width:1in;border:2px solid;'
				+'height: 1in;">teste </div>',document.body)
			;
			return Dom.getDPI();
		}
		, dialog: function(Op) {
				var eu = this;
				var visible = false;
				if (typeof(Op)!='object'||Op.tagName) {
					alert('parametro errado: passar objeto com:'
						+'\nhtml or dom: conteúdo'
						+'\nclick: envento on click'
						+'\npMaxW or pMaxH: %/100 max w e h 0.8'
						+'\ncontainer: add container'
						+'\nclass: class container'
					);
					return;
				}
				var op = Lib.optionsMerge({pMaxW:0.8,pMaxH:0.8,container:true,class:'pdr'},Op);
				this.op = op;
				
				//style exists ?
				var cl = '_contextDiv';
				if (!document.getElementById(cl)) {
					Dom.addStyleId('DIV.'+cl+' {'
						+'position:fixed;' //xdisplay:none;xz-index:100;
						+'z-index:10;'
						+'background-color:var(--corFd);'//#f0f0f0;' //xborder:2px solid blue;'
						+'overflow:auto;'
						+'border-radius:7px;'
						+'padding:5px 10px;'
						+'top:0;left:-300%;'
						+'border:5px solid dark;'
						+'}'
					,cl);
				}
				
				var f = op.dom;
				if (!f || op.container) {
					//cria
					f = document.querySelector('.'+cl+'.'+op.class);
					f = document.createElement('div');
					f.className = cl+(op.class?' '+op.class:'');
					//add in document
					document.body.appendChild(f);
					if (op.dom) {
						f.appendChild(op.dom);
					} else if (op.html) {
						f.innerHTML = op.html;
					}
				}
				
				this.dom = f;
				if (op.click) {
					f.addEventListener('click',op.click);
				}
				//*************************
				this.full = function() {
					var tw = window.innerWidth;//browse.getTX(document.body);
					var two = browse.getTX(f);
					styleSet(f,'width',tw+'px');
					//limita algura
					var th = window.innerHeight;//browse.getTY(window);
					var tho = browse.getTY(f);
					styleSet(f,'height',th+'px');
					styleSet(f,'left','0');
					styleSet(f,'top','0');
				}
				//*************************
				this.destroy = ()=>{
					this.hide();
					Dom.remove(this.dom);
				}
				//*************************
				this.setDom = (domObj)=>{
					f.innerHTML = '';
					f.appendChild(domObj);
					//f = domObj;
				}
				//*************************
				this.text = text;
				function text(html) {
					if (html) f.innerHTML = html;
					return f.innerHTML;
				}
				//*************************
				this.visible = function() {
					return visible;
				}
				//*************************
				function limitWidthHeight() {
					var tw = window.innerWidth;//browse.getTX(document.body);
					var two = browse.getTX(f);
					//limita Largura ?
					two = (two<1?eu.two:two)*1.05; //para o scroll
					if (two>tw*op.pMaxW) {
						two = tw*op.pMaxW;
					}
					styleSet(f,'width',two+'px');
					//limita algura
					var th = window.innerHeight;//browse.getTY(window);
					var tho = browse.getTY(f);
					tho = (tho==0?eu.tho:tho);
					if (tho>th*op.pMaxH) {
						tho = th*op.pMaxH;
						styleSet(f,'height',tho+'px');
					}			
				}
				//*************************
				this.reCenter = function() {
					var tw = window.innerWidth;//browse.getTX(document.body);
					var two = browse.getTX(f);
					//limita Largura ?
					two = (two<1?eu.two:two)*1.05; //para o scroll
					if (two>tw*op.pMaxW) {
						two = tw*op.pMaxW;
					}
					styleSet(f,'width',two+'px');
					//limita algura
					var th = window.innerHeight;//browse.getTY(window);
					var tho = browse.getTY(f);
					tho = (tho==0?eu.tho:tho);
					if (tho>th*op.pMaxH) {
						tho = th*op.pMaxH;
						styleSet(f,'height',tho+'px');
					}
					styleSet(f,'left',(tw-two)/2+'px');
					styleSet(f,'top',(th-tho)/2+'px');
				}
				//*************************
				this.center = function(ev,fClick) {
					this.click = fClick;
					if (visible) {
						eu.hide();
						return;
					}
					var two = browse.getTX(f);
					if (two<1 && !eu.recalc) {
						//precisa calc tamanho
						//eb('recalc='+two);
						eu.recalc = true;
						browse.mostra(f);
						setTimeout(eu.center,100);
						return;
					}
					visible = true;
					eu.recalc = false;
					
					eu.reCenter();
					
					browse.mostra(f);
				}
				//*************************
				this.show = function(ev,fClick) {
					if (fClick) this.click = fClick;
					if (visible) {
						eu.hide();
						return;
					}
					var two = browse.getTX(f);
					if (two<1 && !eu.recalc) {
						//precisa calc tamanho
						//eb('recalc='+two);
						eu.recalc = true;
						browse.mostra(f);
						setTimeout(()=>{eu.show(ev)},100);
						return;
					}
					visible = true;
					eu.recalc = false;					
					//
					if (!ev) {
						if (this.Ev) {
							ev = this.Ev;
						} else {
							//lertDev('contextDiv.show(event): missing event, use .center()');
							eu.center();
							return;
						}
					} else {
						this.Ev = ev;
					}
					//screenX: 2679 screenY: 292
					let tx = f.clientWidth;
					let ty = f.clientHeight;
					var nx, ny;
					if ( eu.queryAlign && (nx=ev.target.closest(eu.queryAlign)) ) {
						//_c(nx);
						ny = nx.offsetTop;//browse.getY(nx);//
						nx = browse.getAbsX(nx); //browse.getX(nx)-browse.getTX(f);
					} else {
						//antes inicio tela
						if (tx==0) alert(f.innerHTML);
						nx = ev.x-tx; //ev.x ev.screenX
						//eb(f);
						//eb(' nx='+nx+' tx='+tx+' tw='+window.innerWidth);
						if (nx<0) nx=ev.x;
						//apos fim tela
						if (nx+tx>window.innerWidth) {
							nx = window.innerWidth-tx;
							if (nx<0) nx=0;
						}
						//antes topo tela
						ny = ev.y-ty;
						//eb(' ny='+ny+' ty='+ty+' th='+window.innerHeight);
						if (ny<0) ny=ev.y;
						//apos fim tela
						if (ny+ty>window.innerHeight) {
							ny = window.innerHeight-ty;
							if (ny<0) ny=0;
						}
					}
					styleSet(f,'left',nx+'px');
					styleSet(f,'top',ny+'px');
					//_c(f);
					setTimeout(limitWidthHeight,100);
					browse.mostra(f);
				}
				//*************************
				this.hide = function() {
					visible = false;
					//guarda ultimo tamanho
					eu.two = browse.getTX(f);
					eu.tho = browse.getTY(f);
					//zeras tamanhos
					styleSet(f,'width');//lert('retirou width');
					styleSet(f,'height');
					//esconde
					//eb('esconde '+f+' '+erro());
					browse.esconde(f);
				}
				this.close = this.hide;
			}
		, evPercHoriz: (ev,oEl)=> {
			if (!oEl) oEl = ev.target;
			var bb = oEl.getBoundingClientRect();
			return (ev.clientX - bb.left) / bb.width;
		}
		,	isInput: (o)=>{
			if (o instanceof Event) o = o.target;
			return o.tagName=='INPUT';
		}
		,	isEvent: (o)=>{
			return o instanceof Event;
		}
		, addCssToStyle: (url,id,prefix)=>{
			Lib.load(url,(tx,ok)=>{
				if (!ok) {
				}
				//lert(ok+' '+tx);
				Dom.addStyleId(tx,id,prefix);
			});

		}
		, addCss: (url)=>{
			Dom.obj({tag:'link'
				,targ:document.querySelector('head')
				,rel:'StyleSheet'
				,href:url+'?ms='+(new Date()).getTime()
			});
		}
		, clickCancelContext: (ev)=>{
			return !Lib.vazio(window.getSelection().toString()) //seleção
				|| ev.ctrlKey //cssEdit
			;
		}
		, clickCancel: (ev)=>{
			return !Lib.vazio(window.getSelection().toString()) //seleção
				|| ev.ctrlKey //cssEdit
				|| ev.button>1 //so 0 e 1 (central)
			;
		}
		, scrollToVisible: (element)=>{
			var e = element;
			var t = element.ownerDocument.documentElement;
			var p = element.offsetTop-element.offsetHeight*0.07;
			if (t.scrollTop>p) {
				t.scroll({
					top: p
					,behavior: "smooth"
				});
				return;
			}
			//? e.scrollHeight e.offsetParent
			p =  element.offsetTop-t.clientHeight+element.offsetHeight*2;
			//eb(e);
			/*var d = t.scrollTop+' < '+p
				+' et='+element.offsetTop
				+' -ch='+t.clientHeight
				+' +eoh*1.07='+element.offsetHeight*1.07
			;*/
			if (t.scrollTop<p) {
				//eb('s '+d);
				t.scroll({
					top: p+element.offsetHeight
					,behavior: "smooth"
				});					
			} else {
				//eb('n '+d);
			}
		}
		//***********************************************
		, getElementIndex: (o)=>{
			var op = o.parentNode.childNodes;
			for (var i=0;i<op.length;i++) {
				if (op[i]==o) {
					return i;
				}
			}
			return -1;
		}
		, dialogo_Dev: class {
			open(ev) {
				if (Dom.agent.mobile()) {
					this.center(ev);
				} else {
					this.show(ev);
				}
			}
			constructor(op) {
				this.op = Lib.optionsDefault(op,{
				});
			}
		}
		, aguarde: (domDs,txOUfun)=>{ //mostra msg "carregando"
			//não é uma idéia correta, dirigida a evento.
			domDs.innerHTML = '<p class="domAguarde">'
				+'aguarde...'
				+(Lib.isStr(txOUfun)?'<br><br><b>'+txOUfun+'</b>':'')
				+'</p>'
			;
			if (Lib.isFun(txOUfun)) {
				let vl = txOUfun();
				if (Lib.isStr(vl)) {
					domDs = vl;
				} else if (vl.tagName) {
					domDs.innerHTML = '';
					domDs.appendChild(vl);
				}
			}
		}
		, remove: (ob)=>{
			ob.parentNode.removeChild(ob);
		}
		//***************************************************
		, getParentByTagName: (o,nome,limit)=>{
			if (Dom.isEvent(o)) o = o.target;
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
		//***************************************************
		// retorna o parent que possui o attributo setado
		, getParentByAttr: (o,nomeAtr,limit)=>{
			//obj é evento?
			if (Dom.isEvent(o)) o = Dom.getTarget(o);
			var oa = o;
			while (o) {
				if (o.getAttribute 
					&& o.getAttribute(nomeAtr)
					&& o.getAttribute(nomeAtr)!=null ) {
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
		//***************************************************
		// retorna o parent que possui o attributo setado
		, getParentAttr: (O,nomeAtr,limit)=>{
			var o = Dom.getParentByAttr(O,nomeAtr,limit);
			if ( !o ) {
			} else if (o.getAttribute && o.getAttribute(nomeAtr) && o.getAttribute(nomeAtr)!=null ) {
				return o.getAttribute(nomeAtr);
			} else if (o[nomeAtr]) {
				return o[nomeAtr];
			}
			return;
		}
		//*********************************
		, getTarget: (ev)=>{
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
		, isEvent: (o)=>{
			return (o && o.target && o.type);
		}
		, styleSet: (dom,key,value)=>{
			var o = Obj.fromText(dom.style.cssText);
			if (o[key] == value) return false;
			o[key] = value;//(!value?'':value);
			dom.style.cssText = Obj.toText(o);
			//051lert('ss1 d='+dom.style.cssText+'\n\nsf='+Obj.toText(o));
			return true;
		}
		, stylePropOnOff: (dom,str)=>{
			var r = false;
			var t = dom.style.cssText;
			if (t.indexOf(str)==-1) {
				dom.style.cssText += str;
				r = true;
			} else {
				dom.style.cssText = t.replace(str,'');
			}
			return r;
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
			if (!x) {
				// procura link stylesheet
				x = document.querySelector("link[rel='StyleSheet']");
			}
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
						+' {'+Obj.toText(hV[i][1])+'}'
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
						,Obj.fromText(s.cssText.substrAtAt('{','}'))
					]);
				}
				Dom.remove(ne);
				//lert('hv='+hV);
			}
			return this;
		} //fim folhaEstilo
		//***********************************************
		/** x@constructor */
		// param obj ou text+obj
		, obj: (p,oo)=> {
			var ret;
			if (typeof(p)=='string') {
				if (p.charAt(0)!='<') {
					p = '<p>'+p+'</p>';
				}
				//eb.log(p,oo);
				ret = Dom.obj({tag:p.equals('<tr')||p.equals('<td')?'table':'div','':p}).firstChild;
				//eb.log(p,ret,oo);
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
				//tag é html ?
				if (p.tag.charAt(0)=='<') {
					ret = p.doc.createElement('div');
					ret.innerHTML = p.tag.trimm();
					ret = ret.firstChild;
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
						try {
							Lib.aeval(p[i],function(v){ret.appendChild(v);});
						} catch (e) {
							alert(Obj.toText(p[i])+'\n\n'+Lib.erro(e));
						}
					} else {
						ret.innerHTML = ''+p[i];
					}
				} else if (i.equals('ev_')) {
					var ev = i.substrAt('_');
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

	var browse = {
		
	};


	var Obj = {
		ini:{}
		//**************************//
		,toHtml: (obj)=>{ //,strTagElem,strTagValue) {
			//strTagElem = strTagElem?strTagElem:' '
			//strTagValue = strTagValue?strTagValue:'span'
			let r = '';
			for (let k in obj) {
				r += '<span class="_label">'+k+'</span> '+obj[k]+' ';
			}
			return r;
		}
		,fromText: (tex,delimElem,delimValue)=>{
			var v = (tex?tex:'').split(delimElem?delimElem:';');
			var r = {};
			var dl = delimValue?delimValue:':';
			for (let i=0;i<v.length;i++) {
				if (v[i].trim()=='') continue;
				let p = v[i].indexOf(dl);
				if (p==-1) {
					r[unescape(v[i].trimm())] = undefined;
				} else {
					r[ unescape(v[i].substring(0,p).trimm()) ] 
						= unescape( unescape(v[i].substring(p+dl.length).trimm()) )
					;
				}
			}
			return r;
		}
		//**************************//
		,toText: (obj,delimElem,delimValue)=>{
			delimElem = delimElem?delimElem:';'
			delimValue = delimValue?delimValue:':'
			let sd = '%'+delimElem+delimValue;
			let r = '',nv=0;
			for (let k in obj) {
				var o = obj[k];
				try {
					r += escape(k)
						+(Lib.isUnd(o)
							?''
							:delimValue
								+(Lib.isFun(o)
									?'function(?)'
									:escape(''+o,sd)
								)
						)
						+delimElem
					;
				} catch (e) {
					console.log(obj,k,o);
					r += k+delimValue+o+delimElem;
				}
			}
			return r;
		}
		// recebe js obj/json aplica a func
		//   passando vlr e ch e add em array
		//	 se func retorna verdadeiro.
		,getElements: (Obj,Func,_arr) => {
			function a(obj,func,arr) {
				Lib.aeval(obj,(v,k)=>{
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

	/*
	 * todos os objetos terão esta propriedade tipo "funcion"
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


	//arrays
	if (!Array.prototype.indexOfOld) {
		Array.prototype.indexOfOld = Array.prototype.indexOf;
		Array.prototype.indexOf = function(par){
			if (typeof(par)!='function') return this.indexOfOld(par);
			for (let i=0;i<this.length;i++) {
				if (par(this[i])) return i;
			}
		}
	}
	if (!Array.prototype.split) Array.prototype.split = function(del){
		for (k in this) {
			if (this[k].split) this[k] = this[k].split(del);
		}
		return this;
	}
	
	if (!Date.prototype.getYearWeek) Date.prototype.getYearWeek = function(num){
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
		if (this.getTime()<d0.getTime()) return (new Date(y-1, 11, 31)).getYearWeek(num);
		let s = Math.floor((this-d0)/7/24/3600000)+1;
		if (num) return s;
		return y+'s'+strZero(s,2);
	};

	if (!Number.prototype.format) {
		// cache of NumberFormat object
		Number.prototype._format_ = {};
		Number.prototype.format = function(dec) {
			if (! Number.prototype._format_[dec] ) {
				var l = window.navigator.language;
				//Deb.log('lang='+l);
				Number.prototype._format_[dec] = new Intl.NumberFormat(
					(l?l:'pt-BR')
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
		Date.prototype._ms = {
			 'en':['January','February','March','April','May','June','July','August','September','October','November','December']
			,'pt':['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
		};
		Date.prototype.getMonthStr = function() {
			var r = this._ms[window.navigator.language];
			if (!r) r = this._ms[window.navigator.language.leftAt('-')];
			if (!r) r = this._ms['en'];
			if (r) return r[this.getMonth()];
		}
	}

	//Strings
	if(!String.prototype.split0) { 
		String.prototype.split0 = function(del) {
			if (this.length==0) return [];
			return this.split(del);
		}	
	}
	if(!String.prototype.mergeChars) { 
		String.prototype.mergeChars = function(masc,coringa) {
			coringa = coringa?coringa:'*';
			let r = '';
			let p = 0;
			for (let c=0;c<masc.length&&p<this.length;c++) {
				if (masc.charAt(c)==coringa) {
					r += this.charAt(p++);
				} else {
					r += masc.charAt(c);
				}
			}
			return r;
		}
	}

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

	if(!String.prototype.leftAtAt) { 
		String.prototype.leftAtAt = function(a,b) {
			let p = this.indexOf(a);
			if (p==-1) return;
			p = this.indexOf(b,p+a.length);
			if (p==-1) return;
			return this.substring(0,p);
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
			var i,t,a=this.toString();
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
		String.prototype.substrAtAt = function(a,b,c){
			if (Lib.isUnd(b)) b=a;
			if (c) return a+this.substrAt(a).leftAt(b)+b;
			return this.substrAt(a).leftAt(b);
		}
	}
	if(!String.prototype.substrAt){  
		String.prototype.substrAt = function(a){  
			var i = this.indexOf(a);
			if (i==-1) return '';
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

//}

/* metodo privado incompativer com machintoch?
	class oRecursivo {
		#dom = [];
		#type = 'type';
		//final #id; 
		#id;
		#parent = false; //object
		#child = {}; //array object by id.
		//deve saber o proprio tipo pare ref interface
		type() {
			return this.#type;
		}
		// 
		childSet(o) {
			this.#child[o.type()][o.id()] = o;
		}
		// 
		child(id,type) {
			return this.#child[type][id];
		}
		// id in parent.
		id() {
			return this.#id;
		}
		//string get.
		idPath(ev) {
			return (this.#parent ? this.#parent.idPath()+'&' : '')
				+ this.#type+'='+this.#id
			;
		}
		domId() {
			var r=document.createElement('p');
			r.innerHTML = id;
			return r;
		}
		domTr() {
			var r=document.createElement('tr');
			r.innerHTML = id;
			return r;
		}
		cmdSrv() {
			//recursivo do global para o privado
		}
		constructor(Parent,Id) {
			id = Id;
			parent = Parent;
		}
	}
*/

	/* para tentar entender 
	 * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise 
	 * desde 2014
	
	class promessa {
		#ex = -1;
		#ret;
		#er = false;
		p;
		then(f) {
			this.#exec();
			if (this.#er===0) {
				//se não erro exec argumento com arq retorno
				f(this.#ret)
			}
			//retorna ele mesmo
			return this;
		}
		catch(f) {
			this.#exec();
			// exec o argumento caso ERRO
			if (this.#ex===1) {
				f(this.er);
			}
			return this;
		}
		#exec() {
			if (this.#ex!=-1) return;
			try {
				//inicia a exec promessa
				this.#ret = p();
				this.#ex = 0;
			} catch (e) {
				//erro, registra o erro
				this.#ex = 1;
				this.#er = e;
			}
		}
		constructor(p) {
			//ou o constructor lança 
			//	o proc em seg plano
			this.p = p;
		}
		// é mais interessante as estáticas q acompanham
		static All(arr) {
			//opa interable?
			let nf = 0;
			for (k in arr) {
				setTimeout(()=>{
					arr[k]();
				});	
			}
		}
	}
	*/
