import { diagnoseDb } from '../pages/api/db'

export interface Diagnose {
  label: string;
  title: string; // お題タイトル
  description: string; // お題の説明テキスト
  prompt: string; // chat gptに投げるテキスト
  maxToken: number; // chat gptが返す最長文字列数
  temperature: number; // chat gpt に渡すパラメーター1
  presence_penalty: number; // chat gpt に渡すパラメーター2
  frequency_penalty: number; // chat gpt に渡すパラメーター3
  createdDate: string;
}

// 更新用パラメータ
export interface DiagnoseValues extends Omit<Diagnose, 'createdDate' | 'label'>{}


export interface Theme extends Pick<Diagnose, 'label' | 'title' | 'description' | 'createdDate'> {
  count?: number;
}

export const getListThemes = async (): Promise<Theme[]> => {
  const listDiagnose: Diagnose[] = await diagnoseDb.read()
  return listDiagnose.map(({ label, title, description, createdDate }) => {
    return { label, title, description, createdDate, count: 100 };
  });
};

export const getTheme = async (labelName: string): Promise<Theme> => {
  const listDiagnose: Diagnose[] = await diagnoseDb.read()
  const theme = listDiagnose.find((diagnose) => diagnose.label === labelName);
  if (!theme) return null;
  return {
    label: theme.label,
    title: theme.title,
    description: theme.description,
    createdDate: theme.createdDate,
    count: 100,
  };
};

export const getDiagnose = async (labelName: string, name?: string): Promise<Diagnose> => {
  const listDiagnose: Diagnose[] = await diagnoseDb.read()
  return listDiagnose.find((diagnose) => diagnose.label === labelName);
};
