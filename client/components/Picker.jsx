import React from 'react';
import { Vector3 } from '@babylonjs/core';

const Picker = props => {
    const { createModel, scene } = props;
    const standardScale = new Vector3(4, 4, 4);
    console.log(createModel);


    // const pickableImages = [];
    return (
        <div>
            <div className="picker">
                
                <div onClick={() => createModel('cabinetBed.obj', scene)} className="img-picker">
                    <img id='cabinetBed.obj' src='../assets/images/cabinetBed_SE.png'/>
                </div>
                <div onClick={() => createModel('shower.obj', scene)} className="img-picker">
                    <img id='shower.obj' src='../assets/images/shower_SE.png'/>
                </div>
                <div onClick={() => createModel('loungeDesignChair.obj', scene)} className="img-picker">
                    <img src='../assets/images/loungeDesignChair_SE.png'/>
                </div>
                <div onClick={() => createModel('loungeSofaCorner.obj', scene)} className="img-picker">
                    <img src='../assets/images/loungeSofaCorner_SE.png'/>
                </div>
                <div onClick={() => createModel('chairDesk.obj', scene)} className="img-picker">
                    <img src='../assets/images/chairDesk_SE.png'/>
                </div>
                <div onClick={() => createModel('kitchenStove.obj', scene)} className="img-picker">
                    <img src='../assets/images/kitchenStove_SE.png'/>
                </div>
                <div onClick={() => createModel('bedSingle.obj', scene)} className="img-picker">
                    <img src='../assets/images/bedSingle_SE.png'/>
                </div>
                <div onClick={() => createModel('bathtub.obj', scene)} className="img-picker">
                    <img src='../assets/images/bathtub_SE.png'/>
                </div>
                <div onClick={() => createModel('tableCoffeeGlass.obj', scene)} className="img-picker">
                    <img src='../assets/images/tableCoffeeGlass_SE.png'/>
                </div>
                <div onClick={() => createModel('bookcaseOpen.obj', scene)} className="img-picker">
                    <img src='../assets/images/bookcaseOpen_SE.png'/>
                </div>
                <div onClick={() => createModel('televisionModern.obj', scene)} className="img-picker">
                    <img src='../assets/images/televisionModern_SE.png'/>
                </div>
                <div onClick={() => createModel('rugRectangle.obj', scene)} className="img-picker">
                    <img src='../assets/images/rugRectangle_SE.png'/>
                </div>
                <div onClick={() => createModel('speaker.obj', scene)} className="img-picker">
                    <img src='../assets/images/speaker_SE.png'/>
                </div>
            </div>
            <div className="picker">
                <div onClick={() => createModel('pottedPlant.obj', scene)} className="img-picker">
                    <img src='../assets/images/pottedPlant_SE.png'/>
                </div>
                <div onClick={() => createModel('lampSquareFloor.obj', scene)} className="img-picker">
                    <img src='../assets/images/lampSquareFloor_SE.png'/>
                </div>
                <div onClick={() => createModel('kitchenFridge.obj', scene)} className="img-picker">
                    <img src='../assets/images/kitchenFridge_SE.png'/>
                </div>
                <h4>Free Assets From @KenneyNL License: (CC0 1.0 Universal)</h4>
            </div>
        </div>
    )
}

export default Picker;