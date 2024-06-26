import { useState, useEffect } from "react";
import { LetterColors } from "../../const";
import cn from 'classnames';
import { useDispatch } from "react-redux";

type LetterProps = {
  letter: string;
  index: number;
}

export function Letter({ letter, index }: LetterProps) {
  function getRandomColor(): string {
    const colors = Object.values(LetterColors).slice(1);
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const dispatch = useDispatch();

  const [isHovered, setHovered] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const letterClassName = cn('hero__letter', {
    'hero__letter--animated': isHovered,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 55 * index);
    return () => clearTimeout(timer);
  }, [index, dispatch]);

  return (
    <span
      className={letterClassName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setHovered(false)
        }, 750)
      }
      style={{color: isHovered ? getRandomColor() : LetterColors.Default, opacity: isLoaded ? '1' : '0', transform: isLoaded ? 'translateX(0)' : 'translateX(-16px)'}}
    >
      {letter}
    </span>
  );
}
