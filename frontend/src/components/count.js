import React from "react";

function Count(props) {
    const arr = props.objectsDetected || [];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function countFreq() {
        var countMap = {};

        // Count occurrences of each unique object
        arr.forEach(object => {
            countMap[object] = (countMap[object] || 0) + 1;
        });

        const sortedObjects = Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);

        // Take only the top 6 objects
        const topObjects = sortedObjects.slice(0, 6);

        return topObjects.map((object, index) => (
            <div key={index} className="mb-2 w-[100%] flex flex-col items-center">
                <div className="text-3xl text-gray-700 font-semibold mb-1">{countMap[object]}</div>
                <div className="text-gray-400 text-lg">{capitalizeFirstLetter(object)}</div>
            </div>
        ));
    }

    return (
        <div className="flex flex-col">
            <span className="text-gray-500 mb-5 p-2 text-lg font-normal">Detected Objects</span>
            <div className="flex flex-col justify-center">

                {countFreq()}
            </div>

        </div>

    );
}

export default Count;






