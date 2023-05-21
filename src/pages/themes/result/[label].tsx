import type { NextPage } from 'next';
import CommonMeta from '@/presentationals/_partials/CommonMeta';
import SeparatedLayout from '@/presentationals/_partials/SeparatedLayout';
import ResultDisplay from '@/presentationals/themes/result/ResultDisplay';
import { getTheme, getListThemes, Theme } from '@/datas/diagnose';

interface Props {
  themeId: string
  themeDetail: Theme
  themes: Theme[]
}

const Result: NextPage<Props> = ({ themeId, themeDetail, themes }) => {
  return (
    <SeparatedLayout>
      <CommonMeta ogType={'article'} />
      <ResultDisplay themeDetail={themeDetail} themes={themes} />
    </SeparatedLayout>
  )
}

export async function getServerSideProps({ params }) {
  const { label } = params
  const themes = await getListThemes()
  return { 
    props: {
      themeId: label,
      themeDetail: await getTheme(label),
      themes: themes.filter((themes) => themes.label !== label)
    }
  };
}

export default Result;
