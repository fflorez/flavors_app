// test/globalState.test.js

// Import the GlobalState
const { GlobalState } = require("../globalState.js");

const allCuisines = [
  "100",
  "120",
  "200",
  "230",
  "300",
  "340",
  "400",
  "450",
  "500",
  "510",
  "600",
];
const favorites = ["100", "120"];
const wishlist = ["200", "230"];
const tried = ["300", "340"];

const asia = ["100", "120"];
const africa = ["200", "230"];
const northAmerica = ["300", "340"];
const southAmerica = ["400", "450"];
const europe = ["500", "510"];
const oceania = ["600"];

const salty = ["100", "120", "510", "600"];
const sour = ["120", "200", "230", "600"];
const spicy = ["230", "300", "340", "600"];
const sweet = ["340", "400", "450", "600"];
const umani = ["450", "500", "600"];

const mostFavorite = ["100", "120", "510", "600"];
const mostTried = ["230", "300", "340", "600"];
const mostWishlist = ["450", "500", "600"];

const remainingFavorite = ["120", "510", "600"];
const remainingTried = ["300", "340", "600"];
const remainingWishlist = ["450", "600"];

describe("GlobalState", () => {
  beforeEach(() => {
    const cuisines = {
      100: {
        continent: "Asia",
        country: "Asia1",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: true,
        isSour: false,
        isSpicy: false,
        isSweet: false,
        isUmani: false,
      },
      120: {
        continent: "Asia",
        country: "Asia2",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: true,
        isSour: true,
        isSpicy: false,
        isSweet: false,
        isUmani: false,
      },
      200: {
        continent: "Africa",
        country: "Africa1",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: true,
        isSpicy: false,
        isSweet: false,
        isUmani: false,
      },
      230: {
        continent: "Africa",
        country: "Africa2",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: true,
        isSpicy: true,
        isSweet: false,
        isUmani: false,
      },
      300: {
        continent: "North America",
        country: "North America 1",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: false,
        isSpicy: true,
        isSweet: false,
        isUmani: false,
      },
      340: {
        continent: "North America",
        country: "North America 2",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: false,
        isSpicy: true,
        isSweet: true,
        isUmani: false,
      },
      400: {
        continent: "South America",
        country: "South America 1",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: false,
        isSpicy: false,
        isSweet: true,
        isUmani: false,
      },
      450: {
        continent: "South America",
        country: "South America 2",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: false,
        isSpicy: false,
        isSweet: true,
        isUmani: true,
      },
      500: {
        continent: "Europe",
        country: "Europe1",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: false,
        isSour: false,
        isSpicy: false,
        isSweet: false,
        isUmani: true,
      },
      510: {
        continent: "Europe",
        country: "Europe2",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: true,
        isSour: false,
        isSpicy: false,
        isSweet: false,
        isUmani: false,
      },
      600: {
        continent: "Oceania",
        country: "Oceania 1",
        description: "Description",
        isFavorite: false,
        isWishlist: false,
        isTried: false,
        isSalty: true,
        isSour: true,
        isSpicy: true,
        isSweet: true,
        isUmani: true,
      },
    };

    const flavors = {};
    flavors["salty"] = salty;
    flavors["sour"] = sour;
    flavors["spicy"] = spicy;
    flavors["sweet"] = sweet;
    flavors["umani"] = umani;

    const continents = {};
    continents["Asia"] = asia;
    continents["Africa"] = africa;
    continents["North America"] = northAmerica;
    continents["South America"] = southAmerica;
    continents["Europe"] = europe;
    continents["Oceania"] = oceania;

    GlobalState.setAllCuisines(cuisines);
    GlobalState.setFlavors(flavors);
    GlobalState.setContinents(continents);
    GlobalState.setMostFavorite(mostFavorite);
    GlobalState.setMostWishlist(mostWishlist);
    GlobalState.setMostTried(mostTried);
    GlobalState.setFavorites([]);
    GlobalState.setTried([]);
    GlobalState.setWishlist([]);
  });

  // Verify Global State exists
  it("<HAPPY> Check Global State exists", () =>
    expect(GlobalState.getAllCuisines).toBeTruthy());

  // Verify Favorites are set correctly when a list of favorites are passed
  test("<HAPPY>[setFavorites] - Set with list with values", () => {
    GlobalState.setFavorites(favorites);

    // Validate list of favorites is set correctly
    expect(GlobalState.getFavorites().sort()).toEqual(favorites.sort());

    // Validate isFavorite is true for favorites
    favorites.forEach((cuisineId) =>
      expect(GlobalState.getCuisine(cuisineId).isFavorite).toBe(true)
    );

    // Validate isFavorite is false for non favorites
    GlobalState.getAllCuisines().forEach((cuisineId) => {
      if (!favorites.includes(cuisineId)) {
        expect(GlobalState.getCuisine(cuisineId).isFavorite).toBe(false);
      }
    });
  });

  // Verify Favorites are set correctly when an empty list of favorites is passed
  test("<HAPPY>[setFavorites] - Set with list with values", () => {
    // Set Favorites with empty list
    GlobalState.setFavorites([]);

    // Verify favorite list is empty
    expect(GlobalState.getFavorites().sort()).toEqual([]);

    // Validate isFavorite is false for all cuisines
    GlobalState.getAllCuisines().forEach((cuisineId) => {
      expect(GlobalState.getCuisine(cuisineId).isFavorite).toBe(false);
    });
  });

  // Verify Tried are set correctly when a list of tried are passed
  test("<HAPPY>[setTried] - Set with list with values", () => {
    GlobalState.setTried(tried);

    // Validate list of tried is set correctly
    expect(GlobalState.getTried().sort()).toEqual(tried.sort());

    // Validate isTried is true for favorites
    tried.forEach((cuisineId) =>
      expect(GlobalState.getCuisine(cuisineId).isTried).toBe(true)
    );

    // Validate isTried is false for non favorites
    GlobalState.getAllCuisines().forEach((cuisineId) => {
      if (!tried.includes(cuisineId)) {
        expect(GlobalState.getCuisine(cuisineId).isTried).toBe(false);
      }
    });
  });

  // Verify Tried are set correctly when an empty list of tried is passed
  test("<HAPPY>[setTried] - Set with list with values", () => {
    // Set Tried with empty list
    GlobalState.setTried([]);

    // Verify tried list is empty
    expect(GlobalState.getTried().sort()).toEqual([]);

    // Validate isTried is false for all cuisines
    GlobalState.getAllCuisines().forEach((cuisineId) => {
      expect(GlobalState.getCuisine(cuisineId).isTried).toBe(false);
    });
  });

  // Verify Wishlist are set correctly when a list of wishlists are passed
  test("<HAPPY>[setWishlist] - Set with list with values", () => {
    GlobalState.setWishlist(wishlist);

    // Validate list of tried is set correctly
    expect(GlobalState.getWishlist().sort()).toEqual(wishlist.sort());

    // Validate isWishlist is true for favorites
    wishlist.forEach((cuisineId) =>
      expect(GlobalState.getCuisine(cuisineId).isWishlist).toBe(true)
    );

    // Validate isWishlist is false for non favorites
    GlobalState.getAllCuisines().forEach((cuisineId) => {
      if (!wishlist.includes(cuisineId)) {
        expect(GlobalState.getCuisine(cuisineId).isWishlist).toBe(false);
      }
    });
  });

  // Verify Wishlist are set correctly when an empty list of wishlist is passed
  test("<HAPPY>[setTried] - Set with list with values", () => {
    // Set Wishlist with empty list
    GlobalState.setWishlist([]);

    // Verify wishlist list is empty
    expect(GlobalState.getWishlist().sort()).toEqual([]);

    // Validate isWishlist is false for all cuisines
    GlobalState.getAllCuisines().forEach((cuisineId) => {
      expect(GlobalState.getCuisine(cuisineId).isWishlist).toBe(false);
    });
  });

  // Verify adding a favorite works correctly
  test("<HAPPY>[addFavorite] - Add a new cuisine to favorites", () => {
    GlobalState.addFavorite("100");
    expect(GlobalState.getFavorites()).toEqual(["100"]);
    expect(GlobalState.getCuisine("100").isFavorite).toBe(true);
  });

  // Verify removing a favorite works correctly
  test("<HAPPY>[removeFavorite] - Remove a favorite from favorites with multiple favorites", () => {
    GlobalState.setFavorites(mostFavorite);
    expect(GlobalState.getFavorites().sort()).toEqual(mostFavorite.sort());
    mostFavorite.forEach((item) => {
      expect(GlobalState.getCuisine(item).isFavorite).toBe(true);
    });

    GlobalState.removeFavorite("100");
    expect(GlobalState.getFavorites().sort()).toEqual(remainingFavorite.sort());
    expect(GlobalState.getCuisine("100").isFavorite).toBe(false);
  });

  // Verify removing with one favorite works correctly
  test("<HAPPY>[removeFavorite] - Remove a favorite from favorites with one favorites", () => {
    GlobalState.addFavorite("100");
    expect(GlobalState.getFavorites()).toEqual(["100"]);
    expect(GlobalState.getCuisine("100").isFavorite).toBe(true);
    GlobalState.removeFavorite("100");
    expect(GlobalState.getFavorites()).toEqual([]);
    expect(GlobalState.getCuisine("100").isFavorite).toBe(false);
  });

  // Verify adding a tried cuisine works correctly
  test("<HAPPY>[addTried] - Add a new cuisine to tried", () => {
    GlobalState.addTried("100");
    expect(GlobalState.getTried()).toEqual(["100"]);
    expect(GlobalState.getCuisine("100").isTried).toBe(true);
  });

  // Verify removing a tried cuisine works correctly
  test("<HAPPY>[removeTried] - Remove a tried from tried with multiple tried cuisines", () => {
    GlobalState.setTried(mostTried);
    expect(GlobalState.getTried().sort()).toEqual(mostTried.sort());
    mostTried.forEach((item) => {
      expect(GlobalState.getCuisine(item).isTried).toBe(true);
    });

    GlobalState.removeTried("230");
    expect(GlobalState.getTried().sort()).toEqual(remainingTried.sort());
    expect(GlobalState.getCuisine("230").isTried).toBe(false);
  });

  // Verify removing with one tried works correctly
  test("<HAPPY>[removeTried] - Remove a tried from tried with one tried cuisine", () => {
    GlobalState.addTried("100");
    expect(GlobalState.getTried()).toEqual(["100"]);
    expect(GlobalState.getCuisine("100").isTried).toBe(true);
    GlobalState.removeTried("100");
    expect(GlobalState.getTried()).toEqual([]);
    expect(GlobalState.getCuisine("100").isTried).toBe(false);
  });

  // Verify adding a wishlist cuisine works correctly
  test("<HAPPY>[addWishlist] - Add a new cuisine to wishlist", () => {
    GlobalState.addWishlist("100");
    expect(GlobalState.getWishlist()).toEqual(["100"]);
    expect(GlobalState.getCuisine("100").isWishlist).toBe(true);
  });

  // Verify removing a wishlist cuisine works correctly
  test("<HAPPY>[removeWishlist] - Remove a cuisine from wishlist with multiple wishlist cuisines", () => {
    GlobalState.setWishlist(mostWishlist);
    expect(GlobalState.getWishlist().sort()).toEqual(mostWishlist.sort());
    mostWishlist.forEach((item) => {
      expect(GlobalState.getCuisine(item).isWishlist).toBe(true);
    });

    GlobalState.removeWishlist("500");
    expect(GlobalState.getWishlist().sort()).toEqual(remainingWishlist.sort());
    expect(GlobalState.getCuisine("500").isWishlist).toBe(false);
  });

  // Verify removing with one wishlist works correctly
  test("<HAPPY>[removeWishlist] - Remove a cuisine from wishlist with one wishlist cuisine", () => {
    GlobalState.addWishlist("100");
    expect(GlobalState.getWishlist()).toEqual(["100"]);
    expect(GlobalState.getCuisine("100").isWishlist).toBe(true);
    GlobalState.removeWishlist("100");
    expect(GlobalState.getWishlist()).toEqual([]);
    expect(GlobalState.getCuisine("100").isWishlist).toBe(false);
  });
});
