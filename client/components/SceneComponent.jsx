import React from 'react';
import { Engine, Scene, Mesh, SceneLoader, SceneSerializer, Tools, Camera, UniversalCamera, Texture, PointerDragBehavior, CubeTexture, Vector3 } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import Picker from './Picker.jsx';

const SceneComponent = props => {
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady } = props;   
    const reactCanvas = useRef(null);
    console.log('first', props.camera);
    const saveButton = useRef(null);
    const [cam, setCam] = useState(null);
    const pngButton = useRef(null);
    const [img, setImage] = useState(null);
    const [png, setPng] = useState(null);
    const [children, setChildren] = useState(null);
    let scene;
    let engine;
    
    const standardScale = new Vector3(4, 4, 4);

    function attachDragBehavior(mesh) {
        // const pointerDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0)});
        const pointerDragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0, 1, 0)});

        console.log('pointerdragbehavior', pointerDragBehavior);
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

    function createModel(modelFileName, scene) {
        console.log(`creating: ${modelFileName} in ${scene}`);

        SceneLoader.ImportMesh('', 'models/', modelFileName, scene, (meshes) => {
            meshes.forEach( (mesh) => {
                mesh.scaling = standardScale;
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            attachDragBehavior(newMesh);
        })
    }

    function save(scene) {
        console.log('in save');
        console.log(scene);
        const serializedScene = SceneSerializer.Serialize(scene);
        const strScene = JSON.stringify(serializedScene);
        // console.log(strScene);
        return strScene;
    }
    
    function exportToPng() {
        const x = Tools.CreateScreenshot(engine, cam, {precision: 2, width: 1920, height: 1080}, (string) => {
            console.log(string);
        });
        Tools.CreateScreenshot(engine, cam, {precision: 2, width: 1920, height: 1080});
        // console.log(x);
    }

    // for POST body, serialize scene
    const fetchData = async () => {
        // event.preventDefault();
        // console.log(event);
        console.log('is fetching');
        try {
            const response = await fetch('http://localhost:3000/api',
             { method: 'GET' }
            );
            const res = await response.text();
            console.log(res);
            console.log('fetched');            
        } catch (err) {
            console.log(err);
        }
    }

    const postData = async () => {
        // event.preventDefault();
        // console.log(event);
        console.log('is posting');
        try {
            const serializedData = save(scene);
            console.log(serializedData);
            const request = await fetch('http://localhost:3000/api',
                {   method: 'POST',
                    headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    // "Access-Control-Allow-Credentials": "true"
                    },
                    mode: 'cors',
                    body: serializedData
                });
            console.log('response: ', request);
            const res = await request.text();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect( ()=> {
        console.log('reactcanvas init')
        if (reactCanvas.current) {
            // const engine = new Engine(reactCanvas.current, antialias, {preserveDrawingBuffer: true, stencil: true}, adaptToDeviceRatio);
            engine = new Engine(reactCanvas.current, antialias, {preserveDrawingBuffer: true, stencil: true}, adaptToDeviceRatio);
            scene = new Scene(engine, sceneOptions);
            const children = <Picker createModel={createModel} scene={scene}/>;
            setChildren(children);
            
            const png = <button engine={engine} scene={scene} onClick={exportToPng}>Export to PNG</button>
            setPng(png);

            // ready scene
            if (scene.isReady()) {
                onSceneReady(scene);
                const camera = new UniversalCamera('camera2', new Vector3(15, 15, -15), scene);
                camera.mode = Camera.PERSPECTIVE_CAMERA;
                camera.fov = 1;
                camera.setTarget(new Vector3(-2, 1, 2));
                setCam(camera);
            } else {
                scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
            }

            // render scene in render loop
            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
            });

            const resize = () => {
                scene.getEngine().resize();
                engine.resize();
            }

            if (window) window.addEventListener("resize", resize);
            if (window) window.addEventListener("keydown", function(key) {
                if (key.code === "KeyG") {
                    fetchData();
                }
            })

            return () => {
                scene.getEngine().dispose();
                if (window) {
                    window.removeEventListener("resize", resize);
                }
            }
        }
    }, [reactCanvas]); //end useEffect hook


    useEffect( () => {
        console.log('savebutton changed');
        if (saveButton.current) {
            console.log('savebutton useeffect');
            // TODO
            // saveButton.current.addEventListener('pointerdown', postData);
        };

        if (pngButton.current) {
            console.log('pngbutton useeffect');
            pngButton.current.addEventListener('pointerdown', exportToPng)
        }

        return () => {
            saveButton.current.removeEventListener('pointerdown', postData);
            pngButton.current.removeEventListener('pointerdown', exportToPng)

        }
        // saveButton.current.addEventListener('pointerdown', fetchData);
        // return () => {
        //     saveButton.current.removeEventListener('pointerdown', fetchData);
        // }
    }, [saveButton, pngButton]);

    return (
        <div className='babylon'>
            <div id="test">
                {/* <form onSubmit={postData} id='form'> */}
                {/* <input type="text" id="scene-name" defaultValue="Scene Name" />  */}
                    {/* {submitButton} */}
                <button ref={saveButton}>
                    Save Scene (to be implemented)
                </button>
                <button ref={pngButton}>
                    Export to PNG
                </button>
                {/* {png} */}
                {/* </form> */}
                {children}
            </div>
            <canvas style={ {height: 100+'%' , width: 100+'%'} } ref={reactCanvas} />
        </div>
    )
}

export default SceneComponent;