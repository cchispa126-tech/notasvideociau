// ============================================
// 🔧 CONFIGURACIÓN DE FIREBASE
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyBowQFEXv4_1Pu9ssR1fLdgsvevdbIhN4M",
    authDomain: "ciau-5d2b2.firebaseapp.com",
    projectId: "ciau-5d2b2",
    storageBucket: "ciau-5d2b2.firebasestorage.app",
    messagingSenderId: "288289997943",
    appId: "1:288289997943:web:cdea93ad690620247c3272"
};
// ============================================

importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.12.1/firebase-messaging-compat.js');

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('📨 Notificación en segundo plano:', payload);
    
    const notificationTitle = payload.notification?.title || '📝 Bloc de Notas';
    const notificationOptions = {
        body: payload.notification?.body || 'Alguien ha actualizado las notas',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        requireInteraction: true,
        data: { url: '/', timestamp: Date.now() }
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});

self.addEventListener('install', (event) => {
    console.log('✅ Service Worker instalado');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activado');
    event.waitUntil(clients.claim());
});