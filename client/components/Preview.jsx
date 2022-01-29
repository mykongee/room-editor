import React, {useState} from 'react';
import "@babylonjs/core";
import "@babylonjs/viewer";

const ViewerComponent = props => {
    const uri = '../models/bench.obj';
    const one = '../test2.babylon';
    const two = '../untitled.obj'
    const [model, setModel] = useState(null);

    // for POST body, serialize scene
    const fetchData = async () => {
        // event.preventDefault();
        // console.log(event);
        console.log('is fetching');
        try {
            const response = await fetch('http://localhost:3000/api/img',
                { method: 'GET' }
            );
            const res = await response.text();
            console.log(res);
            console.log('fetched');            
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='babylon'>
            <babylon extends='minimal' model='../models/untitled.obj'></babylon>
        </div>
    )
}

export default ViewerComponent;