import React, { useState, useEffect } from 'react';
import Toaster from '../components/toaster';

const useToast = (initialState = { show: false, type: 'info', message: '' }) => {
    const [toastState, setToastState] = useState(initialState);

    const showToast = (type, message) => {
        setToastState({ show: true, type, message });
    };

    const hideToast = () => {
        setToastState({ show: false, type: '', message: '' });
    };

    useEffect(() => {
        if (toastState.show) {
            const timer = setTimeout(() => {
                hideToast();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toastState]);

    const Toast = () => {
        return (
            <>
                {toastState.show ? <Toaster type={toastState.type} message={toastState.message} onClose={hideToast} />

                    : null
                }
            </>
        );
    };

    return { showToast, Toast };
};

export default useToast;
