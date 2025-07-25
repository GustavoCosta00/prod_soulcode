import { cert, initializeApp } from 'firebase-admin/app';
import serviceAccont from '../../serviceAccont.json' assert {type: "json"}

const app = initializeApp({
    credential: cert(serviceAccont)
})

export default app