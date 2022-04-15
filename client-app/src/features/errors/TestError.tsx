import React from 'react';
import axios from 'axios';

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/'

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => console.log(err.response));
    }

    return (
        <div className='center flex-column'>
            <h1>Test Error component</h1>
            <ul className='link-list-row'>
                <li className='a-link-bg'><a className='a-link' onClick={handleNotFound}>Not Found</a></li>
                <li className='a-link-bg'><a className='a-link' onClick={handleBadRequest}>Bad Request</a></li>
                <li className='a-link-bg'><a className='a-link' onClick={handleValidationError}>Validation Error</a></li>
                <li className='a-link-bg'><a className='a-link' onClick={handleServerError}>Server Error</a></li>
                <li className='a-link-bg'><a className='a-link' onClick={handleUnauthorised}>Unauthorised</a></li>
                <li className='a-link-bg'><a className='a-link' onClick={handleBadGuid}>Bad Guid</a></li>
            </ul>
        </div>
    )
}