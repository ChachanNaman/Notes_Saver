import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteID = searchParams.get("pasteID");
    const dispatch = useDispatch();
    cont allPastes = useSelector((state) => state.paste.pastes)
    function createpaste() {
        const paste = {
            title : title,
            content : value , 
            _id : pasteID || 
                Date.now().toString(36),
            createdAt : new Date().toISOString(),
        }
        if(pasteID){
            //means update(already avai)
            dispatch(updateToPastes(paste));
            //paste passed as payload in redux

        }
        else{
            //means new (create)
            dispatch(addToPastes(paste));
        }

        //after creation or updation 
        setTitle('');
        setValue('');
        setSearchParams({});
    }
    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-1 rounded-2xl mt-2 w-[66%] pl-5'
                    type="text"
                    placeholder='Enter the Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={createpaste}
                    className='p-2 rounded-2xl mt-2'>
                    {
                        //conditional for creation and updation
                        pasteID ? "Update Paste"
                            : "Create Paste"

                    }
                </button>
            </div>

            <div className='mt-8'>
                <textarea
                    className='p-2 rounded-2xl mt-4 min-w-[500px] p-4'
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
