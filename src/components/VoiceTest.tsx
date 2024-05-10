import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Voice from "@react-native-voice/voice";
import MicrophonePermissionRequester from './MicrophonePermissionRequester';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface VoiceTestProps {
  onVoiceSearch: (text: string) => void; // Callback function to handle voice search
  onChangeText: (text: string) => void;
  startListening: () => void;
}

interface VoiceTabProps {
  onVoiceCancel: () => void;
  isListening: boolean; 
  startListening: () => void;
}

class VoiceTest extends Component<VoiceTestProps> {
  state = {
    isListening: false,
  };

  startListening = async () => {
    try {
      await Voice.start('en-US'); // Bắt đầu lắng nghe với ngôn ngữ English (US)
      this.setState({ isListening: true });
    } catch (error) {
      console.error("Error starting voice recognition:", error);
    }
  };

  stopListening = async () => {
    try {
      await Voice.stop();
      this.setState({ isListening: false });
    } catch (error) {
      console.error("Error stopping voice recognition:", error);
    }
  };

  handleVoicePress = () => {
    // Kích hoạt callback khi nhấn nút "keyboard-voice"
    this.props.onVoiceSearch('');
  }

  componentDidMount() {
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  componentWillUnmount() {
    Voice.removeAllListeners();
  }

  onSpeechStartHandler(event: any) {
    // Xử lý khi bắt đầu nhận dạng giọng nói
  }

  onSpeechEndHandler(event: any) {
    // Xử lý khi kết thúc nhận dạng giọng nói
  }

  onSpeechResultsHandler(event: any) {
    // Lấy kết quả của giọng nói
    const speechResult = event.value[0];
    // Truyền kết quả vào hàm onChangeText để hiển thị và tìm kiếm
    this.props.onChangeText(speechResult);
  }

  render() {
    const { isListening } = this.state;
    return (
      <>
        <MicrophonePermissionRequester />
        <VoiceTab 
          onVoiceCancel={() => {
            this.stopListening();
            console.log('Voice canceled');
          }}
          isListening={isListening}
          startListening={this.startListening}
        />
      </>
    );
  }
}

const VoiceTab = ({ onVoiceCancel, isListening, startListening }: VoiceTabProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startListening}>
        <Icon name='keyboard-voice' size={30} color='#333' />
      </TouchableOpacity>
      <View style={styles.progressBarContainer}>
        {isListening ? (
          <ActivityIndicator size='small' color='#333' />
        ) : (
          <TouchableOpacity onPress={onVoiceCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};  

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    marginLeft: 10,
    color: '#333',
  },
});

export default VoiceTest;
