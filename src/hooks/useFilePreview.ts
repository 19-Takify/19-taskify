import { useEffect, useState } from 'react';

export default function useFilePreview(
  file: FileList,
  selectedImageUrl: string | null | undefined,
) {
  const [imgSrc, setImgSrc] = useState(selectedImageUrl || '');

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
    //imgSrc를 dependency list에 넣으면 무한루프가 생김
  }, [file]);

  return { imgSrc, setImgSrc };
}
