import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { AppLoadingManager } from './AppLoadingManager.ts';

export const AppLoading = () => {
  const [loading, setLoading] = useState(AppLoadingManager.IsLoading);

  useEffect(() => {
    const updateLoading = () => setLoading(AppLoadingManager.IsLoading);

    AppLoadingManager.OnLoadingUpdated.add(updateLoading);

    setLoading(AppLoadingManager.IsLoading);

    return () => AppLoadingManager.OnLoadingUpdated.remove(updateLoading);
  }, []);

  return (
    <div className={clsx(
      "fixed inset-0 flex justify-center items-center bg-black text-white pointer-events-none z-[2000]",
      "transition-opacity duration-1000",
      loading ? "opacity-100" : "opacity-0",
    )}>
      <div className={"loadingContent loading"}>
        LOADING...
      </div>
    </div>
  )
}
