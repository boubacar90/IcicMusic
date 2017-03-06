/* Contrôleurs */
const VideoController = require('../controllers/video_controller');

module.exports = (app) => {
  app.get('/stream/:id', VideoController.stream);
  app.get('/download/:id', VideoController.download);
};
