import React from 'react'

export const SignuptutorBank = () => {
    return (
        <div>
            <form id="main-form">
                <input className="formInput" placeholder="Bank Name"  id ="bankName" for="bankName" />
                <input className="formInput" placeholder="IBAN Number" id ="ibn" for="ibn" />
                <input className="formInput" placeholder="Paypal Email" id ="paypalEmail" for="paypalEmail" />
                <div className="btn-r text-center ">
                    <button  id="btn">Complete Sign up</button>
                </div>
            </form>
        </div>
    )
}
