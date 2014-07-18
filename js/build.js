({
    baseUrl : './app',
   // dir : './dist',
    name : './main',
    out : './min.js',
    paths:{
         "googleMap" : "empty:"   
    }, 
    include : [
        "router" ,
        "pages/blog/homepage",
        "pages/blog/xpress",
        "pages/blog/photography",
        "pages/blog/video",
        "pages/blog/expedition",
        "pages/blog/me",
        "pages/blog/contact"     
    ],
    mainConfigFile : './app/main.js',
    wrap: {
        start: "(function() {",
        end: "}());"
    },
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true
})