import type * as types from './types';

const defaultTextBox: TextProps = {textObject: 
    {
        id: '',
        type: 'text',
        content: 'Новый текст',
        color: '#000',
        font: 'Arial',
        fontSize: 12,
        size: {
            width: 100,
            height: 100
        },
        сoord: {
            x: 0,
            y: 0,
            z: 0
        },
        isSelected: true
    }
};

type TextProps = {
    textObject: types.TextType;
  };

export {
    defaultTextBox
};