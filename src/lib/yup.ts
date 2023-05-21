import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: '必須項目です。入力してください。',
    notType: '形式に誤りがあります。正しい形式で入力してください。',
  },
  string: {
    email: '形式に誤りがあります。正しいメールアドレスを入力してください。',
    matches: '形式に誤りがあります。正しい形式で入力してください。',
    min: ({ min }) => `${min}文字以上で入力してください。`,
    max: ({ max }) => `${max}文字以内で入力してください。`,
  },
});

export default Yup;
