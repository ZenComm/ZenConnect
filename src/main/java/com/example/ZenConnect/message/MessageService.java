package com.example.ZenConnect.message;

import com.example.ZenConnect.user.User;
import com.example.ZenConnect.user.UserDTO;
import com.example.ZenConnect.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message sendMessage(String senderId, String recipientId, String content) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findById(recipientId).orElseThrow(() -> new RuntimeException("Recipient not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }

    public List<MessageDTO> getMessagesForUser(String userId) {
        List<Message> messages = messageRepository.findMessagesBySenderIdOrRecipientId(userId);
        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MessageDTO> getConversation(String userId1, String userId2) {
        List<Message> messages = messageRepository.findConversation(userId1, userId2);
        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MessageDTO convertToDTO(Message message) {
        UserDTO senderDTO = new UserDTO(message.getSender().getId(), message.getSender().getProfile().getFull_name());
        UserDTO recipientDTO = new UserDTO(message.getRecipient().getId(), message.getRecipient().getProfile().getFull_name());
        return new MessageDTO(message.getId(), senderDTO, recipientDTO, message.getContent(), message.getTimestamp());
    }

    public List<Message> getMessagesByRecipientId(String recipientId) {
        return messageRepository.findByRecipientId(recipientId);
    }
}
