import React, { useState } from "react";
import axios from "axios";

function Upload({onhandleImageData}) {
    const [image, setImage] = useState(null);
    const [imagedata,setImageData]=useState({});
    function handleChange(e) {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    function submitHandler(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", image);
        console.log(data);

        axios.post("http://127.0.0.1:5000/upload", data)
            .then((response) => {
                console.log(response.data.objects_detected);
                if (response.status === 201) {
                    console.log("succeess");
                    const updatedImageData = {
                        uploadImage: response.data.uploaded_image,
                        modifyImage: response.data.modified_image,
                        objectsDetected: response.data.objects_detected
                    };
                    setImageData(updatedImageData);
                    onhandleImageData(updatedImageData);
                }
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    console.log(error.response)
                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                }
            })
    }

    return (
        <div className="flex w-[100%] bg-gray-900">
            <div className="flex flex-col self-end p-2 w-full m-1">

                <form onSubmit={submitHandler} encType="multipart/form-data" id="imageForm">

                    <div className="flex items-center justify-center w-full ">
                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-35 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-3 pb-3 p-1">
                                <svg className="w-10 h-10 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} />
                        </label>
                    </div>

                    <button type="submit" className="dark:bg-blue-400 hover:bg-blue-500 p-1 mt-2 text-sm rounded-md w-[100%] text-gray-800">
                        Upload
                    </button>
              


                </form>

            </div>



        </div>

    );

}

export default Upload;