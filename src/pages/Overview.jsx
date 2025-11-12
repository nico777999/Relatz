import { useState } from 'react';
import { Link } from 'react-router-dom';

import importRelatz from '../database/importRelatz';
import getIcon from '../icons';

export default function Overview( { relatz, setRelatz } ) {

    return (
        <>
            <section className='py-5'>
                <h2 className='text-3xl'>Imposta:</h2>
                <ul className='py-3'>
                    <li className='w-full'>
                        <Link to={"/metadata"} className='w-full flex items-center gap-2.5 py-2 px-4 my-1 border-2 border-[#ACACAC] rounded hover:bg-[#F3F3F3]'>
                            { getIcon( "cover" ) }
                            <span>
                                Metadati
                            </span>
                        </Link>
                    </li>
                    <div className='w-full flex flex-col lg:flex-row lg:gap-2'>
                        <li className='grow'>
                            <Link to={"/header"} className='w-full flex items-center gap-2.5 py-2 px-4 my-1 border-2 border-[#ACACAC] rounded hover:bg-[#F3F3F3]'>
                                {getIcon( "arrowUp" ) }
                                <span>
                                    Header
                                </span> 
                            </Link>
                        </li>
                        <li className='grow'>
                            <Link to={"/footer"} className='w-full flex items-center gap-2.5 py-2 px-4 my-1 border-2 border-[#ACACAC] rounded hover:bg-[#F3F3F3]'>
                                {getIcon( "arrowDown" ) }
                                <span>
                                    Footer
                                </span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </section>
        </>
    )
}