import { type } from "@testing-library/user-event/dist/type";
import { isFloat64Array } from "util/types";
import type * as types from "./types";
import { ShapeType, FilterType } from "./types";

function createPage() : types.CanvasType {
    return {
        name: '',
        size: {
            width: 800,
            height: 600
        },
        bgColor: '#fff',
        //filter: FilterType,
        listObjects: []
    }
}

function changeNamePage(page: types.CanvasType, name: string) : types.CanvasType {
    return {
        ...page,
        name: name
    };
}

function changeResalutionPage(page: types.CanvasType, size: types.Size) : types.CanvasType {
    return {
        ...page,
        size: size
    };
}

function changeBgColorPage(page: types.CanvasType, bgColor: string) : types.CanvasType {
    return {
        ...page,
        bgColor: bgColor
    };
}

type ChangeObjectDimensions = {
    id: string,
    size: types.Size
}

function changeObjectDimensions(page: types.CanvasType, props: ChangeObjectDimensions) : types.CanvasType {

    const obj = page.listObjects.find( (item) => item.id == props.id);

    if (!obj) {
        return page;
    }

    const newObj = obj;
    newObj.size = props.size;

    const newPage = deleteObject(page, obj);
    


    return {
        ...newPage,
        listObjects: [...newPage.listObjects, newObj]
    }
}

type ChangeObjectCoord = {
    id: string,
    coord: types.Coord
}

function changeObjectPosition(page: types.CanvasType, props: ChangeObjectCoord): types.CanvasType {

    const obj = page.listObjects.find( (item) => item.id == props.id );

    console.log(obj);

    if (!obj) {
        return page;
    }

    if (props.coord.x < 0 || props.coord.y < 0 || props.coord.x + obj.size.width > page.size.width || props.coord.y + obj.size.height > page.size.height) {
        return page;
    }

    const newObj = obj;
    newObj.сoord = props.coord;

    const newPage = deleteObject(page, obj);

    //console.log('ok', newObj.сoord);
    return {
        ...newPage,
        listObjects: [...newPage.listObjects, newObj]
    }
}



// function raiseLayerObject(page: types.CanvasType, id: string): types.CanvasType {

//     const obj = page.listObjects.find( (item) => item.id == id );

//     if (typeof obj == undefined){
//         return page
//     }

//     const newObj: types.ObjectOnCanvas = {
//         ...obj,
//         сoord: {
//             ...coord
//             z: obj.сoord.z - 1
//         }
//     }

//     deleteObject(page, obj);

//     return {
//         ...page,
//         listObjects: [...page.listObjects, newObj]
//     }
// }

function deleteObject(page: types.CanvasType, obj: types.ObjectOnCanvas) : types.CanvasType {
    return {
        ...page,
        listObjects: page.listObjects.filter( (item) => item.id != obj.id )
    }
}

function changeTextColor(page: types.CanvasType, id: string, color: string) : types.CanvasType {

    const obj = page.listObjects.find( (item) => item.id == id);

    //проверки

    if (!obj || obj.type != 'text') {
        return page
    }

    const newObj: types.TextType = {
        id: obj.id,
        type: obj.type,
        content: obj.content,
        color: color,    
        font: obj.font,
        fontSize: obj.fontSize,
        size: obj.size,
        сoord: obj.сoord,    
        isSelected: obj.isSelected
    }

    deleteObject(page, obj);

    return {
        ...page,
        listObjects: [...page.listObjects, newObj]
    };
}

function changeTextSize(page: types.CanvasType, id: string, size: types.Size) : types.CanvasType {
    const obj = page.listObjects.find( (item) => item.id == id);

    //проверки
    if (!obj || obj.type != 'text') {
        return page
    }

    const newObj = {
        id: obj.id,
        type: obj.type,
        content: obj.content,
        color: obj.color,    
        font: obj.font,
        fontSize: obj.fontSize,
        size: size,
        сoord: obj.сoord,    
        isSelected: obj.isSelected
    }

    deleteObject(page, obj);

    return {
        ...page,
        listObjects: [...page.listObjects, newObj]
    };
}

// function createSquare(page: types.CanvasType) : types.CanvasType {
//     const newObj: types.ArtObjectType = {
//         id: /*uuid()*/'',
//         type: 'artObject',
//         shape: ShapeType.Square,
//         size: {
//             width: 100,
//             height: 100
//         },
//         сoord: {
//             x: 0,
//             y: 0,
//             z: 0
//         },
//         borderSize: 1,
//         borderColor: "#000",
//         fill: "#fff",
//         isSelected: true
//     };

//     page.listObjects.forEach(element => {
//         element.сoord.z += 1
//     });

//     return {
//         ...page,
//         listObjects: [...page.listObjects, newObj]
//     }
    
// }

function createCircle(page: types.CanvasType) : types.CanvasType {
    const newObj: types.ArtObjectType = {
        id: /*uuid()*/'',
        type: 'artObject',
        shape: ShapeType.Ellipse,
        size: {
            width: 100,
            height: 100
        }, 
        сoord: {
            x: 0,
            y: 0,
            z: 0
        },
        borderSize: 1,
        borderColor: "#000",
        fill: "#fff",
        isSelected: false
    }

    page.listObjects.forEach(element => {
        element.сoord.z += 1
    });

    return {
        ...page,
        listObjects: [...page.listObjects, newObj]
    }
}

function createReсtangle(page: types.CanvasType) : types.CanvasType {
    const newObj: types.ArtObjectType = {
        id: generateId(),
        type: 'artObject',
        shape: ShapeType.Rectangle,
        size: {
            width: 100,
            height: 100
        },
        сoord: {
            x: 0,
            y: 0,
            z: 0
        },
        borderSize: 1,
        borderColor: "#000",
        fill: "#f5f5f5",
        isSelected: false
    }

    // page.listObjects.forEach(element => {
    //     element.сoord.z += 1
    // });

    return {
        ...page,
        listObjects: [...page.listObjects, newObj]
    }
}

function createTriangle(page: types.CanvasType) : types.CanvasType {
    const newObj: types.ArtObjectType = {
        id: generateId(),
        type: 'artObject',
        shape: ShapeType.Triangle,
        size: {
            width: 100,
            height: 100
        },
        сoord: {
            x: 0,
            y: 0,
            z: 0
        },
        borderSize: 1,
        borderColor: "#000",
        fill: "#fff",
        isSelected: false
    }

    // page.listObjects.forEach(element => {
    //     element.сoord.z += 1
    // });

    return {
        ...page,
        listObjects: [...page.listObjects, newObj]
    }
}

function createImage(page: types.CanvasType) : types.CanvasType {
    const newObj : types.ImageType = {
        id: generateId(),
        type: 'image',
        source: '',
        size: {
            width: 100,
            height: 100
        },
        сoord: {
            x: 0,
            y: 0,
            z: 0
        },
        isSelected: false
    }

    // page.listObjects.forEach(element => {
    //     element.сoord.z += 1
    // });
    return {
        ...page,
        listObjects: [...page.listObjects, newObj]
    }
}

// function createTextBox(page: types.CanvasType) : types.CanvasType {
//     const newObj : types.TextType = consts.defaultTextBox;

//     page.listObjects.forEach(element => {
//         element.сoord.z += 1
//     });

//     return {
//         ...page,
//         listObjects: [...page.listObjects, newObj]
//     }
// }

function selectObject(page: types.CanvasType, obj: types.ObjectOnCanvas) : types.CanvasType {

    const newList = page.listObjects.map(element => {
        element.isSelected = false;
        if (element.id == obj.id) {
            element.isSelected = true;
        }
        return element;
    });

    if (newList) {
        return page;
    }
    
    const newPage: types.CanvasType = {
        ...page,
        listObjects: newList
    };
    return newPage;
}

function unselectObject(page: types.CanvasType) : types.CanvasType {

    const newList = page.listObjects.map(element => {
        element.isSelected = false;

        return element;
    });
    
    const newPage: types.CanvasType = {
        ...page,
        listObjects: newList
    };
    return newPage;
}

// function unSelectAllObjects(page: types.CanvasType): types.CanvasType {
//     page.listObjects.forEach(element => {
//         element.isSelected = false;
//     });

//     const newList = page.listObjects;

//     if (newList) {
//         return page;
//     }
    
//     const newPage: types.CanvasType = {
//         ...page,
//         listObjects: newList
//     };
//     return newPage;
// }

function generateId() : string {
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

export {
    createPage,
    changeNamePage,
    changeResalutionPage,
    changeBgColorPage,
    changeObjectDimensions,
    changeObjectPosition,
    changeTextColor,
    changeTextSize,
    //createSquare,
    createCircle,
    createReсtangle,
    createTriangle,
    createImage,
    //createTextBox
    //unSelectAllObjects,
    selectObject,
    generateId,
    unselectObject
}