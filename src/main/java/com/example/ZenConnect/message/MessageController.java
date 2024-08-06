package com.example.ZenConnect.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(@RequestBody SendMessageRequest request) {
        return messageService.sendMessage(request.getSenderId(), request.getRecipientId(), request.getContent());
    }

    @GetMapping
    public List<MessageDTO> getMessagesForUser(@RequestParam String userId) {
        return messageService.getMessagesForUser(userId);
    }

    @GetMapping("/conversation")
    public List<MessageDTO> getConversation(@RequestParam String userId1, @RequestParam String userId2) {
        return messageService.getConversation(userId1, userId2);
    }

    @GetMapping("/getByRecipientId")
    public ResponseEntity<List<Message>> getMessages(@RequestParam("recipientId") String recipientId) {
        List<Message> messages = messageService.getMessagesByRecipientId(recipientId);
        return ResponseEntity.ok(messages);
    }
}

