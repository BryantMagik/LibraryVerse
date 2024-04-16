"use client"

export default function VerificationEmailTemplate(confirmLink: string) {

    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <div className="container">
                    <h1>Welcome to Next-Auth V5</h1>
                    <p>Please confirm your email by clicking here!</p>
                    <p>
                        <a className="button" href={confirmLink}>
                            Confirm your email
                        </a>
                    </p>
                </div>
            </body>
        </html>
    )

}