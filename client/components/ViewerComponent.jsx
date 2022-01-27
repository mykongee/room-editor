import React from 'react';
import "@babylonjs/core";
import "@babylonjs/viewer";
// import * as BabylonViewer from 'babylonjs-viewer';

const ViewerComponent = props => {
    const uri = '../models/bench.obj';

    return (
        <div>
            <babylon extends='minimal' model='../test2.babylon'></babylon>
        </div>
    )
}

export default ViewerComponent;