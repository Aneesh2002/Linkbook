import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, KaushanScript_400Regular } from '@expo-google-fonts/kaushan-script';
import Index from './screens/Index'
import Home from './screens/Home'
import Add from "./screens/Add";
import Update from "./screens/Update"
import ViewAll from "./screens/ViewAll";
import Details from "./screens/Details";
import Search from "./screens/Search";

const Stack =createStackNavigator();

export default function App(){
  let [fontsLoaded] = useFonts({
    KaushanScript: KaushanScript_400Regular,
  });
  
  return(
<NavigationContainer>
 <Stack.Navigator initialRouteName="Index">
  <Stack.Screen name="Index" component={Index}/>
  <Stack.Screen name="Home" component={Home}/>
  <Stack.Screen name="Add" component={Add}/>
  <Stack.Screen name="Update" component={Update}/>
  <Stack.Screen name="ViewAll" component={ViewAll}/>
  <Stack.Screen name="Details" component={Details}/>
  <Stack.Screen name="Search" component={Search}/>

 </Stack.Navigator>
</NavigationContainer>
);  

}