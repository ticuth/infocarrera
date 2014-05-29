/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    myScroll: {},
    initialize: function() {
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        app.myScroll =  new IScroll('#divInfo', {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });
        this.bindEvents();
    },
    openExternal: function (url) {
        navigator.app.loadUrl(url, {openExternal : true});  
    },
    getExternalData: function(){
        $('#scroller').html('Conectando con servidor...');
		$.ajax({
			dataType: 'json',
			url: 'http://www.tic-uth.net/gflores/ticinfo/',
			data: {},
		}).done(function(data){
            console.log(data);
			var tot = data.news.length;
			var shtml = [], sf="";
            var archivo = "";
            var esArchivo = false;
			for(var i = 0;i < tot; i ++) {
				shtml.push('<div>'+data.news[i].fecha + ' ' + data.news[i].text+'<br>');
                shtml.push('<ul>');
                
				for(var f = 0 ;f < data.news[i].files.length; f++){
                    sf = data.news[i].files[f];
                    
                    archivo = sf.substring(sf.lastIndexOf('/')+1,sf.length);
                    esArchivo = (sf.indexOf('.doc')>0)||(sf.indexOf('.pdf')>0)
                    if (esArchivo){
                        shtml.push('<li>Archivo: <a href="#" onclick="app.openExternal(\''+sf+'\')">'+archivo+'</a></li>');
                    }else{
                        shtml.push('<li>Liga: <a href="#" onclick="app.openExternal(\''+sf+'\')">">'+sf+'</a></li>');
                    }
					
				}
                shtml.push('</ul>');
				//shtml+= data.news[i].
				shtml.push('</div>');
			}
            console.log(shtml);
			$('#scroller').html(shtml.join('\n'));
            
		}).error(function(){
            $('#scroller').html('Error al conectar');
		});
    },
    getPageInto: function(url,whereto){
		$.ajax({
			dataType: 'text',
			url: url,
        }).success(function(data){
            $(whereto).html(data);
        });
        
    },
    getPage: function(url){
		$.ajax({
			dataType: 'text',
			url: url,
        }).success(function(data){
            $('#scroller').html(data);
        });
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        /*app.receivedEvent('deviceready');*/
        app.getPageInto('content/menu.html','#appmenu');
        app.getPageInto('content/principal.html','#scroller');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
