// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import Voice from '@react-native-community/voice';


// const SpeechToText = () => {
//     const [isListening, setIsListening] = useState(false);
//     const [recognizedText, setRecognizedText] = useState('');

//     const startRecognition = async () => {
//         try {
//             console.log('Starting recognition...');
//             await Voice.start('en-US'); // Change the locale as needed
//             setIsListening(true);
//             setRecognizedText('');
//         } catch (error) {
//             console.error('Error starting speech recognition:', error);
//         }
//     };

//     const stopRecognition = async () => {
//         try {
//             console.log('Stopping recognition...');
//             await Voice.stop();
//             setIsListening(false);
//         } catch (error) {
//             console.error('Error stopping speech recognition:', error);
//         }
//     };

//     useEffect(() => {
//         Voice.onSpeechResults = (event) => {
//             console.log('Speech results:', event);
//             const { value } = event;
//             if (value) {
//                 setRecognizedText(value[0]);
//                 stopRecognition();
//             }
//         };

//         return () => {
//             Voice.destroy().then(Voice.removeAllListeners);
//         };
//     }, [isListening]);


//     return (
//         <View style={{ flex: 1, padding: 20 }}>
//             <Button
//                 title={isListening ? 'Stop Listening' : 'Start Listening'}
//                 onPress={isListening ? stopRecognition : startRecognition} />
//             <Text>Recognized Text: {recognizedText}</Text>
//         </View>
//     );
// };


// export default SpeechToText;