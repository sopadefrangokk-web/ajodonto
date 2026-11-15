// ============================================================================
// SUPABASE CONFIG - AJ ODONTOLOGIA
// ============================================================================
// ⚠️ SEGURANÇA: Esta é a ANON KEY pública, segura para uso no frontend.
// Nunca exponha a service_role_key no navegador.

const SUPABASE_CONFIG = {
  url: 'https://qfwalhfftbesjobruiyu.supabase.co',
  anonKey: 'sb_publishable_HIAhuKD4KSEkglM19vgSMw_2Q5wNpWr'
};

// ============================================================================
// SQL para criar a tabela no Supabase (execute no SQL Editor do painel):
// ============================================================================
/*
CREATE TABLE contatos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT,
  especialidade TEXT,
  mensagem TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir inserção pública" ON contatos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura autenticada" ON contatos
  FOR SELECT USING (auth.role() = 'authenticated');
*/
