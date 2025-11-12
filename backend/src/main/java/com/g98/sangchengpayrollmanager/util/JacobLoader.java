package com.g98.sangchengpayrollmanager.util;


import java.io.*;
import java.nio.file.*;
import java.util.Locale;

public final class JacobLoader {
    private JacobLoader() {}

    public static void loadJacobFromResources() throws IOException {
        // Phát hiện OS/arch
        String os = System.getProperty("os.name").toLowerCase(Locale.ROOT);
        if (!os.contains("win")) {
            throw new IllegalStateException("JACOB chỉ chạy trên Windows/COM.");
        }
        boolean is64 = System.getProperty("os.arch").contains("64");
        String dllName = is64 ? "jacob-1.20-x64.dll" : "jacob-1.20-x86.dll";
        String resourcePath = "/lib/" + dllName;

        // Trích xuất resource ra file tạm
        Path tempDir = Files.createTempDirectory("jacob-native-");
        tempDir.toFile().deleteOnExit();
        Path dllPath = tempDir.resolve(dllName);

        try (InputStream in = JacobLoader.class.getResourceAsStream(resourcePath)) {
            if (in == null) {
                throw new FileNotFoundException("Không tìm thấy resource: " + resourcePath);
            }
            Files.copy(in, dllPath, StandardCopyOption.REPLACE_EXISTING);
        }

        // Nạp DLL
        System.setProperty(com.jacob.com.LibraryLoader.JACOB_DLL_PATH, dllPath.toAbsolutePath().toString());
        com.jacob.com.LibraryLoader.loadJacobLibrary();
    }
}

