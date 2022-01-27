import React from 'react';
import { Engine, EngineStore, Scene, Mesh, SceneLoader, SceneSerializer, PointerDragBehavior, Vector3 } from "@babylonjs/core";
import { useEffect, useRef, useState, useCallback } from "react";
import Picker from './Picker.jsx';

const SceneComponent = props => {
    const reactCanvas = useRef(null);
    const saveButton = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;   
    // const [scene, setScene] = useState(undefined);
    const [children, setChildren] = useState(null);
    const [submitButton, setSubmitButton] = useState(null);
    let scene;

    function attachDragBehavior(mesh) {
        const pointerDragBehavior = new PointerDragBehavior({ dragAxis: new Vector3(1, 0, 0)});
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
                mesh.scaling = new Vector3(2, 2, 2);
            })
            const newMesh = Mesh.MergeMeshes(meshes);
            console.log(newMesh);
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
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            scene = new Scene(engine, sceneOptions);
            // const x = new Scene(engine, sceneOptions);
            const children = <Picker createModel={createModel} scene={scene}/>;
            setChildren(children);

            // const submitButton = <button type="submit" scene={scene}>Save and submit</button>
            // setSubmitButton(submitButton);
            // ready scene
            if (scene.isReady()) {
                props.onSceneReady(scene);
            } else {
                scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
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
        if (saveButton.current) {
            console.log('savebutton useeffect');
            saveButton.current.addEventListener('pointerdown', postData);
        };
        return () => {
            saveButton.current.removeEventListener('pointerdown', postData);
        }
        // saveButton.current.addEventListener('pointerdown', fetchData);
        // return () => {
        //     saveButton.current.removeEventListener('pointerdown', fetchData);
        // }
    }, [saveButton]);

    return (
        <div className='babylon'>
            <div id="test">
                {/* <form onSubmit={postData} id='form'> */}
                {/* <input type="text" id="scene-name" defaultValue="Scene Name" />  */}
                    {/* {submitButton} */}
                <button ref={saveButton}>
                    Save Scene and do stuff plz
                </button>
                {/* </form> */}
                {children}
            </div>
            <canvas style={ {height: 100+'%' , width: 100+'%'} } ref={reactCanvas} {...rest} />
        </div>
    )
}

export default SceneComponent;