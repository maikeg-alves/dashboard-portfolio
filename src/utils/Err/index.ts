export const loginFormErrors = {
  email: 'O campo de e-mail está vazio ou preenchido de forma incorreta.',
  password: 'O campo de senha está vazio ou preenchido de forma incorreta.',
  auth: 'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.',
  bruteforce:
    'Houve muitas tentativas de acesso. Aguarde o tempo determinado e tente novamente mais tarde. Se não é um administrador, entre como visitante!',
  server: 'Erro ao obter verificação no servidor. Tente novamente mais tarde.',
};

export const codeFormErrors = {
  code: 'O código informado está incorreto.',
  email: 'O email informado não corresponde a um email válido.',
  server: 'Erro ao obter verificação no servidor. Tente novamente mais tarde.',
  bruteforce:
    'Houve muitas tentativas de acesso. Aguarde o tempo determinado e tente novamente mais tarde. Se não é um administrador, entre como visitante!',
};

export const recoveryPasswordErrors = {
  password: 'O campo de senha está vazio ou foi preenchido incorretamente.',
  incompatible:
    'Os campos são incompatíveis. Preencha ambos os campos com a mesma senha.',
  code: 'O código necessário para redefinição não foi encontrado nos cookies da aplicação.',
  token: 'O token de redefinição não foi encontrado nos cookies da aplicação.',
  server: 'Erro ao obter verificação no servidor. Tente novamente mais tarde.',
  incompatibleSize: 'Your password must contain at least 8 characters ',
};
