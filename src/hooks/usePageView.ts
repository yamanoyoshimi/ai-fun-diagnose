import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '@/lib/gtag';

const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    if (!gtag.existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default usePageView;
