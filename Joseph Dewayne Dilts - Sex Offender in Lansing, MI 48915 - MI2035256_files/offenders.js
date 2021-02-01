$(document).ready(function () {

    $('#srch_state').selectBoxIt({dynamicPositioning: false, autoWidth: false});
    $('#srch_state_sm').selectBoxIt({dynamicPositioning: false, autoWidth: false});
    if ($('#mycarousel').is(':visible')) {
        $('#mycarousel').jcarousel({
            auto: 5,
            scroll: 5,
            wrap: 'last',
            initCallback: mycarousel_initCallback
        });
    }
    $("#offender-search-filter li").click(function () {
        if ($(this).html() == '<a href="javascript:;">Search By Name</a>')
        {
            $("#srch_address").hide();
            $("#srch_by_name_offenders").show();
            $("#filter_type").html('Search By Name <span class="caret"></span>');
            $("#location-search-form").attr("action", '/search.html');
        }
        else
        {
            $("#srch_address").show();
            $("#srch_by_name_offenders").hide();
            $("#filter_type").html('Search By Location <span class="caret"></span>');
            $("#location-search-form").attr("action", '/hfreport.html');
        }

    });

    $("#search-location").click(function () {
        $("#srch_address").show();
        $("#srch_by_name_offenders").hide();
        $("#location-search-form").attr("action", '/hfreport.html');
    });

    $("#search-name").click(function () {

        $("#srch_address").hide();
        $("#srch_by_name_offenders").show();
        $("#location-search-form").attr("action", '/search.html');
    });

    // SEARCH BY NAME OFFENDERS
    $("#srch_by_name_offenders").keyup(function () {
        //alert("here");
        var str = $("#srch_by_name_offenders").val();

        if ($('#srch_by_name_offenders').val() != "") {
            $('#loading_img').html("<img src='/images/loading.gif' />");
        }

        if (str.length == 0) {
            $("#livesearch_results").hide();
            return;
        }
        else {
            $("#livesearch_results").show();
        }

        $.ajax({
            url: "/ajaxcalls/offenders.html",
            type: "post",
            data: {"q": str, "state": $("#srch_name_state").val(), "sid": Math.random()},
            dataType: "html",
            success: function (data, status) {
                $("#livesearch_results").html(data);
                $("#loading_img").html("");
            }
        });
    });

    $('#srch_address').keydown(function () {
        setTimeout(function () {
            $('#fulladdress').val($('#srch_address').val());
        }, 50);
    });
    
    $("#promoSignupForm").validate({
        errorPlacement: function (error, element) {
            error.insertBefore(element);
          
        },
        onkeyup: false,
        onblur: false,
        rules: {
            email: {
                required: true,
                email:true,
                remote: {
                            url: "/homealerts/ajax/checkemail.html",
                            type: "post",
                            //data: { 'email': $('#promoEmail').val() },
                            dataFilter: function (response) {
                                if (parseInt(response) == 1) {
                                    return true;
                                }
                                else
                                {
                                    return false;
                                }
                            }
                        }
            }
            
        },
        messages: {
            email:
                    {
                        required: "Please enter email.",
                        email: "Please enter valid email.",
                        remote: "That email is already in use. Please Log In."
                    }
        }/*,
        submitHandler: function (form) {
            //emailSignupModal.open();
            //alert('submit form');
            return true;
        }*/
    });
})

function TriggerPromoEvent(promoType,ModuleName,ActionName){
    if(ModuleName=='offenders' && ActionName=='detail') {
        pageURL = 'offender-detail';
    } else {
        pageURL = ModuleName;
    }
    if (typeof ga !== 'undefined') {
        dataLayer.push({
            'event':'AlertsPromoUsed',
            'PromoType':promoType,
            'AlertPageURL':'/' + pageURL + '/',
            
        });
    }
} 

function mycarousel_initCallback(carousel)
{
    $(".jcarousel-prev-horizontal").addClass("glyphicon glyphicon-menu-left");
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function () {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function () {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function () {
        carousel.stopAuto();
    }, function () {
        carousel.startAuto();
    });
}
function submit_autosearch_form()
{
    if($('#srch_address').is(':visible')) {
        if($('#srch_address').val()=="")
        {
            alert("Please enter your search in the box");
            $('#srch_address').focus();
            return false;
        }
        else if(!/^[0-9A-Za-z ,.]+$/.test($('#srch_address').val()))
        {
            alert('Invalid address. Verify that your address and city are spelled correctly');
            $('#srch_address').focus();
            return false;
        }


    }
    else
    {
        if($("#srch_by_name_schools").val()=="")
        {
            alert("Please enter your search in the box");
            $("#srch_by_name_schools").focus();
            return false;
        }
        else if(!/^[0-9A-Za-z ,.]+$/.test($('#srch_by_name_schools').val()))
        {
            alert('Invalid address. Verify that your address and city are spelled correctly');
            $('#srch_by_name_schools').focus();
            return false;
        }
    }
    return true;
}