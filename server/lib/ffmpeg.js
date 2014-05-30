var spawn = require('child_process').spawn,
    when = require('when');

module.exports.thumbnail = function(sourcePath, thumbPath) {
    var deferred = when.defer(),
        ffmpeg,
        args = [
            '-i', sourcePath,
            //'-vf', '"thumbnail"',
            '-frames:v', '1',
            thumbPath
        ];

    console.log('ffmpeg', args.join(' '));

    ffmpeg = spawn('ffmpeg', args);

    ffmpeg.stdout.on('data', function(data) {
        console.log('ffmpeg stdout:', data);
    });

    ffmpeg.stderr.setEncoding('utf8');
    ffmpeg.stderr.on('data', function(data) {
        console.log('ffmpeg stderr:', data);
    });

    ffmpeg.on('close', function(code) {
        if (code !== 0) {
            deferred.reject(new Error('ffmpeg failed with exit code: ' + code));
        } else {
            // thumbnail created successfully
            deferred.resolve(thumbPath);
        }
    });

    return deferred.promise;
};