package com.example.ZenConnect.user;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.UUID;

public class PrefixedIdGenerator implements IdentifierGenerator {
    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) {
        String prefix = "ZEN_";
        String uuid = UUID.randomUUID().toString().replace("-", "").substring(0, 8); // Shorten UUID to 8 characters
        return prefix + uuid;
    }
}
