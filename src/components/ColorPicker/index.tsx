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

//태그 인풋 색깔 선택하기 기능
function ColorPicker({ selectedColor, setSelectedColor }: ColorPicker) {
  const [isOpen, setIsOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  const handleColorPickerClick = () => {
    setIsOpen && setIsOpen(!isOpen);
  };
  const handleColorButtonClick = (e: MouseEvent, color: string) => {
    setSelectedColor(color);
    setIsOpen && setIsOpen(false);
  };

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
