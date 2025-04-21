'use client';

import { useState } from 'react';
import LeftContent from './utils/LeftContent';
import RightContent from './utils/RightContent';

export default function HeygenPage() {
  const [voiceItems, setVoiceItems] = useState([
    {
      id: 1, avatar: {
        avatar_id: '',
        avatar_name: '',
        preview_image_url: '',
      }, voice: {
        voice_id: '',
        voice_name: '',
        language: '',
        preview_audio: '',
      },
      text: '12',
      sequence: 1
    },
  ]);

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-pink-100 pb-4">
        HeyGen Video Generator
      </h1>

      <div className="flex w-full h-[calc(100%-4rem)]">
        <LeftContent
          voiceItems={voiceItems}
          setVoiceItems={setVoiceItems}
        />
        <div className="w-3/5 p-4 bg-gray-100">
          <RightContent voiceItems={voiceItems} />
        </div>
      </div>
    </div>
  );
}
