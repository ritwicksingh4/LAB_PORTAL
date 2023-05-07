import React from "react";

const handleDownload = (base64Data, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${
        base64Data.split(",")[1]
    }`;
    link.download = fileName;
    link.click();
};

const DownloadButton = ({ base64Image, fileName }) => {
    return (
        <button onClick={() => handleDownload(base64Image, fileName)}>
            Download
        </button>
    );
};

export default DownloadButton;
