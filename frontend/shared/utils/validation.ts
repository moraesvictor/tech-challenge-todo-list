export const validateTaskDescription = (descricao: string): string | null => {
  if (!descricao || descricao.trim().length === 0) {
    return 'A descrição é obrigatória';
  }

  if (descricao.length > 500) {
    return 'A descrição deve ter no máximo 500 caracteres';
  }

  return null;
};

