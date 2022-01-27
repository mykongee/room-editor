import React from 'react';
import { FreeCamera, SubMesh, MultiMaterial, Texture, SceneLoader, TargetCamera, Vector3, HemisphericLight, StandardMaterial, MeshBuilder, Camera, CameraInputTypes, UniversalCamera, Color3, PointerDragBehavior, Mesh, SceneSerializer } from '@babylonjs/core';
import SceneComponent from '../components/SceneComponent.jsx';
import Picker from '../components/Picker.jsx';
import 'babylonjs';
import '@babylonjs/loaders/OBJ';

const SceneContainer = props => {
    let box;
    let logo;
    
    // attaches pointerdragbehavior to mesh
    function attachDragBehavior(mesh) {
        const pointerDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0)});
        pointerDragBehavior.onDragStartObservable.add((event) => {
            console.log('dragStart', event);
        })
        pointerDragBehavior.onDragObservable.add((event) => {
            // console.log('drag', event);
        })
        pointerDragBehavior.onDragEndObservable.add((event) => {
            console.log('dragEnd', event);
        })

        mesh.addBehavior(pointerDragBehavior);
    }

    let objectUrl;
    function download(fileName, scene) {
        if (objectUrl) {
            window.URL.revokeObjectURL(objectUrl);
        }

        const serializedScene = SceneSerializer.Serialize(scene);
        const strScene = JSON.stringify(serializedScene);

        if (fileName.toLowerCase().lastIndexOf('.babylon') !== fileName.length - 8 || fileName.length < 9) {
            fileName += '.babylon';
        }

        const blob = new Blob( [strScene], { type: 'octet/stream' });

        objectUrl = (window.webkitURL || window.URL).createObjectURL(blob);

        let link = window.document.createElement('a');
        link.href = objectUrl;
        link.download = fileName;
        let click = document.createEvent('MouseEvents');
        click.initEvent('click', true, false);
        link.dispatchEvent(click);
    }

    // import multiple models into scene
    function createModels(scene) {
        console.log('creating models');
        // console.log(SceneLoader.IsPluginForExtensionAvailable('.obj'));
        SceneLoader.ImportMesh('', 'models/', 'loungeChair.obj', scene, (meshes) => {
            meshes.forEach( (mesh) => {
                // mesh.position = new Vector3(1, 0, 2);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            attachDragBehavior(newMesh);
        })

        SceneLoader.ImportMesh('', 'models/', 'bathtub.obj', scene, (meshes) => {
            meshes.forEach( (mesh) => {
                // mesh.position = new Vector3(-2, 0, -2);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            attachDragBehavior(newMesh);
        })

        SceneLoader.ImportMesh('', 'models/', 'bear.obj', scene, (meshes) => {
            meshes.forEach( (mesh) => {
                // mesh.position = new Vector3(-2, 0, -2);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            attachDragBehavior(newMesh);
        })

        SceneLoader.ImportMesh('', 'models/', 'loungeDesignChair.obj', scene, (meshes) => {
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(-2, 2, 0);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            attachDragBehavior(newMesh);
        })

        SceneLoader.ImportMesh('', 'models/', 'tableGlass.obj', scene, (meshes) => {
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(-2, 0, -2);
                mesh.scaling = new Vector3(2, 2, 2);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            attachDragBehavior(newMesh);
        })

        SceneLoader.ImportMesh('', 'models/', 'codesmith-logo.obj', scene, (meshes) => {
            const woodMaterial = new StandardMaterial('woodMaterial', scene);
            // woodMaterial.diffuseTexture = new Texture('./wood_grain.jpg', scene);
            woodMaterial.diffuseColor = new Color3(0.08, 0.20, 0.5);
            // woodMaterial.specularColor = new Color3.Black();
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(5, 2, 3);
                mesh.scaling = new Vector3(0.2, 0.2, 0.2);
                mesh.rotation = new Vector3(0, 5, 0);
                mesh.material = woodMaterial;
            });
            newMesh = Mesh.MergeMeshes(meshes);
            // attachDragBehavior(logo);
        })

        // SceneLoader.ImportMesh('', 'models/', 'floorFull.obj', scene, (meshes) => {
        //     console.log('ImportMesh callback');
        //     meshes.forEach( (mesh) => {
        //         mesh.position = new Vector3(-2, 0, -2);
        //         console.log(mesh.position);
        //         mesh.scaling = new Vector3(2, 2, 2);
        //     })
        //     console.log(meshes);
        // })
    }

    function onSceneReady(scene) {
        // const camera = new FreeCamera('camera1', new Vector3(0, 5, 10), scene);
        // camera.setTarget(Vector3.Zero());
        console.log('Scene Ready');
        // const camera = new TargetCamera('camera1', new Vector3(5, 5, -5), scene);
        const camera = new UniversalCamera('camera1', new Vector3(10, 10, -10), scene);
        // camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        camera.mode = Camera.PERSPECTIVE_CAMERA;
        // camera.orthoTop = 5;
        // camera.orthoBottom = -5;
        // camera.orthoLeft = -5;
        // camera.orthoRight = 5;

        const canvas = scene.getEngine().getRenderingCanvas();
        // camera.attachControl(canvas, true);
        camera.setTarget(Vector3.Zero());

        const light = new HemisphericLight('light', new Vector3(0, 5, 2), scene);
        light.intensity = 0.8;

        // const woodMaterial = new StandardMaterial('woodMaterial', scene);
        // woodMaterial.diffuseTexture = new Texture('./wood_grain.jpg', scene);
        // woodMaterial.specularColor = new Color3.Black();
        box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
        box.position.y = 3;
        // box.scaling = new Vector3(0.6, 0.3, 0.8);

        const sphere = MeshBuilder.CreateSphere('sphere', { size: 2 }, scene);

        attachDragBehavior(box);
        attachDragBehavior(sphere);

        const groundSize = 15;
        // const ground = MeshBuilder.CreateGround('ground', { width: groundSize, height: groundSize }, scene);
        // ground.material = woodMaterial;
        
        
        // create tiled ground, create materials
        // create multimaterial and push each material into submaterials array
        // set multimaterial as material for tiledground
        // set submeshes property of tiledground to an empty array
        // create and set values for these variables
        const tile = {
            w: 8,
            h: 8,
        }
        const ground = MeshBuilder.CreateTiledGround('ground', {xmin: -5, zmin: -5, xmax: 5, zmax: 5, subdivisions: tile}, scene);
        
        const verticesCount = ground.getTotalVertices();
        const tileIndicesLength = ground.getIndices().length / (tile.w * tile.h);
        let base = 0; 
        for (let row = 0; row < tile.h; row++) {
            for (let col = 0; col < tile.w; col++) {
                new SubMesh(row % 2 ^ col % 2, 0, verticesCount, base, tileIndicesLength, ground);
                base += tileIndicesLength;
            }
        }
        const tileMaterial1 = new StandardMaterial('white', scene);
        tileMaterial1.diffuseColor = new Color3(0.5, 0.1, 0.3)
        const tileMaterial2 = new StandardMaterial('black', scene);
        const multiMaterial = new MultiMaterial('multi', scene);
        multiMaterial.subMaterials.push(tileMaterial1);
        multiMaterial.subMaterials.push(tileMaterial2);
        ground.material = multiMaterial;
        ground.isPickable = false;

        createModels(scene);
        // scene.debugLayer.show();

        window.addEventListener('pointerdown', function() {
            const pickResult = scene.pick(scene.pointerX, scene.pointerY);

            if (pickResult) {
                window.addEventListener('keydown', function(key) {
                    if (key.code === 'KeyR') {
                        console.log(key);
                        console.log(pickResult.pickedMesh.rotation);
                        pickResult.pickedMesh.rotation.y += 0.5;
                    }
                });
            }

            // scene.getEngine().stopRenderLoop();
        })

        // serialize scene
        window.addEventListener('keydown', function(key) {
            if (key.code === 'KeyD') {                
                if (confirm('download?')) {
                    download('scene', scene);
                } else {
                    console.log('no download');
                }
            }
        })
    }

    function onRender(scene) {
        // if (logo) {
        //     let deltaTime = scene.getEngine().getDeltaTime();

        //     const rpm = 2;
        //     logo.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTime / 100);
        // }
    }

    return (
        <div>
            <SceneComponent antialias={true} onSceneReady={onSceneReady} onRender={onRender} id="react-canvas" />
        </div>
    )
}

export default SceneContainer;