const GlobalState = (() => {
  let _cuisines = {};

  let _flavors = {};

  let _continets = {};

  let _favorites = [];

  let _tried = [];

  let _wishlist = [];

  let _mostFavorite = [];

  let _mostTried = [];

  let _mostWishlist = [];

  const State = {
    setAllCuisines: (cuisines) => Object.assign(_cuisines, cuisines),
    getAllCuisines: () => Object.keys(_cuisines),
    getCuisine: (cuisine) => Object.assign({}, _cuisines[cuisine]),
    setFlavors: (flavors) => Object.assign(_flavors, flavors),
    getFlavor: (flavor) => [..._flavors[flavor]],
    setContinents: (continent) => Object.assign(_continets, continent),
    getContinent: (continent) => [..._continets[continent]],
    setFavorites: (favorites) => {
      _favorites = [...favorites];
      favorites.forEach((cuisine) => {
        _cuisines[cuisine].isFavorite = true;
      });
    },
    getFavorites: () => [..._favorites],
    addFavorite: (favorite) => {
      _favorites.push(favorite);
      _cuisines[favorite].isFavorite = true;
    },
    removeFavorite: (favorite) => {
      _favorites = _favorites.filter(
        (currentCuisine) => currentCuisine !== favorite
      );

      _cuisines[favorite].isFavorite = false;
    },
    setWishlist: (wishlist) => {
      _wishlist = [...wishlist];
      wishlist.forEach((cuisine) => {
        _cuisines[cuisine].isWishlist = true;
      });
    },
    getWishlist: () => [..._wishlist],
    addWishlist: (wishlist) => {
      _wishlist.push(wishlist);
      _cuisines[wishlist].isWishlist = true;
    },
    removeWishlist: (wishlist) => {
      _wishlist = _wishlist.filter(
        (currentCuisine) => currentCuisine !== wishlist
      );

      _cuisines[wishlist].isWishlist = false;
    },
    setTried: (tried) => {
      _tried = [...tried];
      tried.forEach((cuisine) => {
        _cuisines[cuisine].isTried = true;
      });
    },
    getTried: () => [..._tried],
    addTried: (tried) => {
      _tried.push(tried);
      _cuisines[tried].isTried = true;
    },
    removeTried: (tried) => {
      _tried = _tried.filter((currentCuisine) => currentCuisine !== tried);

      _cuisines[tried].isTried = false;
    },
    setMostFavorite: (mostFavorite) => (_mostFavorite = [...mostFavorite]),
    getMostFavorite: () => [..._mostFavorie],
    setMostWishlist: (mostWishlist) => (_mostWishlist = [...mostWishlist]),
    getMostWishlist: () => [..._mostWishlist],
    setMostTried: (mostTried) => (_mostTried = [...mostTried]),
    getMostTried: () => [..._mostTried],
  };

  return Object.freeze(State);
})();

module.exports = { GlobalState };
