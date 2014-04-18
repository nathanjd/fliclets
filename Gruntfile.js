module.exports = function(grunt) {
    // load 3rd party grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('.aws.json'),
        
        clean: ['compiled/'],

        copy: {
            main: {
                files: [
                    {
                        dest: 'compiled/',
                        cwd: 'src',
                        src: '*.html',
                        expand: true
                    },
                    {
                        dest: 'compiled/css/mocha.css',
                        src: 'src/css/mocha.css'
                    },
                    {
                        dest: 'compiled/js/',
                        cwd: 'src/js/',
                        src: '**',
                        expand: true
                    },
                    {
                        dest: 'compiled/media/',
                        cwd: 'src/media/',
                        src: '**',
                        expand: true
                    }
                ]
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'templates',
                    amd: true,
                    processName: function(filePath) {
                        var templateDir = grunt.config('pkg.templateDir'),
                            filename = filePath.split(templateDir + '/')[1],
                            templateName = filename.split('.hbs')[0];

                        return templateName;
                    }
                },
                files: [
                    {
                        dest: 'compiled/js/templates.js',
                        src: '<%= pkg.templateDir %>/*.hbs'
                    }
                ]
            }
        },

        sass: {
            dist: {
                files: {
                    'compiled/css/style.css': 'src/css/base.scss'
                }
            }
        },

        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: '<%= pkg.devBucket %>',
                deploy: {
                    upload: [
                        {
                            src: 'compiled/**',
                            rel: 'compiled',
                            access: 'public-read'
                        }
                    ]
                }
            }
        },

        watch: {
            copy: {
                files: ['src/*.html', 'src/**/*.js'],
                tasks: ['copy']
            },
            handlebars: {
                files: ['<%= pkg.templateDir %>/*.hbs'],
                tasks: ['handlebars']
            },
            sass: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    // set target bucket for javascript
    grunt.registerTask('bucket',
        'Generate bucket target file',
        function(bucket) {
            grunt.file.write('src/js/bucket.coffee',
                'define(function() { return "' + bucket + '"; });');
        }
    );
        
            

    // set bucket, compile and push, then set bucket back to dev
    grunt.registerTask('deploy',
        'Push to an s3 bucket',
        function(bucket) {
            devBucket = grunt.config('pkg.devBucket');
            grunt.config('s3.deploy.bucket', bucket);
            grunt.task.run([
                'bucket:' + bucket, 'compile', 's3', 'bucket:' + devBucket
            ]);
        }
    );

    // compile all files from src/ folder to compiled/
    grunt.registerTask('compile', ['clean', 'copy', 'handlebars', 'sass']);

    grunt.registerTask('default', ['compile', 'watch']);
};
