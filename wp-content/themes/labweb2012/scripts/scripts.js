//helper functions

function ucfirst (str) {
    // Makes a string's first character uppercase  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/ucfirst    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
	}
	
	function validateEmail(sEmail) {

  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  var sDomain_ref = sAtom;
  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string
  
  var reValidEmail = new RegExp(sValidEmail);
  
  if (reValidEmail.test(sEmail)) {
    return true;
  }
  
  return false;
}
	
//end of helper functions



//Slider script with using history plugin
	$(document).ready(function(){
		//setup fancybox
/*
			$(".fancybox").fancybox(
			{
				padding : 0,
				helpers:
				{
					title :
					{
						type : 'outside'
					},
					overlay : 
					{
						speedIn : 500,
						opacity : 0.6
					}
				}
			});
*/
	
		//End of setup fancy box
		
		
		
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 8)
		{
			$("body").addClass("ie");
			$("[data-slidename='what-i-do']").attr("id", "what-i-do-pane");
			$("[data-slidename='contact-us']").hide();


			return
		}
			
		
		
		var thisTab;
		var animationSpeed = 1000;
		var animating = false;
		var slides = $("div.slide");
		var buttons = $("h2.button");
		var fbopen = false;
		
		var wrapper = $("#wrapper");
		var buttonWrapper = $(document.createElement('div'));
		var slideWrapper = $(document.createElement('div'));		
		var slideStore = $(document.createElement('div'));
		buttonWrapper.attr("id", "buttonWrapper");
		slideStore.attr("id", "slideStore");
		slideWrapper.attr("id", "slideWrapper");
		wrapper.append(slideWrapper);
		wrapper.append(slideStore);	
		wrapper.append(buttonWrapper);
		
		buttons.each(function(index){
			
			$(this).data("tab", index);
			$(this).css("display", "inline-block");
			$(this).wrapInner("<a />");
			$(this).children("a").attr("href", "#"+$(this).attr("id"));
			buttonWrapper.append($(this));
		
		});
		
		theSlides = slides.clone();
		
		theSlides.each(function(index){			
			$(this).data("tab", index);
			$(this).attr("id", $(this).data("slidename")+"-pane");
				
		
		})
		slideStore.append(theSlides);
		slides.remove();
		
		var theSlide = -1;
		var ref = true;		
		
		$(window).hashchange( function(){
		
		ref = theSlide;
		
		this.setTitle = function (text)
		{
			document.title = ucfirst( text.replace( /^#/, '' ) || 'blank' ).replace(/-/g," ") + ' - Stephen Dowsland';
		}	
		
		function revertHash(){		
			if (ref != -1)
				window.history.back();
			else
			{
				window.location.hash = pTest[0];
			}
			
			fbopen = false;
			}
		
		function showModal(pTest)
		{
			if (pTest.length > 1)
			{
				
				$.fancybox($("#"+pTest[1]), {'afterClose': revertHash, padding : 0});
				fbopen = true;
				
			}
		}
		
		if (animating)	
			animationSpeed = 1;
		else
			animationSpeed = 1000;

		var pTest = window.location.hash.split("/", 2);    						
		
		if(! window.location.hash) {
			var hash = "#about-me";
		}
		else if (pTest.length > 1)
		{
			var hash = "#portfolio";
		}
		else
		{
			var hash = window.location.hash;
		}
		
			
	 		
	 		var thisTab = $(hash).data("tab");
	 		
	 		
	 		if (theSlide == -1)
	 		{
	 			slideWrapper.append(theSlides[thisTab]);
	 			theSlide = thisTab;
	 			$('h2').removeClass("current");
				$('h2'+hash).addClass("current");
				this.setTitle(hash);				
			}
	 		
	 		if (theSlide == thisTab && pTest.length > 1)
	 		{
						
	 			showModal(pTest);
	 			return false;
	 		}
	 		else if (theSlide == thisTab)
	 		{
	 			if (fbopen == true)
	 			{
	 				$.fancybox.close();
	 			}
	 			return;
	 		}
	 		else {}
			
			
			if (theSlide < thisTab)
			{
				slideWrapper.append(theSlides[thisTab]);
				animating = true;	
				slideWrapper.animate({
    					left: '-=900px'
  						}, animationSpeed, function() {
    						slideStore.append(theSlides[theSlide]);
    						slideWrapper.css("left", "0px");
    						theSlide = thisTab;
    						animating = false;
    						showModal(pTest);
  													});
			
					
			}		
			else
			{
				slideWrapper.prepend(theSlides[thisTab]).css("left", "-900px");
				animating = true;	
				slideWrapper.animate({
    					left: '+=900px'
  						}, animationSpeed, function() {
    						slideStore.append(theSlides[theSlide]);
    						slideWrapper.css("left", "0px");
    						theSlide = thisTab;
    						animating = false;
    						showModal(pTest);
  													});
			}
			
			
	 		
			// Set the page title based on the hash.
			this.setTitle(hash);
			$('h2').removeClass("current");
			$('h2'+hash).addClass("current");
	 
			
		})
		
	$(window).hashchange();
		
	
	$("#what-i-do-pane div.trigModal").fancybox();
	//$(".screenshot").fancybox();
	
		/*
	$("#what-i-do-pane div.trigModal").click(function(e){
		
		e.preventDefault();

		$.fancybox("#doModal"+ucfirst($(this).attr("id")));
		
		return false;
		
	});*/
		
	
	});//doc ready

//End of slider script with using history plugin

//Form Validation and submission

	function validateForm()
	{
		var name = $('input[name="yourname"]').val();
		var email = $('input[name="youremail"]').val();
		var phone = $('input[name="yourphone"]').val();
		var message = $('textarea[name="yourmessage"]').val();
		var valid = true;
		
		var valMsg = "";
		
		if (name==null || name=="")
  		{
 			valid = false;
 			valMsg += "<li>Enter your Name</li>";
  		}
		
		if ((email==null || email=="" || ! validateEmail(email)) && (phone==null || phone==""))
  		{
 			valid = false;
 			valMsg += "<li>Enter your Email Address or phone number</li>";
 			if (! validateEmail(email))
  			{
  				valMsg += "<li>Make sure your Email Address is valid.</li>";
  			}
 			
  		}
  		
  		
		
		if (message==null || message=="")
  		{
 			valid = false;
 			valMsg += "<li>Enter a Message</li>";
  		}
  		
  		if (! valid)
  		{
  			$.fancybox( '<div class="modalbox"><h1>Missing Info !</h1><p>Please complete the following:</p><ul>'+valMsg+'</ul><p><span onClick="$.fancybox.close()" class="modalButton">OK</span></p>', {'closeBtn': false});
  			return false;
		}
		else
		{
			//submit info	
			var data = 
			{
				action: "lw_handle_form",
				details: 
					{name:		name,
					email:	email,
					phone:	phone,
					message: message}
			};
			$("#sent-text").html("");
			$("#send-loader").css("visibility", "visible");
			$.post("/wp-admin/admin-ajax.php",data, function(rData){
				$("#send-loader").css("visibility", "hidden");
				if (rData.status)
				{
					$("#sent-text").html("Message sent, Thanks.");
				}				
				else
				{
					$.fancybox( '<div class="modalbox"><h1>Error</h1><p>Message not sent.</p><p>'+rData.reason+'</p><p><span onClick="$.fancybox.close()" class="modalButton">OK</span></p></div>', {'closeBtn': false});
				}
				}, "JSON");
			
			return false;
		}
  		
  		
	}

//End of Form Validation and submission
	
	
	
