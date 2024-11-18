import { useState, useEffect, createContext, useContext} from "react"
import Cookies from 'js-cookie'
import {api , web} from '../utilities/axios-gateway'
import csrfCookie from "../utilities/csrf-cookie"
import cookie from 'cookie'

const AuthContext = createContext(null)



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [is_logged, setLogged] = useState(false)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       
        if (!user && Cookies.get('qcppdis_id')) {
            console.log("this auth effect")
            getUser()
        }
        else {
            setUser(null)
            setLoading(false)
            Cookies.remove('qcppdis_id')
        }
        
    }, [])

    const getUser = async () => {

        setLoading(true)
        api.get('/get-user').then(({ data }) => {
            setLogged(true)
            setUser(data)
            setLoading(false)
        }).catch(err => {
            setUser(null)
            // setErrors(err.response.data)
            setLogged(false)
            setLoading(false)
        })
    }

    const login = async (formInput) => {
        await csrfCookie().catch(err => {
            Cookies.remove('qcppdis_id')
            setErrors("Something went wrong, Please try again.")
        })
        await web.post('/login', formInput).then( async ({data}) => {
            if(data.error){
                setErrors(data.error)
                console.log(data)
            }
            setLogged(true)
            setUser(data.user)
            setLoading(false)
            Cookies.set('qcppdis_id', true)

            }).catch(err => {
                const response = err.response;
                
                setErrors("Something went wrong, Please try again.")
                setUser(null)
                setLogged(false)
                setLoading(false)
                Cookies.remove('qcppdis_id')

            })
    }

    const logout = () => {
        web.post('/logout').then(() => {
            Cookies.remove('qcppdis_id')
            setLogged(false)
            setUser(null)
            setErrors(null)
            setLoading(false)
            })

    }

    return (
        <AuthContext.Provider value={{ user, login, logout, errors,loading, is_logged,getUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

