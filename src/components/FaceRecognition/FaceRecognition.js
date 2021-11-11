import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ image_url, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt3 pa3">
                <img id='input_img' src={image_url} alt='' width='500px' height='auto' />
                <div className='bounding_box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;