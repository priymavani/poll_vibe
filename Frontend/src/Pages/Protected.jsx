import React from 'react'
import { useUser, RedirectToSignIn } from '@clerk/clerk-react';

const Protected = ({ children }) => {

    const { isSignedIn, user } = useUser();

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        children
    );
}

export default Protected