package com.example.ZenConnect.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderId(String senderId);
    List<Message> findByRecipientId(String recipientId);
    List<Message> findBySenderIdAndRecipientId(String senderId, String recipientId);
    @Query("SELECT m FROM Message m WHERE (m.sender.id = :userId1 AND m.recipient.id = :userId2) OR (m.sender.id = :userId2 AND m.recipient.id = :userId1)")
    List<Message> findConversation(@Param("userId1") String userId1, @Param("userId2") String userId2);
    @Query("SELECT m FROM Message m WHERE m.sender.id = :userId OR m.recipient.id = :userId")
    List<Message> findMessagesBySenderIdOrRecipientId(@Param("userId") String userId);

}
