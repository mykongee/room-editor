import React from 'react';
import { Engine, EngineStore, Scene, SceneLoader, SceneSerializer } from "@babylonjs/core";
import { useEffect, useRef, useState, useCallback } from "react";

const SceneComponent = props => {
    const reactCanvas = useRef(null);
    const saveButton = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;   
    // let [sceneState, setSceneState] = useState(null); 
    const [isFetching, setIsFetching] = useState(false);
    let scene;
    
    // useCallback( (call, scene) => {
    //     console.log('is fetching')
    //     fetch('http://localhost:3000/api', {
    //         method: "GET",
    //     })
    //     .then(res => res.json())
    //     .catch(err => console.log(err))
    // }, [isFetching])

    const fetchData = async () => {
        console.log('is fetching')
        try {
            const response = await fetch('http://localhost:3000/api', { method: 'GET' });
            const res = await response.text();
            console.log(res);            
        } catch (err) {
            console.log(err);
        }
        // fetch('http://localhost:3000/api', {
        //     method: "GET",
        // })
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err))
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

            // function save(scene) {
            //     const serializedScene = SceneSerializer.Serialize(scene);
            //     const strScene = JSON.stringify(serializedScene);
            //     console.log(strScene);
            // }

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
        saveButton.current.addEventListener('pointerdown', fetchData);
        // add event listener to ping backend

        return () => {
            saveButton.current.removeEventListener('pointerdown', fetchData);
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