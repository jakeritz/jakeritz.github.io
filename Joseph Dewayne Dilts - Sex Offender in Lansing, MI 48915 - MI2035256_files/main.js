$(document).ready(function() {
		
	if($('.venobox_custom').is(':visible')){
        $('.venobox_custom').venobox({
               frameheight: '410px',       // default: ''
               numeratio: true,            // default: false
               infinigall: true            // default: false
        });
    };
    
	var windowsize = $(window).width();
        if (windowsize < 999) {
			
			$('.mobileMenu').click(function(e){
				e.stopPropagation();
				$('nav.mainMenu > ul').slideToggle();
				$(this).toggleClass('closeMenu');
				($(".mobileMenu").text() === "Menu") ? $(".mobileMenu").text("Close Menu") : $(".mobileMenu").text("Menu");
			});
			$('nav.mainMenu > ul').click(function(e){
				e.stopPropagation();
			});
			
			$(document).click(function(){
                if($('nav.mainMenu > ul').css("display")=='block'){
                    $('nav.mainMenu > ul').slideUp();
                    ($(".mobileMenu").text() === "Close Menu") ? $(".mobileMenu").text("Menu") : $(".mobileMenu").text("Close Menu");
                    $('.mobileMenu').removeClass('closeMenu');
                }
			});
			
			$('nav.mainMenu ul li a.moreLink').click(function(){
			   $("nav.mainMenu ul li ul").fadeToggle('fast');
			});
            
            $('nav.mainMenu ul li a.usermoreLink').click(function(){
                
			   // $("#navUser ul li").fadeToggle('fast');
                $("#navUser ul").fadeToggle('fast');
			});

        }
		else{
			
			
		}
	$(".mobileserach a").click(function(){
            $("header .head-search").toggle();
        });
        
     $("#logout").click(function (e) {


        jQuery.ajax({
            type: "POST",
            url: "/homealerts/ajax/logout.html",
            success: function (data) {
               // location.reload();
               $(location).attr('href', '/login.html');
            }
        });

        e.stopImmediatePropagation();
    });

    $(".logout").click(function (e) {


        jQuery.ajax({
            type: "POST",
            url: "/homealerts/ajax/logout.html",
            success: function (data) {
               // location.reload();
              $(location).attr('href', '/login.html');
            }
        });

        e.stopImmediatePropagation();
    });
});	


/* ==================================================
	Scroll to Top
================================================== */

$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#back-to-top').fadeIn();    
        } else {
            $('#back-to-top').fadeOut();
        }
    });
 
    $('#back-to-top').click(function() {
        $('body,html').animate({scrollTop:0},1500);
    });
    
    $('#hf_video_watch').click(function() {
        /*
        var target_offset = $("#hf_video").offset();
        var target_top = target_offset.top;
        $('body,html').animate({scrollTop:target_top},1500);
        */
       scrollToID("hf_video");
    }); 
});

function scrollToID(theID) {
		$('html,body').animate({scrollTop: $("#"+theID).offset().top},1500);
}
var xmlHttp;

function showResult(str,category)
{
    if(document.getElementById("txt1").value != ""){
        document.getElementById("loading").innerHTML = "<img src='/images/loading.gif' />";
    }

    if (str.length==0)
    {
        document.getElementById("livesearch").style.display = 'none';
        return;
    }
    else {
        document.getElementById("livesearch").style.display = 'block';
    }

    xmlHttp=GetXmlHttpObject()
    if (xmlHttp==null)
    {
        alert ("Browser does not support HTTP Request");
        return;
    }
    var url="/livesearch.html";
    url=url+"?q="+encodeURIComponent(str);
    url=url+"&sid="+Math.random();
    url=url+"&category="+category;
    if(category == 'schools' && document.getElementById('school_menu_state')!=null){
        url=url+"&state="+document.getElementById('school_menu_state').value;
    }
    xmlHttp.onreadystatechange=stateChanged ;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
}

function stateChanged()
{
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
    {
        document.getElementById("livesearch").
        innerHTML=xmlHttp.responseText;
        //document.getElementById("livesearch").
        //style.border="1px solid #A5ACB2";
        document.getElementById("loading").innerHTML = "";
    }
}

function GetXmlHttpObject()
{
var xmlHttp=null;
try
 {
 // Firefox, Opera 8.0+, Safari
 xmlHttp=new XMLHttpRequest();
 }
catch (e)
 {
 // Internet Explorer
 try
  {
  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  }
 catch (e)
  {
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 }
return xmlHttp;
}


function check_text_size() {
    var arr = [ "Enter offender name", "Enter school name", "Enter hospital name", "Enter airport name or airport abbreviation","Enter college or university name","Enter police station name","Enter nursing home name","Enter library name","Enter fire station name","Enter cemetery name" ];
    var name = document.getElementById("txt1").value;
    if(arr.indexOf(document.getElementById("txt1").value)!=-1){
        alert('Please enter your search in the box, then click the Search button');
        document.getElementById("txt1").focus();
        return false;
    } else if(name.length<3){
            alert("Search criteria should be greater than 3 characters");
            document.getElementById("txt1").focus();
            return false;
    } else {
        return true;
    }
}

function check_default_value_header() {
    if (document.getElementById("search_term").value == "" || document.getElementById("search_term").value == "Enter an address, city & state or zip code") {
        alert("Please enter an Address, City, State or Zip, then click the Search button");
        document.getElementById("search_term").focus();
        return false;
    }
    else if(!/^[0-9A-Za-z #,.]+$/.test(document.getElementById("search_term").value))
    {
        alert('Invalid address. Verify that your address, city & state or zip code are spelled correctly');
        document.getElementById("search_term").focus();
        return false;
    }
    else {
        
        return true;
    }
}
