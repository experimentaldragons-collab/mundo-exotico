import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
}

export default function Textarea({
  label,
  error,
  maxLength,
  className = '',
  id,
  value,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        value={value}
        className={`
          w-full px-4 py-2 border rounded-lg
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      <div className="flex justify-between mt-1">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {maxLength && (
          <p className="text-gray-500 text-sm ml-auto">
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
