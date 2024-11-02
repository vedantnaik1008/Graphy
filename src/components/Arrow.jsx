/* eslint-disable react/prop-types */
import useStorage from '../hooks/useStorage';

const Arrow = ({click, setClick, className?, onClick}) => {
    const {fileLinks} = useStorage('arrow')

  return (
      <img
          onClick={() => setClick((prevState) => !prevState)}
          src={fileLinks[0]}
          alt=''
          className={` transition-all duration-200 ease-in-out w-[8%] ${
              click ? 'rotate-90' : 'rotate-0'
          }`}
      />
  );
}

export default Arrow
