import { Switch, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import Deshboard from '../Pages/Deshboard'

const Routes = () => {

    return(
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path='/dashboard/:user'>
                <Deshboard />
            </Route>
        </Switch>
    )
}

export default Routes