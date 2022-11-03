import { useEffect, useState } from 'react'

export const conditionalDisplay = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loggedUser, setLoggedUser] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setInterval(() => {
            const user = localStorage.getItem('backend3-ecom')
            if (user) {
                setLoggedUser(true)
            } else {
                setLoggedUser(false)
            }
        }, 500)
    }, [])
    return loggedUser
};
