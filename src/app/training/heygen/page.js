'use client';

import { useState } from 'react';
import LeftContent from './utils/LeftContent';
import RightContent from './utils/RightContent';

export default function HeygenPage() {
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

  const fnGenerateVideo = () => {
    console.log('Generate video clicked');
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
