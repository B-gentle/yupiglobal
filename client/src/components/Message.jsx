import React, { useState, useEffect } from 'react'

const Message = ({ type, message }) => {

  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const showComponent = () => {
      setOpen(true);

      // Automatically hide the component after 10 seconds
      setTimeout(() => {
        setOpen(false);
      }, 6000); // 8 seconds in milliseconds
    };
    // Call the showComponent function when the component is mounted
    showComponent();
  }, []);

  return (
    <>
      <div className='absolute bottom-[10px] right-[10px] w-1/4 text-center'>
        {open &&
          <div className={type === 'error' ? 'bg-red-600 rounded' : 'bg-green-600 rounded'}>
            <p className='text-white font-semibold px-[1rem] py-[1rem]'>{message}</p>
          </div>
        }
      </div>

    </>
  )
}

export default Message