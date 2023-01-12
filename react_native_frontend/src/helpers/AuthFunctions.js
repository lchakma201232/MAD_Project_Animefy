import app from "../configs/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore,getDocs, collection,query, where ,addDoc,setDoc,doc} from "firebase/firestore";

async function checkCredit(user){
    const db = getFirestore(app);
    const q = query(collection(db,"users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    return doc.data().credit;
}

async function addImage(user,base64){
    const db = getFirestore(app);
    const docref = await addDoc(collection(db,user.uid), {
        base64: base64,
        timestamp: Date.now(),
    }
    );
}
async function getImages(user){
    const db = getFirestore(app);
    const doc = await getDocs(collection(db,user.uid));
    const images = doc.docs.map((doc) => {
        return {
            base64: doc.data().base64,
            timestamp: doc.data().timestamp,
        }
        }
    );
    return images;
}
async function addCredit(amount){
    const auth = getAuth(app);
    const user = auth.currentUser;
    const db = getFirestore(app);
    const docref = await addDoc(collection(db,"users", user.uid, "credit"), {
        credit: amount,
    }
    );
}

async function addUser(user){
    const db = getFirestore(app);
    // console.log(user.uid)
    await setDoc(doc(db,"users",user.uid), {
        uid: user.uid,
        credit: 100,
    }
    );
}
async function  updateCredit(user, credit){
    const db = getFirestore(app);
    await setDoc(doc(db,"users", user.uid), {
        uid: user.uid,
        credit: credit,
    });
}

export {checkCredit, addImage, addCredit, getImages, addUser, updateCredit};