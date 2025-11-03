'use client';

import { useState, FormEvent } from 'react';
import { validateTaskDescription } from '@shared/utils/validation';
import { Input } from '@shared/components/Input';
import { Button } from '@shared/components/Button';
import { useToastMethods } from '@shared/components/Toast';

interface TaskFormProps {
  onSubmit: (descricao: string) => Promise<void>;
  isLoading?: boolean;
}

export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToastMethods();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateTaskDescription(descricao);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(descricao.trim());
      setDescricao('');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao criar tarefa';
      setError(errorMessage);
      toast.error(errorMessage);
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

