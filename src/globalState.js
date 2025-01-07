const GlobalState = (() => {
  let _userId = null;

  let _cuisines = {};

  let _flavors = {};

  let _continets = {};

  let _favorites = [];

  let _tried = [];

  let _wishlist = [];

  let _mostFavorite = [];

  let _mostTried = [];

  let _mostWishlist = [];

  let _availableCuisines = [];

  let _remainingCuisinesCount = 0;

  const State = {
    setUserId: (userId) => (_userId = userId),
    getUserId: () => _userId,
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
    getMostFavorite: () => [..._mostFavorite],
    setMostWishlist: (mostWishlist) => (_mostWishlist = [...mostWishlist]),
    getMostWishlist: () => [..._mostWishlist],
    setMostTried: (mostTried) => (_mostTried = [...mostTried]),
    getMostTried: () => [..._mostTried],
    setAvailableCuisines: (strategy) => {
      switch (strategy) {
        case "all":
          _availableCuisines = Object.keys(_cuisines);
          break;
        case "wishlist":
          _availableCuisines = [..._wishlist];
          break;
        case "favorites":
          _availableCuisines = [..._favorites];
          break;
        case "tried":
          _availableCuisines = [..._tried];
          break;
        case "Asia":
          _availableCuisines = [..._continets["Asia"]];
          break;
        case "Africa":
          _availableCuisines = [..._continets["Africa"]];
          break;
        case "North America":
          _availableCuisines = [..._continets["North America"]];
          break;
        case "South America":
          _availableCuisines = [..._continets["South America"]];
          break;
        case "Europe":
          _availableCuisines = [..._continets["Europe"]];
          break;
        case "Oceania":
          _availableCuisines = [..._continets["Oceania"]];
          break;
        case "salty":
          _availableCuisines = [..._flavors["salty"]];
          break;
        case "sweet":
          _availableCuisines = [..._flavors["sweet"]];
          break;
        case "sour":
          _availableCuisines = [..._flavors["sour"]];
          break;
        case "spicy":
          _availableCuisines = [..._flavors["spicy"]];
          break;
        case "umani":
          _availableCuisines = [..._flavors["umani"]];
          break;
        case "mostFavorite":
          _availableCuisines = [..._mostFavorite];
          break;
        case "mostTried":
          _availableCuisines = [..._mostTried];
          break;
        case "mostWishlist":
          _availableCuisines = [..._mostWishlist];
          break;
        default:
          _availableCuisines = [];
      }

      _remainingCuisinesCount = _availableCuisines.length;
    },
    getAvailableCuisines: () => {
      return [..._availableCuisines];
    },
    generateCuisine: () => {
      let cuisine = "";

      if (_remainingCuisinesCount >= 2) {
        const index = Math.floor(Math.random() * _remainingCuisinesCount);
        cuisine = _availableCuisines[index];
        _availableCuisines = _availableCuisines.filter((item) => {
          return item != cuisine;
        });

        _remainingCuisinesCount = _availableCuisines.length;
      } else if (_remainingCuisinesCount == 1) {
        cuisine = _availableCuisines[0];
        _availableCuisines = [];
        _remainingCuisinesCount = 0;
      }

      return cuisine;
    },
    getRemainingCuisineCount: () => {
      return _remainingCuisinesCount;
    },
  };

  return Object.freeze(State);
})();

module.exports = { GlobalState };
