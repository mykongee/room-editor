import React, {useState} from 'react';
import "@babylonjs/core";
import "@babylonjs/viewer";
// import * as BabylonViewer from 'babylonjs-viewer';

const ViewerComponent = props => {
    const uri = '../models/bench.obj';
    const one = '../test2.babylon';
    const two = '../untitled.obj'
    const [model, setModel] = useState(null);

    return (
        <div className='babylon'>
            <babylon extends='minimal' model='../models/untitled.obj'></babylon>
        </div>
    )
}

export default ViewerComponent;