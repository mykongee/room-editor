import React from 'react';
import SceneContainer from './containers/SceneContainer.jsx';

const App = (props) => {
    return (
        <div id="container">
            <div id="test">
                <button>
                    Clicky
                </button>
            </div>
            <SceneContainer />
        </div>
    )
};

export default App;