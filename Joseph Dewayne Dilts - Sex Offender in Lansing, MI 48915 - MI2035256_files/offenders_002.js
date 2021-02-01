function r(e) {
    /in/.test(document.readyState) ? setTimeout("r(" + e + ")", 9) : e()
}

window.log = function() {
    window.log.history = window.log.history || [];
    window.log.history.push(arguments);
    this.console && console.log(Array.prototype.slice.call(arguments))
};

var browser_width = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var hf_device_type;
var hf_ad_layout ="offenders";
if (browser_width >= 1366) {
    hf_device_type = "desktop";
} else if (browser_width <= 1365 && browser_width >= 768) {
    hf_device_type = "tablet";
} else {
    hf_device_type = "mobile";
}

var e = [];

if (browser_width >= 1366) {
  ///6584879/Homefacts_ROS_728x90_ATF
  e.push("div-gpt-ad-1469036706883-5");
  ///6584879/Homefacts_ROS_160x600_ATF_Left
  e.push("div-gpt-ad-1469036706883-0");
  ///6584879/Homefacts_ROS_160x600_ATF_Right
  e.push("div-gpt-ad-1469036706883-1");
  ///6584879/Homefacts_ROS_300x250_BTF
  e.push("div-gpt-ad-1469036706883-3");
  ///6584879/Homefacts_ROS_300x250_BTF_2
  e.push("div-gpt-ad-1469036706883-4");
  ///6584879/Homefacts_ROS_728x90_BTF
  e.push("div-gpt-ad-1469036706883-6");
} else if (browser_width <= 1365 && browser_width >= 768) {
  ///6584879/Homefacts_ROS_728x90_ATF
  e.push("div-gpt-ad-1469036706883-5");
  ///6584879/Homefacts_ROS_300x250_BTF
  e.push("div-gpt-ad-1469036706883-3");
  ///6584879/Homefacts_ROS_300x250_BTF_2
  e.push("div-gpt-ad-1469036706883-4");
  ///6584879/Homefacts_ROS_728x90_BTF
  e.push("div-gpt-ad-1469036706883-6");
} else {
  ///6584879/Homefacts_ROS_Mobile_320x50_ATF
  e.push("div-gpt-ad-1469036706883-15");
  ///6584879/Homefacts_ROS_Mobile_300x250_BTF
  e.push("div-gpt-ad-1469036706883-9");
  ///6584879/Homefacts_ROS_Mobile_300x250_BTF_2
  e.push("div-gpt-ad-1469036706883-10");
}
///6584879/Homefacts_ROS_1x1
e.push("div-gpt-ad-1583272836787-0");

cmWrapper.que.push(function () {
    cmWrapper.ads.init(e,[{key: "HF_CategoryPage",val: ad_placement_page}]);
});