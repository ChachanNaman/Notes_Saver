
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Copy, Share2, Calendar, ArrowLeft } from 'lucide-react';

const ViewPaste = () => {
    const { id } = useParams(); //to get the id i am looking for 

    const allPastes = useSelector((state) => state.paste.pastes);
    //to get all the pastes list

    const paste = allPastes.filter((p) => p._id === id)[0];
    //to select the specific pastes 
    //cache is returning array , soo taking [0] to get the desired output from the array i want to show in View 

    if (!paste) {
        return (
            <div className='max-w-5xl mx-auto px-4 py-16 text-center'>
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Paste not found!</h2>
                <p className="text-muted-foreground mb-6">The paste you're looking for doesn't exist or has been deleted.</p>
                <Link to="/pastes">
                    <button className='px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 mx-auto'>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Pastes
                    </button>
                </Link>
            </div>
        );
    }

    function handleShare() {
        const shareUrl = `${window.location.origin}/pastes/${id}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard!");
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
            <div className="mb-6">
                <Link to="/pastes">
                    <button className='mb-4 px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2 text-sm'>
                        <ArrowLeft className="w-4 h-4" />
                        Back to Pastes
                    </button>
                </Link>
                
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">View Paste</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Created on {new Date(paste.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-4">
                    <input
                        className='flex-1 h-12 text-lg px-4 rounded-lg border border-input bg-muted/50 cursor-not-allowed'
                        type="text"
                        placeholder='Enter the Title'
                        value={paste.title}
                        disabled
                    />

                    {/* 4. Add the "Copy Content" button */}
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(paste?.content)
                            toast.success("Copied to Clipboard ! ")
                        }}
                        className='px-4 h-12 rounded-lg border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2'
                    >
                        <Copy className="w-4 h-4" />
                        Copy
                    </button>

                    <button 
                        onClick={handleShare}
                        className='px-4 h-12 rounded-lg border border-border bg-background hover:bg-muted transition-colors flex items-center gap-2'
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>

                <textarea
                    className='w-full min-h-[500px] p-4 rounded-lg border border-input bg-muted/50 font-mono text-sm resize-none cursor-not-allowed'
                    value={paste.content}
                    placeholder='Enter your Content here ! '
                    disabled
                />
            </div>
        </div>
    )
}

export default ViewPaste
