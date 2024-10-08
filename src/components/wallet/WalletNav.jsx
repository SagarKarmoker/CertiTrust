import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletNav() {
    return (
        <nav className='flex justify-between p-4'>
            <div className='font-bold text-2xl'>
                CertiTrust
            </div>
            <div>
                <ConnectButton />
            </div>
        </nav>
    )
}
