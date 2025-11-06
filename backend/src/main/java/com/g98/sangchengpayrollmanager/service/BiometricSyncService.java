package com.g98.sangchengpayrollmanager.service;

import com.g98.sangchengpayrollmanager.device.ZKTecoClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class BiometricSyncService {
    private final ZKTecoClient zkClient;

    @Qualifier("zkExecutor")
    private final ExecutorService exec;

    /**
     * Push user với timeout, trả về ngay khi xong (không đợi cleanup)
     */
    public boolean pushUserBlocking(String emp, String name, String pin, boolean admin, long timeoutMs) {
        int priv = admin ? 14 : 0;

        try {
            // Chạy trong executor với timeout
            Boolean result = CompletableFuture
                    .supplyAsync(() -> {
                        try {
                            return zkClient.upsertUser(emp, name, pin, priv, true);
                        } catch (Exception e) {
                            System.err.println("❌ upsertUser failed: " + e.getMessage());
                            return null;
                        }
                    }, exec)
                    .orTimeout(timeoutMs, TimeUnit.MILLISECONDS)
                    .exceptionally(ex -> {
                        System.err.println("⚠️ Timeout or error: " + ex.getMessage());
                        return null;
                    })
                    .join(); // Đợi kết quả (hoặc timeout)

            // Nếu thành công -> trả về true ngay
            if (Boolean.TRUE.equals(result)) {
                return true;
            }

            // Nếu thất bại -> verify bằng existsUser (có thể đã tạo được)
            System.out.println("🔍 Verifying user existence...");
            return zkClient.existsUser(emp);

        } catch (Exception e) {
            System.err.println("❌ pushUserBlocking exception: " + e.getMessage());
            return false;
        }
    }
}
