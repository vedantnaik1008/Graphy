import useStorage from '../../hooks/useStorage';

const AtomicHabits = () => {
    const { fileLinks } = useStorage(`Books/Atomic Habits`);

  return (
      <div className='w-[90%] mx-auto my-20'>
          <ol>
              {fileLinks.map((link, index) => (
                  <li key={index} className='flex gap-8'>
                      <a href={link} target='_blank' rel='noopener noreferrer'>
                          {link.replace(
                              'https://firebasestorage.googleapis.com/v0/b/graphy-c2078.appspot.com/o/Books%2F',
                              ''
                          )}
                          {''}
                          {index + 1}
                      </a>
                  </li>
              ))}
          </ol>
      </div>
  );
}

export default AtomicHabits
