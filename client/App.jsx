import React from 'react';
import SceneContainer from './containers/SceneContainer.jsx';
import InterfaceContainer from './containers/InterfaceContainer.jsx';
import ViewerComponent from './components/ViewerComponent.jsx';
import Picker from './components/Picker.jsx';
import css from './styles.css';
import "@babylonjs/viewer";

const App = (props) => {
    return (
        <div id="container">
            {/* <InterfaceContainer /> */}
            <div className="intro">
                <h1>roomSim</h1>
                <h3>Free Assets From @KenneyNL License: (CC0 1.0 Universal)</h3>
            </div>
            <SceneContainer />
            <ViewerComponent />
        </div>
    )
};

export default App;