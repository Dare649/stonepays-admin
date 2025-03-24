import { LuLayoutDashboard, LuPackage, LuChartNoAxesCombined, LuUserRound, LuShoppingCart  } from "react-icons/lu";



export const nav = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: <LuLayoutDashboard size={25}/>
    },
    {
        title: 'orders',
        path: '/orders',
        icon: <LuPackage size={25}/>
    },
    {
        title: 'transactions',
        path: '/transactions',
        icon: <LuChartNoAxesCombined size={25}/>
    },
    {
        title: 'users',
        path: '/users',
        icon: <  LuUserRound size={25}/>
    },
    {
        title: 'products',
        path: '/products',
        icon: <LuShoppingCart size={25}/>
    },
]



export const product_category = ["digital product", "physical product"]


export const trx = [
    {
        date: '4th oct, 2025',
        transaction_type: 'bank transfer',
        amount: 20000,
        status: 'pending',
        id: 1,
    },
    {
        date: '4th oct, 2025',
        transaction_type: 'card',
        amount: 20000,
        status: 'pending',
        id: 2,
    },
    {
        date: '4th oct, 2025',
        transaction_type: 'bank transfer',
        amount: 20000,
        status: 'pending',
        id: 3,
    },
    {
        date: '4th oct, 2025',
        transaction_type: 'bank transfer',
        amount: 20000,
        status: 'successful',
        id: 4,
    },
    {
        date: '4th oct, 2025',
        transaction_type: 'crypto',
        amount: 20000,
        status: 'failed',
        id: 5,
    },
    {
        date: '4th oct, 2025',
        transaction_type: 'card',
        amount: 20000,
        status: 'successful',
        id: 6,
    },
    {
        date: '4th oct, 2025',
        transaction_type: 'bank transfer',
        amount: 20000,
        status: 'successful',
        id: 7,
    },
]


export const users = [
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'active',
        id: 1
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'inactive',
        id: 2
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'active',
        id: 3
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'inactive',
        id: 4
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'active',
        id: 5
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'active',
        id: 6
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'inactive',
        id: 7
    },
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'example@mail.com',
        phone_number: '+443 6790 3443',
        status: 'active',
        id: 8
    },
]


export const products = [
    {
        name: 'amazon gift card',
        category: 'gift card',
        unit_price: 10000,
        status: 'in-stock',
        id: 1
    },
    {
        name: 'usdt',
        category: 'crypto',
        unit_price: 10000,
        status: 'in-stock',
        id: 2
    },
    {
        name: 'amazon gift card',
        category: 'gift card',
        unit_price: 10000,
        status: 'out-of-stock',
        id: 3
    },
    {
        name: 'amazon gift card',
        category: 'gift card',
        unit_price: 10000,
        status: 'in-stock',
        id: 4
    },
    {
        name: 'amazon gift card',
        category: 'gift card',
        unit_price: 10000,
        status: 'in-stock',
        id: 5
    },
    {
        name: 'bitcoin',
        category: 'crypto',
        unit_price: 10000,
        status: 'out-of-stock',
        id: 6
    },
    {
        name: 'itunez card',
        category: 'gift card',
        unit_price: 10000,
        status: 'in-stock',
        id: 7
    },
    {
        name: 'amazon gift card',
        category: 'gift card',
        unit_price: 10000,
        status: 'in-stock',
        id: 8
    },
    {
        name: 'amazon gift card',
        category: 'gift card',
        unit_price: 10000,
        status: 'in-stock',
        id: 9
    },
]