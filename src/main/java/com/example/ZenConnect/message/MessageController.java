package com.example.ZenConnect.message;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message sendMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.sendMessage(messageDTO);
    }

    @GetMapping("/group/{groupId}")
    public List<Message> getMessagesByGroupId(@PathVariable Long groupId) {
        return messageService.getMessagesByGroupId(groupId);
    }

    @PostMapping("/{messageId}/response")
    public Message respondToMessage(@PathVariable Long messageId, @RequestBody ResponseDTO responseDTO) {
        return messageService.respondToMessage(messageId, responseDTO);
    }
}


