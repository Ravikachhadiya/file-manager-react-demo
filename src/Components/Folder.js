import React from 'react';

const Folder = ({ data, onFolderClick, index }) => {
    return (
        <div className="folder" onClick={() => onFolderClick(index)}>
            {data.albumTitle}
        </div>
    )
}

export default Folder;