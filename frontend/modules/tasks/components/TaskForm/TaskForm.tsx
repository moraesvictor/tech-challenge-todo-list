'use client';

import { useState, FormEvent } from 'react';
import { validateTaskDescription } from '@shared/utils/validation';
import { Input } from '@shared/components/Input';
import { Button } from '@shared/components/Button';

interface TaskFormProps {
  onSubmit: (descricao: string) => Promise<void>;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateTaskDescription(descricao);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(descricao.trim());
      setDescricao('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao criar tarefa'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
              setError(null);
            }}
            placeholder="Digite a descrição da tarefa..."
            disabled={isSubmitting || isLoading}
            error={error || undefined}
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || isLoading || !descricao.trim()}
          isLoading={isSubmitting}
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
};

