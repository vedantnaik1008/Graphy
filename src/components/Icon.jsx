import useStorage from '../hooks/useStorage';

const Icon = () => {
    const { fileLinks } = useStorage('pdf');
  return <img src={fileLinks[0]} alt='' className='' />;
}

export default Icon
