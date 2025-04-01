import React, { useState, useEffect, useRef } from 'react';
import {  View,  Text, TextInput, TouchableOpacity,  StyleSheet,  KeyboardAvoidingView, Platform, FlatList,  Image} from 'react-native';

const Banner = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const flatListRef = useRef(null);

  const botResponses = [
    {
      keywords: ['hello'],
      responses: ["Hello there! What help do you need from me?"],
    },
    {
      keywords: ['hi'],
      responses: ["Hi! How can I help you?"],
    },
    {
      keywords: ['hey'],
      responses: ["Hey! What's up?"],
    },
    {
      keywords: ['hello', 'hi', 'hey'],
      responses: ["Hello there!", "Hi! How can I help you?", "Hey! What's up?"],
    },
    {
      keywords: ['job details'],
      responses: ["You can find out about our job opportunities through our posts. If you have any questions, you can contact us."],
    },
    {
      keywords: ['course details'],
      responses: ["You can find out about our course opportunities through our posts. If you have any questions, you can contact us."],
    },
    {
      keywords: ['how are you'],
      responses: ["I'm doing well, thank you!"],
    },
    {
      keywords: ["how's it going"],
      responses: ["I'm just a bot, but I'm functioning perfectly!"],
    },
    {
      keywords: ['thanks', 'thank you'],
      responses: ["You're welcome!", "Happy to help!", "No problem at all!"],
    },
    {
      keywords: ['thanks'],
      responses: ["You're welcome!"],
    },
    {
      keywords: ['good morning'],
      responses: ["Good morning. Welcome to Joblk Sport Team"],
    },
    {
      keywords: ['good evening'],
      responses: ["Good evening, Welcome to joblk Sport team"],
    },
    {
      keywords: ['thank you'],
      responses: ["Happy to help!"],
    },
    {
      keywords: ['bye', 'goodbye'],
      responses: ["Goodbye! Come back anytime!", "See you later!", "Bye! Have a great day!"],
    },
    {
      keywords: ['default'],
      responses: [
        "I don't understand what you're saying. What do you need my help with?",
      ],
    },
  ];

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(getRandomResponse(['Hi there!', 'Hello! How can I help?', 'Welcome!']));
      }, 500);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), text, isUser: false }]);
  };

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const findBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    for (const responseSet of botResponses) {
      if (responseSet.keywords.some(keyword => 
        responseSet.keywords[0] === 'default' ? false : lowerCaseMessage.includes(keyword))
      ) {
        return getRandomResponse(responseSet.responses);
      }
    }
    
    const defaultSet = botResponses.find(set => set.keywords[0] === 'default');
    return getRandomResponse(defaultSet.responses);
  };

  const handleSend = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = { id: Date.now(), text: inputMessage, isUser: true };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setShowCancel(true);
    
    setTimeout(() => {
      const botResponse = findBotResponse(inputMessage);
      addBotMessage(botResponse);
    }, 800);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setShowCancel(false);
    }
  };

  const handleCancel = () => {
    setMessages([]);
    setShowCancel(false);
    setTimeout(() => {
      addBotMessage(getRandomResponse(["What would you like to talk about?", "How can I help you today?", "What's on your mind?"]));
    }, 500);
  };

  return (
    <View style={styles.container}>
      {!isChatOpen && (
        <TouchableOpacity 
          style={styles.chatButton} 
          onPress={toggleChat}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../../assets/joblkchatbot.png')} 
            style={styles.chatButtonImage} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
      )}

      {isChatOpen && (
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatWindow}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <View style={styles.chatHeader}>
            <Text style={styles.headerText}>joblk</Text>
            <View style={styles.headerButtons}>
              {showCancel && (
                <TouchableOpacity 
                  onPress={handleCancel} 
                  style={styles.cancelButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelText}>Clear</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                onPress={toggleChat} 
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[
                styles.messageBubble, 
                item.isUser ? styles.userBubble : styles.botBubble
              ]}>
                <Text style={item.isUser ? styles.userText : styles.botText}>
                  {item.text}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.messagesContainer}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              onSubmitEditing={handleSend}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSend}
              activeOpacity={0.7}
            >
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  chatButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButtonImage: {
    width: 40,
    height: 40,
    tintColor: '#fff'
  },
  chatWindow: {
    width: 320,
    height: 480,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatHeader: {
    backgroundColor: '#3498db',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 15,
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  }, 
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#2c3e50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    padding: 15,
    flexGrow: 1,
    paddingBottom: 5,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
  },
  botBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userBubble: {
    backgroundColor: '#3498db',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botText: {
    color: '#333',
    fontSize: 16,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#333',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#3498db',
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  sendText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Banner;