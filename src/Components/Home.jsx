import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { PlusCircle, Save } from 'lucide-react';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteID = searchParams.get("pasteID");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteID && allPastes.length > 0) {
            const paste = allPastes.find((p) => p._id === pasteID);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteID, allPastes]);


    function createpaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteID ||
                Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteID) {
            //means update(already avai)
            dispatch(updateToPastes(paste));
            //paste passed as payload in redux

        }
        else {
            //means new (create)
            dispatch(addToPastes(paste));
        }

        //after creation or updation 
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {pasteID ? 'Edit Paste' : 'Create New Paste'}
                </h1>
                <p className="text-muted-foreground">
                    {pasteID ? 'Update your existing paste' : 'Share your code, notes, or text snippets'}
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4">
                    <input
                        className='flex-1 h-12 text-lg px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring'
                        type="text"
                        placeholder='Enter the Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        onClick={createpaste}
                        disabled={!title.trim() || !value.trim()}
                        className='min-w-[140px] h-12 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-all'>
                        {
                            //conditional for creation and updation
                            pasteID ? (
                                <>
                                    <Save className="w-4 h-4" />
                                    Update
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="w-4 h-4" />
                                    Create
                                </>
                            )
                        }
                    </button>
                </div>

                <textarea
                    className='w-full min-h-[500px] p-4 rounded-lg border border-input bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring'
                    value={value}
                    placeholder='Enter your Content here ! '
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Home
