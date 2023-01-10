type CanvasType = {
    name: string,
    size: Size,
    bgColor: string,
    //filter: FilterType,
    listObjects: Array<ObjectOnCanvas>
}

type ObjectOnCanvas = 
    TextType | 
    ArtObjectType | 
    ImageType

type Size = {
    width: number,
    height: number
}

type Coord = {
    x: number,
    y: number,
    z: number
}

type TextType = {
    id: string,
    type: 'text',
    content: string,
    color: string,    
    font: string,
    fontSize: number,
    size: Size,
    сoord: Coord,    
    isSelected: boolean
}

type ImageType = {
    id: string,
    type: 'image',
    source: string,
    size: Size,
    сoord: Coord,
    isSelected: boolean;
}

type ArtObjectType = {
    id: string, 
    type: 'artObject',  
    shape: ShapeType,
    size: Size,
    сoord: Coord,
    borderSize: number,
    borderColor: string,
    fill: string,
    isSelected: boolean
}

export enum FilterType {
    none = "#000", 
    red = "#fc0303", 
    blue = "#0318fc", 
    pink = "#eb03fc"
}

export enum ShapeType {
    Rectangle = "rectangle",
    Ellipse = "ellipse",
    Triangle = "triangle",
}

export type {
    CanvasType,
    ObjectOnCanvas,
    Size, 
    Coord,
    TextType,
    ImageType,
    ArtObjectType,
}