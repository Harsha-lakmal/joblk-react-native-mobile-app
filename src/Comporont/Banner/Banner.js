import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ChatBot from 'react-native-chatbot';

// Import the logo image
const logo = require('../../Assets/joblk.png'); // Adjust path as needed

const customResponses = new Set(); // To store custom messages

const Banner = () => {
    const [allMessages, setAllMessages] = useState([]);

    const steps = [
        {
            id: '1',
            message: "Hello! I'm Joblk Support Team. How can I help you today?",
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 'courses', label: 'View Courses', trigger: 'courses' },
                { value: 'jobs', label: 'View Jobs', trigger: 'jobs' },
                { value: 'help', label: 'Help me', trigger: 'help' },
            ],
        },
        {
            id: 'courses',
            message: "Here are some courses for you!",
            trigger: 'repeat',
        },
        {
            id: 'jobs',
            message: "Check out these interesting jobs!",
            trigger: 'repeat',
        },
        {
            id: 'help',
            message: "I am here to assist you. What do you need help with?",
            trigger: 'repeat',
        },
        {
            id: 'custom-message',
            message: "Please type your custom message below:",
            trigger: 'user-input',
        },
        {
            id: 'user-input',
            user: true,
            trigger: ({ value }) => {
                const lowerValue = value.toLowerCase().trim();
                if (customResponses.has(lowerValue)) {
                    return 'duplicate-message';
                }
                customResponses.add(lowerValue);
                setAllMessages(prevMessages => [...prevMessages, value]);
                return 'thank-you';
            },
        },
        {
            id: 'thank-you',
            message: "Thank you for your message! We'll get back to you soon.",
            trigger: 'repeat',
        },
        {
            id: 'duplicate-message',
            message: "You've already sent this message. Please send something different.",
            trigger: 'custom-message',
        },
        {
            id: 'repeat',
            options: [
                { value: 'again', label: 'Show options again', trigger: '2' },
                { value: 'new-message', label: 'Send another message', trigger: 'custom-message' },
                { value: 'end', label: 'End conversation', trigger: 'end' },
            ],
        },
        {
            id: 'end',
            message: "Thank you for chatting with Joblk Support Team! Have a great day!",
            end: true,
        }
    ];

    return (
        <View style={styles.container}>
            <ChatBot
                steps={steps}
                botAvatar={logo} // Display bot avatar
                userAvatar={null} // No custom user avatar
                botBubbleColor="#0F3789"
                botFontColor="white"
                userBubbleColor="#FF5733"
                userFontColor="white"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C9FF8F',
        justifyContent: 'center',
    },
});

export default Banner;
