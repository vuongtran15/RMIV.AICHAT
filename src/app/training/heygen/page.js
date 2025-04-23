'use client';

import { useState } from 'react';
import LeftContent from './utils/LeftContent';
import RightContent from './utils/RightContent';

export default function HeygenPage() {
  const [title, setTitle] = useState(''); 
  const [voiceItems, setVoiceItems] = useState([
    {
      id: 1,
      character: {
        avatar_id: '',
        avatar_id: '',
        preview_image_url: '',
      },
      voice: {
        // type: 'text', // text only or silence
        voice_id: '',
        voice_name: '',
        language: '',
        input_text: '',
        preview_audio: '',
        duration: 0,
      },
      background: {
        type: '', // color or image or video
        value: '',
      },
      sequence: 1
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fnGenerateVideo = async () => {
    
    var dimension = { width: 1280, height: 720 };
    voiceItems.forEach(item => {
      const scalingFactor = calculateAverageScalingFactor(item.character.box, item.character.size);
      item.character.type = 'avatar';
      item.character.scale = scalingFactor;
      item.character.offset = calculateNormalizedOffset(item.character.box, item.character.position);
    });
    var body = {
      title: title,
      dimension: dimension,
      caption: true,
      video_inputs: voiceItems
    }
    console.log(body);
    const response = await fetch('/api/heygen?endpoint=VIDEO_GENERATE', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    const data = await response.json();
  }

  const calculateAverageScalingFactor = (box, size) => {
    if (!box || !size || !box.width || !box.height || !size.width || !size.height || box.width === 0 || box.height === 0) {
      throw new Error("Invalid input: Box and size must have valid width and height properties.");
    }
    const widthScaling = size.width / box.width;
    const heightScaling = size.height / box.height;
    return Number(((widthScaling + heightScaling) / 2).toFixed(2));
  }

  const calculateNormalizedOffset = (box, position) => {
    if (!box || !position || !box.width || !box.height || !position.x || !position.y || box.width === 0 || box.height === 0) {
        throw new Error("Invalid input: Box must have valid width and height, and position must have valid x and y.");
    }
    const xNormalized = -1 + (position.x * 2) / box.width;
    const yNormalized = -1 + (position.y * 2) / box.height;
    return { x: xNormalized.toFixed(2), y: yNormalized.toFixed(2) };
}

  return (
    <div className="w-full h-full">
      <div id='video-generator-title' className="flex justify-between items-center mb-6 border-b border-pink-100 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          HeyGen Video Generator
        </h1>
        <button
          className="flex items-center cursor-pointer h-11 gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:shadow-sm relative pl-10"
          onClick={fnGenerateVideo}
        >
          <span className="absolute left-3 w-5 h-5 before:content-[''] before:absolute before:w-3 before:h-3 before:border-2 before:border-white before:rounded before:top-1 before:left-1 after:content-[''] after:absolute after:w-0 after:h-0 after:border-t-[6px] after:border-t-transparent after:border-l-[10px] after:border-l-white after:border-b-[6px] after:border-b-transparent after:top-[6px] after:left-[10px]"></span>
          Generate Video
        </button>
      </div>

      <div className="flex w-full h-[calc(100%-4rem)]">
        <LeftContent
          title={title}
          setTitle={setTitle}
          voiceItems={voiceItems}
          setVoiceItems={setVoiceItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <div className="w-3/5 p-4 bg-gray-100">
          <RightContent
            voiceItems={voiceItems}
            setVoiceItems={setVoiceItems}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </div>
    </div>
  );
}
