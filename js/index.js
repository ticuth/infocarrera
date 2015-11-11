/*jslint devel:true */
/*jslint browser:true */
/*global $*/

var app = {
    // Application Constructor
    escapeHTML: function (s) {
        'use strict';
        var MAP, repl;
        MAP = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&#34;',
            "'": '&#39;'
        };
        repl = function (c) { return MAP[c]; };
        return s.replace(/[&<>'"]/g, repl);
    },
    
    
    myScroll: {},
    zoomOut: function (obj) {
        'use strict';
        $(obj).animate({height: '-=50', width: '-=50'});
    },
    zoomIn: function (obj) {
        'use strict';
        $(obj).animate({height: '+=50', width: '+=50'});
        
    },
    exit: function () {
        'use strict';
        window.close();
    },
    initialize: function () {
        'use strict';
        /*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        app.myScroll =  new IScroll('#divInfo', {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true
        });*/

        $("#navbar li a").click(function (event) {
            // check if window is small enough so dropdown is created
            $("#nav-collapse").removeClass("in").addClass("collapse");
        });
        
        
        this.bindEvents();
        app.getPage('content/principal.html');
    },
    openExternal: function (url) {
        'use strict';
        window.open(url, '_system');
    },
    getExternalData: function () {
        'use strict';
        $('#scroller').html('Conectando con servidor...');
		$.ajax({
			dataType: 'json',
			url: 'http://darkuskyo.net/apps/index.php?firefoxos=yes',
			data: {}
		}).done(function (data) {
            console.log(data);
            var tot, shtml, archivo, esArchivo, sf, i, f;
			tot = data.news.length;
			shtml = [];
            sf = "";
            archivo = "";
            esArchivo = false;
			for (i = 0; i < tot; i += 1) {
				shtml.push('<div>' + data.news[i].fecha + ' ' + app.escapeHTML(data.news[i].text) + '<br>');
                shtml.push('<ul>');
                
				for (f = 0; f < data.news[i].files.length; f += 1) {
                    sf = data.news[i].files[f];
                    
                    archivo = sf.substring(sf.lastIndexOf('/') + 1, sf.length);
                    esArchivo = (sf.indexOf('.doc') > 0) || (sf.indexOf('.pdf') > 0);
                    //console.log(sf);
                    //console.log(archivo);
                    if (esArchivo) {
                        shtml.push('<li>Archivo: <a href="#" onclick="app.openExternal(\'' + sf + '\')">' + archivo + '</a></li>');
                    } else {
                        shtml.push('<li>Liga: <a href="#" onclick="app.openExternal(\'' + sf + '\')">' + sf + '</a></li>');
                    }
					
				}
                shtml.push('</ul>');
				//shtml+= data.news[i].
				shtml.push('</div>');
			}
            console.log(shtml);
			$('#scroller').html(shtml.join('\n'));
            
		}).error(function () {
            $('#scroller').html('Error al conectar');
		});
    },
    getPageInto: function (url, whereto) {
        'use strict';
		$.ajax({
			dataType: 'text',
			url: url
        }).success(function (data) {
            $(whereto).html(data);
        });
        
    },
    getPage: function (url) {
        'use strict';
		$.ajax({
			dataType: 'text',
			url: url
        }).success(function (data) {
            $('#scroller').html(data);
        });
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        'use strict';
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        'use strict';
        /*app.receivedEvent('deviceready');*/
        /*app.getPageInto('content/menu.html','#appmenu');*/
        app.getPageInto('content/principal.html', '#scroller');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        'use strict';
        var parentElement, listeningElement, receivedElement;
        parentElement = document.getElementById(id);
        listeningElement = parentElement.querySelector('.listening');
        receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
