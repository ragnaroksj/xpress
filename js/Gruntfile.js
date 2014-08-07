module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        /*requirejs: compile and optimize JS and CSS*/
        requirejs : {
            compileJs: {
                options: {
                    baseUrl : "./app",
                    name : "main",
                    out: "min.js",
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
                    mainConfigFile: "./app/main.js",
                    wrap : {
                        start : "(function(){",
                        end : "}());"
                    },
                    fileExclusionRegExp : /^(r|bulid)\.js$/
                }
            },
            compileCss : {
                options : {
                    baseUrl : "../css/",
                    cssIn : "../css/main.css",
                    out : "../css/min.css",
                    optimizeCss : "standard"
                }
            }
        },
    
        /*less*/
        less : {
          compile : {
            options : {
              strictMath: true,
              sourceMap: true,
              outputSourceFiles: true,
              sourceMapURL: 'app.css.map',
              sourceMapFilename: '../css/app.css.map'
            },
            files : {
              "../css/_app.css" : "../css/_app.less"
            }
          }
        },

        /*sass*/
        sass : {
            compile : {
                options : {
                    //sourcemap : true
                },
                files : {
                    "../css/app.css" : "../css/app.scss"                
                }
            }
        },

        qunit : {
            all : "app/qgtest/*.html"
        },

        /*css lint*/
        csslint : {
            src : '../css/_app.css'
        },
        
        watch : {
            less : {
                files : ['../css/**/*.less'], // which files to watch
                tasks : ['less']
            },
            sass : {
                files : ['../css/**/*.scss'],
                tasks : ['sass'] 
            },
            qunit : {
                files : ['./app/qgtest/*.js', './app/qgtest/*.html'], // which files to watch
                tasks : ['qunit']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    
    //devL
    grunt.registerTask('lessmap', ['less']);
    grunt.registerTask('devL',['lessmap','watch:less']);
    //devS
    grunt.registerTask('sassmap', ['sass']);
    grunt.registerTask('devS',['sassmap','watch:sass']);

    //qa
    grunt.registerTask("qa",['watch:qunit']);
    
    //productionL 
    grunt.registerTask('prodL', ['less', 'requirejs']);
    //productionS
    grunt.registerTask('prodS', ['sass', 'requirejs']);


    grunt.registerTask('default',['proS']);
}
