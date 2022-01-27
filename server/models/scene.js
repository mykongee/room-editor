const mongoose = require('mongoose');

const MONGO_URI; 

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'rooms'
    })
    .then(() => console.log('connected to mongo db'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const sceneSchema = new Schema( {
    autoClear: {
      "type": "Boolean"
    },
    clearColor: {
      "type": [
        "Number"
      ]
    },
    ambientColor: {
      "type": [
        "Number"
      ]
    },
    gravity: {
      "type": [
        "Number"
      ]
    },
    collisionsEnabled: {
      "type": "Boolean"
    },
    morphTargetManagers: {
      "type": "Array"
    },
    lights: {
      "type": [
        "Mixed"
      ]
    },
    cameras: {
      "type": [
        "Mixed"
      ]
    },
    activeCameraID: {
      "type": "String"
    },
    animations: {
      "type": "Array"
    },
    materials: {
      "type": [
        "Mixed"
      ]
    },
    multiMaterials: {
      "type": [
        "Mixed"
      ]
    },
    environmentIntensity: {
      "type": "Number"
    },
    skeletons: {
      "type": "Array"
    },
    transformNodes: {
      "type": "Array"
    },
    geometries: {
      boxes: {
        "type": "Array"
      },
      spheres: {
        "type": "Array"
      },
      cylinders: {
        "type": "Array"
      },
      toruses: {
        "type": "Array"
      },
      grounds: {
        "type": "Array"
      },
      planes: {
        "type": "Array"
      },
      torusKnots: {
        "type": "Array"
      },
      vertexData: {
        "type": [
          "Mixed"
        ]
      }
    },
    meshes: {
      type: [
        "Mixed"
      ]
    },
    particleSystems: {
      type: "Array"
    },
    postProcesses: {
      "type": "Array"
    }
})