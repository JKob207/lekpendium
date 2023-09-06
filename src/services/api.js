import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from './firebase-config.js'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, query, where } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

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
            //console.log(user);
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
    console.log("API")
    console.log(id)
    console.log(newUserData)
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

// Storage API
export const uploadImage = async (image, id) =>
{
    if(!image) return "https://placehold.co/45"
    const imageName = `${image.name}_${id}`
    const imageRef = ref(storage, `avatars/${imageName}`)
    try {
        await uploadBytes(imageRef, image)
        console.log("Avatar uploaded!")
        return imageName;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getAvatar = async (fileName) => {
    if(fileName == "https://placehold.co/45") return fileName
    try {
        const imageRef = ref(storage, `avatars/${fileName}`)
        return await getDownloadURL(imageRef)
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const deleteImage = async (fileName) => {
    const imageRef = ref(storage, `avatars/${fileName}`)
    try {
        await deleteObject(imageRef)
        console.log("Image deleted!");
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

// Questions API
const questionsCategoryCollectionRef = collection(db, "questionsCategory");

export const getAllCategories = async () => {
    try {
        const data = await getDocs(questionsCategoryCollectionRef)
        const mapQuestionCategories = data.docs.map(doc => ({...doc.data(), id: doc.id}));
        //console.log(mapQuestionCategories);
        return mapQuestionCategories;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getCategory = async (categoryName) => {
    try {
        const q = query(collection(db, "questionsCategory"), where("name", "==", categoryName));
        const querySnapshot = await getDocs(q);
        const category = {...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id};
        return category;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getCategoryQuestions = async (categoryName) => {
    try {
        const category = await getCategory(categoryName);
        const querySnapshot = await getDocs(collection(db, "questionsCategory", category.id, "questions"));
        let questionsArray = [];
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            questionsArray.push({...doc.data(), id: doc.id});
        })
        //console.log(questionsArray);
        return questionsArray;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getLimitedAndRandomCategoryQuestion = async (categoryName, limitAmount) => {
    try {
        const categoryQuestions = await getCategoryQuestions(categoryName);
        categoryQuestions.sort(() => Math.random() - 0.5);
        const questionsArray = [];
        const limit = limitAmount > categoryQuestions.length ? categoryQuestions.length : limitAmount;

        for(let i=0;i<limit;i++)
        {
            questionsArray.push(categoryQuestions[i]);
        }
        //console.log(questionsArray);
        return questionsArray;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const addQuestion = async (questionData, categoryName) => {
    try {
        const category = await getCategory(categoryName);
        const questionRef = collection(db, `questionsCategory/${category.id}/questions`);
        await addDoc(questionRef, questionData);
        console.log("Question added!");

    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const getUserQuestions = async (userId, categoryName) => {
    try {
        let categoryArray = [];
        let questionsArray = [];

        if(categoryName == "all")
        {
            categoryArray = ["interna", "medycyna ratunkowa i intensywna terapia", "medycyna rodzinna", "prawo medyczne", "chirurgia", "psychiatria", "pediatria", "ginekologia"];
        }else
        {
            categoryArray = [categoryName];
        }

        for (const cat of categoryArray)
        {
            const category = await getCategory(cat);
            const questionRef = collection(db, `questionsCategory/${category.id}/questions`);
            const q = query(questionRef, where("questionOwner", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                questionsArray.push({...doc.data(), id: doc.id});
            })
        }

        return questionsArray;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}