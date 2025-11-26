import React, { useState, type KeyboardEvent } from 'react';

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    label?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ value = [], onChange, placeholder, label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
            removeTag(value.length - 1);
        }
    };

    const addTag = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput && !value.includes(trimmedInput)) {
            onChange([...value, trimmedInput]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        const newTags = [...value];
        newTags.splice(index, 1);
        onChange(newTags);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                {value.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-blue-600 focus:outline-none"
                        >
                            &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className="flex-grow min-w-[120px] outline-none bg-transparent text-sm"
                />
            </div>
        </div>
    );
};
