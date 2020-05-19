import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './screens/splash/SpalshScreen.js';
import IntroductionScreen from './screens/introduction/IntroductionScreen.js';
import LoginScreen from './screens/authentication/LoginScreen.js';
import RegisterScreen from './screens/authentication/RegisterScreen.js'
import ForgetPasswordScreen from './screens/authentication/ForgetPasswordScreen.js';
import ActiveTasksScreen from './screens/home/ActiveTasksScreen.js';
import TestScreen from './screens/home/HomeScreen.js';
import { DrawerShowcase } from "./components/DrawerMenu.js";
import ProfileScreen from "./screens/profile/ProfileScreen.js";
import EditPersonalInformation from "./screens/profile/EditPersonalInformation.js";
import EducationScreen from "./screens/Education/EducationScreen.js";
import ServiceScreen from "./screens/Services/ServicesScreen.js";
import PaymentMethodsScreen from "./screens/PaymentMethods/PaymentMethodsScreen.js";
import TransactionsScreen from "./screens/Transactions/TransactionsScreen.js"
import AddTaskScreen from "./screens/Tasks/AddTaskScreen.js";
import UserProfileScreen from "./screens/profile/UserProfileScreen.js";
import ChangePasswordScreen from "./screens/profile/ChangePasswordScreen.js";
import MyTasksScreen from "./screens/Tasks/MyTasksScreen.js";
import TaskBidsScreen from "./screens/Tasks/TaskBidsScreen.js";
import TaskComplainScreen from "./screens/Tasks/TaskComplainScreens.js";

const navigator = createStackNavigator({
    Introduction : { screen: IntroductionScreen, navigationOptions: { headerShown: false}},
    Splash: { screen: SplashScreen, navigationOptions: { headerShown: false}},
    Login: { screen: LoginScreen, navigationOptions: { headerShown: false}},
    Register: { screen: RegisterScreen, navigationOptions: { headerShown: false}},
    ForgetPassword: { screen: ForgetPasswordScreen, navigationOptions: { headerShown: false}},
    ActiveTasksScreen: { screen: ActiveTasksScreen, navigationOptions: { headerShown: false }},
    TestScreen: { screen: TestScreen, navigationOptions: { headerShown: false}},
    DrawerShowcase: { screen: DrawerShowcase, navigationOptions: { headerShown: false}},
    ProfileScreen: { screen: ProfileScreen, navigationOptions: { headerShown: false}},
    EditPersonalInformation: { screen: EditPersonalInformation, navigationOptions: { headerShown: false}},
    EducationScreen: { screen: EducationScreen, navigationOptions: { headerShown: false}},
    ServiceScreen: { screen: ServiceScreen, navigationOptions: { headerShown: false}},
    PaymentMethodsScreen: { screen: PaymentMethodsScreen, navigationOptions: { headerShown: false}},
    TransactionsScreen: { screen: TransactionsScreen, navigationOptions: { headerShown: false}},
    AddTaskScreen: { screen: AddTaskScreen, navigationOptions: { headerShown: false}},
    UserProfileScreen: { screen: UserProfileScreen, navigationOptions: { headerShown: false}},
    ChangePasswordScreen: { screen: ChangePasswordScreen, navigationOptions: { headerShown: false}},
    MyTasksScreen: { screen: MyTasksScreen, navigationOptions: { headerShown: false}},
    TaskBidsScreen: { screen: TaskBidsScreen, navigationOptions: { headerShown: false}},
    TaskComplainScreen: { screen: TaskComplainScreen, navigationOptions: { headerShown: false}},
});

export default AppNavigator = createAppContainer(navigator);