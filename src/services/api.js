import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { auth, db } from './firebase-config.js'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"


// Authentication API
export const register = async (email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message);
        return error.code
    }
}

export const login = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User logout!");
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

// Database users API
const usersCollectionRef = collection(db, "users");

export const getAllUsers = async () => {
    try {
        const data = await getDocs(usersCollectionRef)
        const mapUsers = data.docs.map(doc => ({...doc.data(), id: doc.id}));
        return mapUsers;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const addUser = async (newUser) => {
    try {
        const user = (({ id, ...o }) => o)(newUser);
        const id = newUser.id;
        await setDoc(doc(db, "users", id), user);

        console.log("New user added to db!");
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getUserById = async (id) => {
    try {
        const userRef = await doc(db, "users", id);
        const userSnap = await getDoc(userRef);
        
        if(userSnap.exists())
        {
            const user = {...userSnap.data(), id: id}
            console.log(user);
            return user;
        }else
        {
            throw Error("No user found!");
        }
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const updateUser = async (id, newUserData) => {
    const userDoc = doc(db, "users", id);
    try {
        await updateDoc(userDoc, newUserData);
        console.log(`User ${id} updated!`);
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    try {
        await deleteDoc(userDoc);
        console.log(`User ${id} deleted!`);
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
