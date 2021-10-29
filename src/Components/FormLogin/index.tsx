
import { TextField, Button } from '@material-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useAuth } from '../../Providers/Auth' 
import { useHistory } from "react-router-dom";
import * as yup from 'yup'

interface Data{
    email: string,
    password: string
}

export default function FormLogin(){

    const history = useHistory();

    const{ error, authToken, signIn } = useAuth()

    const schema = yup.object().shape({
        email: yup.string().required(''),
        password: yup
          .string()
          .required(''),
        
        })

    const { 
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Data>({resolver: yupResolver(schema)})

    const handleForm = (data: Data) => {
       signIn(data)
    }

    return(
        <form onSubmit={handleSubmit(handleForm)}>
            <div className='input'>
                <TextField 
                    label='E-mail'
                    margin='normal'
                    variant='outlined'
                    color='primary'
                    style={{backgroundColor: 'white'}}
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                />          
            </div>
            <div className='input'>
                <TextField 
                    label='Senha'
                    type='password'
                    margin='normal'
                    variant='outlined'
                    color='primary'
                    style={{backgroundColor: 'white'}}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                />          
            </div>
            <div className='buttons'>
                <Button size="large" type='submit' variant='contained' color='primary'>
                    Login
                </Button>
                <p style={{color: 'red'}}>{ typeof error === "object" ? 'E-mail e/ou senha inválidos*' : '' }</p>
            </div>
        </form>
    )
}