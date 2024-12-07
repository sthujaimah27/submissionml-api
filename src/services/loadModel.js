const tf = require("@tensorflow/tfjs-node");
require("dotenv").config();

// untuk membuat model tenserflow dari URL yang disediakan
async function loadModel() {
  return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;
