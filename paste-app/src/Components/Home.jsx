import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPaste, updatePaste, fetchPastes, autoSaveDraft } from '../redux/pasteSlice';
import { authAPI } from '../utils/api';
import { PlusCircle, Save } from 'lucide-react';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [isDraft, setIsDraft] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [draftId, setDraftId] = useState(null);
    const searchParams = useSearchParams()[0];
    const setSearchParams = useSearchParams()[1];
    const pasteID = searchParams.get("pasteID");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allPastes = useSelector((state) => state.paste.pastes);
    const autoSaveTimerRef = useRef(null);

    // Check authentication
    useEffect(() => {
        if (!authAPI.isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    // Fetch pastes on mount
    useEffect(() => {
        if (authAPI.isAuthenticated()) {
            dispatch(fetchPastes());
        }
    }, [dispatch]);

    // Load paste for editing
    useEffect(() => {
        if (pasteID && allPastes.length > 0) {
            const paste = allPastes.find((p) => p._id === pasteID);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
                setIsDraft(paste.isDraft || false);
                if (paste.expiresAt) {
                    setExpiresAt(new Date(paste.expiresAt).toISOString().slice(0, 16));
                }
            }
        } else if (pasteID) {
            // If pasteID provided but not in state, fetch it
            fetchPasteById(pasteID);
        }
    }, [pasteID, allPastes]);

    const fetchPasteById = async (id) => {
        try {
            const { pasteAPI } = await import('../utils/api');
            const response = await pasteAPI.getById(id);
            if (response.success && response.paste) {
                const paste = response.paste;
                setTitle(paste.title);
                setValue(paste.content);
                setIsDraft(paste.isDraft || false);
                if (paste.expiresAt) {
                    setExpiresAt(new Date(paste.expiresAt).toISOString().slice(0, 16));
                }
            }
        } catch (error) {
            console.error('Error fetching paste:', error);
        }
    };

    // Auto-save draft functionality
    useEffect(() => {
        // Clear previous timer
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        // Only auto-save if there's content and user is authenticated
        if ((title.trim() || value.trim()) && authAPI.isAuthenticated()) {
            autoSaveTimerRef.current = setTimeout(() => {
                handleAutoSave();
            }, 2000); // Auto-save after 2 seconds of inactivity
        }

        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [title, value]);

    const handleAutoSave = async () => {
        if (!title.trim() && !value.trim()) return;
        
        setSaving(true);
        try {
            const draftData = {
                title: title || 'Untitled',
                content: value,
                isDraft: true
            };

            if (pasteID) {
                // Update existing paste
                await dispatch(updatePaste({ id: pasteID, pasteData: draftData })).unwrap();
            } else if (draftId) {
                // Update existing draft
                await dispatch(updatePaste({ id: draftId, pasteData: draftData })).unwrap();
            } else {
                // Create new draft only if we don't have one
                const response = await dispatch(createPaste(draftData)).unwrap();
                if (response && response._id) {
                    setDraftId(response._id);
                    setSearchParams({ pasteID: response._id });
                }
            }
        } catch (error) {
            console.error('Auto-save failed:', error);
        } finally {
            setSaving(false);
        }
    };

    async function createpaste() {
        if (!title.trim() || !value.trim()) {
            return;
        }

        setLoading(true);
        try {
            const pasteData = {
                title: title.trim(),
                content: value.trim(),
                isDraft: isDraft,
                expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null
            };

            if (pasteID) {
                // Update existing paste
                await dispatch(updatePaste({ id: pasteID, pasteData })).unwrap();
            } else {
                // Create new paste
                await dispatch(createPaste(pasteData)).unwrap();
            }

            // Refresh pastes list
            await dispatch(fetchPastes());

            // Reset form
            setTitle('');
            setValue('');
            setExpiresAt('');
            setIsDraft(false);
            setDraftId(null);
            setSearchParams({});
        } catch (error) {
            console.error('Error saving paste:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {pasteID ? 'Edit Paste' : 'Create New Paste'}
                        </h1>
                        <p className="text-muted-foreground">
                            {pasteID ? 'Update your existing paste' : 'Share your code, notes, or text snippets'}
                        </p>
                    </div>
                    {saving && (
                        <span className="text-sm text-muted-foreground">Saving draft...</span>
                    )}
                </div>
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
                        disabled={!title.trim() || !value.trim() || loading}
                        className='min-w-[140px] h-12 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-all'>
                        {
                            loading ? (
                                'Saving...'
                            ) : pasteID ? (
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

                <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isDraft}
                            onChange={(e) => setIsDraft(e.target.checked)}
                            className="w-4 h-4 rounded border-input"
                        />
                        <span className="text-sm text-muted-foreground">Save as draft</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Expires at:</label>
                        <input
                            type="datetime-local"
                            value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)}
                            className="h-8 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
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
