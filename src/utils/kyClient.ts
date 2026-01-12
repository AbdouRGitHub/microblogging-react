import Ky from 'ky';

const kyClient = Ky.create({prefixUrl: "http://localhost:8080/", credentials: "include"});

export default kyClient;