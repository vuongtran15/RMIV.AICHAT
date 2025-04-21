import React, { useState } from 'react';
import { IoClose, IoColorPaletteOutline, IoImageOutline, IoVideocamOutline } from 'react-icons/io5';
import { ChromePicker } from 'react-color';

const MediaPopup = ({ isOpen, onClose, onSelect }) => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [selectedType, setSelectedType] = useState('color'); // 'color', 'image', or 'video'

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setSelectedType('image');
        setUploadedVideo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedVideo(reader.result);
        setSelectedType('video');
        setUploadedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setSelectedType('color');
    setUploadedImage(null);
    setUploadedVideo(null);
  };

  const handleSubmit = () => {
    onSelect({
      type: selectedType,
      value: selectedType === 'image' ? uploadedImage : 
             selectedType === 'video' ? uploadedVideo : 
             selectedColor
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[700px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Media Settings</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Type Selection */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSelectedType('color');
                setUploadedImage(null);
                setUploadedVideo(null);
              }}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2
                ${selectedType === 'color'
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <IoColorPaletteOutline size={20} />
              Background Color
            </button>
            <button
              onClick={() => setSelectedType('image')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2
                ${selectedType === 'image'
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <IoImageOutline size={20} />
              Upload Image
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2
                ${selectedType === 'video'
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <IoVideocamOutline size={20} />
              Upload Video
            </button>
          </div>

          {/* Color Picker Section */}
          {selectedType === 'color' && (
            <div className="space-y-1">
              <div className="flex items-center gap-4 p-4">
                <div
                  className="w-full h-16 rounded-lg border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>
              <div className="rounded-lg p-4 bg-gray-50">
                <ChromePicker
                  color={selectedColor}
                  onChange={handleColorChange}
                  disableAlpha={true}
                  styles={{
                    default: {
                      picker: {
                        boxShadow: 'none',
                        width: '100%'
                      },
                      saturation: {
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem'
                      },
                      hue: {
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem'
                      },
                      swatch: {
                        display: 'none'
                      },
                      color: {
                        display: 'none'
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Image Upload Section */}
          {selectedType === 'image' && (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-[300px] flex items-center justify-center bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer w-full h-full flex items-center justify-center"
                >
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center gap-2">
                      <IoImageOutline size={32} className="text-gray-400" />
                      <div>Click to upload an image</div>
                      <div className="text-xs text-gray-400">or drag and drop</div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Video Upload Section */}
          {selectedType === 'video' && (
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-[300px] flex items-center justify-center bg-gray-50">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer w-full h-full flex items-center justify-center"
                >
                  {uploadedVideo ? (
                    <video
                      src={uploadedVideo}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                      controls
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center gap-2">
                      <IoVideocamOutline size={32} className="text-gray-400" />
                      <div>Click to upload a video</div>
                      <div className="text-xs text-gray-400">or drag and drop</div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg 
              hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg
              active:scale-[0.98] transform"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaPopup; 