import Home from '@/views/Home'
import Cart from '@/views/Cart'
import User from '@/views/User'
import CustomerService from '@/views/CustomerService'
import Details from '@/views/Details'
import Account from '@/views/Account'
import SigninCallBack from '@/views/SigninCallBack'
import AccountSetting from '@/views/AccountSetting'
import UserInfoEditor from '@/views/UserInfoEditor'
import AddressManage from '@/views/AddressManage'
import AddAddress from '@/views/AddAddress'
import AddressModify from '@/views/AddressModify'
import SelectAddress from '@/views/SelectAddress'
import CheckOrder from '@/views/CheckOrder'
import Payment from '@/views/Payment'
import NonPaymentOrder from '@/views/NonPaymentOrder'
import NonShipmentsOrder from '@/views/NonShipmentsOrder'
import CheckOrderFromDetails from '@/views/CheckOrderFromDetails'
import Favorite from '@/views/Favorite'
import DeliveryOrder from '@/views/DeliveryOrder'
import NonEvaluateOrder from '@/views/NonEvaluateOrder'
import Evaluate from '@/views/Evaluate'
import EvaluateList from '@/views/EvaluateList'
import Advance from '@/views/Advance'
import CheckPassword from '@/views/CheckPassword'
import CheckNewPassword from '@/views/CheckNewPassword'
import OrderDetails from '@/views/OrderDetails'
import UploadHeadImg from '@/views/UploadHeadImg'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
    // meta: {
    //   requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    // }
  },
  {
    path: '/customerservice',
    name: 'customerservice',
    component: CustomerService
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/details',
    name: 'details',
    component: Details
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/signincallback',
    name: 'signincallback',
    component: SigninCallBack
  },
  {
    path: '/accountSetting',
    name: 'accountSetting',
    component: AccountSetting
  },
  {
    path: '/userInfoEditor',
    name: 'userInfoEditor',
    component: UserInfoEditor
  },
  {
    path: '/addressManage',
    name: 'addressManage',
    component: AddressManage
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: AddAddress
  },
  {
    path: '/addressModify',
    name: 'addressModify',
    component: AddressModify
  },
  {
    path: '/selectAddress',
    name: 'selectAddress',
    component: SelectAddress
  },
  {
    path: '/checkOrder',
    name: 'checkOrder',
    component: CheckOrder
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment
  },
  {
    path: '/nonPaymentOrder',
    name: 'nonPaymentOrder',
    component: NonPaymentOrder
  },
  {
    path: '/nonShipmentsOrder',
    name: 'nonShipmentsOrder',
    component: NonShipmentsOrder
  },
  {
    path: '/checkOrderFromDetails',
    name: 'checkOrderFromDetails',
    component: CheckOrderFromDetails
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite
  },
  {
    path: '/deliveryOrder',
    name: 'deliveryOrder',
    component: DeliveryOrder
  }, {
    path: '/nonEvaluateOrder',
    name: 'nonEvaluateOrder',
    component: NonEvaluateOrder
  }, {
    path: '/evaluate/:orderId/:skuId',
    name: 'evaluate',
    component: Evaluate,
    props: true
  }, {
    path: '/evaluateList',
    name: 'evaluateList',
    component: EvaluateList
  }, {
    path: '/advance',
    name: 'advance',
    component: Advance
  }, {
    path: '/checkPassWord',
    name: 'checkPassWord',
    component: CheckPassword
  }, {
    path: '/checkNewPassword',
    name: 'checkNewPassword',
    component: CheckNewPassword
  }, {
    path: '/orderDetails/:orderId',
    name: 'orderDetails',
    component: OrderDetails,
    props: true
  }, {
    path: '/uploadHeadImg',
    name: 'uploadHeadImg',
    component: UploadHeadImg
  }
]
