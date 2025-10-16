import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value , setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteID = searchParams.get("pasteID");

    return (
        <div>
            <div className='flex flex-row gap-7'>
            <input
                className='p-2 rounded-2xl mt-2'
                type="text"
                placeholder='Enter the Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button className='p-2 rounded-2xl mt-2'>
                {   
                    //conditional for creation and updation
                    pasteID ? "Update Paste" 
                    : "Create Paste"

                }
            </button>
        </div>

        <div>
            <textarea
                value={value}
                placeholder='Enter your Content here ! '
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />
        </div>
        </div>
    )
}

export default Home
