import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, Upload, Loader2 } from 'lucide-react'
import axios from 'axios'

const ImagePoll = ({ options, setOptions }) => {
    const handleAddOption = () => {
        setOptions([...options, {
            id: options[options.length - 1].id + 1,
            placeholder: `Option ${options[options.length - 1].id + 1}`,
            value: "",
            imageUrl: "",
            public_id: "",
            isLoading: false
        }])
    }

    const handleChange = (changedValue, id) => {
        setOptions((prevOptions) => prevOptions.map((opt) =>
            opt.id === id ? { ...opt, value: changedValue } : opt
        ))
    }

    const handleRemoveOption = (id) => {
        const optionToRemove = options.find(opt => opt.id === id);
        
        // If there's an image, delete it from Cloudinary
        if (optionToRemove?.public_id) {
            deleteImage(optionToRemove.public_id);
        }

        setOptions(
            options.filter((opt) => opt.id !== id)
        )
    }

    const handleImageUpload = async (e, id) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            console.error('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            console.error('Image size should be less than 5MB');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setOptions((prevOptions) => prevOptions.map((opt) =>
                opt.id === id ? { ...opt, isLoading: true } : opt
            ));

            const response = await axios.post('http://localhost:8008/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setOptions((prevOptions) => prevOptions.map((opt) =>
                    opt.id === id ? {
                        ...opt,
                        imageUrl: response.data.imageUrl,
                        public_id: response.data.public_id,
                        isLoading: false
                    } : opt
                ));
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setOptions((prevOptions) => prevOptions.map((opt) =>
                opt.id === id ? { ...opt, isLoading: false } : opt
            ));
        }
    };

    const deleteImage = async (public_id) => {
        try {
            await axios.delete(`http://localhost:8008/delete-image/${public_id}`);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }

    const handleImageRemove = async (id) => {
        const option = options.find(opt => opt.id === id);
        if (option?.public_id) {
            try {
                await deleteImage(option.public_id);
                setOptions((prevOptions) => prevOptions.map((opt) =>
                    opt.id === id ? { ...opt, imageUrl: "", public_id: "", isLoading: false } : opt
                ))
            } catch (error) {
                console.error('Error removing image:', error);
                setOptions((prevOptions) => prevOptions.map((opt) =>
                    opt.id === id ? { ...opt, isLoading: false } : opt
                ))
            }
        }
    }

    return (
        <div className='mb-8 space-y-4'>
            <Label className="text-white text-xs pb-1 block">Poll Options with Images</Label>
            <div className="space-y-6">
                {options.map((item) => (
                    <div className="relative w-full" key={item.id}>
                        <div className="flex gap-2 mb-2">
                            <Input
                                value={item.value}
                                onChange={(e) => handleChange(e.target.value, item.id)}
                                placeholder={item.placeholder}
                                className="p-3 text-white bg-[#2A3441] border-[#4e5155] text-sm"
                            />
                            {options.length > 2 && (
                                <button
                                    onClick={() => handleRemoveOption(item.id)}
                                    className="text-gray-400 hover:text-gray-200"
                                    disabled={item.isLoading}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Image Upload Section */}
                        <div className="relative">
                            {item.isLoading ? (
                                <div className="flex items-center justify-center w-full h-40 bg-[#2A3441] rounded-md">
                                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                </div>
                            ) : item.imageUrl ? (
                                <div className="relative group">
                                    <img
                                        src={item.imageUrl}
                                        alt={`Option ${item.id}`}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                    <button
                                        onClick={() => handleImageRemove(item.id)}
                                        className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        disabled={item.isLoading}
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, item.id)}
                                        className="hidden"
                                        id={`image-upload-${item.id}`}
                                        disabled={item.isLoading}
                                    />
                                    <label
                                        htmlFor={`image-upload-${item.id}`}
                                        className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-gray-400 bg-[#2A3441] transition-colors duration-200"
                                    >
                                        <div className="flex flex-col items-center">
                                            <Upload className="w-8 h-8 text-gray-400" />
                                            <span className="mt-2 text-sm text-gray-400">Click to upload image</span>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Button 
                className="cursor-pointer text-xs p-1 bg-[#2A3441] text-white hover:bg-[#d4d4d5] mt-4 w-full sm:w-auto" 
                variant={"outline"} 
                size={"custom"} 
                onClick={handleAddOption}
            >
                <Plus className="mr-1" />Add Option
            </Button>
        </div>
    )
}

export default ImagePoll