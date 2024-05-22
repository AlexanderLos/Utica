import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

