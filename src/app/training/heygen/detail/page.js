'use client';

import { useState } from 'react';
import LeftContent from './utils/LeftContent';
import RightContent from './utils/RightContent';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function HeygenDetailPage() {
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
    // Validate title
    if (!title || title.trim() === '') {
      toast.error('Title is required');
      return;
    }

    // Validate at least one video input item
    if (!voiceItems || voiceItems.length === 0) {
      toast.error('At least one video input item is required');
      return;
    }

    // Validate each item
    for (const item of voiceItems) {
      // Validate background
      if (!item.background || !item.background.type || !item.background.value) {
        toast.error('Each item must have background type and value');
        return;
      }

      // Validate voice
      if (!item.voice || !item.voice.type) {
        toast.error('Each item must have a voice type (text or silence)');
        return;
      }

      if (item.voice.type === 'text') {
        if (!item.voice.voice_id || !item.voice.input_text) {
          toast.error('Text type voice must have voice_id and input_text');
          return;
        }
      } else if (item.voice.type === 'silence') {
        if (!item.voice.duration) {
          toast.error('Silence type voice must have duration');
          return;
        }
      } else {
        toast.error('Voice type must be either text or silence');
        return;
      }
    }

    var dimension = { width: 1280, height: 720 };
    voiceItems.forEach(item => {

      var scaleAndOffset = calculateHeyGenScaleAndOffset(item.character.box, item.character.size, item.character.position, dimension);
      console.log(scaleAndOffset.scale, scaleAndOffset.offset);

      item.character.type = 'avatar';
      item.character.scale = scaleAndOffset.scale;
      item.character.offset = scaleAndOffset.offset;
    });
    var body = {
      title: title,
      dimension: dimension,
      caption: true,
      video_inputs: voiceItems
    }
    const response = await fetch('/api/heygen?endpoint=VIDEO_GENERATE', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    const data = await response.json();
  }



  const calculateHeyGenScaleAndOffset = (box, size, position) => {

    const scaleHeight = size.height / box.height * 1;
    const scaleWidth = size.width / box.width * 1;

    const frameCenterX = box.width / 2;
    const frameCenterY = box.height / 2;

    // 2. Tính tọa độ tâm của avatar từ điểm top-left
    const centerX = position.x + size.width / 2;
    const centerY = position.y + size.height / 2;

    console.log(frameCenterX, frameCenterY);
    console.log(centerX, centerY);

    // Tính offset_x và offset_y
    const offsetX = (centerX - frameCenterX) / frameCenterX;
    const offsetY = (centerY - frameCenterY) / frameCenterY;

    // Đảm bảo offset nằm trong phạm vi [-1.0, 1.0]
    const clampedOffsetX = Math.max(-1.0, Math.min(1.0, offsetX)) / 2;
    const clampedOffsetY = Math.max(-1.0, Math.min(1.0, offsetY)) / 2;

    return {
      scale: Math.min(scaleHeight, scaleWidth),
      offset: {
        x: clampedOffsetX,
        y: clampedOffsetY
      }
    }


  }


  return (
    <div className="w-full h-full">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: '#ff4b4b',
            },
          },
        }}
      />
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