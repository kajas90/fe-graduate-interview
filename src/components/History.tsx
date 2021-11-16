import React from 'react'

export default function History({ history }: { history: string[] }) {
    return (
        <div>
            <h3>History</h3>
            {history.map((item, index) => <p key={`history-${index}`}>{item}</p>)}
        </div>
    )
}
