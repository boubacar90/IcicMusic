var fs = require('fs');
var ytdl = require('ytdl-core');
var youtubedl = require('youtube-dl');
var appRoot = require('app-root-path');

module.exports = {
  /* Download la vidéo sur le serveur et envoie le lien du fichier au client */
  stream(req, res, next) {
    //res.sendFile(appRoot + '/videos/' + 'zH0O_qDgI00' + '.mp4')
    const videoId = req.params.id;

    fs.stat(appRoot + '/videos/' + videoId + '.mp4', function(err, stat) {
      if(err == null) {
          console.log("File Here !")
          res.send(videoId + '.mp4')
      } else if(err.code == 'ENOENT') {
          // file does not exist
          console.log("File not here");
          var video = youtubedl('http://www.youtube.com/watch?v=' + videoId,
            // Optional arguments passed to youtube-dl.
            ['--format=18'],
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: appRoot }
          );

          // Will be called when the download starts.
          video.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            console.log('id:', info.id);
            console.log('title:', info.title);
            console.log('url:', info.url);
            console.log('thumbnail:', info.thumbnail);
            console.log('description:', info.description);
            console.log('filename:', info._filename);
            console.log('format id:', info.format_id);
          });

          video.on('end', function() {
            console.log('finished downloading!');
            res.send(videoId + '.mp4');
          });


          video.pipe(fs.createWriteStream(appRoot + '/videos/' + videoId + '.mp4'));

      } else {
          console.log('Some other error: ', err.code);
      }
    });
  },

  /* Télécharge une vidéo YT et l'envoie au client */
  download(req, res, next) {
    const videoId = req.params.id;

    fs.stat(appRoot + '/videos/' + videoId + + '.mp4', function(err, stat) {
      if(err == null) {
          res.sendFile(appRoot + '/videos/' + videoId + '.mp4')
      } else if(err.code == 'ENOENT') {
          // file does not exist
          console.log("File not here");
          var video = youtubedl('http://www.youtube.com/watch?v=' + videoId,
            // Optional arguments passed to youtube-dl.
            ['--format=18'],
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: appRoot }
          );

          // Will be called when the download starts.
          video.on('info', function(info) {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            console.log('id:', info.id);
            console.log('title:', info.title);
            console.log('url:', info.url);
            console.log('thumbnail:', info.thumbnail);
            console.log('description:', info.description);
            console.log('filename:', info._filename);
            console.log('format id:', info.format_id);
          });

          video.on('end', function() {
            console.log('finished downloading!');
            res.sendFile(appRoot + '/videos/' + videoId + '.mp4')
          });

          video.pipe(fs.createWriteStream(appRoot + '/videos/' + videoId + '.mp4'));
      } else {
          console.log('Some other error: ', err.code);
      }
    });
  }
}
