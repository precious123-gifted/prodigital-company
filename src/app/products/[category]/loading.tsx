import { PrismicNextImage } from '@prismicio/next';
import styles from '../../../lib/LoadingScreen.module.css';  
import { createClient } from '@/prismicio';

const LoadingScreen = async() => {

    const client = createClient()

    const settings = await client.getSingle('nav')

    
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
    <div  className=" cursor-pointer object-contain  w-[15vw] portrait:w-[32vw]  pb-1 ">
  <PrismicNextImage  field={settings.data.logo} className={styles.logo}/>
      </div>
      <span className={styles.circle + ' ' + styles.circle1}></span>
      <span className={styles.circle + ' ' + styles.circle2}></span>
      <span className={styles.circle + ' ' + styles.circle3}></span>
      <span className={styles.circle + ' ' + styles.circle4}></span>
      <span className={styles.circle + ' ' + styles.circle5}></span>
      <span className={styles.circle + ' ' + styles.circle6}></span>
      <span className={styles.circle + ' ' + styles.circle7}></span>
      <span className={styles.circle + ' ' + styles.circle8}></span>
    </div>
    </div>
  );
};

export default LoadingScreen;