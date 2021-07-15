import React, { useState } from 'react';
import FakeData from '../FakeData.json';
import Folder from "./Folder";

const Layout = () => {
    const [data, setData] = useState(FakeData);
    const [currentData, setCurrentData] = useState(FakeData);
    const [breadcrumbs, setBreadcrumbs] = useState([{ title: "home", index: -1 }])

    const onFolderClick = (index) => {
        let temp = [...breadcrumbs];
        temp = [...temp, { title: currentData[index].albumTitle, index: index }]

        setBreadcrumbs(temp);
        setCurrentData(currentData[index].album);

    }

    const onBreadCrumbsClick = (index) => {
        // for current Data
        let newData = [...data];
        let wantData = breadcrumbs.slice(1, index + 1);
        let tempData = [...newData];

        wantData.forEach(x => { tempData = [...tempData[x.index].album] })
        newData = index ? tempData : newData;

        setCurrentData(newData);
        setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    }

    const backButton = () => {
        // for current Data
        let index = breadcrumbs.length - 1;
        if (index === 0) {
            return
        }
        let newData = [...data];
        let wantData = breadcrumbs.slice(1, index);
        let tempData = [...newData];

        wantData.forEach(x => { tempData = [...tempData[x.index].album] })
        newData = index ? tempData : newData;

        setCurrentData(newData);
        setBreadcrumbs(breadcrumbs.slice(0, index));
    }

    return (
        <div className="mainLayout">
            <button onClick={backButton}>
                Back
            </button>
            <div className="breadcrumbs">
                {breadcrumbs.map((x, i) =>
                    <div className="breadcrumbs-title" onClick={() => onBreadCrumbsClick(i)}>
                        {x.title}
                    </div>
                )}
            </div>
            <div className="folder-space">
                {currentData.map((x, i) =>
                    <Folder key={x.id} data={x} onFolderClick={onFolderClick} index={i} />
                )}
            </div>
        </div>
    )
}

export default Layout;