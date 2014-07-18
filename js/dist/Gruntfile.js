module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('node_modules/grunt-contrib-requirejs/package.json'),
        requirejs : {
            compile: {
                options: {
                    name : "main",
                    baseUrl : "./app",
                    optimize: "uglify",
                    mainConfigFile: "./app/main.js",
                    out: "./compile/all.js"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default',['requirejs']);
}
