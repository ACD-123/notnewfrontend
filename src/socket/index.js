import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

const laravelEcho = new Echo({
    broadcaster: 'pusher',
    key: 'c8f4b6fdabd19545a257',
    wsHost: "159.223.129.107",
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    cluster: 'us2',
    enabledTransports: ['ws', 'wss'],
  });

  export default laravelEcho;