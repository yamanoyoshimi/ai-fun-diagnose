import type { NextPage } from 'next';
import CommonMeta from '@/presentationals/_partials/CommonMeta';
import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout';
import ThemeList from '@/presentationals/themes/ThemeList';
import { getListThemes, Theme } from '@/datas/diagnose';

interface Props {
  themes: Theme[]
}

const Home: NextPage<Props> = function IndexPage({ themes }) {
  return (
    <SeparatedLayout>
      <CommonMeta />
      <ThemeList themes={themes} />
    </SeparatedLayout>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      themes: await getListThemes()
    }
  }
}


export default Home;
