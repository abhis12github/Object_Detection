import React from "react";
import Image from "./image";
import { Empty } from 'antd';

function Preview(props) {
    return (
        <div className="flex mt-5 w-[100%] h-[60%] justify-evenly bg-gray-900 mb-2">
            <div className="w-[48%] border-dotted border-gray-600 border-2 rounded-md">  
                {props.uploadedImage ? <Image  src={props.uploadedImage}></Image> : <div className="w-[100%] h-[100%] flex items-center justify-center"><Empty description={<span className="text-gray-300">No image to Preview</span>}></Empty></div>}
            </div>
            <div className="w-[48%] border-dotted border-gray-600 border-2 rounded-md">
            {props.uploadedImage ? <Image  src={props.modifiedImage}></Image> : <div className="w-[100%] h-[100%] flex items-center justify-center"><Empty description={<span className="text-gray-300">No image to Preview</span>}></Empty></div>}
            </div>


        </div>
    );
}

export default Preview;