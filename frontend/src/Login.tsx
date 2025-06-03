import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, type BaseSyntheticEvent } from 'react';

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submit = async () => {
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            })
            if(!response.ok) {
                console.error("Error Loggin in")
            }

            const data = await response.json()

            localStorage.setItem('token', data.access_token)
            console.log(data)
        }
        catch (err) {
            console.error("login error:", err)
        }
    }
    
    return (
        <>
        <div className="text-center d-flex flex-column h-100 justify-content-center">
            <h1 className="mb-4" style={{color: "white"}}>Login :D</h1>
            <div>
                <TextField 
                    label="username"
                    variant='outlined'
                    value={username}
                    size='medium'
                    sx={{width: "20%"}}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className='mt-2'>
                <TextField 
                    label="password!!!!"
                    variant='outlined'
                    value={password}
                    size='medium'
                    sx={{width: "20%"}}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className='mt-2'>
                <Button sx={{width: "10%"}} variant="contained" onClick={submit}>Login</Button>
            </div>
        </div>
        </>
    )
}