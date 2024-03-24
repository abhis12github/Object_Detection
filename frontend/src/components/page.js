import React, { useState } from "react";
import Upload from "./upload";
import Preview from "./Preview";
import Count from "./count";

function Page() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [modifiedImage, setModifiedImage] = useState(null);
    const [objectsDetected, setObjectsDetected] = useState([]);

    const handleImageData = (imagedata) => {
        setUploadedImage(imagedata.uploadImage)
        setModifiedImage(imagedata.modifyImage)
        console.log(imagedata.objectsDetected);
        setObjectsDetected(imagedata.objectsDetected)
    }
    return (
        <div className="flex w-[100%] h-[100vh] bg-gray-900 justify-evenly">
            <div className="w-[15%] bg-gray-950 h-[100%] flex justify-center">
                <Count objectsDetected={objectsDetected}></Count>
            </div>

            <div className="flex flex-col w-[80%] h-[100vh] justify-center ">
                <Upload onhandleImageData={handleImageData}></Upload>
                <Preview uploadedImage={uploadedImage} modifiedImage={modifiedImage}></Preview>
            </div>


        </div>

    )

}

export default Page;