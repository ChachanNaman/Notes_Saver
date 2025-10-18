import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const Paste = () => {

    const pastes = useSelector((state) => state.paste.pastes);

    //creating search term to filer 
    const [searchTerm, setSeatchTerm] = useState('');

    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        //go in paste title convert to lowercase then look what i entered in search bar (searchTerm) 
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())

    )

    function handleDelete(pasteID) {
        dispatch(removeFromPastes(pasteID));
    }
    return (
        <div>
            <input
                className='p-2 rounded-2xl min-w-[600px] mt-5 '
                type="search"
                placeholder='Search Here ! '
                value={searchTerm}
                onChange={(e) => setSeatchTerm(e.target.value)}
            />

            <div className='flex flex-col gap-5 mt-5'>
                {
                    //here i want to create cards according to my filtered data 
                    //if len >0 means got something and wanted to map that data to cards 
                    filteredData.length > 0 &&
                    filteredData.map(
                        (paste) => {
                            return (
                                <div key={paste._id} className='border'>
                                    <div>
                                        {paste.title}
                                    </div>

                                    <div>
                                        {paste.content}
                                    </div>

                                    <div className='flex flex-row gap-6 place-content-evenly'>
                                        <button>
                                            <Link to={`/?pasteID =${paste?._id}`}>Edit</Link>

                                        </button>
                                        <button>
                                            <Link to={`/pastes/${paste?._id}`}>View</Link>
                                        </button>
                                        <button onClick={() => handleDelete(paste?._id)}>
                                            Delete
                                        </button>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste?.content)
                                            toast.success("Copied to Clipboard ! ")
                                        }}>
                                            Copy
                                        </button>
                                        <button>
                                            Share
                                        </button>
                                    </div>

                                    <div>
                                        {paste.createdAt}
                                    </div>


                                </div>
                            )
                        }


                    )
                }
            </div>
        </div>
    )
}

export default Paste
