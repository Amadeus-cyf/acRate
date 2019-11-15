import axios from "axios";

export const setCurrentUser = (user, history) => dispatch => {
    dispatch({
        type: 'SET_CURRENT_USER',
        data: user,
    })
    if (history) {
        history.push('/');
    }
}

export const clearCurrentUser = (history) => dispatch => {
     axios.post('api/auth/logout')
    .then(response=> {
        if (response.data.message === 'Log Out Successfully') {
            dispatch({
                type: 'USER_LOGOUT',
                data: 'undefined',
            })
            if (history) {
                history.push('/')
                window.location.reload();
            }
        }
    }).catch(err => {
        alert(err);
    })
}

export const setUser = (user_id) => dispatch => {
    axios.get('api/user/' + user_id)
    .then(response => {
        dispatch({
            type: 'SET_USER',
            data: response.data.data.user,
        })
    }).catch(err => {
        alert(err);
    })
}

export const clearUser = () => dispatch => {
    dispatch({
        type: 'CLEAR_USER',
        data: 'undefined',
    })
}