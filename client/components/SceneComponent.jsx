import React from 'react';
import { Engine, EngineStore, Scene, SceneLoader } from "@babylonjs/core";
import { useEffect, useRef } from "react";

const SceneComponent = props => {
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;   

    useEffect( ()=> {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
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
                // scene.getEngine.resize();
                engine.resize();
            }

            if (window) {
                window.addEventListener("resize", resize);
            }

            return () => {
                scene.getEngine().dispose();

                if (window) {
                    window.removeEventListener("resize", resize);
                }
            }
        }

    }, [reactCanvas]); //end useEffect hook

    // return (
    //     <div>
    //         <h1>hello</h1>
    //     </div>
    // )
    return <canvas style={ {height: 100+'%' , width: 100+'%'} } ref={reactCanvas} {...rest} />;
}

export default SceneComponent;