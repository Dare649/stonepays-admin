import { LuLayoutDashboard, LuPackage, LuChartNoAxesCombined, LuUserRound,  } from "react-icons/lu";
import { ImGift } from "react-icons/im";



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
        title: 'gift cards',
        path: '/gift-cards',
        icon: <ImGift size={25}/>
    },
]