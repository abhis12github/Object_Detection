import React from "react";

function Image(props) {
    return (
        <img className="rounded-lg w-[100%] h-[100%]" src={`data:image/jpeg;base64,${props.src}`} alt="Uplod Image to Preview"/>      
    );
}

export default Image;

//border-dotted border-gray-600 border-2
