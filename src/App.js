import { 
  createStackNavigator, 
  createAppContainer 
} from 'react-navigation'

import About from './screens/AboutScreen'
import Home from './screens/HomeScreen'
import EMOM from './screens/EMOMScreen'
import AMRAP from './screens/AMRAPScreen'
import Isometry from './screens/IsometryScreen'

const AppNavigator = createStackNavigator(
  { About, Home, EMOM, AMRAP, Isometry },
  { initialRouteName: 'Home' }
)

export default createAppContainer(AppNavigator)
