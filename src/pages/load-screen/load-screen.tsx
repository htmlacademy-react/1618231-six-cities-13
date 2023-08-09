import cl from './load-screen.module.css';


const LoadScreen = (): JSX.Element => (
  <div>
    <div className={cl.loadingScreenWrapper}>
      <div className={cl.loader}>
      </div>
    </div>
  </div>
);

export default LoadScreen;
