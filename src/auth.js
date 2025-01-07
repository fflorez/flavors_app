import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { firebaseApp } from "./app";
const { GlobalState } = require("./globalState.js");

const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

const createUserEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    GlobalState.setUserId(userCredential.user.uid);
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
  }
};
const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    GlobalState.setUserId(userCredential.user.uid);
  } catch (error) {
    console.error(`Error signing in: ${error.message}`);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    GlobalState.setUserId(null);
  } catch (error) {
    console.error(`Error signing out: ${error.message}`);
  }
};

const authStateChanged = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      GlobalState.setUserId(user.uid);
      console.log(`Signed in as ${user.uid}`);
    } else {
      GlobalState.setUserId(null);
      console.log(`Currently Signed out`);
    }
  });
};

export {
  createUserEmailPassword,
  signInWithEmailPassword,
  authStateChanged,
  signOutUser,
};
