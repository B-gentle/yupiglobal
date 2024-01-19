import blueShirt from './assets/products/blueShirt.png'
import bluePolo from './assets/products/bluePolo.png'
import hoodie from './assets/products/hoodie.jpg';
import jeanShort from './assets/products/jean-short.png'
import jeanBag from './assets/products/jean-bag.png'
import briefcase from './assets/products/briefcase.png'
import menSuit from './assets/products/men-suit.png';
import abang from './assets/products/abang.png';
import flowerVase from './assets/products/flower-vase.png';
import cooler from './assets/products/cooler.png';
import lightVase from './assets/products/light-vase.png';
import racket from './assets/products/racket.jpg';
import coffeeDispenser from './assets/products/coffee-dispenser.png';
import juiceMaker from './assets/products/juice-maker.png';
import washingMachine from './assets/products/washing-machine.png';
import chair1 from './assets/products/chair1.png';
import chair2 from './assets/products/chair2.png';
import android1 from './assets/products/android1.png';
import android2 from './assets/products/android2.png';
import android3 from './assets/products/android3.png';
import android4 from './assets/products/android4.png';
import headphones from './assets/products/headphones.png';
import camera from './assets/products/camera.png';
import laptop from './assets/products/laptop.png';
import smartWatch from './assets/products/smart-watch.png'
import earphone from './assets/products/earphone.png';
import mp3 from './assets/products/music-box.png';
import monitor from './assets/products/monitor.png';
import keyboard from './assets/products/keyboard.png';
import gamePad from './assets/products/game-pad.png';
import apple from './assets/brands/apple.png';
import phillips from './assets/brands/philips.png';
import gucci from './assets/brands/gucci.png';
import lg from './assets/brands/lg.jpg';
import hp from './assets/brands/hp.png';
import slide3 from './assets/slide3.png';
import masterCard from './assets/paymentMethod/masterCard.png';
import visa from './assets/paymentMethod/visa-icon.png';
import paypal from './assets/paymentMethod/paypal-icon.webp';
import eWallet from './assets/paymentMethod/e-wallet.png';

// icons
import {
    FcElectronics,
    FcAutomotive
} from "react-icons/fc";
import {
    GiClothes,
    GiBookshelf
} from "react-icons/gi";
import {
    MdChair,
    MdOutlineBabyChangingStation,
    MdOutlineDeveloperMode,
    MdSmartToy
} from "react-icons/md";
import {
    TbRibbonHealth,
    TbGardenCart
} from "react-icons/tb";


export const recommendedItems = [{
        _id: '00',
        name: 'Men\'\s Shirt',
        img: blueShirt,
        price: 5000,
        description: 'T-shirts with multiple colors, for men'
    },
    {
        _id: '01',
        name: 'Men\'\s Polo',
        img: bluePolo,
        price: 5000,
        description: 'Jeans shorts for men blue color'
    },
    {
        _id: '02',
        name: 'hoodie',
        img: hoodie,
        price: 5000,
        description: 'Jeans shorts for men blue color'
    },
    {
        _id: '03',
        name: 'Jean Short',
        img: jeanShort,
        price: 15000,
        description: 'Jeans shorts for men blue color'
    },
    {
        _id: '04',
        name: 'Jean Bag',
        img: jeanBag,
        price: 50000,
        description: 'Jeans shorts for men blue color'
    },
    {
        _id: '05',
        name: 'Briefcase',
        img: briefcase,
        price: 45000,
        description: 'Jeans shorts for men blue color'
    },
    {
        _id: '06',
        name: 'Men Suit',
        img: menSuit,
        price: 15000,
        description: 'Jeans shorts for men blue color'
    },
    {
        _id: '07',
        name: 'Abang',
        img: abang,
        price: 10000,
        description: 'Local Water Pot'
    },

]

export const dealsAndOffers = [{
        _id: 'vase1',
        img: flowerVase,
        name: 'Flower Vase',
        discount: 20,
        price: 5000
    },
    {
        _id: 'cooler1',
        img: cooler,
        name: 'Cooler',
        discount: 25,
        price: 5000
    },
    {
        _id: 'LampStand',
        img: lightVase,
        name: 'Lamp Stand',
        discount: 15,
        price: 5000
    },
    {
        _id: 'racket',
        img: racket,
        name: 'Racket',
        discount: 35,
        price: 5000
    },
    {
        _id: 'coffee-dispenser',
        img: coffeeDispenser,
        name: 'Coffee Dispenser',
        discount: 24,
        price: 5000
    },
    {
        _id: 'juice',
        img: juiceMaker,
        name: 'Juice Maker',
        discount: 25,
        price: 5000
    },
    {
        _id: 'washing-machine1',
        img: washingMachine,
        name: 'washing Machine',
        discount: 5,
        price: 5000
    },
]

export const brands = [apple, phillips, gucci, lg, hp]

export const heroSlides = [{
        img: '/uploads/yupiPromo.png',
        gradient: 'rgba(81, 183, 213, 0.5), rgba(156,90,196,0.5)',
        text: 'pay with ease via our multiple payment channels',
        button: 'shop now'
    },
    {
        img: '/uploads/yupiCatalogue.png',
        gradient: 'rgba(202, 202, 007, 0.5), rgba(22,27,109, 0.5)',
        text: 'experience quality home delivery when you shop at yupiglobal',
        button: 'shop now'
    },
    {
        img: slide3,
        gradient: 'rgba(200, 200, 200, 0.2), rgba(202, 202, 007, 0.9)',
        text: 'checkout latest electronics trends and gadgets',
        button: 'Learn more'

    }
]

export const products = [
    // {
    //     _id: 'detoxHealth',
    //     productName: 'Detox Health',
    //     img: detoxHealth,
    //     price: 55000,
    //     description: 'Detox Health',
    //     discount: 0,
    //     rating: 5,
    //     category: 'featured-products'

    // },
    // {
    //     _id: 'immunoBoost',
    //     productName: 'Immuno Boost',
    //     img: immunoBoost,
    //     price: 55000,
    //     description: 'Immuno Health',
    //     discount: 0,
    //     rating: 5,
    //     category: 'featured-products'

    // },
    // {
    //     _id: 'alkaPlus',
    //     productName: 'Yupi Alka Plus',
    //     img: alkaPlus,
    //     price: 55000,
    //     description: 'Yupi Alka Plus',
    //     discount: 0,
    //     rating: 5,
    //     category: 'featured-products'

    // },
    {
        _id: 'chair 1',
        productName: 'Exec Chair',
        img: chair1,
        price: 55000,
        description: 'T-shirts with multiple colors, for men',
        discount: 0,
        rating: 5,
        category: 'popular-products'

    },
    {
        _id: 'chair 2',
        productName: 'Charis Chair',
        img: chair2,
        price: 85000,
        description: 'T-shirts with multiple colors, for men',
        discount: 0,
        category: 'new-products'

    },
    {
        _id: 'android1',
        productName: 'Bee Phones',
        img: android1,
        price: 95000,
        description: 'Latest Bee Phones',
        discount: 0,
        category: 'popular-products'

    },
    {
        _id: 'android12',
        productName: 'BeeT Phones',
        img: android2,
        price: 95000,
        description: 'Latest Bee Phones',
        discount: 0,
        category: 'popular-products'

    },
    {
        _id: 'android3',
        productName: 'BeeTe Phones',
        img: android3,
        price: 95000,
        description: 'Latest Bee Phones',
        discount: 0,
        category: 'new-products'

    },
    {
        _id: 'android4',
        productName: 'B Phones',
        img: android4,
        price: 95000,
        description: 'Latest Bee Phones',
        discount: 0,
        category: 'popular-products'
    },
    {
        _id: 'headphones',
        productName: 'Headphones',
        img: headphones,
        price: 9000,
        description: 'bluetooth headset',
        discount: 0,
        category: 'featured-products'
    },
    {
        _id: 'camera',
        productName: 'Camera Canon',
        img: camera,
        price: 90000,
        description: 'Canon Camera',
        discount: 0,
        category: 'new-products'
    },
    {
        _id: 'smart-watch',
        productName: 'Smart watch',
        img: smartWatch,
        price: 19000,
        description: 'smart watch',
        discount: 0,
        category: 'popular-products'
    },
    {
        _id: 'laptop',
        productName: 'Laptop Dell',
        img: laptop,
        price: 19000,
        description: 'Dell Laptop',
        discount: 0,
        category: 'featured-products'
    },
    {
        _id: 'earphone',
        productName: 'Overhead Earphone',
        img: earphone,
        price: 10000,
        description: 'Earphone',
        discount: 0,
        category: 'new-products'
    },
    {
        _id: 'mp3',
        productName: 'Music Box',
        img: mp3,
        price: 10000,
        description: 'Music Box',
        brand: 'JBL',
        discount: 0,
        category: 'popular-products'
    },
    {
        _id: 'monitor',
        productName: 'Monitor',
        img: monitor,
        price: 70000,
        description: 'Monitor',
        brand: 'Apple',
        discount: 0,
        category: 'featured-products'
    },
    {
        _id: 'keyboard',
        productName: 'Light Keyboard',
        img: keyboard,
        price: 15000,
        description: 'keyboard with keyboard light',
        brand: 'hp',
        discount: 0,
        category: 'new-products'
    },
    {
        _id: 'game-pad',
        productName: 'Game-pad',
        img: gamePad,
        price: 10000,
        description: 'x-box pad',
        brand: 'x-box',
        discount: 0,
        category: 'new-products'
    }
]

export const categories = [{
        name: 'Electronics',
        icon: FcElectronics,
        children: [{
                subCat: 'Laptops And Computer',
                items: ['Monitors', 'Laptops', 'Desktop cmputers']
            },
            {
                subCat: 'Cell Phones',
                items: ['Android', 'iPhones']
            },
            {
                subCat: 'Tv and Videos',
                items: ['Tvs', 'Media Streaming Devices', 'Projectors']
            }
        ]
    },
    {
        name: 'Clothing and Shoes',
        icon: GiClothes,
        children: [{
                subCat: 'Men',
            },
            {
                subCat: 'Women',
            }
        ]
    },
    {
        name: 'Furnitures',
        icon: MdChair,
        children: [{
                subCat: 'Office Furnitures',
                items: []
            },
            {
                subCat: 'House furnitures',
                items: []
            }
        ]
    },
    {
        name: 'Automobiles',
        icon: FcAutomotive,
        children: [{
                subCat: 'Cars',
                items: []
            },
            {
                subCat: 'Motorcycles',
                items: []
            }
        ]
    },

    {
        name: 'Music and Books',
        icon: GiBookshelf,
    },
    {
        name: 'Moms and Babies',
        icon: MdOutlineBabyChangingStation,
    },
    {
        name: 'Softwares',
        icon: MdOutlineDeveloperMode,
    },
    {
        name: 'Home & Garden',
        icon: TbGardenCart,
    },
    {
        name: 'Kids and Toy',
        icon: MdSmartToy,
    },
    {
        name: 'Beauty and Health',
        icon: TbRibbonHealth,
    },
]

export const paymentIcons = [{
        image: masterCard,
        value: 'masterCard'
    },
    {
        image: visa,
        value: 'visa'
    },
    {
        image: paypal,
        value: 'payPal'
    },
    {
        image: eWallet,
        value: 'Transaction Wallet'
    }
]