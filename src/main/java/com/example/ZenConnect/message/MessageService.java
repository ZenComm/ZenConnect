package com.example.ZenConnect.message;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(MessageDTO messageDTO) {
        Message message = new Message();
        message.setContent(messageDTO.getContent());
        message.setAnonymous(messageDTO.isAnonymous());
        message.setGroupId(messageDTO.getGroupId());
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessagesByGroupId(Long groupId) {
        return messageRepository.findByGroupId(groupId);
    }

    public Message respondToMessage(Long messageId, ResponseDTO responseDTO) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setResponse(responseDTO.getResponse());
        return messageRepository.save(message);
    }
}


