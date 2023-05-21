import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import CommonMeta from '@/presentationals/_partials/CommonMeta';
import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout';
import ThemeDetail from '@/presentationals/themes/ThemeDetail';
import { getTheme, Theme } from '@/datas/diagnose';

interface Props {
  themeId: string
  themeDetail: Theme
}

const Home: NextPage<Props> = ({ themeId, themeDetail }) => {
  return (
    <SeparatedLayout>
      {/* <CommonMeta
        title={`お題 | ${themeDetail.title}`}
        description={themeDetail.description}
        ogType={"article"}
      /> */}
      <CommonMeta ogType={'article'} />
      {themeDetail && <ThemeDetail themeDetail={themeDetail} />}
    </SeparatedLayout>
  );
};

export async function getServerSideProps({ params }) {
  const { label } = params
  return { 
    props: {
      themeId: label,
      themeDetail: await getTheme(label)
    } 
  }
}

export default Home;
