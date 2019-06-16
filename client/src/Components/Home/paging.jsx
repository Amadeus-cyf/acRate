import React from 'react';
import {Button} from 'semantic-ui-react';

function paging(page, currentPage, pageNumber, toPage) {
    if (pageNumber <= 7) {
        if (page === currentPage) {
            return(
                <Button onClick = {toPage} size = 'small' color = 'blue'>{page}</Button>
            )
        }
        return(
            <Button onClick = {toPage} size = 'small' basic color = 'blue'>{page}</Button>
        )
    } else {
        if (page === currentPage) {
            return(
                <Button onClick = {toPage} size = 'small' color = 'blue'>{page}</Button>
            )
        }
        if (page === 1) {
            return(
                <Button onClick = {toPage} size = 'small' basic color = 'blue'>{page}</Button>
            )
        }
        if (page === pageNumber) {
            return(
                <Button onClick = {toPage} size = 'small' basic color = 'blue'>{page}</Button>
            )
        }
        if (currentPage > 2 && currentPage <= pageNumber-2) {
            if (page >= currentPage - 2 && page <= (currentPage + 2)) {
                return(
                    <Button onClick = {toPage} size = 'small' basic color = 'blue'>{page}</Button>
                ) 
            } else {
                if (page === currentPage - 3 || page === currentPage + 3) {
                    return(
                        <p style = {{fontSize: '14pt', margin: '5px'}}>...</p>
                    )
                }
            }
        } else if (currentPage <= 2) {
            if (page <= 5) {
                return(
                    <Button onClick = {toPage} size = 'small' basic color = 'blue'>{page}</Button>
                ) 
            } else {
                if (page === 6) {
                    return(
                        <p style = {{fontSize: '14pt', margin: '5px'}}>...</p>
                    )
                }
            }
        } else {
            if (page > pageNumber - 5) {
                if (page === currentPage) {
                    return(
                        <Button onClick = {toPage} size = 'small' color = 'blue'>{page}</Button>
                    )
                }
                return(
                    <Button onClick = {toPage} size = 'small' basic color = 'blue'>{page}</Button>
                ) 
            } else {
                if (page === pageNumber - 5) {
                    return(
                        <p style = {{fontSize: '14pt', margin: '5px'}}>...</p>
                    )
                }
            }
        }
        return '';
    }
}

export default paging;