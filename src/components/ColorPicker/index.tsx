import React, { Dispatch, MouseEvent, useState } from 'react';
import styles from './ColorPicker.module.scss';
import { SetStateAction } from 'jotai';

export const TAG_COLORS = [
  '#E99695',
  '#F9D0C4',
  '#FEF2C0',
  '#C2E0C6',
  '#BFDADC',
  '#C5DEF5',
  '#BFD4F2',
  '#D4C5F9',
];

type ColorPicker = {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

function ColorPicker({ selectedColor, setSelectedColor }: ColorPicker) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorPickerClick = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleColorButtonClick = (e: MouseEvent, color: string) => {
    e.preventDefault();
    setShowColorPicker(false);
    setSelectedColor(color);
  };
  return (
    <>
      <button
        className={styles.colorPicker}
        style={{ backgroundColor: selectedColor }}
        onClick={handleColorPickerClick}
      ></button>
      {showColorPicker && (
        <div className={styles.colors}>
          {TAG_COLORS.map((color, i) => {
            return (
              <button
                className={styles.color}
                style={{ backgroundColor: color }}
                key={i}
                onClick={(e) => handleColorButtonClick(e, color)}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ColorPicker;
