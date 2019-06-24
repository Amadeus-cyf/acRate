import axios from "axios";

export const setCurrentUser = (history) => dispatch => {
    axios.get('/api/auth/currentUser')
    .then(response => {
        dispatch({
            type: 'SET_CURRENT_USER',
            data: response.data.data,
        })
        history.push('/')
    }).catch(err => {
        alert(err);
    })
}

export const clearCurrentUser = (history) => dispatch => {
     axios.post('api/auth/logout')
    .then(response=> {
        if (response.data.message === 'Log Out Successfully') {
            dispatch({
                type: 'USER_LOGOUT',
                data: 'undefined',
            })
            history.push('/')
            window.location.reload();
        }
    }).catch(err => {
        alert(err);
    })
}




