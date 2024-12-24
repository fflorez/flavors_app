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
    GlobalState.setAvailableCuisines("default");
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

  // Verify setting available cuisine with  all strategy
  test("<HAPPY>[setAvailableCuisines] - Set with all", () => {
    GlobalState.setAvailableCuisines("all");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      allCuisines.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(allCuisines.length);
  });

  // Verify setting available cuisine with wishlist strategy
  test("<HAPPY>[setAvailableCuisines] - Set with wishlist", () => {
    GlobalState.setWishlist(wishlist);
    GlobalState.setAvailableCuisines("wishlist");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(wishlist.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(wishlist.length);
  });

  // Verify setting available cuisine with favorites strategy
  test("<HAPPY>[setAvailableCuisines] - Set with favorites", () => {
    GlobalState.setFavorites(favorites);
    GlobalState.setAvailableCuisines("favorites");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(favorites.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(favorites.length);
  });

  // Verify setting available cuisine with tried strategy
  test("<HAPPY>[setAvailableCuisines] - Set with tried", () => {
    GlobalState.setTried(tried);
    GlobalState.setAvailableCuisines("tried");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(tried.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(tried.length);
  });

  // Verify setting available cuisine with asia strategy
  test("<HAPPY>[setAvailableCuisines] - Set with Asia", () => {
    GlobalState.setAvailableCuisines("Asia");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(asia.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(asia.length);
  });

  // Verify setting available cuisine with africa strategy
  test("<HAPPY>[setAvailableCuisines] - Set with Africa", () => {
    GlobalState.setAvailableCuisines("Africa");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(africa.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(africa.length);
  });

  // Verify setting available cuisine with North America strategy
  test("<HAPPY>[setAvailableCuisines] - Set with North America", () => {
    GlobalState.setAvailableCuisines("North America");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      northAmerica.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(northAmerica.length);
  });

  // Verify setting available cuisine with South America strategy
  test("<HAPPY>[setAvailableCuisines] - Set with South America", () => {
    GlobalState.setAvailableCuisines("South America");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      southAmerica.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(southAmerica.length);
  });

  // Verify setting available cuisine with Europe strategy
  test("<HAPPY>[setAvailableCuisines] - Set with Europe", () => {
    GlobalState.setAvailableCuisines("Europe");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(europe.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(europe.length);
  });

  // Verify setting available cuisine with Oceania strategy
  test("<HAPPY>[setAvailableCuisines] - Set with Oceania", () => {
    GlobalState.setAvailableCuisines("Oceania");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(oceania.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(oceania.length);
  });

  // Verify setting available cuisine with salty strategy
  test("<HAPPY>[setAvailableCuisines] - Set with salty", () => {
    GlobalState.setAvailableCuisines("salty");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(salty.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(salty.length);
  });

  // Verify setting available cuisine with sweet strategy
  test("<HAPPY>[setAvailableCuisines] - Set with sweet", () => {
    GlobalState.setAvailableCuisines("sweet");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(sweet.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(sweet.length);
  });

  // Verify setting available cuisine with sour strategy
  test("<HAPPY>[setAvailableCuisines] - Set with sour", () => {
    GlobalState.setAvailableCuisines("sour");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(sour.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(sour.length);
  });

  // Verify setting available cuisine with spicy strategy
  test("<HAPPY>[setAvailableCuisines] - Set with spicy", () => {
    GlobalState.setAvailableCuisines("spicy");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(spicy.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(spicy.length);
  });

  // Verify setting available cuisine with umani strategy
  test("<HAPPY>[setAvailableCuisines] - Set with umani", () => {
    GlobalState.setAvailableCuisines("umani");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(umani.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(umani.length);
  });

  // Verify setting available cuisine with mostFavorite strategy
  test("<HAPPY>[setAvailableCuisines] - Set with mostFavorite", () => {
    GlobalState.setAvailableCuisines("mostFavorite");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      mostFavorite.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostFavorite.length);
  });

  // Verify setting available cuisine with mostTried strategy
  test("<HAPPY>[setAvailableCuisines] - Set with mostTried", () => {
    GlobalState.setAvailableCuisines("mostTried");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(mostTried.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostTried.length);
  });

  // Verify setting available cuisine with mostWishlist strategy
  test("<HAPPY>[setAvailableCuisines] - Set with mostWishlist", () => {
    GlobalState.setAvailableCuisines("mostWishlist");

    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      mostWishlist.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostWishlist.length);
  });

  // Verify generate cuisine empty available cuisines
  test("<ANOMALY>[generateCuisine] - Empty available cuisines", () => {
    expect(GlobalState.generateCuisine()).toBe("");
  });

  test("<HAPPY>[generateCuisne] - One available cuisine", () => {
    GlobalState.addFavorite("100");
    GlobalState.setAvailableCuisines("favorites");

    expect(GlobalState.getAvailableCuisines()).toEqual(["100"]);
    expect(GlobalState.getRemainingCuisineCount()).toBe(1);

    expect(GlobalState.generateCuisine()).toBe("100");
    expect(GlobalState.getAvailableCuisines()).toEqual([]);
    expect(GlobalState.getFavorites()).toEqual(["100"]);
    expect(GlobalState.getRemainingCuisineCount()).toBe(0);
  });

  test("<HAPPY>[generateCuisne] - Get with all", () => {
    GlobalState.setAvailableCuisines("all");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      allCuisines.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(allCuisines.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = allCuisines.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(allCuisines.length - 1);
  });

  test("<HAPPY>[generateCuisne] - Get with wishlist", () => {
    GlobalState.setWishlist(wishlist);
    GlobalState.setAvailableCuisines("wishlist");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(wishlist.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(wishlist.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = wishlist.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(wishlist.length - 1);
    expect(GlobalState.getWishlist().length).toBe(wishlist.length);
  });

  test("<HAPPY>[generateCuisne] - Get with favorites", () => {
    GlobalState.setFavorites(favorites);
    GlobalState.setAvailableCuisines("favorites");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(favorites.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(favorites.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = favorites.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(favorites.length - 1);
    expect(GlobalState.getFavorites().length).toBe(favorites.length);
  });

  test("<HAPPY>[generateCuisne] - Get with tried", () => {
    GlobalState.setTried(tried);
    GlobalState.setAvailableCuisines("tried");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(tried.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(tried.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = tried.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(tried.length - 1);
    expect(GlobalState.getTried().length).toBe(tried.length);
  });

  test("<HAPPY>[generateCuisne] - Get with asia", () => {
    GlobalState.setAvailableCuisines("Asia");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(asia.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(asia.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = asia.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(asia.length - 1);
    expect(GlobalState.getContinent("Asia").length).toBe(asia.length);
  });

  test("<HAPPY>[generateCuisne] - Get with africa", () => {
    GlobalState.setAvailableCuisines("Africa");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(africa.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(africa.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = africa.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(africa.length - 1);
    expect(GlobalState.getContinent("Africa").length).toBe(africa.length);
  });

  test("<HAPPY>[generateCuisne] - Get with northAmerica", () => {
    GlobalState.setAvailableCuisines("North America");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      northAmerica.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(northAmerica.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = northAmerica.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(
      northAmerica.length - 1
    );
    expect(GlobalState.getContinent("North America").length).toBe(
      northAmerica.length
    );
  });

  test("<HAPPY>[generateCuisne] - Get with southAmerica", () => {
    GlobalState.setAvailableCuisines("South America");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      southAmerica.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(southAmerica.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = southAmerica.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(
      southAmerica.length - 1
    );
    expect(GlobalState.getContinent("South America").length).toBe(
      southAmerica.length
    );
  });

  test("<HAPPY>[generateCuisne] - Get with europe", () => {
    GlobalState.setAvailableCuisines("Europe");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(europe.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(europe.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = europe.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(europe.length - 1);
    expect(GlobalState.getContinent("Europe").length).toBe(europe.length);
  });

  test("<HAPPY>[generateCuisne] - Get with oceania", () => {
    GlobalState.setAvailableCuisines("Oceania");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(oceania.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(oceania.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = oceania.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(oceania.length - 1);
    expect(GlobalState.getContinent("Oceania").length).toBe(oceania.length);
  });

  test("<HAPPY>[generateCuisne] - Get with salty", () => {
    GlobalState.setAvailableCuisines("salty");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(salty.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(salty.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = salty.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(salty.length - 1);
    expect(GlobalState.getFlavor("salty").length).toBe(salty.length);
  });

  test("<HAPPY>[generateCuisne] - Get with sweet", () => {
    GlobalState.setAvailableCuisines("sweet");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(sweet.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(sweet.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = sweet.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(sweet.length - 1);
    expect(GlobalState.getFlavor("sweet").length).toBe(sweet.length);
  });

  test("<HAPPY>[generateCuisne] - Get with sour", () => {
    GlobalState.setAvailableCuisines("sour");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(sour.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(sour.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = sour.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(sour.length - 1);
    expect(GlobalState.getFlavor("sour").length).toBe(sour.length);
  });

  test("<HAPPY>[generateCuisne] - Get with spicy", () => {
    GlobalState.setAvailableCuisines("spicy");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(spicy.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(spicy.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = spicy.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(spicy.length - 1);
    expect(GlobalState.getFlavor("spicy").length).toBe(spicy.length);
  });

  test("<HAPPY>[generateCuisne] - Get with umani", () => {
    GlobalState.setAvailableCuisines("umani");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(umani.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(umani.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = umani.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(umani.length - 1);
    expect(GlobalState.getFlavor("umani").length).toBe(umani.length);
  });

  test("<HAPPY>[generateCuisne] - Get with mostFavorite", () => {
    GlobalState.setAvailableCuisines("mostFavorite");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      mostFavorite.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostFavorite.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = mostFavorite.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(
      mostFavorite.length - 1
    );
    expect(GlobalState.getMostFavorite().length).toBe(mostFavorite.length);
  });

  test("<HAPPY>[generateCuisne] - Get with mostTried", () => {
    GlobalState.setAvailableCuisines("mostTried");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(mostTried.sort());
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostTried.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = mostTried.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostTried.length - 1);
    expect(GlobalState.getMostTried().length).toBe(mostTried.length);
  });

  test("<HAPPY>[generateCuisne] - Get with mostWishlist", () => {
    GlobalState.setAvailableCuisines("mostWishlist");
    expect(GlobalState.getAvailableCuisines().sort()).toEqual(
      mostWishlist.sort()
    );
    expect(GlobalState.getRemainingCuisineCount()).toBe(mostWishlist.length);

    const generatedCuisine = GlobalState.generateCuisine();
    const isIn = mostWishlist.includes(generatedCuisine);
    expect(isIn).toBe(true);
    expect(GlobalState.getRemainingCuisineCount()).toBe(
      mostWishlist.length - 1
    );
    expect(GlobalState.getMostWishlist().length).toBe(mostWishlist.length);
  });
});
