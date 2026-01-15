import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'sonner';
import { Link } from "react-router-dom";
import { Edit, Eye, Trash2, Copy, Share2, Search, Calendar } from 'lucide-react';

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

    function handleShare(pasteID) {
        const shareUrl = `${window.location.origin}/pastes/${pasteID}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard!");
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">All Pastes</h1>
                <p className="text-muted-foreground">Browse and manage your saved pastes</p>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                    className='w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring'
                    type="search"
                    placeholder='Search pastes by title...'
                    value={searchTerm}
                    onChange={(e) => setSeatchTerm(e.target.value)}
                />
            </div>

            <div className='grid gap-4'>
                {
                    //here i want to create cards according to my filtered data 
                    //if len >0 means got something and wanted to map that data to cards 
                    filteredData.length > 0 ?
                        filteredData.map(
                            (paste) => {
                                return (
                                    <div key={paste._id} className='bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-300 animate-slide-in'>
                                        <div className="p-6 pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold mb-1">{paste.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{new Date(paste.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-6 pb-3">
                                            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm max-h-32 overflow-hidden relative">
                                                <pre className="whitespace-pre-wrap break-words text-muted-foreground line-clamp-4">
                                                    {paste.content}
                                                </pre>
                                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/50 to-transparent" />
                                            </div>
                                        </div>

                                        <div className='flex gap-2 flex-wrap p-6 pt-3'>
                                            <Link to={`/?pasteID=${paste?._id}`}>
                                                <button className='px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2 text-sm'>
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                            </Link>
                                            <Link to={`/pastes/${paste?._id}`}>
                                                <button className='px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2 text-sm'>
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(paste?.content)
                                                    toast.success("Copied to Clipboard ! ")
                                                }}
                                                className='px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2 text-sm'
                                            >
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </button>
                                            <button
                                                onClick={() => handleShare(paste?._id)}
                                                className='px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2 text-sm'
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share
                                            </button>
                                            <button
                                                onClick={() => handleDelete(paste?._id)}
                                                className='px-3 py-2 rounded-md border border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-2 text-sm'
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">No pastes found</h3>
                                <p className="text-muted-foreground">
                                    {searchTerm ? 'Try a different search term' : 'Create your first paste to get started'}
                                </p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Paste
