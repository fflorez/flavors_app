import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  limitToLast,
  set,
  increment,
  onValue,
} from "firebase/database";
import {
  getFirestore,
  doc,
  updateDoc,
  deleteField,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";

import { firebaseApp } from "./app";

const _realtimeDatabase = getDatabase(firebaseApp);
const _firestoreDatabase = getFirestore(firebaseApp);

const _favoritesReference = ref(_realtimeDatabase, "favorites");
const _triedReference = ref(_realtimeDatabase, "tried");
const _wishlistReference = ref(_realtimeDatabase, "wishlist");

/*
************************************************************
************************************************************
Realtime Databse methods 
************************************************************
************************************************************
*/

/**
 * Returns all the cuisines configured in the firebase realtime database
 * @return {Record<string, {continent: string, country: string, description: string, isSalty: boolean, isSour: boolean, isSpicy: boolean, isSweet: boolean, isUmani: boolean}>} The cuisines configured in the realtime database. If no data exists empty object is returned
 */
const getCuisines = async () => {
  const cuisinesRef = ref(_realtimeDatabase, "cuisines");
  let cuisineList = {};

  const snapshot = await get(cuisinesRef);
  snapshot.forEach((childSnapshot) => {
    cuisineList[childSnapshot.key] = childSnapshot.val();
  });

  return cuisineList;
};

/**
 * Returns the cuisne for the provided cuisineId stored in the firebase real-time database
 * @param cuisineId - The ID of the cuisine for which to get data
 * @return {{cuisineId: string, continent: string, country: string, description: string, isSalty: boolean, isSour: boolean, isSpicy: boolean, isSweet: boolean, isUmani: boolean}}
 * The cuisne data returned as an object. If no cuisine found empty object is returned
 */

const getCuisine = async (cuisineId) => {
  const cuisinesRef = ref(_realtimeDatabase, "cuisines/" + cuisineId);
  let cuisine = { id: cuisineId };
  await get(cuisinesRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        cuisine[child.key] = child.val();
      });
    } else {
      console.log("No cuisine data available");
      cuisine = {};
    }
  });

  return cuisine;
};

/**
 * Returns the top 10 most favorite cusines stored in the the firebase real-time database
 * @return {string[]} An array of the top 10 most favorite cuisines. If no cuisine found an empty array is returned
 */
const getTopFavorites = async () => {
  let topFavoritesList = [];
  const topFavoriteQuery = query(
    _favoritesReference,
    orderByChild("count"),
    limitToLast(10)
  );
  await get(topFavoriteQuery).then((snapshot) => {
    console.log(snapshot.val());
    if (snapshot.exists()) {
      topFavoritesList = Object.keys(snapshot.val());
    } else {
      console.log("No top favorite data available");
    }
  });

  return topFavoritesList;
};

/**
 * Update the favorite count for the provided cusine by the amount passed
 * @param {string} cuisineId - The cuisine for which to update the favorite count
 * @param {int} amount - The amount to increase/decrease the favorite count
 */

const updateFavoriteCount = async (cuisineId, amount) => {
  await set(ref(_realtimeDatabase, `favorites/${cuisineId}`), {
    count: increment(amount),
  });
};

/**
 * Returns the top 10 most tried cusines stored in the the firebase real-time database
 * @return {string[]} An array of the top 10 most tried cuisines. If no cuisine found an empty array is returned
 */
const getTopTried = async () => {
  let topTriedList = [];
  const topTriedQuery = query(
    _triedReference,
    orderByChild("count"),
    limitToLast(10)
  );
  await get(topTriedQuery).then((snapshot) => {
    if (snapshot.exists()) {
      topTriedList = Object.keys(snapshot.val());
    } else {
      console.log("No top tried data available");
    }
  });

  return topTriedList;
};

/**
 * Update the tried count for the provided cusine by the amount passed
 * @param {string} cuisineId - The cuisine for which to update the tried count
 * @param {int} amount - The amount to increase/decrease the tried count
 */
const updateTriedCount = async (cuisineId, amount) => {
  await set(ref(_realtimeDatabase, `tried/${cuisineId}`), {
    count: increment(amount),
  });
};

/**
 * Returns the top 10 most wishlisted cusines stored in the the firebase real-time database
 * @return {string[]} An array of the top 10 most wishlisted cuisines. If no cuisine found an empty array is returned
 */
const getTopWishlist = async () => {
  let topWishlistList = [];
  const topWishlistQuery = query(
    _wishlistReference,
    orderByChild("count"),
    limitToLast(10)
  );
  await get(topWishlistQuery).then((snapshot) => {
    if (snapshot.exists()) {
      topWishlistList = Object.keys(snapshot.val());
    } else {
      console.log("No top wishlist data available");
    }
  });

  return topWishlistList;
};

/**
 * Update the wishlist count for the provided cusine by the amount passed
 * @param {string} cuisineId - The cuisine for which to update the wishlist count
 * @param {int} amount - The amount to increase/decrease the wishlist count
 */
const updateWishlistCount = async (cuisineId, amount) => {
  await set(ref(_realtimeDatabase, `wishlist/${cuisineId}`), {
    count: increment(amount),
  });
};

/*
************************************************************
************************************************************
Firestore Methods
************************************************************
************************************************************
*/

/**
 * Create a document at the provided reference setting the value to true
 * @param {string} docReference - the root of the new document
 * @param {string} cuisineId - the ID of the cuisine to set
 */
const _setField = async (docReference, cuisineId) => {
  let cuisine = {};
  cuisine[cuisineId] = true;
  await setDoc(docReference, cuisine, { merge: true });
};

/**
 * Delete a document at the provided reference
 * @param {string} docReference - the root of the document
 * @param {string} cuisineId - the ID of the cuisine to remove
 */
const _deleteField = async (docReference, cuisineId) => {
  let cuisine = {};
  cuisine[cuisineId] = deleteField();
  // Remove the 'cuisineId' field from the document
  await updateDoc(docReference, cuisine);
};

/**
 * Get the cuisines that have been marked as favorite by the user
 * @param {string} userId - the ID of the user
 * @returns {string[]} an array of cuisine IDs that are in the user's favorites. If no cusines have been marked as favorite an empty array is returend
 */
const getUserFavorites = async (userId) => {
  let favoritesList = [];

  await getDoc(doc(_firestoreDatabase, "favorites", userId)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        favoritesList = Object.keys(snapshot.data());
      } else {
        console.log("No favorites document!");
      }
    }
  );

  return favoritesList;
};

/**
 * Add a cuisine to the user's list of favorite cuisines
 * @param {string} userId - the ID of the user
 * @param {string} cusineId - the cuisine to add to the list of favorites
 */
const setUserFavorite = async (userId, cuisineId) => {
  await _setField(doc(_firestoreDatabase, "favorites", userId), cuisineId);
};

/**
 * Remove a cuisine from the user's list of favorite cuisines
 * @param {string} userId - the ID of the user
 * @param {string} cusineId - the cuisine to remove from the list of favorites
 */
const removeUserFavorite = async (userId, cuisineId) => {
  await _deleteField(doc(_firestoreDatabase, "favorites", userId), cuisineId);
};

/**
 * Get the cuisines that have been marked as tried by the user
 * @param {string} userId - the ID of the user
 * @returns {string[]} an array of cuisine IDs that are in the user's tried. If no cusines have been marked as tried an empty array is returend
 */
const getUserTried = async (userId) => {
  let triedList = [];

  await getDoc(doc(_firestoreDatabase, "tried", userId)).then((snapshot) => {
    if (snapshot.exists()) {
      triedList = Object.keys(snapshot.data());
    } else {
      console.log("No tried document!");
    }
  });

  return triedList;
};

/**
 * Add a cuisine to the user's list of tried cuisines
 * @param {string} userId - the ID of the user
 * @param {string} cusineId - the cuisine to add to the list of tried
 */
const setUserTried = async (userId, cuisineId) => {
  await _setField(doc(_firestoreDatabase, "tried", userId), cuisineId);
};

/**
 * Remove a cuisine from the user's list of tried cuisines
 * @param {string} userId - the ID of the user
 * @param {string} cusineId - the cuisine to remove from the list of tried
 */
const removeUserTried = async (userId, cuisineId) => {
  await _deleteField(doc(_firestoreDatabase, "tried", userId), cuisineId);
};

/**
 * Get the cuisines that have been marked as wishlisted by the user
 * @param {string} userId - the ID of the user
 * @returns {string[]} an array of cuisine IDs that are in the user's wishlist. If no cusines have been marked as wishlisted an empty array is returend
 */
const getUserWishlist = async (userId) => {
  let wishlistList = [];

  await getDoc(doc(_firestoreDatabase, "wishlist", userId)).then((snapshot) => {
    if (snapshot.exists()) {
      wishlistList = Object.keys(snapshot.data());
    } else {
      console.log("No wishlist document!");
    }
  });
};

/**
 * Add a cuisine to the user's list of wishlisted cuisines
 * @param {string} userId - the ID of the user
 * @param {string} cusineId - the cuisine to add to the list of wishlisted
 */
const setUserWishlist = async (userId, cuisineId) => {
  await _setField(doc(_firestoreDatabase, "wishlist", userId), cuisineId);
};

/**
 * Remove a cuisine from the user's list of wishlisted cuisines
 * @param {string} userId - the ID of the user
 * @param {string} cusineId - the cuisine to remove from the list of wishlisted
 */
const removeUserWishlist = async (userId, cuisineId) => {
  await _deleteField(doc(_firestoreDatabase, "wishlist", userId), cuisineId);
};

export {
  getCuisines,
  getCuisine,
  getTopFavorites,
  updateFavoriteCount,
  getTopTried,
  updateTriedCount,
  getTopWishlist,
  updateWishlistCount,
  getUserFavorites,
  setUserFavorite,
  removeUserFavorite,
  getUserTried,
  setUserTried,
  removeUserTried,
  getUserWishlist,
  setUserWishlist,
  removeUserWishlist,
};
