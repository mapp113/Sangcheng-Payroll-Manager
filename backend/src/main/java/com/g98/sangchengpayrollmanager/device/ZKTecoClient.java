package com.g98.sangchengpayrollmanager.device;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ZKTecoClient {
    @Value("${zkteco.enabled:true}")
    private boolean enabled;
    @Value("${zkteco.ip}")
    private String ip;
    @Value("${zkteco.port:4370}")
    private int port;
    @Value("${zkteco.machine-no:1}")
    private int machineNo;
    @Value("${zkteco.password:}")
    private String devicePassword;

    static {
        System.setProperty(com.jacob.com.LibraryLoader.JACOB_DLL_PATH,
                "C:/Users/Admin/Downloads/jacob-1.20-x64.dll");
        com.jacob.com.LibraryLoader.loadJacobLibrary();
    }

    private ActiveXComponent connect() {
        if (!enabled) throw new IllegalStateException("ZKTeco sync disabled");
        com.jacob.com.ComThread.InitSTA();
        ActiveXComponent zk = null;
        try {
            zk = new ActiveXComponent("zkemkeeper.ZKEM");
            boolean ok = Dispatch.call(zk, "Connect_Net", ip, port).getBoolean();
            if (!ok) throw new RuntimeException("Connect_Net failed " + ip + ":" + port);

            if (devicePassword != null && !devicePassword.isBlank()) {
                boolean pwOk = Dispatch.call(zk, "SetCommPassword", Integer.parseInt(devicePassword)).getBoolean();
                if (!pwOk) throw new RuntimeException("SetCommPassword failed");
            }

            Dispatch.call(zk, "EnableDevice", machineNo, false); // Lock device
            return zk;
        } catch (RuntimeException ex) {
            if (zk != null) {
                try {
                    Dispatch.call(zk, "Disconnect");
                } catch (Exception ignore) {
                }
                zk.safeRelease();
            }
            com.jacob.com.ComThread.Release();
            throw ex;
        }
    }

    /**
     * DISCONNECT NHANH - cleanup async trong background
     */
    private void disconnect(ActiveXComponent zk) {
        // Unlock device ĐỒNG BỘ (bắt buộc phải xong)
        try {
            Dispatch.call(zk, "EnableDevice", machineNo, true);
        } catch (Exception e) {
            System.err.println("⚠️ Failed to unlock device: " + e.getMessage());
        }

        // Disconnect & cleanup ASYNC (không block response)
        new Thread(() -> {
            try {
                Thread.sleep(50); // Đợi unlock xử lý xong
                Dispatch.call(zk, "Disconnect");
                Thread.sleep(100); // Đợi disconnect hoàn tất
            } catch (Exception ignore) {
            } finally {
                try {
                    zk.safeRelease();
                } catch (Exception ignore) {
                }
                try {
                    com.jacob.com.ComThread.Release();
                } catch (Exception ignore) {
                }
            }
        }, "ZK-Cleanup").start();
    }

    public boolean upsertUser(String userId, String name, String password, int privilege, boolean enabledFlag) {
        ActiveXComponent zk = null;
        try {
            zk = connect();
            boolean ok = Dispatch.call(zk, "SSR_SetUserInfo",
                    new Variant(machineNo),
                    new Variant(userId),
                    new Variant(name != null ? name : ""),
                    new Variant(password != null ? password : ""),
                    new Variant(privilege),
                    new Variant(enabledFlag)
            ).getBoolean();

            if (!ok) {
                int err = Dispatch.call(zk, "GetLastError").getInt();
                throw new RuntimeException("SSR_SetUserInfo failed, error=" + err);
            }
            return true;
        } finally {
            if (zk != null) disconnect(zk);
        }
    }

    public boolean existsUser(String userId) {
        ActiveXComponent zk = null;
        try {
            zk = connect();
            Variant name = new Variant("", true);
            Variant pwd = new Variant("", true);
            Variant prv = new Variant(0, true);
            Variant en = new Variant(false, true);
            boolean ok = Dispatch.call(zk, "SSR_GetUserInfo",
                    new Variant(machineNo), new Variant(userId), name, pwd, prv, en).getBoolean();
            return ok;
        } finally {
            if (zk != null) disconnect(zk);
        }
    }
}
