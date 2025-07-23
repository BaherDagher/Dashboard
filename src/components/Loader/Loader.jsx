import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center z-[9999] text-[50px]">
            <span className={styles.loader}></span>
        </div>
    );
};

export default Loader;