import React from 'react';
import { Engine, EngineStore, Scene, SceneLoader, SceneSerializer } from "@babylonjs/core";
import { useEffect, useRef, useState, useCallback } from "react";

const SceneComponent = props => {
    const reactCanvas = useRef(null);
    const saveButton = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;   
    // let [sceneState, setSceneState] = useState(null); 
    // const [isFetching, setIsFetching] = useState(false);
    let scene;
    
    // useCallback( (call, scene) => {
    //     console.log('is fetching')
    //     fetch('http://localhost:3000/api', {
    //         method: "GET",
    //     })
    //     .then(res => res.json())
    //     .catch(err => console.log(err))
    // }, [isFetching])

    // for POST body, serialize scene
    const fetchData = async () => {
        console.log('is fetching');
        try {
            const response = await fetch('http://localhost:3000/api',
             { method: 'GET' }
            );
            const res = await response.text();
            console.log(res);            
        } catch (err) {
            console.log(err);
        }
    }

    function save(scene) {
        const serializedScene = SceneSerializer.Serialize(scene);
        const strScene = JSON.stringify(serializedScene);
        // console.log(strScene);
        return strScene;
    }

    const postData = async () => {
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

    const serialize = () => {
        const serializedScene = SceneSerializer.Serialize(scene);
        const strScene = JSON.stringify(serializedScene);
        console.log(strScene);
    }

    useEffect( () => {
        if (saveButton.current) {
            console.log('savebutton useeffect');
        };
        saveButton.current.addEventListener('pointerdown', postData);
        // saveButton.current.addEventListener('pointerdown', serialize);
        // add event listener to ping backend

        return () => {
            saveButton.current.removeEventListener('pointerdown', postData);
        }
    }, [saveButton]);

    return (
        <div>
            <div id="test">
                <button ref={saveButton}>
                    Save Scene and do stuff plz
                </button>
            </div>
            <canvas style={ {height: 100+'%' , width: 100+'%'} } ref={reactCanvas} {...rest} />
        </div>
    )
}

export default SceneComponent;