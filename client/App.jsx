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
            <InterfaceContainer />
            <SceneContainer />
            <ViewerComponent />
        </div>
    )
};

export default App;