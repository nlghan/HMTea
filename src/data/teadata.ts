const CoffeeData = [
    {
      id: 'C1',
      name: 'Green Tea',
      description: `Green tea is a beloved beverage known for its soothing qualities. Made from steeping dried tea leaves, it offers a refreshing and slightly earthy flavor profile. Originating in China, green tea gained popularity for its health benefits and delicate taste.`,
      imagelink_square: require('../assets/tea_assets/green_tea/square/greentea.jpg'),
      imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/greentea.jpg'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.6', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Tea',
      index: 0,
    },
    {
      id: 'C2',
      name: 'Hot Green Tea',
      description: `Hot green tea is a comforting and rejuvenating beverage, cherished for its simplicity and healthful properties. Crafted from delicate green tea leaves, this soothing drink offers a gentle aroma and a clean, grassy flavor. Steeped in hot water, it releases its natural antioxidants, creating a warm and invigorating brew that is perfect for moments of relaxation or as a revitalizing pick-me-up. Whether enjoyed on a chilly day or as a soothing ritual, hot green tea provides a calming and refreshing experience for tea enthusiasts everywhere.`,
      imagelink_square: require('../assets/tea_assets/green_tea/square/green-tea-origin.jpg'),
      imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/green-tea-origin.jpg'),
      ingredients: 'Hot',
      special_ingredient: 'With Hot Water',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.8', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.8,
      ratings_count: '7000',
      favourite: false,
      type: 'Tea',
      index: 1,
    },
    {
      id: 'C3',
      name: 'Cinnamon Green Tea',
      description: `Cinnamon green tea is a delightful fusion of aromatic cinnamon and delicate green tea leaves, offering a harmonious blend of flavors. The warmth of cinnamon spices up the soothing green tea, creating a comforting and invigorating beverage. With each sip, you'll experience a subtle sweetness from the cinnamon that perfectly complements the fresh, grassy notes of the green tea. This flavorful combination not only tantalizes the taste buds but also provides a host of health benefits, from antioxidant properties to potential metabolism-boosting effects. Whether you're seeking a cozy drink on a chilly day or a flavorful treat to uplift your spirits, cinnamon green tea offers a delicious and aromatic escape.`,
      imagelink_square: require('../assets/tea_assets/green_tea/square/green-tea-cinnamon.jpg'),
      imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/green-tea-cinnamon.jpg'),
      ingredients: 'Cinnamon',
      special_ingredient: 'With Ginger',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.8', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.6,
      ratings_count: '6000',
      favourite: false,
      type: 'Tea',
      index: 2,
    },
    {
      id: 'C4',
      name: 'Pomegranate Green Tea',
      description: `Pomegranate green tea is a vibrant and refreshing blend, combining the tartness of pomegranate with the smoothness of green tea. Bursting with fruity flavor, this infusion offers a tangy and slightly sweet taste that invigorates the senses. Each sip is a delightful balance of antioxidant-rich pomegranate and the soothing qualities of green tea, creating a revitalizing drink that is both flavorful and beneficial for your well-being. Whether enjoyed hot or iced, pomegranate green tea is a delicious way to elevate your tea experience.`,
      imagelink_square: require('../assets/tea_assets/green_tea/square/Pomegranate-Green-Tea.jpg'),
      imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/Pomegranate-Green-Tea.jpg'),
      ingredients: 'Pomegranate',
      special_ingredient: 'With Sugar',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.8', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.5,
      ratings_count: '5,678',
      favourite: false,
      type: 'Tea',
      index: 3,
    },
    {
      id: 'C5',
      name: 'Masala Tea',
      description: ``,
      imagelink_square: require(''),
      imagelink_portrait: require(''),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 4,
    },
    {
      id: 'C6',
      name: 'Iced Masala Tea',
      description: ``,
      imagelink_square: require(''),
      imagelink_portrait: require(''),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 5,
    },
    {
      id: 'C7',
      name: 'Masala Tea Latte',
      description: `.`,
      imagelink_square: require(''),
      imagelink_portrait: require(''),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 6,
    },
    {
      id: 'C8',
      name: 'Hot Masala Tea',
      description: `.`,
      imagelink_square: require(''),
      imagelink_portrait: require(''),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 7,
    },
    {
      id: 'C9',
      name: 'Lemon Tea',
      description: ``,
      imagelink_square: require(''),
      imagelink_portrait: require(''),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 8,
    },
    {
      id: 'C10',
      name: 'Iced Lemon Tea',
      description: ``,
      imagelink_square: require(''),
      imagelink_portrait: require(''),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 9,
    },
    {
      id: 'C11',
      name: 'Aloe Vera Lemon Tea',
      description: `Espresso is made by forcing nearly boiling water through finely-ground coffee beans, which results in a concentrated, syrup-like coffee drink. This is the base for many Italian beverages in coffee shops. When compared to regular brewed coffee, espresso is much stronger than the other types of coffee drinks. Espressos are enjoyed in shots where a single shot is one ounce and a long (single and double) shot is two ounces in amount, respectively.`,
      imagelink_square: require('../assets/coffee_assets/espresso/square/espresso_pic_2_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/espresso/portrait/espresso_pic_2_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 10,
    },
    {
      id: 'C12',
      name: 'Rose Lemon Tea',
      description: `Espresso is made by forcing nearly boiling water through finely-ground coffee beans, which results in a concentrated, syrup-like coffee drink. This is the base for many Italian beverages in coffee shops. When compared to regular brewed coffee, espresso is much stronger than the other types of coffee drinks. Espressos are enjoyed in shots where a single shot is one ounce and a long (single and double) shot is two ounces in amount, respectively.`,
      imagelink_square: require('../assets/coffee_assets/espresso/square/espresso_pic_3_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/espresso/portrait/espresso_pic_3_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 11,
    },
    {
      id: 'C13',
      name: 'Oolong Tea',
      description: `A latte is an espresso with steamed milk and a dollop of milk foam on top. This beverage is more prevalent in America than other coffee drinks like cappuccinos because it contains less foam, making it smoother and gentler for those with sensitive palettes. And if you want to spice up your latte, add some flavouring syrup. To make an iced version of this drink, simply pour espresso and steamed milk over ice cubes.`,
      imagelink_square: require('../assets/coffee_assets/latte/square/latte_pic_1_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/latte/portrait/latte_pic_1_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 12,
    },
    {
      id: 'C14',
      name: 'Sweet Oolong Tea',
      description: `A latte is an espresso with steamed milk and a dollop of milk foam on top. This beverage is more prevalent in America than other coffee drinks like cappuccinos because it contains less foam, making it smoother and gentler for those with sensitive palettes. And if you want to spice up your latte, add some flavouring syrup. To make an iced version of this drink, simply pour espresso and steamed milk over ice cubes.`,
      imagelink_square: require('../assets/coffee_assets/latte/square/latte_pic_2_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/latte/portrait/latte_pic_2_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 13,
    },
    {
      id: 'C15',
      name: 'Oolong Peach Tea',
      description: `A latte is an espresso with steamed milk and a dollop of milk foam on top. This beverage is more prevalent in America than other coffee drinks like cappuccinos because it contains less foam, making it smoother and gentler for those with sensitive palettes. And if you want to spice up your latte, add some flavouring syrup. To make an iced version of this drink, simply pour espresso and steamed milk over ice cubes.`,
      imagelink_square: require('../assets/coffee_assets/latte/square/latte_pic_3_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/latte/portrait/latte_pic_3_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 14,
    },
    {
      id: 'C16',
      name: 'Iced Oolong Tea',
      description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
      imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_1_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_1_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 15,
    },
    {
      id: 'C17',
      name: 'Jasmine Tea',
      description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
      imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_2_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_2_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 16,
    },
    {
      id: 'C18',
      name: 'Lychee Jasmine Tea',
      description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
      imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
      imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
      ingredients: 'Milk',
      special_ingredient: 'With Steamed Milk',
      prices: [
        {size: 'S', price: '1.38', currency: '$'},
        {size: 'M', price: '3.15', currency: '$'},
        {size: 'L', price: '4.29', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Coffee',
      index: 17,
    },
    {
        id: 'C19',
        name: 'Iced Jasmine Tea',
        description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
        imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
        imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
        ingredients: 'Milk',
        special_ingredient: 'With Steamed Milk',
        prices: [
          {size: 'S', price: '1.38', currency: '$'},
          {size: 'M', price: '3.15', currency: '$'},
          {size: 'L', price: '4.29', currency: '$'},
        ],
        average_rating: 4.7,
        ratings_count: '6,879',
        favourite: false,
        type: 'Coffee',
        index: 17,
      },
      {
        id: 'C20',
        name: 'Strawberry Jasmine Tea',
        description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
        imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
        imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
        ingredients: 'Milk',
        special_ingredient: 'With Steamed Milk',
        prices: [
          {size: 'S', price: '1.38', currency: '$'},
          {size: 'M', price: '3.15', currency: '$'},
          {size: 'L', price: '4.29', currency: '$'},
        ],
        average_rating: 4.7,
        ratings_count: '6,879',
        favourite: false,
        type: 'Coffee',
        index: 17,
      },
      {
        id: 'C21',
        name: 'Lotus Tea',
        description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
        imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
        imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
        ingredients: 'Milk',
        special_ingredient: 'With Steamed Milk',
        prices: [
          {size: 'S', price: '1.38', currency: '$'},
          {size: 'M', price: '3.15', currency: '$'},
          {size: 'L', price: '4.29', currency: '$'},
        ],
        average_rating: 4.7,
        ratings_count: '6,879',
        favourite: false,
        type: 'Coffee',
        index: 17,
      },
      {
        id: 'C22',
        name: 'Blue Lotus Tea',
        description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
        imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
        imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
        ingredients: 'Milk',
        special_ingredient: 'With Steamed Milk',
        prices: [
          {size: 'S', price: '1.38', currency: '$'},
          {size: 'M', price: '3.15', currency: '$'},
          {size: 'L', price: '4.29', currency: '$'},
        ],
        average_rating: 4.7,
        ratings_count: '6,879',
        favourite: false,
        type: 'Coffee',
        index: 17,
      },
      {
        id: 'C23',
        name: 'Lychee Lotus Tea',
        description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
        imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
        imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
        ingredients: 'Milk',
        special_ingredient: 'With Steamed Milk',
        prices: [
          {size: 'S', price: '1.38', currency: '$'},
          {size: 'M', price: '3.15', currency: '$'},
          {size: 'L', price: '4.29', currency: '$'},
        ],
        average_rating: 4.7,
        ratings_count: '6,879',
        favourite: false,
        type: 'Coffee',
        index: 17,
      },
      {
        id: 'C24',
        name: 'Pink Lotus Tea',
        description: `The word "macchiato" means spotted, so a macchiato espresso is an espresso with a splash of milk. Most coffee shops will top off this type of coffee drink with some foamed milk instead of just steamed milk for what's known as a traditional macchiato. `,
        imagelink_square: require('../assets/coffee_assets/macchiato/square/macchiato_pic_3_square.png'),
        imagelink_portrait: require('../assets/coffee_assets/macchiato/portrait/macchiato_pic_3_portrait.png'),
        ingredients: 'Milk',
        special_ingredient: 'With Steamed Milk',
        prices: [
          {size: 'S', price: '1.38', currency: '$'},
          {size: 'M', price: '3.15', currency: '$'},
          {size: 'L', price: '4.29', currency: '$'},
        ],
        average_rating: 4.7,
        ratings_count: '6,879',
        favourite: false,
        type: 'Coffee',
        index: 17,
      },
  ];
  export default CoffeeData;