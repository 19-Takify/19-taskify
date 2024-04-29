import React, {
  Dispatch,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './ColorPicker.module.scss';
import { SetStateAction } from 'jotai';
import { TAG_COLORS } from '@/constants/colors';

type ColorPicker = {
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

function ColorPicker({ selectedColor, setSelectedColor }: ColorPicker) {
  const handleColorPickerClick = () => {
    setIsOpen && setIsOpen(!isOpen);
  };
  const handleColorButtonClick = (e: MouseEvent, color: string) => {
    e.preventDefault();
    setSelectedColor(color);
    setIsOpen && setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any): void {
      if (
        colorRef.current &&
        !colorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      return;
    }

    function handleKeyDown(event: any) {
      if (event.key === 'Enter') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [colorRef]);

  return (
    <>
      <button
        type="button"
        className={styles.colorPicker}
        style={{ backgroundColor: selectedColor }}
        onClick={handleColorPickerClick}
      ></button>
      {isOpen && (
        <div className={styles.colors} ref={colorRef}>
          {TAG_COLORS.map((color, i) => {
            return (
              <button
                type="button"
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
