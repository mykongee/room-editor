import React from 'react';

const Picker = props => {
    const { createModel, scene } = props;
    console.log(createModel);

    return (
        <div className="picker">
            <div onClick={() => createModel('cabinetBed.obj', scene)} className="img-picker">
                <img id='cabinetBed.obj' src='../assets/images/cabinetBed_SE.png'/>
            </div>
            <div onClick={() => createModel('shower.obj', scene)} className="img-picker">
                <img id='shower.obj' src='../assets/images/shower_SE.png'/>
            </div>

        </div>
    )
}

export default Picker;