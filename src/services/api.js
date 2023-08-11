import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '.firebase-config.js'

const register = async () => {
    try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}

const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async () => {
    await signOut(auth);
}

/*
    useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, [auth.currentUser])
  
*/