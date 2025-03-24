import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider as PaperProvider } from 'react-native-paper';


function Main(){
    return(
        <PaperProvider>
            <App/>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
