import React from 'react';
import { FreeCamera, Texture, SceneLoader, TargetCamera, Vector3, HemisphericLight, StandardMaterial, MeshBuilder, Camera, CameraInputTypes, UniversalCamera, Color3 } from '@babylonjs/core';
import SceneComponent from '../components/SceneComponent.jsx';
import 'babylonjs';
import '@babylonjs/loaders/OBJ';

const SceneContainer = props => {
    let box;


    function createChair(scene) {
        console.log('in create chair');
        // console.log(SceneLoader.IsPluginForExtensionAvailable('.obj'));
        SceneLoader.ImportMesh('', 'models/', 'loungeChair.obj', scene, (meshes) => {
            console.log('ImportMesh callback');
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(1, 0.2, 2);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            console.log(meshes);
        })

        SceneLoader.ImportMesh('', 'models/', 'bathtub.obj', scene, (meshes) => {
            console.log('ImportMesh callback');
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(-2, 0, -2);
                console.log(mesh.position);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            console.log(meshes);
        })
    }

    function onSceneReady(scene) {
        // const camera = new FreeCamera('camera1', new Vector3(0, 5, 10), scene);
        // camera.setTarget(Vector3.Zero());
        console.log('Scene Ready');
        // const camera = new TargetCamera('camera1', new Vector3(5, 5, -5), scene);
        const camera = new UniversalCamera('camera1', new Vector3(5, 5, -5), scene);
        // camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        camera.mode = Camera.PERSPECTIVE_CAMERA;
        camera.orthoTop = 5;
        camera.orthoBottom = -5;
        camera.orthoLeft = -5;
        camera.orthoRight = 5;

        const canvas = scene.getEngine().getRenderingCanvas();
        camera.attachControl(canvas, true);
        camera.setTarget(Vector3.Zero());

        const light = new HemisphericLight('light', new Vector3(0, 5, 2), scene);
        light.intensity = 0.8;

        const woodMaterial = new StandardMaterial('woodMaterial', scene);
        woodMaterial.diffuseTexture = new Texture('./wood_grain.jpg', scene);
        woodMaterial.specularColor = new Color3.Black();
        // box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
        // box.position.y = 3;
        // box.scaling = new Vector3(0.6, 0.3, 0.8);

        const groundSize = 10;
        const ground = MeshBuilder.CreateGround('ground', { width: groundSize, height: groundSize }, scene);
        ground.material = woodMaterial;

        const chair = createChair(scene);
    }

    function onRender(scene) {

        // if (box !== undefined) {
        //     let deltaTimeInMillis = scene.getEngine().getDeltaTime();

        //     const rpm = 5;
        //     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        // }
    }

    return (
        <div>
            <SceneComponent antialias={true} onSceneReady={onSceneReady} onRender={onRender} id="react-canvas" />
        </div>
    )
}

export default SceneContainer;