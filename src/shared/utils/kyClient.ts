import Ky from 'ky';

const kyClient = Ky.create({prefixUrl: import.meta.env.VITE_API_URL , credentials: "include"});

export default kyClient;