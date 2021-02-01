var initCenter = null;
var MapNavigation =
    {
        InitMapNavigation: function ()
        {
            var speed = 200;
            var main = $("#mapMenuControl");
            var box = main.find(".slide");
            var options = main.find(".optionsDiv");
            var selectArea = main.find(".selectArea");
            if (typeof map != 'undefined' && map != null && map != '' ){
                initCenter = map.getCenter();
            }    
            if ( typeof gmap != 'undefined' && gmap != null && gmap != '' ){
                initCenter = gmap.getCenter();
            }    
            
            
            
            
            main.find("a.selectButton").click(function ()
            {
                options.toggleClass("optionsDivInvisible");

            });

            main.mouseenter(function ()
            {
                selectArea.addClass("selectAreaActive");
            });

            main.mouseleave(function ()
            {
                selectArea.removeClass("selectAreaActive");
            });

            $("body").click(function ()
            {
                if (!selectArea.hasClass("selectAreaActive") && !options.hasClass("optionsDivInvisible"))
                {
                    options.addClass("optionsDivInvisible");
                }
            });

            options.find("a").each(function (i, a)
            {
                $(a).click(function ()
                {
                    main.find(".selectedText").html($(this).html());

                    options.addClass("optionsDivInvisible");
                    options.find("li").show();
                    $(this).parent("li").hide();

                    selectArea.removeClass().addClass("selectArea selectAreaActive " + $(this).attr("class"));
                    var width = selectArea.width();
                    options.css({ width: width });
                    options.find("li:last-child").prev().addClass('last-child');

                    if ($(this).hasClass("bird"))
                    {
                        box.slideDown(speed).addClass('active');
                    } else
                    {
                        box.slideUp(speed).removeClass('active');
                    }
                });
            });
        },

        Navigate: function (direction)
        {
            if (map != null)
            {
                direction = this.FixDirection(direction);

                var center = map.getCenter();
                var bounds = map.getBounds();

                if (bounds != null && center != null)
                {
                    switch (direction)
                    {
                        case "n":
                            center.latitude = bounds.getNorth();
                            break;

                        case "w":
                            center.longitude = bounds.getWest();
                            break;

                        case "e":
                            center.longitude = bounds.getEast();
                            break;

                        case "s":
                            center.latitude = bounds.getSouth();
                            break;
                    }

                    map.setView({ center: center });
                }
            }
        },

        Recenter: function ()
        {
            if (initCenter != null && map != null)
            {
                map.setView({ center: initCenter, zoom: initial_zoom_level });
            }
        },

        //scale = 1/-1
        UpdateZoom: function (scale)
        {
            if (map != null)
            {
                if(document.getElementById('ZoomOutButton')){
                if(scale=="-1"){
                    document.getElementById('ZoomOutButton').click();
                }else{
                    document.getElementById('ZoomInButton').click();
                }
            }else{
                map.setView({ zoom: map.getZoom() + scale });
            }
               
            }
        },

        //navigation = prev/next
        SetHeading: function (navigation)
        {
            if (map != null)
            {
                map.setView({ heading: map.getHeading() + navigation });
            }
        },

        //type = road/ aerial/ birdseye
        SetMapType: function (type)
        {

            

            if (map != null)
            {
                
                map.setMapType(type);
                if (type == Microsoft.Maps.MapTypeId.birdseye)
                {
                   
                    $("#birdsRotateLeft,#birdsRotateRight").show();
                    $("#mapMenuControl").css("width", "455px");
                    $("#mapMenuControlBG").css("width", "455px");
                }
                else
                {
                    $("#birdsRotateLeft,#birdsRotateRight").hide();
                    $("#mapMenuControl").css("width", "390px");
                    $("#mapMenuControlBG").css("width", "390px");
                }
            }
        },

        FixDirection: function (direction)
        {
            var currentView = map.getHeading();

            if (0 < currentView && currentView <= 90)
            {
                switch (direction)
                {
                    case "w":
                        direction = "n";
                        break;

                    case "e":
                        direction = "s";
                        break;

                    case "n":
                        direction = "e";
                        break;

                    case "s":
                        direction = "w";
                        break;
                }
            }
            else if (90 < currentView && currentView <= 180)
            {
                switch (direction)
                {
                    case "w":
                        direction = "e";
                        break;

                    case "e":
                        direction = "w";
                        break;

                    case "n":
                        direction = "s";
                        break;

                    case "s":
                        direction = "n";
                        break;
                }
            }
            else if (180 < currentView && currentView <= 270)
            {
                switch (direction)
                {
                    case "w":
                        direction = "s";
                        break;

                    case "e":
                        direction = "n";
                        break;

                    case "n":
                        direction = "w";
                        break;

                    case "s":
                        direction = "e";
                        break;
                }
            }

            return direction;
        }
    };