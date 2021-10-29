import { useAuth } from '../../Providers/Auth' 
import { Button } from '@material-ui/core'
import { useHistory, useParams } from "react-router-dom";

interface Param {
    user: string
}

const Deshboard = () => {
    
    const {Logout, authToken } = useAuth()

    const history = useHistory();
    

    let { user } = useParams<Param>()

    if(authToken === ''){
         history.push('/')
    }


    return (
        <div>
            <h1 style={{color: "grey"}}>{`Seja bem-vindo ${user}!`} </h1>
            <Button onClick={Logout} variant='contained' color='warning'>Logout</Button>
        </div>
    )
}

export default Deshboard 