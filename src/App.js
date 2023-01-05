import {HomePage} from "./pages/HomePage";
import {CssVarsProvider} from '@mui/joy/styles';

function App() {
    return (
        <div>
            <CssVarsProvider>
                <HomePage/>
            </CssVarsProvider>
        </div>
    );
}

export default App;
