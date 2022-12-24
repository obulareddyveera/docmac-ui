import React from 'react';

const HeaderLogo = () =>{
    return (
        <div className='flex flex-col justify-center align-center text-center'>
            <div className='flex justify-center align-center text-center'>
                <div className="flex text-md text-white">DOC</div>
                <div className='flex bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>MAC</div>
            </div>
            <div className="text-sm text-white mt-1">
              Clinic Management Software
            </div>
        </div>

    )
}

export default HeaderLogo