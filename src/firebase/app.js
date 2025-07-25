import { cert, initializeApp } from 'firebase-admin/app';
import serviceAccont from '../../serviceAccont.json' with {type: "json"}

const app = initializeApp({
    credential: cert(serviceAccont)
})

export default app