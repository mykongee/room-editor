import React, {useState} from 'react';
import { FreeCamera, SceneLoader, TargetCamera, Vector3, HemisphericLight, StandardMaterial, MeshBuilder, Camera, DirectionalLight, UniversalCamera, Color3, PointerDragBehavior, Tools, Texture, Mesh, PointLight, SceneSerializer } from '@babylonjs/core';
import SceneComponent from '../components/SceneComponent.jsx';
import Picker from '../components/Picker.jsx';
import 'babylonjs';
import '@babylonjs/loaders/OBJ';

const SceneContainer = props => {
    let box;
    let logo;
    const standardScale = new Vector3(4, 4, 4);
    const [camera, setCamera] = useState(null);

    // attaches pointerdragbehavior to mesh
    function attachDragBehavior(mesh) {
        // const pointerDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0)});
        const pointerDragBehavior = new PointerDragBehavior({ dragPlaneNormal: new Vector3(0, 1, 0)});
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

        // FLOOR AND WALLS
        SceneLoader.ImportMesh('', 'models/', 'floorFull.obj', scene, (meshes) => {
            meshes.forEach( (mesh) => {
                mesh.scaling = new Vector3(15, 6, 15);
                mesh.position = new Vector3(5, -1, -10);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            newMesh.isPickable = false;
        })

        SceneLoader.ImportMesh('', 'models/', 'wall.obj', scene, (meshes) => {
            const mat = new StandardMaterial('mat', scene);
            mat.diffuseColor = new Color3(0.25, 0.5, 0.7);
            // mat.specularColor = new Color3(1, 0.5, 0.2);
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(5, -1, 5);
                mesh.scaling = new Vector3(15, 5, 5);
                mesh.material = mat;
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            newMesh.isPickable = false;
        })

        SceneLoader.ImportMesh('', 'models/', 'wall.obj', scene, (meshes) => {
            const mat = new StandardMaterial('mat', scene);
            mat.diffuseColor = new Color3(0.3, 0.2, 0.8);
            // mat.specularColor = new Color3(1, 0.5, 0.2);
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(-10, -1, 5);
                // mesh.rotation = new Vector3(0, 5, 5);
                mesh.rotation.y = 4.7;
                mesh.scaling = new Vector3(15, 5, 5);
                mesh.material = mat;
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            newMesh.isPickable = false;
        })

        // END FLOOR AND WALLS 

        // SceneLoader.ImportMesh('', 'models/', 'loungeChair.obj', scene, (meshes) => {
        //     meshes.forEach( (mesh) => {
        //         // mesh.position = new Vector3(1, 0, 2);
        //         mesh.scaling = standardScale;
        //         // shadowGenerator.addShadowCaster(mesh);
        //         // mesh.receiveShadows = true;

        //     })
        //     const newMesh = Mesh.MergeMeshes(meshes);
        //     attachDragBehavior(newMesh);
        // })

        // SceneLoader.ImportMesh('', 'models/', 'bathtub.obj', scene, (meshes) => {
        //     meshes.forEach( (mesh) => {
        //         // mesh.position = new Vector3(-2, 0, -2);
        //         mesh.scaling = standardScale;
        //     })
        //     const newMesh = Mesh.MergeMeshes(meshes);
        //     attachDragBehavior(newMesh);
        // })

        // SceneLoader.ImportMesh('', 'models/', 'bear.obj', scene, (meshes) => {
        //     meshes.forEach( (mesh) => {
        //         // mesh.position = new Vector3(-2, 0, -2);
        //         mesh.scaling = standardScale;
        //     })
        //     const newMesh = Mesh.MergeMeshes(meshes);
        //     attachDragBehavior(newMesh);
        // })

        // SceneLoader.ImportMesh('', 'models/', 'loungeDesignChair.obj', scene, (meshes) => {
        //     meshes.forEach( (mesh) => {
        //         mesh.position = new Vector3(-2, 0, 0);
        //         mesh.scaling = standardScale;
        //     })
        //     const newMesh = Mesh.MergeMeshes(meshes);
        //     attachDragBehavior(newMesh);
        // })

        // SceneLoader.ImportMesh('', 'models/', 'tableGlass.obj', scene, (meshes) => {
        //     meshes.forEach( (mesh) => {
        //         mesh.position = new Vector3(-2, 0, -2);
        //         mesh.scaling = standardScale;
        //     })
        //     const newMesh = Mesh.MergeMeshes(meshes);
        //     attachDragBehavior(newMesh);
        // })

        SceneLoader.ImportMesh('', 'models/', 'codesmith-logo.obj', scene, (meshes) => {
            const woodMaterial = new StandardMaterial('woodMaterial', scene);
            // woodMaterial.diffuseTexture = new Texture('./wood_grain.jpg', scene);
            woodMaterial.diffuseColor = new Color3(0.08, 0.20, 0.5);
            // woodMaterial.specularColor = new Color3.Black();
            meshes.forEach( (mesh) => {
                mesh.position = new Vector3(9, 2, 7);
                mesh.scaling = new Vector3(0.2, 0.2, 0.2);
                mesh.rotation = new Vector3(0, 15, 0);
                mesh.material = woodMaterial;
            });
            const newMesh = Mesh.MergeMeshes(meshes);
            // attachDragBehavior(logo);
        })
    }

    function onSceneReady(scene) {
        // const camera = new FreeCamera('camera1', new Vector3(0, 5, 10), scene);
        // camera.setTarget(Vector3.Zero());
        console.log('Scene Ready');
        // const camera = new TargetCamera('camera1', new Vector3(5, 5, -5), scene);
        // const camera = new UniversalCamera('camera1', new Vector3(10, 10, -10), scene);
        const camera = new UniversalCamera('camera1', new Vector3(15, 15, -15), scene);
        camera.mode = Camera.PERSPECTIVE_CAMERA;
        camera.fov = 1;
        camera.attachControl(canvas, true);
        camera.setTarget(new Vector3(-2, 1, 2));
        setCamera(camera);

        // camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        // camera.orthoTop = 15;
        // camera.orthoBottom = -15;
        // camera.orthoLeft = -15;
        // camera.orthoRight = 15;
        // camera.fov = 2;

        const canvas = scene.getEngine().getRenderingCanvas();

        const light = new HemisphericLight('light', new Vector3(-2, 5, 2), scene);
        light.intensity = 1;

        // const light2 = new PointLight('light', new Vector3(-9, 5, -5), scene);
        // light2.intensity = 0.2;
        // const shadowGenerator = new ShadowGenerator(512, light2);

        // console.log(shadowGenerator);

        // const woodMaterial = new StandardMaterial('woodMaterial', scene);
        // woodMaterial.diffuseTexture = new Texture('./wood_grain.jpg', scene);
        // woodMaterial.specularColor = new Color3.Black();
        // box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
        // box.position.y = 3;
        // // box.scaling = new Vector3(0.6, 0.3, 0.8);


        // attachDragBehavior(box);

        const groundSize = 15;
        // const ground = MeshBuilder.CreateGround('ground', { width: groundSize, height: groundSize }, scene);
        // ground.material = woodMaterial;
        
        
        // create tiled ground, create materials
        // create multimaterial and push each material into submaterials array
        // set multimaterial as material for tiledground
        // set submeshes property of tiledground to an empty array
        // create and set values for these variables
        ///// UNCOMMENT
        // const tile = {
        //     w: 8,
        //     h: 8,
        // }
        // const ground = MeshBuilder.CreateTiledGround('ground', {xmin: -5, zmin: -5, xmax: 5, zmax: 5, subdivisions: tile}, scene);
        
        // const verticesCount = ground.getTotalVertices();
        // const tileIndicesLength = ground.getIndices().length / (tile.w * tile.h);
        // let base = 0; 
        // for (let row = 0; row < tile.h; row++) {
        //     for (let col = 0; col < tile.w; col++) {
        //         new SubMesh(row % 2 ^ col % 2, 0, verticesCount, base, tileIndicesLength, ground);
        //         base += tileIndicesLength;
        //     }
        // }
        // const tileMaterial1 = new StandardMaterial('white', scene);
        // tileMaterial1.diffuseColor = new Color3(0.5, 0.1, 0.3)
        // const tileMaterial2 = new StandardMaterial('black', scene);
        // const multiMaterial = new MultiMaterial('multi', scene);
        // multiMaterial.subMaterials.push(tileMaterial1);
        // multiMaterial.subMaterials.push(tileMaterial2);
        // ground.material = multiMaterial;
        // ground.isPickable = false;
        ///// UNCOMMENT GROUND

        createModels(scene);
        // createSkybox(scene);
        
        // scene.debugLayer.show();

        window.addEventListener('pointerdown', function() {
            const pickResult = scene.pick(scene.pointerX, scene.pointerY);

            if (pickResult) {
                window.addEventListener('keydown', function(key) {
                    if (key.code === 'KeyR') {
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
    }

    return (
        <div>
            <SceneComponent camera={camera} antialias={true} onSceneReady={onSceneReady} onRender={onRender} id="react-canvas" />
        </div>
    )
}

export default SceneContainer;
