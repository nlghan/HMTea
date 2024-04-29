import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const MicrophonePermissionRequester = () => {
  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        let permission;
        if (Platform.OS === 'android') {
          permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
        } else if (Platform.OS === 'ios') {
          permission = PERMISSIONS.IOS.MICROPHONE;
        }

        if (permission) {
            const result = await request(permission);
            if (result === RESULTS.GRANTED) {
            console.log('Microphone permission granted');
            } else {
            console.log('Microphone permission denied');
            }
        }
      } catch (error) {
        console.error('Error requesting microphone permission:', error);
      }
    };

    requestMicrophonePermission();
  }, []);

  return null; // Không cần render gì trong component này
};

export default MicrophonePermissionRequester;
