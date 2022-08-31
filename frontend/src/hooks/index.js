import { useContext } from 'react';

import { AuthContext, ApiContext } from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);

export const useApi = () => useContext(ApiContext);
