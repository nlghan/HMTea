const TeaData = [
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
    type: 'Green Tea',
    index: 0,
  },
  {
    id: 'C2',
    name: 'Hot Green Tea',
    description: `Hot green tea is a comforting and rejuvenating beverage, cherished for its simplicity and healthful properties. Crafted from delicate green tea leaves, this soothing drink offers a gentle aroma and a clean, grassy flavor. Steeped in hot water, it releases its natural antioxidants, creating a warm and invigorating brew that is perfect for moments of relaxation or as a revitalizing pick-me-up. Whether enjoyed on a chilly day or as a soothing ritual, hot green tea provides a calming and refreshing experience for tea enthusiasts everywhere.`,
    imagelink_square: require('../assets/tea_assets/green_tea/square/green_tea_origin.jpg'),
    imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/green_tea_origin.jpg'),
    ingredients: 'Hot',
    special_ingredient: 'With Hot Water',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.8,
    ratings_count: '7000',
    favourite: false,
    type: 'Green Tea',
    index: 1,
  },
  {
    id: 'C3',
    name: 'Cinnamon Green Tea',
    description: `Cinnamon green tea is a delightful fusion of aromatic cinnamon and delicate green tea leaves, offering a harmonious blend of flavors. The warmth of cinnamon spices up the soothing green tea, creating a comforting and invigorating beverage. With each sip, you'll experience a subtle sweetness from the cinnamon that perfectly complements the fresh, grassy notes of the green tea. This flavorful combination not only tantalizes the taste buds but also provides a host of health benefits, from antioxidant properties to potential metabolism-boosting effects. Whether you're seeking a cozy drink on a chilly day or a flavorful treat to uplift your spirits, cinnamon green tea offers a delicious and aromatic escape.`,
    imagelink_square: require('../assets/tea_assets/green_tea/square/green_tea_cinnamon.jpg'),
    imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/green_tea_cinnamon.jpg'),
    ingredients: 'Cinnamon',
    special_ingredient: 'With Ginger',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.6,
    ratings_count: '6000',
    favourite: false,
    type: 'Green Tea',
    index: 2,
  },
  {
    id: 'C4',
    name: 'Pomegranate Green Tea',
    description: `Pomegranate green tea is a vibrant and refreshing blend, combining the tartness of pomegranate with the smoothness of green tea. Bursting with fruity flavor, this infusion offers a tangy and slightly sweet taste that invigorates the senses. Each sip is a delightful balance of antioxidant-rich pomegranate and the soothing qualities of green tea, creating a revitalizing drink that is both flavorful and beneficial for your well-being. Whether enjoyed hot or iced, pomegranate green tea is a delicious way to elevate your tea experience.`,
    imagelink_square: require('../assets/tea_assets/green_tea/square/pomegranate_green_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/green_tea/portrait/pomegranate_green_tea.jpg'),
    ingredients: 'Pomegranate',
    special_ingredient: 'With Sugar',
    prices: [
      {size: 'S', price: '1.4', currency: '$'},
      {size: 'M', price: '1.6', currency: '$'},       
      {size: 'L', price: '2', currency: '$'},
    ],
    average_rating: 4.5,
    ratings_count: '5,678',
    favourite: false,
    type: 'Green Tea',
    index: 3,
  }, 
  {
    id: 'C5',
    name: 'Masala Tea',
    description: `Masala tea is a rich and aromatic blend, harmonizing the bold spices of India with the comforting warmth of tea. This exquisite infusion brings together a symphony of flavors, with notes of ginger, cardamom, cinnamon, cloves, and black pepper dancing on your palate. Each sip is a journey through the vibrant streets of India, where the spicy aroma fills the air with anticipation.`,
    imagelink_square: require('../assets/tea_assets/masala_tea/square/masala_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/masala_tea/portrait/masala_tea.jpg'),
    ingredients: 'Milk',
    special_ingredient: 'With Steamed Milk',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Masala Tea',
    index: 4,
  },
  {
    id: 'C6',
    name: 'Iced Masala Tea',
    description: `Iced Masala Tea is a refreshing twist on the classic Indian blend, combining bold spices with the coolness of ice. This chilled infusion offers a tantalizing mix of ginger, cardamom, cinnamon, cloves, and black pepper, delivering a burst of flavor with every sip. Perfect for hot days or as a refreshing pick-me-up, Iced Masala Tea is a delightful and invigorating beverage to enjoy anytime, anywhere.`,
    imagelink_square: require('../assets/tea_assets/masala_tea/square/masala_chai_ice.jpg'),
    imagelink_portrait: require('../assets/tea_assets/masala_tea/portrait/masala_chai_ice.jpg'),
    ingredients: 'Milk',
    special_ingredient: 'With Ice',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Masala Tea',
    index: 5,
  },
  {
    id: 'C7',
    name: 'Masala Tea Latte',
    description: `Masala Tea Latte is a luxurious fusion of traditional Indian spices and velvety steamed milk, creating a comforting and indulgent beverage. This delightful concoction combines the bold flavors of ginger, cardamom, cinnamon, cloves, and black pepper with the creamy texture of milk, resulting in a harmonious blend of spicy warmth and smooth sweetness.`,
    imagelink_square: require('../assets/tea_assets/masala_tea/square/masala_tea_cheese.jpg'),
    imagelink_portrait: require('../assets/tea_assets/masala_tea/portrait/masala_tea_cheese.jpg'),
    ingredients: 'Milk',
    special_ingredient: 'With Cheese',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Masala Tea',
    index: 6,
  },
  {
    id: 'C8',
    name: 'Hot Masala Tea',
    description: `Hot Masala Tea is a comforting embrace of rich spices and aromatic black tea, delivering a warming sensation with every sip. This traditional Indian blend features a harmonious combination of ginger, cardamom, cinnamon, cloves, and black pepper, creating a bold and invigorating flavor profile. Served piping hot, this aromatic infusion is perfect for cozy mornings or chilly evenings, enveloping you in its fragrant embrace and soothing your senses with its bold, spicy warmth.`,
    imagelink_square: require('../assets/tea_assets/masala_tea/square/masala_chai.jpg'),
    imagelink_portrait: require('../assets/tea_assets/masala_tea/portrait/masala_chai.jpg'),
    ingredients: 'Milk',
    special_ingredient: 'With Biscults',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Masala Tea',
    index: 7,
  },
  {
    id: 'C9',
    name: 'Lemon Tea',
    description: `Lemon Tea is a zesty and refreshing infusion that combines the bright citrus notes of lemon with the soothing qualities of tea. This invigorating blend offers a delightful balance of tartness and sweetness, creating a rejuvenating beverage that awakens the senses.`,
    imagelink_square: require('../assets/tea_assets/lemon_tea/square/lemon_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/lemon_tea/portrait/lemon_tea.jpg'),
    ingredients: 'Black Tea',
    special_ingredient: 'With Honey',
    prices: [
      {size: 'S', price: '1.2', currency: '$'},
      {size: 'M', price: '1.4', currency: '$'},
      {size: 'L', price: '1.6', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Lemon Tea',
    index: 8,
  },
  {
    id: 'C10',
    name: 'Iced Lemon Tea',
    description: `Iced Lemon Tea is a cool and refreshing beverage that blends the zesty tang of lemon with the smoothness of tea, served over ice for a refreshing twist. This invigorating concoction features freshly brewed black tea infused with the vibrant flavor of lemon juice, creating a perfect balance of citrusy brightness and tea richness.`,

    imagelink_square: require('../assets/tea_assets/lemon_tea/square/lemonteaice_home.jpg'),

    imagelink_portrait: require('../assets/tea_assets/lemon_tea/portrait/iced_lemon_tea.jpg'),
    ingredients: 'Black Tea',
    special_ingredient: 'With Ice',
    prices: [
      {size: 'S', price: '1', currency: '$'},
      {size: 'M', price: '1.6', currency: '$'},
      {size: 'L', price: '2', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Lemon Tea',
    index: 9,
  },
  {
    id: 'C11',
    name: 'Aloe Vera Lemon Tea',
    description: `Aloe Vera Lemon Tea is a unique and rejuvenating blend that combines the soothing properties of aloe vera with the refreshing zest of lemon. This revitalizing infusion features a delicate balance of freshly brewed tea infused with the cooling essence of aloe vera gel and the tangy citrus notes of lemon juice.`,
    imagelink_square: require('../assets/tea_assets/lemon_tea/square/aloeveralemontea_home.jpg'),
    imagelink_portrait: require('../assets/tea_assets/lemon_tea/portrait/aloeveralemontea.jpg'),
    ingredients: 'Black Tea',
    special_ingredient: 'With Ice',
    prices: [
      {size: 'S', price: '1', currency: '$'},
      {size: 'M', price: '1.6', currency: '$'},
      {size: 'L', price: '2', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Lemon Tea',
    index: 10,
  },
  {
    id: 'C12',
    name: 'Rose Lemon Tea',
    description: `Rose Lemon Tea is a delightful fusion of floral elegance and zesty citrus, offering a uniquely refreshing and aromatic experience. This exquisite blend combines the delicate fragrance of rose petals with the tangy brightness of lemon, creating a harmonious balance of flavors. Each sip is a journey through a garden of roses, uplifted by the invigorating zest of lemon.`,
    imagelink_square: require('../assets/tea_assets/lemon_tea/square/rose_lemon_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/lemon_tea/portrait/rose_lemon_tea.jpg'),
    ingredients: 'Black Tea',
    special_ingredient: 'With Ice',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.4', currency: '$'},

    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Lemon Tea',
    index: 11,
  },
  {
    id: 'C13',
    name: 'Oolong Tea',
    description: `Oolong Tea, also known as "Wulong" or "Black Dragon" tea, is a traditional Chinese tea renowned for its complex flavor profile and numerous health benefits. This semi-oxidized tea falls between green and black teas in terms of oxidation, resulting in a unique combination of floral and fruity notes with a subtle earthy undertone.`,
    imagelink_square: require('../assets/tea_assets/oolong_tea/square/oolong_fresh_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/oolong_tea/portrait/oolong_fresh_tea.jpg'),
    ingredients: 'Oolong Tea',
    special_ingredient: 'Hot and No Sugar',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.4', currency: '$'},

    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Oolong Tea',
    index: 12,
  },
  {
    id: 'C14',
    name: 'Sweet Oolong Tea',
    description: `Sweet Oolong Tea is a delightful variation of traditional Oolong Tea infused with a touch of sweetness, offering a harmonious blend of rich flavor and subtle sweetness. Crafted by combining premium Oolong tea leaves with a hint of natural sweetener such as honey or sugar, this indulgent beverage provides a satisfying balance of earthy notes and gentle sweetness.`,
    imagelink_square: require('../assets/tea_assets/oolong_tea/square/olong_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/oolong_tea/portrait/olong_tea.jpg'),
    ingredients: 'Oolong Tea',
    special_ingredient: 'With Sugar',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.4', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Oolong Tea',
    index: 13,
  },
  {
    id: 'C15',
    name: 'Oolong Peach Tea',
    description: `Oolong Peach Tea is a delightful fusion of premium Oolong tea leaves and the juicy sweetness of ripe peaches, creating a harmonious blend of flavors that is both refreshing and satisfying. Crafted by infusing Oolong tea with the essence of ripe peaches, this tea offers a delightful balance of floral notes from the tea leaves and the luscious sweetness of peach.`,
    imagelink_square: require('../assets/tea_assets/oolong_tea/square/oolong_peach_tea.png'),
    imagelink_portrait: require('../assets/tea_assets/oolong_tea/portrait/oolong_peach_tea.png'),
    ingredients: 'Oolong Tea',
    special_ingredient: 'With Peach and Ice',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.4', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Oolong Tea',
    index: 14,
  },
  {
    id: 'C16',
    name: 'Iced Oolong Tea',
    description: `Iced Oolong Tea is a refreshing and invigorating beverage perfect for cooling down on a hot day. Made from premium Oolong tea leaves, this chilled infusion offers a crisp and clean flavor profile with floral and earthy undertones.`,
    imagelink_square: require('../assets/tea_assets/oolong_tea/square/iced_oolong_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/oolong_tea/portrait/iced_oolong_tea.jpg'),
    ingredients: 'Oolong tea',
    special_ingredient: 'With Ice',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.4', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Oolong Tea',
    index: 15,
  },
  {
    id: 'C17',
    name: 'Jasmine Tea',
    description: `Jasmine Tea is a fragrant and aromatic beverage crafted by infusing delicate jasmine blossoms with high-quality green, white, or black tea leaves. Originating from China, this traditional tea is celebrated for its captivating floral aroma and refreshing taste.`,
    imagelink_square: require('../assets/tea_assets/jasmine_tea/square/jasmine_tea.jpeg'),
    imagelink_portrait: require('../assets/tea_assets/jasmine_tea/portrait/jasmine_tea.jpeg'),
    ingredients: 'Tea leaves',
    special_ingredient: 'Hot and No Sugar',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.4', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Jasmine Tea',
    index: 16,
  },
  {
    id: 'C18',
    name: 'Lychee Jasmine Tea',
    description: `Lychee Jasmine Tea is a delightful fusion of fragrant jasmine blossoms and the sweet, tropical flavor of lychee fruit. This refreshing beverage combines the floral notes of jasmine-infused tea with the luscious sweetness of lychee, creating a harmonious blend of flavors that is both uplifting and invigorating.`,
    imagelink_square: require('../assets/tea_assets/jasmine_tea/square/lychee_jasmine_tea.jpg'),
    imagelink_portrait: require('../assets/tea_assets/jasmine_tea/portrait/lychee_jasmine_tea.jpg'),
    ingredients: 'Tea leaves',
    special_ingredient: 'With Ice and Lychee',
    prices: [
      {size: 'S', price: '1.6', currency: '$'},
      {size: 'M', price: '2', currency: '$'},
      {size: 'L', price: '2.2', currency: '$'},
    ],
    average_rating: 4.7,
    ratings_count: '6,879',
    favourite: false,
    type: 'Jasmine Tea',
    index: 17,
  },
  {
      id: 'C19',
      name: 'Iced Jasmine Tea',
      description: `Iced Jasmine Tea is a refreshing and invigorating beverage that combines the delicate floral notes of jasmine-infused tea with the crispness of ice, creating a revitalizing drink perfect for hot days.`,
      imagelink_square: require('../assets/tea_assets/jasmine_tea/square/iced_jasmine_tea.jpeg'),
      imagelink_portrait: require('../assets/tea_assets/jasmine_tea/portrait/iced_jasmine_tea.jpeg'),
      ingredients: 'Tea leaves',
      special_ingredient: 'With Ice',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.6', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Jasmine Tea',
      index: 18,
    },
    {
      id: 'C20',
      name: 'Strawberry Jasmine Tea',
      description: `Strawberry Jasmine Tea is a delightful fusion of fragrant jasmine-infused tea and the sweet, juicy flavor of ripe strawberries. This refreshing beverage combines the floral notes of jasmine with the luscious sweetness of strawberries, creating a harmonious blend of flavors that is both uplifting and invigorating.`,
      imagelink_square: require('../assets/tea_assets/jasmine_tea/square/strawberry_jasmine_tea.jpg'),
      imagelink_portrait: require('../assets/tea_assets/jasmine_tea/portrait/strawberry_jasmine_tea.jpg'),
      ingredients: 'Tea leaves',
      special_ingredient: 'With Ice',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.6', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Jasmine Tea',
      index: 19,
    },
    {
      id: 'C21',
      name: 'Lotus Tea',
      description: `Lotus Tea is a delicate and aromatic beverage made from the petals, stamens, and leaves of the lotus flower. This unique tea is revered for its subtle floral aroma and mild, soothing flavor, making it a popular choice for relaxation and meditation.`,
      imagelink_square: require('../assets/tea_assets/lotus_tea/square/lotus_tea.jpg'),
      imagelink_portrait: require('../assets/tea_assets/lotus_tea/portrait/lotus_tea.jpg'),
      ingredients: 'Dried lotus petals',
      special_ingredient: 'Hot and No Sugar',
      prices: [
        {size: 'S', price: '1', currency: '$'},
        {size: 'M', price: '1.6', currency: '$'},
        {size: 'L', price: '2', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Lotus Tea',
      index: 20,
    },
    {
      id: 'C22',
      name: 'Blue Lotus Tea',
      description: `Blue Lotus Tea, also known as Sacred Blue Lily Tea, is an enchanting beverage derived from the flowers of the Blue Lotus (Nymphaea caerulea) plant. This tea holds historical and cultural significance, revered for its calming and euphoric properties.`,
      imagelink_square: require('../assets/tea_assets/lotus_tea/square/blue_lotus_tea.png'),
      imagelink_portrait: require('../assets/tea_assets/lotus_tea/portrait/blue_lotus_tea.png'),
      ingredients: 'Dried Blue Lotus petals',
      special_ingredient: 'Hot',
      prices: [
        {size: 'S', price: '1.2', currency: '$'},
        {size: 'M', price: '1.4', currency: '$'},
        {size: 'L', price: '1.6', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Lotus Tea',
      index: 21,
    },
    {
      id: 'C23',
      name: 'Lychee Lotus Tea',
      description: `Lychee Lotus Tea is a delightful fusion of the delicate floral notes of lotus tea and the sweet, tropical flavor of lychee fruit. This refreshing beverage combines the subtle aroma of lotus petals with the luscious sweetness of lychee, creating a harmonious blend of flavors that is both uplifting and invigorating.`,
      imagelink_square: require('../assets/tea_assets/lotus_tea/square/lychee_lotus_tea.jpg'),
      imagelink_portrait: require('../assets/tea_assets/lotus_tea/portrait/lychee_lotus_tea.jpg'),
      ingredients: 'Dried Lotus petals',
      special_ingredient: 'With Lychee and Ice',
      prices: [
        {size: 'S', price: '1.2', currency: '$'},
        {size: 'M', price: '1.4', currency: '$'},
        {size: 'L', price: '1.6', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Lotus Tea',
      index: 22,
    },
    {
      id: 'C24',
      name: 'Pink Lotus Tea',
      description: `Pink Lotus Tea is a captivating infusion crafted from the delicate petals of the Pink Lotus (Nelumbo nucifera) flower, revered for its enchanting aroma and subtle floral flavor. This tea holds cultural significance and is cherished for its potential to promote relaxation and inner peace.`,
      imagelink_square: require('../assets/tea_assets/lotus_tea/square/pink_lotus_tea.png'),
      imagelink_portrait: require('../assets/tea_assets/lotus_tea/portrait/pink_lotus_tea.png'),
      ingredients: 'Dried Pink Lotus petals',
      special_ingredient: 'Hot',
      prices: [
        {size: 'S', price: '1.2', currency: '$'},
        {size: 'M', price: '1.4', currency: '$'},
        {size: 'L', price: '1.6', currency: '$'},
      ],
      average_rating: 4.7,
      ratings_count: '6,879',
      favourite: false,
      type: 'Lotus Tea',
      index: 23,
    },
];
export default TeaData;